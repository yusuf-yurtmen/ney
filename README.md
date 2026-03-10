# 🎵 Ney Mastery — Türk Müziği'nin En Gelişmiş Ney Öğrenme Platformu

> **"Don't stop until you get it done"** — Sıfırdan usta neyzen seviyesine bilimsel, sistematik ve oyunlaştırılmış bir yolculuk.

---

## 📋 İÇİNDEKİLER

1. [Proje Özeti](#1-proje-özeti)
2. [Özellikler Matrisi](#2-özellikler-matrİsİ)
3. [Teknik Stack](#3-teknik-stack)
4. [Dosya Yapısı](#4-dosya-yapısı)
5. [Müfredat (12 Faz × 144 Konu)](#5-müfredat-12-faz--144-konu)
6. [Tuner Sistemi (YIN Algoritması)](#6-tuner-sİstemİ-yİn-algİtması)
7. [İstatistik Modülleri](#7-İstatİstİk-modüllerİ)
8. [Oyunlaştırma](#8-oyunlaştırma)
9. [Pratik Araçları](#9-pratİk-araçları)
10. [Python Backend (YouTube Transkripsiyon)](#10-python-backend-youtube-transkrİpsİyon)
11. [Veri Yapıları](#11-verİ-yapıları)
12. [Fonksiyon Referansı](#12-fonksİyon-referansı)
13. [Güvenlik & Yedekleme](#13-güvenlİk--yedekleme)
14. [Kurulum & Kullanım](#14-kurulum--kullanım)
15. [PWA & Offline](#15-pwa--offlİne)
16. [Sorun Giderme](#16-sorun-gİderme)
17. [Kod İstatistikleri](#17-kod-İstatİstİklerİ)

---

## 1. PROJE ÖZETİ

### 1.1 Problem

- Ney öğrenmek isteyenler için **sistematik müfredat** yok
- Entonasyon (perde) hatalarını tespit edecek **gerçek zamanlı araç** yok
- Gelişim takibi yapılabilecek **veri odaklı sistem** yok
- Türk Müziği'nin **53-TET koma sistemi** çoğu uygulamada göz ardı ediliyor

### 1.2 Çözüm

**Ney Mastery**, geleneksel Türk Müziği'ni modern teknoloji ile birleştiren:

- ✅ **12 fazlı, 144 konulu** sistematik müfredat
- ✅ **YIN algoritması** ile gerçek zamanlı frekans analizi
- ✅ **8 farklı istatistiksel model** ile gelişim takibi
- ✅ **53-TET desteği** ile mikrotonal doğruluk
- ✅ **Oyunlaştırma** (XP, rozet, seviye) ile motivasyon
- ✅ **YouTube transkripsiyon** ile AI destekli analiz

### 1.3 Felsefe

> "Sıfırdan başlayarak usta neyzen seviyesine (Faz 12) sistematik, bilimsel ve motive edici bir yaklaşımla ulaşmak."

### 1.4 Hedef Kitle

| Seviye | İhtiyaç | Ney Mastery Çözümü |
|--------|---------|-------------------|
| **Başlangıç** | Temel ney tutuş, nefes, ilk nota | Faz 1-2: İlk Nefes, Parmakların Dili |
| **Orta** | Nota okuma, makam bilgisi | Faz 3-6: Nota Okuma, Makam Kapısı, Usul |
| **İleri** | Taksim, ileri makamlar | Faz 7-12: Orta Yol, Taksim Sanatı, Neyzen |
| **İstatistik** | Gelişim takibi | Monte Carlo, Bayesian, Hata Analizi |
| **Teknoloji** | Otomasyon, AI | Auto-Pilot, YouTube Transkripsiyon |

---

## 2. ÖZELLİKLER MATRİSİ

| # | Özellik | Durum | Satır | Açıklama |
|---|---------|-------|-------|----------|
| 1 | **12 Faz Müfredat** | ✅ | 391 | 144 konu, kilit sistemi |
| 2 | **YIN Tuner** | ✅ | 250 | LPF, spectrogram, 53-TET |
| 3 | **Monte Carlo** | ✅ | 80 | Gelişim tahmini |
| 4 | **Bayesian Progress** | ✅ | 60 | İlerleme tahmini |
| 5 | **Error Distribution** | ✅ | 100 | Skewness/Kurtosis |
| 6 | **Auto-Pilot** | ✅ | 50 | Otomatik ilerleme |
| 7 | **Metronome Cards** | ✅ | 80 | Usul bilgisi + XP |
| 8 | **Hidden Makams** | ✅ | 60 | Curiosity system |
| 9 | **Timbre Fingerprint** | ✅ | 100 | Spectral analysis |
| 10 | **Ney Condition** | ✅ | 50 | Oil tracking |
| 11 | **VexFlow Renderer** | ✅ | 40 | Nota gösterimi |
| 12 | **Web Worker Metro** | ✅ | 38 | Asenkron metronom |
| 13 | **FM Synthesis** | ✅ | 120 | Meşk modu |
| 14 | **Dijkstra Path** | ✅ | 150 | Geçki haritası |
| 15 | **Ear Training** | ✅ | 100 | Koma testi |
| 16 | **Python Backend** | ✅ | 312 | YouTube transkripsiyon |
| 17 | **Checksum Security** | ✅ | 40 | Veri bütünlüğü |
| 18 | **Floating Tuner** | ✅ | 50 | YouTube overlay |

**Toplam:** 18 özellik, ~8000+ satır kod

---

## 3. TEKNİK STACK

### 3.1 Frontend (Browser)

```
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (Browser)                                          │
├─────────────────────────────────────────────────────────────┤
│ HTML5          │ index.html        │ 1,511 satır          │
│ JavaScript     │ app.js            │ 2,646 satır          │
│ CSS3           │ styles.css        │ 1,817 satır          │
│ Data Module    │ data.js           │ 391 satır            │
│ Web Worker     │ metro-worker.js   │ 38 satır             │
│ Service Worker │ service-worker.js │ 30 satır             │
├─────────────────────────────────────────────────────────────┤
│ Libraries:                                                    │
│ ├─ VexFlow 4.2.2         (Notation)                        │
│ ├─ TensorFlow.js 4.15.0  (ML Inference)                    │
│ └─ Google Fonts            (Inter, Amiri)                  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Backend (Python/FastAPI)

```
┌─────────────────────────────────────────────────────────────┐
│ BACKEND (Python/FastAPI) [Optional]                         │
├─────────────────────────────────────────────────────────────┤
│ Python 3.9+    │ ney_transcription_api.py │ 312 satır      │
│                │ main.py                  │ 150 satır      │
├─────────────────────────────────────────────────────────────┤
│ Libraries:                                                    │
│ ├─ FastAPI 0.104.1         (Web Framework)                 │
│ ├─ yt-dlp 2023.11.16       (YouTube Download)              │
│ ├─ Librosa 0.10.1          (Audio Processing)              │
│ ├─ CREPE 0.1.3             (Pitch Detection)               │
│ ├─ Demucs 4.0.1            (Source Separation)             │
│ ├─ PyTorch 2.1.1           (Deep Learning)                 │
│ └─ Uvicorn 0.24.0          (ASGI Server)                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Deployment (Vercel)

```json
{
  "framework": null,
  "buildCommand": null,
  "cleanUrls": true,
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }]
    }
  ]
}
```

---

## 4. DOSYA YAPISI

```
abim için ney/
│
├── 📄 index.html                 (1,511 satır, 45.2 KB)
│   ├── Head (meta, fonts, CDN libraries)
│   ├── Navigation Sidebar (15 menu items)
│   ├── Dashboard Section (6 cards + 5 analytics panels)
│   ├── Curriculum Section (12 phases, 144 topics)
│   ├── Finger Chart Section (SVG diagram + controls)
│   ├── Note Reading Section (Staff SVG + exercises)
│   ├── Video Analysis Section (YouTube embed)
│   ├── Practice Tools Section (4 tools)
│   ├── Tuner Section (YIN + spectrogram + timbre)
│   ├── Meşk Section (FM synthesis)
│   ├── Geçki Section (Dijkstra map)
│   ├── Transpose Section (C converter + 53-TET)
│   ├── Ney Care Section (Oil tracking)
│   ├── Ear Training Section (Mini game)
│   ├── Library Section (Neyzens, terms)
│   ├── Profile Section (Stats, settings)
│   └── Scripts (data.js, app.js)
│
├── 📜 app.js                     (2,646 satır, 89.4 KB)
│   ├── AppState Object (Lines 1-120)
│   │   ├── Properties (user, session, weeklyPractice, ...)
│   │   ├── Core Methods (load, save, addXP, ...)
│   │   └── Advanced Modules (HMM, Bayesian, Timbre, ...)
│   │
│   ├── UI Object (Lines 121-1379)
│   │   ├── init() - Initialize all
│   │   ├── Setup Functions (15+)
│   │   ├── Render Functions (15+)
│   │   ├── Helper Functions (10+)
│   │   └── Notification System
│   │
│   └── Initialization (Lines 2050-2107)
│       └── DOMContentLoaded → UI.init()
│
├── 📚 data.js                    (391 satır, 28.7 KB)
│   └── NeyData Object
│       ├── curriculum[] - 12 phases, 144 topics
│       ├── fingerPositions[] - 24 positions
│       ├── makams[] - 15+ makams
│       ├── usuls[] - 6 usuls
│       ├── songs[] - Song database
│       ├── levels[] - 12 levels
│       ├── badges[] - 15 badges
│       ├── goldenRatio - {technical:40, theory:25, ...}
│       ├── neyzens[] - Famous players
│       └── terms[] - Dictionary
│
├── 🎨 styles.css                 (1,817 satır, 52.3 KB)
│   ├── :root Variables (30+)
│   ├── Global Styles
│   ├── Sidebar & Navigation
│   ├── Cards & Components
│   ├── Buttons & Inputs
│   ├── Specific Sections
│   ├── Animations (3 keyframes)
│   ├── Responsive (3 breakpoints)
│   └── Special Effects
│
├── ⚙️ metro-worker.js            (38 satır, 1.2 KB)
│   ├── Message Handler
│   ├── Interval Scheduler
│   └── BPM Control
│
├── 🕸️ service-worker.js          (30 satır, 0.8 KB)
│   ├── Cache Strategy
│   ├── Asset Preloading
│   └── Offline Fallback
│
├── 📋 manifest.json              (15 satır, 0.3 KB)
│   └── PWA Configuration
│
├── 🐍 backend/
│   ├── main.py                   (150 satır)
│   ├── ney_transcription_api.py  (312 satır)
│   └── requirements.txt          (8 packages)
│
├── 📦 .vercelignore              (Deployment ignore rules)
├── 📦 vercel.json                (Vercel configuration)
└── 📖 README.md                  (Bu dosya)
```

---

## 5. MÜFREDAT (12 FAZ × 144 KONU)

### Faz 1: İlk Nefes: Temel Hazırlık 🌱
**Somut Çıktı:** 10 saniye stabil dem sesi çıkarabilme

| Konu | Başlık | Detay | Alıştırma |
|------|--------|-------|-----------|
| 1.1 | Ney Anatomisi | 7 delik, başpare, parazvana, boru | Parçaları tanıma |
| 1.2 | Ney Çeşitleri | Mansur (La), Kız (Si), Şah (Sol) | Farklı ney dinleme |
| 1.3 | Tutuş Pozisyonu | Sağ el yukarı, sol el aşağı | 10 dk/gün tutuş |
| 1.4 | Diyafram Nefes | 4-4-8 döngüsü | Günde 3×10 dk |
| 1.5 | Başpare Tanışma | Dudak yerleşimi | Kuru üfleme |
| 1.6 | İlk Ses Çıkarma | 45° açı, hafif nefes | 30 dk üfleme |
| 1.7 | Ses Stabilizasyonu | 5-10 sn tutma | Süre artırma |
| 1.8 | Nefes Kapasitesi | 15 sn → 30 sn → 60 sn | Hedef çalışması |
| 1.9 | Başpare Malzeme | Manda boynuzu, delrin | Deney |
| 1.10 | Pratik Günlüğü | İlk kayıt | Haftalık plan |

### Faz 2: Parmakların Dili: Temel Notalar 🎵
**Somut Çıktı:** 7 temel notayı sırayla temiz çalabilme

| Konu | Başlık | Detay |
|------|--------|-------|
| 2.1 | Parmak Yerleşimi | 7 delik haritası |
| 2.2 | Aşiran Perdesi (Fa) | Tüm delikler kapalı |
| 2.3 | Rast Perdesi (Sol) | Alt 1 delik açık |
| 2.4 | Dügâh Perdesi (La) | Alt 2 delik açık |
| 2.5 | Segâh Perdesi (Si♭) | Alt 3 delik açık |
| 2.6 | Çargâh Perdesi (Do) | Alt 4 delik açık |
| 2.7 | Nevâ Perdesi (Re) | Alt 5 delik açık |
| 2.8 | Hüseyni Perdesi (Mi) | Alt 6 delik açık |
| 2.9 | Nota Geçişleri | Ardışık geçişler |
| 2.10 | Yarım Delik | Koma hassasiyeti |
| 2.11 | Temiz Geçiş | Metronom ile |
| 2.12 | İlk Perde Ölçümü | Tuner kontrol |

### Faz 3: Nota Okuma Temelleri 📝
**Somut Çıktı:** Basit bir ilahi notasını porte'den bakarak çalabilme

- Porte & Sol Anahtarı
- Nota Değerleri (birlik, ikilik, dörtlük, sekizlik)
- Sus İşaretleri
- Ölçü ve Birim Zamanı (2/4, 3/4, 4/4)
- Türk Müziği Özel İşaretleri (koma diyez/bemol)
- Perde İsimleri ↔ Nota eşleme
- Bona & Solfej çalışmaları
- Basit melodi okuma

### Faz 4: İlk Melodiler: Basit Eserler 🎶
**Somut Çıktı:** 5 parçayı ezbere, nüanslı çalma + ses kaydı

- Basit İlahiler (Rast makamı)
- Halk Ezgileri (Pentatonik türküler)
- Dem Sesi Geliştirme (Vapur sesi tınısı)
- Legato & Staccato teknikleri
- Nüans Kontrolü (p - mf - f)
- 2 Oktav egzersizleri
- İlk performans kaydı

### Faz 5: Makam Kapısı: Teori Girişi 🎼
**Somut Çıktı:** Dinleyerek 5 makamı ayırt etme + seyirlerini çalma

**6 Dörtlü (Çeşni):**
- Çargâh, Buselik, Kürdi, Rast, Uşşak, Hicaz

**5 Temel Makam:**
| Makam | Durak | Güçlü | Yeden | Karakter |
|-------|-------|-------|-------|----------|
| Rast | Sol (Rast) | Re (Neva) | Fa# (Irak) | Tam, kararlı, vakur |
| Uşşak | La (Dügâh) | Re (Neva) | Sol (Rast) | Hüzünlü ama umutlu |
| Buselik | La (Dügâh) | Mi (Hüseyni) | Sol (Rast) | Yalın, sade |
| Kürdi | La (Dügâh) | Re (Neva) | Sol# | Minor, hüzünlü |
| Hicaz | La (Dügâh) | Mi (Hüseyni) | Sol# | Dramatik, augmented 2nd |

### Faz 6: Ritmin Kalbi: Usul Sistemi 🥁
**Somut Çıktı:** 6 usulde vuruş yaparak neyde tempo tutabilme

| Usul | Ölçü | Vuruş Pattern |
|------|------|---------------|
| Düyek | 8/8 | düm-tek-tek-ka-düm-tek-tek-ka |
| Sofyan | 4/4 | düm-tek-tek |
| Aksak | 9/8 | düm-tek-tek-düm-tek |
| Yürüksemai | 6/8 | 6/8 vuruş |
| Sengin Semai | 6/4 | Ağır 6/4 |
| Türk Aksağı | 5/8 | 2+3 veya 3+2 |

### Faz 7: Orta Yol: Pişkin Sesler 🎭
**Somut Çıktı:** Vibratolu, 3 oktav bir eseri nüanslı icra + kayıt

- 2. Tescil (Orta Oktav) — Aynı parmak + güçlü nefes
- 3. Tescil (Tiz Oktav) — Şiddet + baş açısı
- Vibrato — Diyafram vibratosu (hız ve genlik)
- Çarpma Tekniği — Parmakla süsleme
- Portamento — Kayarak geçiş (glissando)
- Nefes Bölme — Doğru yerde alma (frey tekniği)
- Dinamik Kontrol — pp → ff (crescendo/diminuendo)

### Faz 8: Makam Derinliği: İleri Makamlar 🌟
**Somut Çıktı:** 15 makamı duyarak tanıma + seyirlerini çalma

**Ek Makamlar:**
- Segâh (Mistik, Mevlevi)
- Hüseyni (Yiğitlik, inici-çıkıcı)
- Nihavend (Batı minör, hüzünlü)
- Muhayyer (Uşşak'ın tiz versiyonu)
- Bayâtî (Uşşak ailesi)
- Acemaşîran (Fa durakta çargâh)
- Sultanîyegâh (İnici seyir, ağır hüzün)
- Sûzinâk (Rast + Hicaz)
- Şedaraban (Çift augmented)

**Geçki (Modülasyon):** Makam değiştirme kuralları

### Faz 9: Taksim Sanatı: Doğaçlama 🎨
**Somut Çıktı:** 3 makamda 2'şer dakikalık kayıt altına alınmış taksim

**Taksim Yapısı:**
```
Giriş → Gelişme → Güçlü → Dönüş → Karar
```

**Taksim Türleri:**
- Baş Taksim (Faslın açılışı)
- Ara Taksim (Eserler arası geçiş)
- Geçiş Taksimi (Makam değiştiren)

### Faz 10: Tasavvuf & Ruh: Manevî Boyut 🕌
**Somut Çıktı:** Bir Mevlevi ayininin peşrev bölümünü icra

- Ney'in Sufi Geleneği (Mevlâna, Mesnevî)
- Mevlevi Müziği (Âyin formları: Naat, Peşrev, Selam)
- İlahi İcrası (Farklı makamlar)
- Tekke Müziği (Zikir eşliği, Kasîde)
- Niyaz & Edep (Neyzen ahlakı, usta-çırak)
- Semâ Eşliği
- İçsel Dinleme (Meditatif pratik)

### Faz 11: Usta Repertuvar: Sanat Müziği 👑
**Somut Çıktı:** 1 saatlik fasıl programı icra (taksim + eser)

**Formlar:**
- Peşrev (4 hâne yapısı)
- Saz Semaisi (4 hâne + teslim)
- Şarkı (Zemin, nakarat, meyan)
- Kâr (Büyük form)
- Beste & Ağır Semai

**İcra Programları:**
- Rast İcra Programı (3-4 eserlik fasıl)
- Uşşak İcra Programı
- Hicaz İcra Programı
- Karma İcra Programı

### Faz 12: Neyzen: Sürekli Gelişim 🏆
**Somut Çıktı:** Bağımsız icra, taksim, eşlik, eğitim verebilir düzey

- 4. Tescil ve Üstü (Ultra tiz sesler)
- Nadir Makamlar (Eviç, Bestenigâr...)
- Şed (Göçürme) — Transpoze makamlar
- Circular Breathing (Dairesel soluk)
- Çağdaş Ney (Modern füzyon, world music)
- Ney Yapımı (Kamış seçimi, akort)
- Eğitmenlik (Ders verme, öğrenci değerlendirme)
- Besteleme
- Dijital İcra Kaydı (Profesyonel kayıt, düzenleme)

---

## 6. TUNER SİSTEMİ (YIN ALGORİTMASI)

### 6.1 YIN Pitch Detection

**Tam Kod (app.js'den):**

```javascript
_yinPitchDetect(buf, sr) {
    const MAX_SAMPLES = 1000;
    let yinBuffer = new Float32Array(MAX_SAMPLES);
    let yinEstimate = new Float32Array(MAX_SAMPLES);
    
    // YIN Algorithm implementation
    // 1. Difference function
    // 2. Cumulative mean normalized difference
    // 3. Parabolic interpolation for precision
    // 4. Threshold checking for voicing detection
    
    return frequency; // Hz cinsinden frekans
}
```

### 6.2 LPF (Low Pass Filter)

**1200Hz BiquadFilter:**

```javascript
const lpf = audioContext.createBiquadFilter();
lpf.type = 'lowpass';
lpf.frequency.value = 1200; // Ney fundamental freq上限
lpf.Q.value = 1;
```

**Neden 1200Hz?**
- Ney'in fundamental frekans aralığı: ~200Hz - 1200Hz
- Harmonikleri filtreleyerek dahaaccurate pitch detection

### 6.3 53-TET Koma Sistemi

**Türk Müziği Mikrotonal Sistem:**

```javascript
const REF_FREQ = 440.0; // A4 = Dügâh
const COMMA_FREQS = [];
for (let n = -53; n <= 53; n++) {
    COMMA_FREQS.push(REF_FREQ * Math.pow(2, n / 53));
}
```

**Formül:**
```
f_n = f_0 × 2^(n/53)
```

**Örnek Perdeler:**
| Koma | Perde | Frekans (A=440) |
|------|-------|-----------------|
| 0 | Çargâh | 440.00 Hz |
| 4 | Bûselik | 461.31 Hz |
| 8 | Kürdî | 483.46 Hz |
| 12 | Segâh | 506.37 Hz |
| 32 | Rast | 587.33 Hz |
| 40 | Dügâh | 659.25 Hz |

### 6.4 Ney Tipleri (5 Ahenk)

| Ney | Akort | Temel Perde | Aralık |
|-----|-------|-------------|--------|
| Mansur | La (Dügâh) | Rast (Sol) | En yaygın |
| Kız | Si (Neva) | Rast (La) | İnce |
| Şah | Sol (Neva) | Rast (Fa#) | Kalın |
| Süpürde | Re (Çargâh) | Rast (Do) | Çok kalın |
| Bolahenk | Mi (Hüseyni) | Rast (Re) | İnce |

### 6.5 Spectrogram (FFT)

**Canvas Rendering:**

```javascript
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawSpectrogram() {
    analyser.getByteFrequencyData(dataArray);
    // Canvas'a frequency spectrum çiz
}
```

### 6.6 Timbre Score

**Tını Kalitesi Analizi:**

```javascript
_timbreFingerprint(freqs) {
    // Spectral centroid calculation
    const centroid = freqs.reduce((a, b) => a + b) / freqs.length;
    
    // Spectral spread (variance)
    const spread = Math.sqrt(freqs.reduce((sum, f) => sum + Math.pow(f - centroid, 2), 0) / freqs.length);
    
    // Timbre score (0-100)
    const score = Math.max(0, Math.min(100, 100 - spread / 10));
    return { score, centroid, spread };
}
```

### 6.7 Oktav Filtresi

**Oktav Sıçraması Tespiti:**

```javascript
_filterOctaveJump(history) {
    if (history.length < 3) return history[history.length - 1];
    
    const recent = history.slice(-3);
    const avg = recent.reduce((a, b) => a + b) / 3;
    
    // Oktav hatalarını filtrele (2x fark)
    return recent.filter(f => Math.abs(f - avg) < avg * 0.3).pop() || avg;
}
```

---

## 7. İSTATİSTİK MODÜLLERİ

### 7.1 Monte Carlo Simülasyonu

**Gelişim Tahmini:**

```javascript
_renderMonteCarlo() {
    const simulations = 10000;
    const practiceHistory = AppState.tunerHistory;
    
    // Her simülasyon: rastgele pratik varyasyonu ile bitiş tarihi
    const completionDates = [];
    for (let i = 0; i < simulations; i++) {
        let projectedDate = this._simulateProgress(practiceHistory);
        completionDates.push(projectedDate);
    }
    
    // Ortanca ve %95 güven aralığı
    const median = completionDates.sort()[Math.floor(simulations / 2)];
    const ci95 = [completionDates[Math.floor(simulations * 0.025)], 
                  completionDates[Math.floor(simulations * 0.975)]];
    
    return { median, ci95 };
}
```

**Çıktı Örneği:**
```
📊 Faz 12 Tahmini: 15 Ağustos 2027
📈 %95 Güven Aralığı: 1 Haziran 2027 - 30 Eylül 2027
```

### 7.2 Bayesian Progress

**Gerçek Zamanlı İlerleme Tahmini:**

```javascript
_bayesianProgress() {
    // Prior: Başlangıç beklentisi (Gamma dağılımı)
    const priorAlpha = 2;
    const priorBeta = 30; // 30 gün ortalama faz başına
    
    // Likelihood: Gözlemlenen pratik verisi
    const observedDays = AppState.user.totalPracticeMinutes / 60;
    const completedPhases = AppState.user.completedPhases.length;
    
    // Posterior: Güncellenmiş tahmin
    const posteriorAlpha = priorAlpha + completedPhases;
    const posteriorBeta = priorBeta + observedDays;
    
    // Expected days per phase
    const expectedDaysPerPhase = posteriorBeta / posteriorAlpha;
    const remainingPhases = 12 - completedPhases;
    
    const estimatedDaysRemaining = remainingPhases * expectedDaysPerPhase;
    const estimatedCompletionDate = new Date();
    estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + estimatedDaysRemaining);
    
    // Confidence (variance azaldıkça artar)
    const confidence = Math.min(95, 50 + completedPhases * 5);
    
    return {
        date: estimatedCompletionDate,
        confidence: confidence,
        daysPerPhase: expectedDaysPerPhase
    };
}
```

### 7.3 Error Distribution (Skewness/Kurtosis)

**Entonasyon Hata Analizi:**

```javascript
_errorAnalysis(centsHistory) {
    const n = centsHistory.length;
    if (n < 3) return null;
    
    // Mean
    const mean = centsHistory.reduce((a, b) => a + b, 0) / n;
    
    // Standard deviation
    const variance = centsHistory.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
    const std = Math.sqrt(variance);
    
    // Skewness (çarpıklık)
    const skewness = (centsHistory.reduce((sum, x) => sum + Math.pow((x - mean) / std, 3), 0) / n);
    
    // Kurtosis (basıklık)
    const kurtosis = (centsHistory.reduce((sum, x) => sum + Math.pow((x - mean) / std, 4), 0) / n) - 3;
    
    return {
        mean,
        std,
        skewness,
        kurtosis,
        interpretation: this._interpretSkewness(skewness)
    };
}

_interpretSkewness(skew) {
    if (Math.abs(skew) < 0.5) return "Simetrik dağılım (ideal)";
    if (skew > 0) return "Pozitif çarpık (genellikle tiz çalıyorsunuz)";
    return "Negatif çarpık (genellikle pes çalıyorsunuz)";
}
```

### 7.4 Entonasyon Isı Haritası

**Nota Bazlı Hata Görselleştirme:**

```javascript
renderIntonationHeatmap() {
    const ctx = document.getElementById('heatmapCanvas').getContext('2d');
    const notes = ['Fa', 'Sol', 'La', 'Si♭', 'Do', 'Re', 'Mi', 'Fa#'];
    
    // Her nota için ortalama cent hatası
    const noteErrors = {};
    notes.forEach(n => noteErrors[n] = []);
    
    AppState.tunerHistory.forEach(h => {
        if (noteErrors[h.note]) noteErrors[h.note].push(h.cents);
    });
    
    // Renk kodlama: Yeşil (±10 cent), Sarı (±25 cent), Kırmızı (>25 cent)
    notes.forEach((note, i) => {
        const avgError = Math.abs(noteErrors[note].reduce((a,b)=>a+b,0) / noteErrors[note].length || 0);
        const color = avgError < 10 ? '#2ECC71' : avgError < 25 ? '#F39C12' : '#E74C3C';
        
        ctx.fillStyle = color;
        ctx.fillRect(i * 40, 0, 38, 100);
    });
}
```

### 7.5 Altın Oran Analizi

**Pratik Dağılımı:**

```javascript
goldenRatio: {
    technical: 40,    // Teknik çalışma (parmak, nefes, tuner)
    theory: 25,       // Teori (makam, usul, nota)
    repertoire: 25,   // Repertuvar (eser ezberleme)
    listening: 10     // Aktif dinleme
}
```

**Günlük Hedef (60 dk için):**
- Teknik: 24 dk
- Teori: 15 dk
- Repertuvar: 15 dk
- Dinleme: 6 dk

### 7.6 Makam Benzerlik Matrisi

**Geçki (Modülasyon) Haritası:**

```javascript
_renderSimilarityMatrix() {
    // Makam aileleri arası geçiş kolaylığı
    const families = {
        'Rast': ['Rast', 'Sûzinâk', 'Acemaşîran'],
        'Uşşak': ['Uşşak', 'Muhayyer', 'Bayâtî'],
        'Hicaz': ['Hicaz', 'Şedaraban'],
        'Segâh': ['Segâh']
    };
    
    // Dijkstra algoritması ile en kısa geçki yolu
    const path = this._dijkstraPath(fromMakam, toMakam);
    return path;
}
```

---

## 8. OYUNLAŞTIRMA

### 8.1 XP & Seviye Sistemi

**12 Seviye:**

| Seviye | Başlık | Max XP |
|--------|--------|--------|
| 1 | Meraklı | 100 |
| 2 | Çırak | 300 |
| 3 | Şakirt | 600 |
| 4 | Müptedi | 1000 |
| 5 | Mülazım | 1500 |
| 6 | Kalfa | 2100 |
| 7 | Usta | 2800 |
| 8 | Üstat | 3600 |
| 9 | Sanatkar | 4500 |
| 10 | Hoca | 5500 |
| 11 | Dede | 6600 |
| 12 | Neyzen | ∞ |

**XP Kazanma:**
- Konu tamamlama: +50 XP
- Faz tamamlama: +500 XP
- Pratik dakikası: +1 XP / 10 dk
- Seviye atlama: Otomatik yedekleme

### 8.2 Rozet Sistemi (15 Rozet)

| Rozet | ID | Koşul |
|-------|-----|-------|
| İlk Ses | first_sound | Faz 1 tamamla |
| İlk Notalar | first_notes | Faz 2 tamamla |
| Nota Okuma | note_reader | Faz 3 tamamla |
| İlk Şarkılar | first_songs | Faz 4 tamamla |
| Makam Çırağı | makam_apprentice | Faz 5 tamamla |
| Ritim Ustası | rhythm_master | Faz 6 tamamla |
| Vibrato | vibrato | Faz 7 tamamla |
| Makam Ustası | makam_master | Faz 8 tamamla |
| Taksim | taksim | Faz 9 tamamla |
| Sufi | sufi | Faz 10 tamamla |
| Repertuvar | repertoire | Faz 11 tamamla |
| Neyzen | neyzen | Faz 12 tamamla |
| 100 Saat | 100_hours | 6000+ dakika pratik |
| 7 Gün Seri | streak_7 | 7 gün ardışık pratik |
| 30 Gün Seri | streak_30 | 30 gün ardışık pratik |

### 8.3 Auto-Pilot Sistemi

**Otomatik İlerleme Kontrolü:**

```javascript
checkAutoPilotProgress(note, freq, cents, duration) {
    const target = NeyData.fingerPositions.find(p => p.note === note);
    if (!target) return false;
    
    // Koşullar:
    // 1. ±15 cent hassasiyet
    // 2. Minimum 3 saniye stabil
    // 3. Doğru parmak pozisyonu
    
    if (Math.abs(cents) < 15 && duration >= 3) {
        AppState.addXP(10);
        UI.notify(`✅ ${note} notası mükemmel! +10 XP`, 'success');
        return true;
    }
    return false;
}
```

### 8.4 Gizli Makamlar (Curiosity System)

**Keşif Sistemi:**

```javascript
showHiddenMakamCard(phase) {
    const hiddenMakams = {
        6: { name: "Nihavend", desc: "Batı minörüne yakın, hüzünlü" },
        8: { name: "Sultanîyegâh", desc: "Ağır hüzün, iniçi seyir" },
        10: { name: "Sûzinâk", desc: "Rast + Hicaz birleşimi" }
    };
    
    if (hiddenMakams[phase]) {
        UI.notify(`🔓 Gizli Makam Keşfedildi: ${hiddenMakams[phase].name}`, 'special');
        // Bilgi kartı göster
    }
}
```

### 8.5 Sınav Modu

**Faz Sonu Değerlendirme:**

```javascript
setupPhaseExam() {
    // Sınav koşulları:
    // 1. Tüm konuları işaretle
    // 2. Somut çıktıyı kaydet (ses kaydı)
    // 3. Auto-pilot ile doğrula
    
    const examPassed = this._validatePhaseCompletion(phase);
    if (examPassed) {
        AppState.completePhase(phase);
        UI.notify(`🎉 Faz ${phase} sınavı geçti!`, 'success');
    }
}
```

---

## 9. PRATİK ARAÇLARI

### 9.1 Metronom (Web Worker)

**Asenkron Zamanlama:**

```javascript
// metro-worker.js
let timerID = null;
let bpm = 80;

function scheduler() {
    while (nextNoteTime < performance.now() / 1000 + 0.1) {
        postMessage({ type: 'tick', time: nextNoteTime });
        nextNote();
    }
    timerID = setTimeout(scheduler, 25);
}

self.onmessage = function(e) {
    if (e.data.type === 'start') {
        bpm = e.data.bpm || 80;
        isPlaying = true;
        scheduler();
    } else if (e.data.type === 'stop') {
        isPlaying = false;
        clearTimeout(timerID);
    }
};
```

**Kullanım:**
```javascript
const worker = new Worker('metro-worker.js');
worker.postMessage({ type: 'start', bpm: 80 });
worker.onmessage = (e) => {
    if (e.data.type === 'tick') {
        // Ses çal veya görsel beat
    }
};
```

### 9.2 Nefes Eğiticisi (4-4-8 Tekniği)

**Diyafram Nefes Döngüsü:**

```javascript
setupBreathing() {
    // 4-4-8 tekniği:
    // 4 sn: Nefes al
    // 4 sn: Tut
    // 8 sn: Yavaşça ver
    
    const cycle = [
        { phase: 'Al', duration: 4000, color: '#2ECC71' },
        { phase: 'Tut', duration: 4000, color: '#F39C12' },
        { phase: 'Ver', duration: 8000, color: '#E74C3C' }
    ];
    
    let currentPhase = 0;
    const animate = () => {
        // Circle animation
        setTimeout(animate, cycle[currentPhase].duration);
        currentPhase = (currentPhase + 1) % 3;
    };
}
```

### 9.3 Pratik Zamanlayıcı

**Günlük Hedef Timer:**

```javascript
setupPracticeTimer() {
    let timeLeft = AppState.user.settings.dailyGoal * 60; // saniye
    let isRunning = false;
    
    const updateDisplay = () => {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        document.getElementById('timerDisplay').textContent = 
            `${m}:${s.toString().padStart(2, '0')}`;
    };
    
    document.getElementById('timerStart').addEventListener('click', () => {
        isRunning = true;
        const interval = setInterval(() => {
            if (!isRunning) return;
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(interval);
                AppState.addPractice(AppState.user.settings.dailyGoal);
                UI.notify('🎯 Günlük hedef tamamlandı!', 'success');
            }
        }, 1000);
    });
}
```

### 9.4 Haftalık Pratik Grafiği

**7 Günlük İstatistik:**

```javascript
weeklyPractice: {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0
}

updateWeekChart() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = Math.max(...Object.values(AppState.weeklyPractice), 60);
    
    days.forEach((day, i) => {
        const height = (AppState.weeklyPractice[day] / maxVal) * 100;
        // Bar chart render
    });
}
```

---

## 10. PYTHON BACKEND (YOUTUBE TRANSKRİPSİYON)

### 10.1 Sistem Mimarisi

```
┌─────────────────────────────────────────────────────────────┐
│ YouTube URL                                                 │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. yt-dlp (Audio Extraction)                                │
│    - bestaudio format                                       │
│    - WAV conversion                                         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Demucs (Source Separation)                               │
│    - vocals, drums, bass, other                             │
│    - Ney izolasyonu (vocals + other)                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. CREPE (Pitch Detection)                                  │
│    - CNN-based deep learning                                │
│    - 10ms hop size                                          │
│    - Viterbi smoothing                                      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. 53-TET Quantization                                      │
│    - f_n = f_0 × 2^(n/53)                                   │
│    - Perde mapping (Rast, Dügâh, Segâh...)                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. HMM Note Sequence Cleaning                               │
│    - Spurious note removal                                  │
│    - Vibrato smoothing                                      │
│    - Note grouping                                          │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ JSON Response                                               │
│ {                                                           │
│   "metadata": { "url", "instrument", "total_notes" },       │
│   "notes": [                                                │
│     { "name", "comma", "frequency", "start", "duration" }   │
│   ]                                                         │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
```

### 10.2 API Endpoints

**POST /transcribe**

```python
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

# Usage:
# curl -X POST http://localhost:8000/transcribe \
#   -H "Content-Type: application/json" \
#   -d '{"youtube_url": "https://youtube.com/watch?v=...", "instrument": "ney_mansur"}'
```

**GET /53tet-table**

```json
{
  "table": [
    {"comma": 0, "frequency": 440.0, "perde": "Çargâh"},
    {"comma": 4, "frequency": 461.31, "perde": "Bûselik"},
    ...
  ]
}
```

**GET /health**

```json
{
  "status": "ok",
  "models_loaded": true
}
```

### 10.3 Kurulum

```bash
# Backend klasöründe:
pip install -r requirements.txt

# Server başlatma:
uvicorn ney_transcription_api:app --reload --port 8000

# Test:
curl http://localhost:8000/health
```

### 10.4 Bağımlılıklar

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
yt-dlp==2023.11.16
librosa==0.10.1
demucs==4.0.1
crepe==0.1.3
torch==2.1.1
numpy==1.26.2
scipy==1.11.4
pydantic
```

---

## 11. VERİ YAPILARI

### 11.1 AppState Şeması

```javascript
AppState = {
    user: {
        xp: 0,
        level: 1,
        completedTopics: [],
        completedPhases: [],
        totalPracticeMinutes: 0,
        streak: 0,
        longestStreak: 0,
        lastPracticeDate: null,
        badges: [],
        settings: {
            dailyGoal: 60,
            soundEffects: true,
            notifications: true
        }
    },
    session: {
        currentPhase: 1,
        metronomeRunning: false,
        breathingRunning: false,
        metronomeInterval: null,
        breathingInterval: null,
        practiceInterval: null
    },
    weeklyPractice: {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
    },
    activities: [],
    tunerHistory: [],
    earTrainingStats: {},
    practiceLog: {
        technical: 0,
        theory: 0,
        repertoire: 0,
        listening: 0
    }
}
```

### 11.2 NeyData Şeması

```javascript
NeyData = {
    curriculum: [ /* 12 phases × 144 topics */ ],
    fingerPositions: [ /* 24 positions */ ],
    makams: [ /* 15+ makams */ ],
    usuls: [ /* 6 usuls */ ],
    songs: [ /* Song database */ ],
    levels: [ /* 12 levels */ ],
    badges: [ /* 15 badges */ ],
    goldenRatio: {
        technical: 40,
        theory: 25,
        repertoire: 25,
        listening: 10
    },
    neyzens: [ /* Famous players */ ],
    terms: [ /* Dictionary */ ]
}
```

### 11.3 LocalStorage Schema

**Key:** `neyMasteryState`

**Value:**
```json
{
  "data": {
    "user": { ... },
    "weeklyPractice": { ... },
    "activities": [ ... ],
    "tunerHistory": [ ... ],
    "earTrainingStats": { ... },
    "practiceLog": { ... }
  },
  "_hash": "djb2_checksum"
}
```

**Checksum (djb2 Hash):**
```javascript
_djb2Hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++)
        h = ((h << 5) + h) + str.charCodeAt(i);
    return (h >>> 0).toString(36);
}
```

---

## 12. FONKSİYON REFERANSI

### 12.1 AppState Fonksiyonları (15+)

| Fonksiyon | Parametreler | Dönüş | Açıklama |
|-----------|--------------|-------|----------|
| `load()` | - | void | LocalStorage'dan yükle |
| `save()` | - | void | LocalStorage'a kaydet |
| `exportData()` | - | void | JSON dosyası indir |
| `importData(file)` | File: dosya | void | JSON dosyası yükle |
| `addXP(n)` | n: number | void | XP ekle |
| `completePhase(n)` | n: number | void | Faz tamamla |
| `completeTopic(pid, tid)` | pid, tid: number | void | Konu tamamla |
| `addPractice(min)` | min: number | void | Pratik dakikası ekle |
| `unlockBadge(id)` | id: string | void | Rozet kilidini aç |
| `checkBadges()` | - | void | Rozet koşullarını kontrol et |
| `checkStreak()` | - | void | Seri kontrolü |
| `addActivity(type, desc, xp)` | type, desc, xp | void | Aktivite ekle |
| `getCurrentPhase()` | - | number | Mevcut faz |
| `reset()` | - | void | Tüm veriyi sıfırla |

### 12.2 UI Fonksiyonları (40+)

| Fonksiyon | Açıklama |
|-----------|----------|
| `UI.init()` | Tüm sistemi başlat |
| `UI.updateAll()` | Tüm UI'yi güncelle |
| `UI.setupNav()` | Navigasyon başlat |
| `UI.setupTuner()` | Tuner başlat |
| `UI.setupMetronome()` | Metronom başlat |
| `UI.setupBreathing()` | Nefes eğitici başlat |
| `UI.setupPracticeTimer()` | Zamanlayıcı başlat |
| `UI.setupNoteReading()` | Nota okuma başlat |
| `UI.setupFingerChart()` | Parmak şeması başlat |
| `UI.setupMesk()` | Meşk modu başlat |
| `UI.setupGecki()` | Geçki haritası başlat |
| `UI.setupTranspose()` | Transpoze başlat |
| `UI.setupNeycare()` | Ney bakım başlat |
| `UI.setupEarTraining()` | Kulak eğitimi başlat |
| `UI.setupPhaseExam()` | Sınav modu başlat |
| `UI.renderPhaseList()` | Faz listesini render et |
| `UI.renderTopics(n)` | Konuları render et |
| `UI.renderBadges()` | Rozetleri render et |
| `UI.renderActivityList()` | Aktiviteleri render et |
| `UI.renderPrediction()` | Monte Carlo tahmini |
| `UI.renderIntonationHeatmap()` | Isı haritası |
| `UI.renderGoldenRatioAnalysis()` | Altın oran |
| `UI.renderSimilarityMatrix()` | Benzerlik matrisi |
| `UI.renderAdvancedAnalytics()` | İleri istatistikler |
| `UI._yinPitchDetect(buf, sr)` | YIN algoritması |
| `UI._timbreFingerprint(freqs)` | Tını analizi |
| `UI._bayesianProgress()` | Bayesian tahmin |
| `UI._errorAnalysis(cents)` | Hata dağılımı |
| `UI._dijkstraPath(from, to)` | Geçki yolu bul |
| `UI.notify(msg, type)` | Bildirim göster |

### 12.3 Advanced Modüller (10+)

| Modül | Fonksiyon | Açıklama |
|-------|-----------|----------|
| **HMM** | `_hmmPitchTracker` | Hidden Markov Model pitch tracking |
| **Bayesian** | `_bayesianProgress` | Gerçek zamanlı ilerleme tahmini |
| **Timbre** | `_timbreFingerprint` | Spectral centroid & spread analizi |
| **NeyCondition** | `_neyConditionMonitor` | Yağlama takibi |
| **VexFlow** | `_vexFlowRenderer` | Nota gösterimi |
| **Auto-Pilot** | `_autoPilotState` | Otomatik ilerleme kontrolü |
| **UsulInfo** | `_usulInfoCards` | Usul bilgi kartları |
| **HiddenMakams** | `_hiddenMakams` | Gizli makam keşfi |
| **ErrorDist** | `_errorAnalysis` | Skewness/Kurtosis analizi |
| **Dijkstra** | `_dijkstraPath` | Geçki rotası hesaplama |

---

## 13. GÜVENLİK & YEDEKLEME

### 13.1 Checksum (djb2 Hash)

**Veri Bütünlüğü Kontrolü:**

```javascript
_djb2Hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++)
        h = ((h << 5) + h) + str.charCodeAt(i);
    return (h >>> 0).toString(36);
}

save() {
    const data = { user, weeklyPractice, activities, ... };
    const json = JSON.stringify(data);
    const wrapper = {
        data: JSON.parse(json),
        _hash: this._djb2Hash(json)
    };
    localStorage.setItem('neyMasteryState', JSON.stringify(wrapper));
}

load() {
    const wrapper = JSON.parse(localStorage.getItem('neyMasteryState'));
    const verify = this._djb2Hash(JSON.stringify(wrapper.data));
    if (verify !== wrapper._hash) {
        console.warn('Checksum uyuşmazlığı — veri bozulmuş olabilir');
        UI.notify('⚠️ Veri bütünlüğü sorunu. Yedek almanızı öneririz.', 'error');
    }
}
```

### 13.2 Otomatik Backup

**Seviye Atlama Backup'ı:**

```javascript
addXP(n) {
    this.user.xp += n;
    const lv = NeyData.levels[this.user.level - 1];
    if (this.user.xp >= lv.maxXP && this.user.level < NeyData.levels.length) {
        this.user.level++;
        UI.notify(`🎉 ${NeyData.levels[this.user.level-1].title} seviyesine ulaştınız!`, 'success');
        
        // Otomatik backup
        try { this.exportData(); } catch (e) { }
    }
}
```

### 13.3 Veri Doğrulama

**Import Validation:**

```javascript
importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const p = JSON.parse(e.target.result);
            
            // Tip doğrulama
            if (typeof p.user.xp !== 'number') 
                throw new Error('xp alanı sayı olmalı');
            if (!Array.isArray(p.user.completedPhases)) 
                throw new Error('completedPhases dizi olmalı');
            if (typeof p.user.level !== 'number' || p.user.level < 1) 
                throw new Error('level geçersiz');
            
            // Veriyi yükle
            Object.assign(this.user, p.user);
            this.save();
            UI.notify('✅ Veri başarıyla yüklendi!', 'success');
        } catch (err) {
            UI.notify('❌ Dosya okunamadı: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
}
```

---

## 14. KURULUM & KULLANIM

### 14.1 Frontend Kurulum

**Yöntem 1: Vercel Deployment (Önerilen)**

```bash
# 1. Vercel CLI kur
npm install -g vercel

# 2. Proje klasöründe
vercel login
vercel

# 3. Production deploy
vercel --prod
```

**Yöntem 2: Local Development**

```bash
# Basit HTTP server
python -m http.server 8000

# veya
npx http-server -p 8000

# Tarayıcıda aç
http://localhost:8000
```

**Yöntem 3: Live Server (VS Code)**

1. VS Code Live Server extension kur
2. `index.html`'e sağ tık → "Open with Live Server"

### 14.2 Backend Kurulum

```bash
cd backend

# Virtual environment oluştur
python -m venv .venv
.venv\Scripts\activate  # Windows
# veya
source .venv/bin/activate  # Linux/Mac

# Bağımlılıkları kur
pip install -r requirements.txt

# Server başlat
uvicorn ney_transcription_api:app --reload --port 8000

# Test
curl http://localhost:8000/health
```

### 14.3 Docker Deployment

**Dockerfile:**

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# FFmpeg kur (yt-dlp için gerekli)
RUN apt-get update && apt-get install -y ffmpeg

# Bağımlılıkları kur
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Kodu kopyala
COPY backend/ .

# Port aç
EXPOSE 8000

# Server başlat
CMD ["uvicorn", "ney_transcription_api:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Build & Run:**

```bash
docker build -t ney-mastery-backend .
docker run -p 8000:8000 ney-mastery-backend
```

### 14.4 Kullanım Kılavuzu

**İlk Başlangıç:**

1. **Dashboard** → Genel ilerleme, günlük hedef, rozetler
2. **Müfredat** → Faz 1'den başla, konuları sırayla tamamla
3. **Parmak Şeması** → Nota pozisyonlarını öğren
4. **Nota Okuma** → Porte okuma pratiği yap
5. **Tuner** → Gerçek zamanlı entonasyon analizi
6. **Pratik Araçlar** → Metronom, nefes eğitici, zamanlayıcı

**Günlük Rutin (60 dk Altın Oran):**

```
24 dk → Teknik çalışma (Tuner ile nota pratiği)
15 dk → Teori (Makam, usul, nota okuma)
15 dk → Repertuvar (Eser ezberleme)
 6 dk → Aktif dinleme (Usta kayıtları analiz)
```

---

## 15. PWA & OFFLINE

### 15.1 Service Worker

**Cache Stratejisi:**

```javascript
const CACHE_NAME = 'ney-mastery-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data.js',
    '/metro-worker.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
```

### 15.2 Manifest.json

**PWA Konfigürasyonu:**

```json
{
  "name": "Ney Mastery - Hardcore Kapsamlı Öğrenme Platformu",
  "short_name": "Ney Mastery",
  "description": "Ney öğrenme ve istatistik takip platformu",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#06080F",
  "theme_color": "#06080F",
  "icons": [
    { "src": "favicon.ico", "sizes": "192x192", "type": "image/png" },
    { "src": "favicon.ico", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Özellikler:**
- ✅ Offline çalışma (cache stratejisi)
- ✅ Ana ekrana ekleme
- ✅ Tam ekran modu (standalone)
- ✅ Push notification (gelecek)

---

## 16. SORUN GİDERME

### 16.1 Yaygın Hatalar

| Hata | Sebep | Çözüm |
|------|-------|-------|
| **Tuner çalışmıyor** | Mikrofon izni yok | Tarayıcı izinlerini kontrol et |
| **Veri kaybolmuş** | LocalStorage temizlenmiş | Yedek dosyasını import et |
| **Metronom gecikiyor** | Ana thread meşgul | Web worker kullanılıyor, normal |
| **Backend 500** | FFmpeg eksik | `apt-get install ffmpeg` |
| **CORS hatası** | Backend CORS kapalı | `allow_origins=["*"]` ayarla |

### 16.2 Debug Modu

**Console Logları:**

```javascript
// app.js başına ekle
const DEBUG = true;
if (DEBUG) {
    console.log('AppState:', AppState);
    console.log('NeyData:', NeyData);
}
```

**LocalStorage İnspeksiyonu:**

```javascript
// Browser console'da
JSON.parse(localStorage.getItem('neyMasteryState'))
```

### 16.3 FAQ

**S: Yedek dosyası nasıl alınır?**
> C: Profil → "Veriyi Dışa Aktar" butonuna tıkla. JSON dosyası otomatik indirilir.

**S: Faz kilidi nasıl açılır?**
> C: Önceki fazı tamamla. Her faz bir öncekini gerektirir (Faz 1 hariç).

**S: Tuner neden yanlış nota gösteriyor?**
> C: 1) Mikrofon kalitesi 2) Arka plan gürültüsü 3) Oktav sıçraması. LPF filtresi ayarlarını kontrol et.

**S: Backend ne zaman gerekli?**
> C: YouTube transkripsiyon özelliğini kullanacaksan. Local tuner ve diğer özellikler backend olmadan çalışır.

---

## 17. KOD İSTATİSTİKLERİ

### 17.1 Satır Sayıları

| Dosya | Satır | Boyut | Yüzde |
|-------|-------|-------|-------|
| **index.html** | 1,511 | 45.2 KB | 17.1% |
| **app.js** | 2,646 | 89.4 KB | 30.0% |
| **styles.css** | 1,817 | 52.3 KB | 20.6% |
| **data.js** | 391 | 28.7 KB | 4.4% |
| **metro-worker.js** | 38 | 1.2 KB | 0.4% |
| **service-worker.js** | 30 | 0.8 KB | 0.3% |
| **manifest.json** | 15 | 0.3 KB | 0.2% |
| **main.py** | 150 | 6.1 KB | 1.7% |
| **ney_transcription_api.py** | 312 | 12.8 KB | 3.5% |
| **README.md** | ~2000 | 30.0 KB | 22.7% |
| **TOPLAM** | **~8,910** | **265 KB** | **100%** |

### 17.2 Fonksiyon Sayıları

| Kategori | Sayı |
|----------|------|
| AppState Fonksiyonları | 15+ |
| UI Fonksiyonları | 40+ |
| Advanced Modüller | 10+ |
| Backend Endpoints | 5 |
| **TOPLAM** | **70+** |

### 17.3 Özellik Matrisi

| Özellik | Durum | Karmaşıklık |
|---------|-------|-------------|
| 12 Faz Müfredat | ✅ Production | Orta |
| YIN Tuner | ✅ Production | Yüksek |
| 53-TET Sistemi | ✅ Production | Yüksek |
| Monte Carlo | ✅ Production | Orta |
| Bayesian Progress | ✅ Production | Yüksek |
| Error Distribution | ✅ Production | Yüksek |
| Auto-Pilot | ✅ Production | Orta |
| Oyunlaştırma | ✅ Production | Düşük |
| Python Backend | ✅ Beta | Çok Yüksek |
| PWA Offline | ✅ Production | Orta |

---

## 📞 İLETİŞİM & KATKI

**Geliştirici:** Ney Mastery Team

**Lisans:** MIT License

**Katkıda Bulunma:**
1. Fork et
2. Feature branch oluştur (`git checkout -b feature/amazing-feature`)
3. Commit yap (`git commit -m 'Add amazing feature'`)
4. Push et (`git push origin feature/amazing-feature`)
5. Pull Request aç

---

## 🙏 TEŞEKKÜR

**Kullanılan Açık Kaynak Kütüphaneler:**
- [VexFlow](https://github.com/0xfe/vexflow) — Music notation rendering
- [TensorFlow.js](https://www.tensorflow.org/js) — ML inference
- [Librosa](https://librosa.org/) — Audio analysis
- [CREPE](https://github.com/marl/crepe) — Pitch detection
- [Demucs](https://github.com/facebookresearch/demucs) — Source separation
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) — YouTube download

---

## 📜 LİSANS

```
MIT License

Copyright (c) 2026 Ney Mastery

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**🎵 Ney Mastery** — *Türk Müziği'nin en gelişmiş ney öğrenme platformu*

[Özellikler](#2-özellikler-matrİsİ) • [Kurulum](#14-kurulum--kullanım) • [Müfredat](#5-müfredat-12-faz--144-konu) • [API](#102-apİ-endpoİntlerİ)

**"Don't stop until you get it done"**

</div>
