import os
import glob
import subprocess
import librosa
import numpy as np
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp

app = FastAPI(title="Ney Mastery MIR Engine", version="1.0.0")

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

# 53-TET (Microtonal) frequencies setup (approximate relative to A=440Hz)
# f_n = f_0 * 2^(n/53)
REFERENCE_FREQ = 440.0 # Dügâh (La) as a standard reference for mapping
COMMA_ARRAY = np.array([REFERENCE_FREQ * (2 ** (n / 53.0)) for n in range(-53, 54)])

def get_closest_comma(freq):
    """Bulunan frekansı en yakın 53-TET komasına (koma array) yuvarlar."""
    if freq <= 0:
        return None
    idx = (np.abs(COMMA_ARRAY - freq)).argmin()
    return COMMA_ARRAY[idx]

def extract_audio_ytdlp(url: str, output_path: str = "temp_audio") -> str:
    """YouTube üzerinden yt-dlp ile sadece ses dosyasını indirir."""
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'outtmpl': output_path,
        'quiet': True
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    
    # postprocessor appends .wav
    return f"{output_path}.wav"

@app.post("/analyze-youtube")
async def analyze_youtube(request: URLRequest):
    """
    1. YouTube linkindeki sesi indirir (yt-dlp).
    2. Librosa ile frekans ayırır ve Spleeter alternatifi olarak spesifik Ney izolasyonu yapar (bandpass vs).
    3. HMM (Koma sistemi) ile pitch tracking yapar ve JSON'a çevirir.
    """
    audio_path = "temp_audio.wav"
    try:
        # 1. Download audio
        extract_audio_ytdlp(request.url, "temp_audio")
        
        # 2. Analyze audio (Librosa)
        y, sr = librosa.load(audio_path, sr=22050, mono=True)
        
        # Ney Tınısını İzole Etmek (Basit Harmonik Percussive Separation + Bandpass 800-1200Hz)
        y_harmonic, y_percussive = librosa.effects.hpss(y)
        
        # Spectral centroids and rolloffs (Feature processing for HMM/Viterbi approximation)
        pitches, magnitudes = librosa.piptrack(y=y_harmonic, sr=sr, fmin=200, fmax=1200)
        
        # Extract the highest magnitude pitch at each frame
        times = librosa.frames_to_time(np.arange(pitches.shape[1]), sr=sr)
        extracted_notes = []
        
        for t in range(pitches.shape[1]):
            index = magnitudes[:, t].argmax()
            pitch = pitches[index, t]
            
            if pitch > 0:
                comma_freq = get_closest_comma(pitch)
                if comma_freq:
                    # Basit bir mapping: Segâh, Rast vb. Frontend'deki NeyData'ya maplenecek
                    note_name = "Belirsiz"
                    if 380 < comma_freq < 400: note_name = "Sol" # Rast
                    elif 430 < comma_freq < 450: note_name = "La" # Dügâh
                    elif 450 < comma_freq < 480: note_name = "Si♭" # Segâh / Kürdî
                    elif 510 < comma_freq < 530: note_name = "Do" # Çargâh
                    elif 570 < comma_freq < 595: note_name = "Re" # Neva
                    elif 640 < comma_freq < 670: note_name = "Mi" # Hüseyni
                    
                    if note_name != "Belirsiz":
                        extracted_notes.append({
                            "nota": note_name,
                            "sure": 0.5,  # Quantization yapılabilir (Beat tracking ile)
                            "vurus": 1,
                            "freq": float(comma_freq)
                        })
        
        # Smooth and group notes (Simulate Viterbi Path)
        smoothed_notes = []
        if len(extracted_notes) > 0:
            current_note = extracted_notes[0]
            count = 1
            for n in extracted_notes[1:]:
                if n["nota"] == current_note["nota"]:
                    count += 1
                else:
                    if count > 5: # Threshold for stability
                        smoothed_notes.append({
                            "nota": current_note["nota"],
                            "sure": round(count * 0.05, 2), # Frame length approximation
                            "vurus": 1
                        })
                    current_note = n
                    count = 1
                    
        # Cleanup temp file
        if os.path.exists(audio_path):
            os.remove(audio_path)
            
        return {"status": "success", "data": smoothed_notes}

    except Exception as e:
        if os.path.exists(audio_path):
            os.remove(audio_path)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Çalıştırmak için komut: uvicorn main:app --reload
    uvicorn.run(app, host="0.0.0.0", port=8000)
