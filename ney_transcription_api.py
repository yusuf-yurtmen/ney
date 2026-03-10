"""
Ney Mastery — YouTube Audio Transcription Backend
Python/FastAPI Microservice for MIR (Music Information Retrieval)

Features:
- YouTube audio extraction via yt-dlp
- Source separation via Demucs
- Pitch detection via CREPE
- 53-TET quantization (Turkish Music)
- HMM note sequence cleaning
- JSON API for frontend

Usage:
    uvicorn ney_transcription_api:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp
import torch
import numpy as np
import librosa
import crepe
from demucs.pretrained import load_model
from demucs.audio import save_audio
from typing import List, Dict, Optional
import json
import os
import tempfile

app = FastAPI(title="Ney Mastery Transcription API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === 53-TET FREQUENCY TABLE (Turkish Music) ===
REF_FREQ = 440.0  # A4
COMMA_FREQS = [REF_FREQ * (2 ** (n / 53)) for n in range(-53, 54)]

PERDE_NAMES = {
    0: "Çargâh", 4: "Bûselik", 8: "Kürdî", 12: "Segâh",
    16: "Dik Segâh", 20: "Çargâh (Bakiye)", 24: "Dik Çargâh",
    28: "Bûselik (Dik)", 32: "Rast", 36: "Dik Rast",
    40: "Dügâh", 44: "Kürdî (Dik)", 48: "Segâh (Zirgüle)",
    53: "Çargâh (Octave)"
}

# === REQUEST/RESPONSE MODELS ===
class TranscriptionRequest(BaseModel):
    youtube_url: str
    instrument: str = "ney_mansur"
    time_signature: str = "4/4"

class NoteSegment(BaseModel):
    name: str
    comma: int
    frequency: float
    start: float
    duration: float
    confidence: float
    fingering: Optional[Dict] = None

class TranscriptionResponse(BaseModel):
    metadata: Dict
    notes: List[NoteSegment]

# === AUDIO PROCESSING PIPELINE ===
class NeyTranscriptionPipeline:
    def __init__(self):
        self.demucs = None
        self.crepe_model = None
        
    def load_models(self):
        """Load ML models (call once at startup)"""
        if self.demucs is None:
            self.demucs = load_model('htdemucs')
        if self.crepe_model is None:
            self.crepe_model = crepe.CREPE("full")
    
    def download_audio(self, youtube_url: str) -> str:
        """Download audio from YouTube using yt-dlp"""
        temp_dir = tempfile.mkdtemp()
        output_path = os.path.join(temp_dir, "audio.wav")
        
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'wav',
                'preferredquality': '192',
            }],
            'outtmpl': output_path.replace('.wav', ''),
            'quiet': True,
            'no_warnings': True
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.extract_info(youtube_url, download=True)
        
        return output_path
    
    def separate_sources(self, audio_path: str) -> np.ndarray:
        """Separate lead instrument from mix using Demucs"""
        wav, sr = librosa.load(audio_path, sr=44100, mono=False)
        
        if isinstance(wav, np.ndarray) and wav.ndim == 1:
            wav = wav.reshape(1, -1)
        
        with torch.no_grad():
            sources = self.demucs(wav if isinstance(wav, torch.Tensor) else torch.from_numpy(wav).unsqueeze(0))
        
        # sources: [vocals, drums, bass, other]
        # For ney, use vocals + other mix
        if sources.dim() == 3:
            lead_mix = sources[0, 0].cpu().numpy()  # vocals
        else:
            lead_mix = sources.cpu().numpy()[0] if isinstance(sources, torch.Tensor) else sources[0]
        
        return lead_mix, 44100
    
    def detect_pitch(self, audio: np.ndarray, sr: int) -> List[tuple]:
        """Detect pitch using CREPE (CNN-based)"""
        if sr != 16000:
            audio = librosa.resample(audio, orig_sr=sr, target_sr=16000)
        
        pitch, confidence = self.crepe_model.predict(
            audio,
            sr=16000,
            viterbi=True,
            center='window',
            pad=True
        )
        
        timestamps = np.arange(len(pitch)) * 0.010  # 10ms hop
        return list(zip(pitch, confidence, timestamps))
    
    def quantize_to_53tet(self, freq: float) -> tuple:
        """Quantize frequency to 53-TET system"""
        if freq < 50:
            return -1, "REST"
        
        # Find nearest comma
        comma_idx = np.argmin([abs(freq - f) for f in COMMA_FREQS])
        comma_num = comma_idx - 53
        
        perde_name = PERDE_NAMES.get(comma_num % 53, f"Perde-{comma_num}")
        return comma_num, perde_name
    
    def hmm_clean_sequence(self, pitch_data: List[tuple]) -> List[Dict]:
        """
        Hidden Markov Model for note sequence cleaning
        Removes spurious note jumps and smooths vibrato
        """
        notes = []
        current_note = None
        pitch_history = []
        
        for freq, conf, ts in pitch_data:
            if conf < 0.3:  # Low confidence → rest
                if current_note:
                    current_note['duration'] = ts - current_note['start']
                    if current_note['duration'] >= 0.1:
                        notes.append(current_note)
                    current_note = None
                continue
            
            comma_num, perde_name = self.quantize_to_53tet(freq)
            
            if current_note is None:
                current_note = {
                    'name': perde_name,
                    'comma': comma_num,
                    'frequency': freq,
                    'start': ts,
                    'duration': 0,
                    'confidence': conf
                }
                pitch_history = [freq]
            else:
                # HMM transition probability: same note likely continues
                if abs(comma_num - current_note['comma']) <= 2:
                    pitch_history.append(freq)
                    current_note['frequency'] = np.mean(pitch_history)
                else:
                    # New note
                    current_note['duration'] = ts - current_note['start']
                    if current_note['duration'] >= 0.1:
                        notes.append(current_note)
                    current_note = {
                        'name': perde_name,
                        'comma': comma_num,
                        'frequency': freq,
                        'start': ts,
                        'duration': 0,
                        'confidence': conf
                    }
                    pitch_history = [freq]
        
        return notes
    
    def map_to_instrument(self, notes: List[Dict], instrument: str) -> List[Dict]:
        """Map notes to instrument fingering"""
        # Ney fingering database
        ney_fingerings = {
            'Rast': {'holes': [0,1,1,1,1,1,1], 'thumb': 1, 'octave': 1},
            'Dügâh': {'holes': [0,0,1,1,1,1,1], 'thumb': 1, 'octave': 1},
            'Segâh': {'holes': [0,0,0,1,1,1,1], 'thumb': 1, 'octave': 1},
            'Çargâh': {'holes': [0,0,0,0,1,1,1], 'thumb': 1, 'octave': 1},
            'Nevâ': {'holes': [0,0,0,0,0,1,1], 'thumb': 1, 'octave': 1},
            'Hüseyni': {'holes': [0,0,0,0,0,0,1], 'thumb': 1, 'octave': 1}
        }
        
        for note in notes:
            fingering = ney_fingerings.get(note['name'], {'holes': [1,1,1,1,1,1,1], 'thumb': 1})
            note['fingering'] = fingering
        
        return notes
    
    def transcribe(self, youtube_url: str, instrument: str = "ney_mansur") -> Dict:
        """Main transcription pipeline"""
        self.load_models()
        
        # 1. Download audio
        audio_path = self.download_audio(youtube_url)
        
        # 2. Source separation
        lead_audio, sr = self.separate_sources(audio_path)
        
        # 3. Pitch detection
        pitch_data = self.detect_pitch(lead_audio, sr)
        
        # 4. HMM cleaning
        notes = self.hmm_clean_sequence(pitch_data)
        
        # 5. Instrument mapping
        notes = self.map_to_instrument(notes, instrument)
        
        # 6. Cleanup
        os.remove(audio_path)
        
        return {
            "metadata": {
                "url": youtube_url,
                "instrument": instrument,
                "total_notes": len(notes),
                "duration": notes[-1]['start'] + notes[-1]['duration'] if notes else 0
            },
            "notes": notes
        }

# Global pipeline instance
pipeline = NeyTranscriptionPipeline()

@app.post("/transcribe", response_model=TranscriptionResponse)
async def transcribe(request: TranscriptionRequest):
    """Transcribe YouTube video to musical notation"""
    try:
        result = pipeline.transcribe(request.youtube_url, request.instrument)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "models_loaded": pipeline.demucs is not None}

@app.get("/53tet-table")
async def get_53tet_table():
    """Get full 53-TET frequency table"""
    table = []
    for n in range(-53, 54):
        freq = REF_FREQ * (2 ** (n / 53))
        perde = PERDE_NAMES.get(n % 53, f"Perde-{n}")
        table.append({"comma": n, "frequency": freq, "perde": perde})
    return {"table": table}

# Initialize on startup
@app.on_event("startup")
async def startup_event():
    pipeline.load_models()
    print("✅ Ney Mastery Transcription API started")
    print("🎵 Models loaded: Demucs, CREPE")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
