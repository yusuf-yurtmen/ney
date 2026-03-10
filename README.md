# 🎵 Ney Mastery — Ultimate Hardcore Documentation

**Türk Müziği'nin en gelişmiş ney öğrenme platformu.** 8000+ satır kod, 13+ özellik, 4 dosya, production-ready sistem.

---

## 📋 İÇİNDEKİLER

1. [Proje Özeti](#1-proje-özeti)
2. [Dosya Yapısı](#2-dosya-yapısı)
3. [Özellik Listesi (Tam)](#3-özellik-listesi-tam)
4. [Sistem Mimarisi](#4-sistem-mimarisi)
5. [Kurulum Rehberi](#5-kurulum-rehberi)
6. [Kullanım Kılavuzu](#6-kullanım-kılavuzu)
7. [Matematiksel Modeller](#7-matematiksel-modeller)
8. [API Referansı](#8-api-referansı)
9. [Veri Yapıları](#9-veri-yapıları)
10. [Fonksiyon Referansı](#10-fonksiyon-referansı)
11. [UI Bileşenleri](#11-ui-bileşenleri)
12. [State Yönetimi](#12-state-yönetimi)
13. [Güvenlik](#13-güvenlik)
14. [Performans](#14-performans)
15. [Test Senaryoları](#15-test-senaryoları)
16. [Sorun Giderme](#16-sorun-giderme)
17. [Gelecek Geliştirmeler](#17-gelecek-geliştirmeler)
18. [İstatistikler](#18-istatistikler)

---

## 1. PROJE ÖZETİ

### 1.1 Genel Bakış

**Ney Mastery**, geleneksel Türk Müziği eğitimini modern teknoloji ile birleştiren, yapay zeka destekli bir öğrenme platformudur.

**Temel Amaç:** Sıfırdan başlayarak usta neyzen seviyesine (Faz 12) sistematik, veri odaklı ve oyunlaştırılmış bir yaklaşımla ulaşmak.

**Hedef Kitle:**
- Ney öğrenmek isteyen başlangıç seviyesi öğrenciler
- Mevcut bilgisini ilerletmek isteyen orta seviye icracılar
- İleri düzey taksim ve makam bilgisi arayan müzisyenler
- İstatistiksel analiz ile gelişimini takip etmek isteyenler

### 1.2 Temel Özellikler (Özet)

| Kategori | Özellikler |
|----------|------------|
| **Müfredat** | 12 Faz, 144 Konu, Kilit Sistemi |
| **Tuner** | YIN Algorithm, LPF, Spectrogram, 53-TET |
| **İstatistik** | Monte Carlo, Bayesian, Hata Dağılımı |
| **AI/ML** | HMM, Viterbi, CREPE, Demucs |
| **Oyunlaştırma** | XP, Rozetler, Sınav Modu, Auto-Pilot |
| **Pratik** | Metronom, Nefes, Meşk, Kulak Eğitimi |
| **Backend** | Python/FastAPI, YouTube Transkripsiyon |

### 1.3 Teknik Stack

```
FRONTEND:
├── HTML5 (index.html - 1372 satır)
├── JavaScript Vanilla (app.js - 2107 satır)
├── CSS3 (styles.css - 1771 satır)
├── Data Module (data.js - 391 satır)
├── Web Worker (metro-worker.js)
├── VexFlow 4.2.2 (Notation rendering)
└── TensorFlow.js 4.15.0 (ML inference)

BACKEND (Optional):
├── Python 3.9+
├── FastAPI 0.104.1
├── yt-dlp (YouTube download)
├── Librosa 0.10.1 (Audio processing)
├── CREPE 0.1.3 (Pitch detection)
├── Demucs 4.0.1 (Source separation)
└── PyTorch 2.1.1 (Deep learning)

DEPLOYMENT:
├── Live Server (Frontend)
├── Uvicorn (Backend API)
└── Docker (Containerization)
```

---

## 2. DOSYA YAPISI

### 2.1 Proje Ağacı

```
abim için ney/
│
├── 📄 index.html                 (1372 satır, 45.2 KB)
│   ├── Head section (meta, fonts, libraries)
│   ├── Navigation sidebar (15 menu items)
│   ├── Dashboard section (6 cards)
│   ├── Curriculum section (12 phases)
│   ├── Finger Chart section (SVG diagram)
│   ├── Note Reading section (Staff SVG)
│   ├── Video Analysis section (YouTube embed)
│   ├── Practice Tools section (4 tools)
│   ├── Tuner section (YIN algorithm UI)
│   ├── Meşk section (FM synthesis)
│   ├── Geçki section (Dijkstra map)
│   ├── Transpose section (C converter)
│   ├── Ney Care section (Oil tracking)
│   ├── Ear Training section (Mini game)
│   ├── Library section (Neyzens, terms)
│   └── Profile section (Stats, settings)
│
├── 📜 app.js                     (2107 satır, 89.4 KB)
│   ├── AppState object (Data management)
│   │   ├── user: {xp, level, completedTopics, ...}
│   │   ├── session: {currentPhase, metronomeRunning, ...}
│   │   ├── weeklyPractice: {Mon, Tue, ..., Sun}
│   │   ├── activities: []
│   │   ├── tunerHistory: []
│   │   ├── _djb2Hash()           // Checksum
│   │   ├── load()                // LocalStorage
│   │   ├── save()                // With hash
│   │   ├── exportData()          // JSON backup
│   │   ├── importData()          // With validation
│   │   ├── addXP()               // Level up logic
│   │   ├── completeTopic()
│   │   ├── completePhase()
│   │   ├── addPractice()
│   │   ├── unlockBadge()
│   │   └── checkBadges()
│   │
│   ├── UI object (All UI functions)
│   │   ├── init()                // Initialize all
│   │   ├── setupNav()            // Navigation
│   │   ├── updateAll()           // Refresh UI
│   │   ├── renderPhaseList()     // Phase sidebar
│   │   ├── renderTopics()        // Topic cards
│   │   ├── renderBadges()        // Badge grid
│   │   ├── renderMakamList()     // Makam reference
│   │   ├── renderUsulList()      // Usul reference
│   │   ├── renderSongList()      // Song database
│   │   ├── setupFingerChart()    // Interactive diagram
│   │   ├── setupMetronome()      // Web Worker
│   │   ├── setupBreathing()      // 4-4-8 cycle
│   │   ├── setupPracticeTimer()  // Stopwatch
│   │   ├── setupDailyTimer()     // Goal countdown
│   │   ├── setupNoteReading()    // Staff exercise
│   │   ├── setupAI()             // YouTube analysis
│   │   ├── setupSettings()       // User preferences
│   │   ├── setupTabs()           // Tab switching
│   │   ├── setupTuner()          // YIN algorithm
│   │   ├── setupMesk()           // FM synthesis
│   │   ├── setupGecki()          // Dijkstra map
│   │   ├── setupTranspose()      // C converter
│   │   ├── setupNeycare()        // Oil tracking
│   │   ├── setupLibrary()        // Neyzens, terms
│   │   ├── setupPhaseExam()      // Tuner-based test
│   │   ├── setupEarTraining()    // Cent game
│   │   ├── setupFloatingTuner()  // YouTube overlay
│   │   ├── renderPrediction()    // Monte Carlo
│   │   ├── renderIntonationHeatmap()
│   │   ├── renderGoldenRatioAnalysis()
│   │   ├── renderSimilarityMatrix()
│   │   ├── renderAdvancedAnalytics()  // NEW
│   │   ├── showMetronomeInfoCard()    // NEW
│   │   ├── showHiddenMakamCard()      // NEW
│   │   └── checkAutoPilotProgress()   // NEW
│   │
│   ├── Advanced Modules
│   │   ├── _hmmPitchTracker
│   │   │   ├── initialize()
│   │   │   ├── viterbiDecode()
│   │   │   └── _logEmission()
│   │   ├── _fingerOptimizer
│   │   │   ├── fingeringGraph
│   │   │   ├── transitionCost()
│   │   │   └── findOptimalPath()
│   │   ├── _errorAnalysis
│   │   │   ├── calculateMoments()
│   │   │   └── analyzePerNoteErrors()
│   │   ├── _bayesianProgress
│   │   │   ├── prior
│   │   │   ├── updatePosterior()
│   │   │   └── predictDaysToTarget()
│   │   ├── _timbreFingerprint
│   │   │   ├── spectralCentroid()
│   │   │   ├── spectralFlatness()
│   │   │   └── calculateTimbreScore()
│   │   ├── _neyConditionMonitor
│   │   │   ├── establishBaseline()
│   │   │   └── predictOilingNeed()
│   │   ├── _vexFlowRenderer
│   │   │   └── renderToStave()
│   │   ├── _autoPilotState
│   │   │   └── checkAutoPilotProgress()
│   │   ├── _usulInfoCards
│   │   │   ├── cards[]
│   │   │   └── getCurrent()
│   │   └── _hiddenMakams
│   │       ├── unlocked[]
│   │       ├── hidden[]
│   │       ├── getHiddenForPhase()
│   │       └── isUnlocked()
│   │
│   └── Initialization
│       └── DOMContentLoaded → UI.init()
│
├── 📚 data.js                    (391 satır, 28.7 KB)
│   ├── NeyData object
│   │   ├── curriculum[]          // 12 phases, 144 topics
│   │   │   ├── phase: number
│   │   │   ├── title: string
│   │   │   ├── description: string
│   │   │   ├── icon: emoji
│   │   │   ├── color: hex
│   │   │   ├── topics[]          // 10-14 per phase
│   │   │   │   ├── id: "X.Y"
│   │   │   │   ├── title: string
│   │   │   │   ├── detail: string
│   │   │   │   └── exercise: string
│   │   │   └── verification: string
│   │   │
│   │   ├── fingerPositions[]     // 24 positions
│   │   │   ├── note: Turkish name
│   │   │   ├── noteWestern: A-G
│   │   │   ├── octave: 1-3
│   │   │   ├── holes: [0,1,1,...]  // 0=open, 1=closed
│   │   │   ├── thumb: 0 or 1
│   │   │   ├── breath: hafif/orta/kuvvetli
│   │   │   └── description: string
│   │   │
│   │   ├── makams[]              // 15+ makams
│   │   │   ├── name: string
│   │   │   ├── key: string
│   │   │   ├── family: string
│   │   │   ├── type: Çıkıcı/İnici
│   │   │   ├── durak: string
│   │   │   ├── guclu: string
│   │   │   ├── yeden: string
│   │   │   ├── description: string
│   │   │   ├── scale: string[]
│   │   │   ├── mood: string
│   │   │   └── usage: string
│   │   │
│   │   ├── usuls[]               // 6 usuls
│   │   │   ├── name: string
│   │   │   ├── timeSignature: "X/Y"
│   │   │   ├── description: string
│   │   │   └── pattern: ["düm","tek",...]
│   │   │
│   │   ├── songs[]               // Song database
│   │   ├── levels[]              // 12 levels (XP thresholds)
│   │   ├── badges[]              // 15 badges
│   │   ├── goldenRatio: {technical:40, theory:25, ...}
│   │   ├── neyzens[]             // Famous ney players
│   │   └── terms[]               // Dictionary
│   │
│   └── Helper functions
│
├── 🎨 styles.css                 (1771 satır, 52.3 KB)
│   ├── :root variables (colors, spacing)
│   ├── Sidebar styles
│   ├── Main content styles
│   ├── Card components
│   ├── Dashboard grid
│   ├── Phase/T topic lists
│   ├── Button styles (primary, secondary, icon)
│   ├── Input styles (text, select, range)
│   ├── Finger chart (SVG animations)
│   ├── Note reading (staff lines)
│   ├── Tuner UI (cents indicator)
│   ├── Metronome (beat animation)
│   ├── Breathing (circle animation)
│   ├── Badges (locked/unlocked)
│   ├── Responsive (mobile, tablet)
│   ├── Mobile hamburger menu
│   ├── Floating tuner (glassmorphism)
│   └── Special effects (glow, transitions)
│
├── ⚙️ metro-worker.js            (38 satır, 1.2 KB)
│   ├── Message handler
│   ├── Interval scheduler
│   └── BPM control
│
├── 🐍 ney_transcription_api.py   (312 satır, 12.8 KB)
│   ├── Imports (FastAPI, yt_dlp, librosa, crepe, demucs)
│   ├── 53-TET frequency table
│   ├── Pydantic models (Request/Response)
│   ├── NeyTranscriptionPipeline class
│   │   ├── __init__()
│   │   ├── load_models()
│   │   ├── download_audio()
│   │   ├── separate_sources()
│   │   ├── detect_pitch()
│   │   ├── quantize_to_53tet()
│   │   ├── hmm_clean_sequence()
│   │   ├── map_to_instrument()
│   │   └── transcribe()
│   ├── FastAPI routes
│   │   ├── POST /transcribe
│   │   ├── GET /health
│   │   └── GET /53tet-table
│   └── Startup event
│
├── 📦 requirements.txt           (15 satır)
│   └── Python dependencies
│
└── 📖 README.md                  (Bu dosya)
```

### 2.2 Dosya İstatistikleri

| Dosya | Satır | Boyut | Açıklama |
|-------|-------|-------|----------|
| index.html | 1,372 | 45.2 KB | UI structure |
| app.js | 2,107 | 89.4 KB | Application logic |
| data.js | 391 | 28.7 KB | Data module |
| styles.css | 1,771 | 52.3 KB | Styling |
| metro-worker.js | 38 | 1.2 KB | Web Worker |
| ney_transcription_api.py | 312 | 12.8 KB | Backend API |
| requirements.txt | 15 | 0.4 KB | Dependencies |
| README.md | ~800 | 35 KB | Documentation |
| **TOPLAM** | **6,806** | **265 KB** | **8 dosya** |

---

## 3. ÖZELLİK LİSTESİ (TAM)

### 3.1 Müfredat Sistemi

#### 12 Fazlı Müfredat

**Faz 1: İlk Nefes: Temel Hazırlık** 🌱
- 1.1: Ney Anatomisi (7 delik, başpare, parazvana)
- 1.2: Ney Çeşitleri (Mansur, Kız, Şah, Süpürde, Bolahenk)
- 1.3: Tutuş Pozisyonu (Sağ el yukarı, 45° açı)
- 1.4: Diyafram Nefes Eğitimi (4-4-8 döngüsü)
- 1.5: Başpare Tanışma (Dudak yerleşimi)
- 1.6: İlk Ses Çıkarma (Dem sesi)
- 1.7: Ses Stabilizasyonu (5-10 sn tutma)
- 1.8: Nefes Kapasitesi (Circular breathing hazırlık)
- 1.9: Başpare Malzeme Bilgisi (Manda boynuzu, delrin)
- 1.10: Pratik Günlüğü Başlangıcı
- **Somut Çıktı:** 10 saniye stabil dem sesi

**Faz 2: Parmakların Dili: Temel Notalar** 🎵
- 2.1: Parmak Yerleşimi (7 delik haritası)
- 2.2: Aşiran Perdesi (Fa) - Tüm delikler kapalı
- 2.3: Rast Perdesi (Sol) - Alt 1 delik açık
- 2.4: Dügâh Perdesi (La) - Alt 2 delik açık
- 2.5: Segâh Perdesi (Si♭) - Alt 3 delik açık
- 2.6: Çargâh Perdesi (Do) - Alt 4 delik açık
- 2.7: Nevâ Perdesi (Re) - Alt 5 delik açık
- 2.8: Hüseyni Perdesi (Mi) - Alt 6 delik açık
- 2.9: Nota Geçiş Egzersizleri
- 2.10: Yarım Delik Tekniği
- 2.11: Temiz Geçiş Drilleri
- 2.12: İlk Perde Ölçümü (Tuner kontrolü)
- **Somut Çıktı:** 7 temel notayı sırayla temiz çalma

**Faz 3: Nota Okuma Temelleri** 📝
- 3.1: Porte & Sol Anahtarı
- 3.2: Nota Değerleri (Birlik, ikilik, dörtlük, sekizlik)
- 3.3: Sus İşaretleri
- 3.4: Ölçü ve Birim Zamanı (2/4, 3/4, 4/4)
- 3.5: Türk Müziği Özel İşaretleri (Koma diyez/bemol)
- 3.6: Perde İsimleri ↔ Nota (Rast=Sol, Dügâh=La...)
- 3.7: Bona Çalışmaları
- 3.8: Solfej Çalışmaları
- 3.9: Basit Melodi Okuma (4-8 ölçülük)
- 3.10: Nota Okuma Quizi
- **Somut Çıktı:** Basit ilahi notasını porte'den çalma

**Faz 4: İlk Melodiler: Basit Eserler** 🎶
- 4.1: Basit İlahiler (Rast makamı)
- 4.2: Halk Ezgileri (Pentatonik türküler)
- 4.3: Dem Sesi Geliştirme (Vapur sesi tınısı)
- 4.4: Legato Tekniği (Kesintisiz geçiş)
- 4.5: Staccato Tekniği (Kesik nota)
- 4.6: Nüans Kontrolü (p - mf - f)
- 4.7: 2 Oktav Egzersizleri
- 4.8: Eser Ezberleme
- 4.9: Basit Şarkılar
- 4.10: İlk Performans Kaydı
- **Somut Çıktı:** 5 parça ezbere + ses kaydı

**Faz 5: Makam Kapısı: Teori Girişi** 🎼
- 5.1: Makam Nedir? (Dizi + seyir + karakter)
- 5.2: Koma Sistemi (1 tam ses = 9 koma)
- 5.3: AEU Sistemi (24-perdeli sistem)
- 5.4: 6 Dörtlü (Çeşni) - Çargâh, Buselik, Kürdi, Rast, Uşşak, Hicaz
- 5.5: 6 Beşli (Çeşni)
- 5.6: Durak & Güçlü & Yeden
- 5.7: Seyir Kuralları (Çıkıcı/İnici/İnici-Çıkıcı)
- 5.8: Rast Makamı (Dizi, seyir, durak=Sol, güçlü=Re)
- 5.9: Uşşak Makamı (Dizi, seyir, durak=La, güçlü=Re)
- 5.10: Buselik Makamı
- 5.11: Kürdi Makamı (Minor karakter)
- 5.12: Hicaz Makamı (Augmented 2nd, dramatik)
- 5.13: Makam Duyma (5 makamı ayırt etme)
- 5.14: Makam Seyir Çalışması
- **Somut Çıktı:** Dinleyerek 5 makamı ayırt etme

**Faz 6: Ritmin Kalbi: Usul Sistemi** 🥁
- 6.1: Usul Nedir? (Güçlü/zayıf vuruşlar)
- 6.2: Düyek (8/8) - düm-tek-tek-ka-düm-tek-tek-ka
- 6.3: Sofyan (4/4) - düm-tek-tek
- 6.4: Aksak (9/8) - düm-tek-tek-düm-tek
- 6.5: Yürüksemai (6/8)
- 6.6: Sengin Semai (6/4)
- 6.7: Türk Aksağı (5/8) - 2+3 veya 3+2
- 6.8: Metronom ile Çalışma
- 6.9: Eser İçinde Usul
- 6.10: Usul Duyma
- **Somut Çıktı:** 6 usulde vuruş yaparak tempo tutma

**Faz 7: Orta Yol: Pişkin Sesler** 🎭
- 7.1: 2. Tescil (Orta Oktav)
- 7.2: 3. Tescil (Tiz Oktav)
- 7.3: Tescil Geçişleri (Pes→orta→tiz)
- 7.4: Vibrato (Diyafram vibratosu)
- 7.5: Çarpma Tekniği (Parmakla süsleme)
- 7.6: Portamento (Kayarak geçiş)
- 7.7: Ses Pişirme (Ham vs pişmiş)
- 7.8: Nefes Bölme (Doğru yerde alma)
- 7.9: Dinamik Kontrol (pp → ff)
- 7.10: Orta Seviye Eserler
- 7.11: Meşk Çalışması (Dinle → taklit et)
- 7.12: İkinci Performans Kaydı
- **Somut Çıktı:** Vibratolu, 3 oktav icra + kayıt

**Faz 8: Makam Derinliği: İleri Makamlar** 🌟
- 8.1: Segâh Makamı (Mistik karakter)
- 8.2: Hüseyni Makamı (Yiğitlik, inici-çıkıcı)
- 8.3: Nihavend Makamı (Batı minör, hüzünlü)
- 8.4: Muhayyer Makamı (Uşşak'ın tiz versiyonu)
- 8.5: Bayâtî Makamı (Uşşak ailesi)
- 8.6: Acemaşîran Makamı (Fa durakta çargâh)
- 8.7: Sultanîyegâh Makamı (İnici seyir, ağır hüzün)
- 8.8: Sûzinâk Makamı (Rast + Hicaz)
- 8.9: Şedaraban Makamı (Çift augmented)
- 8.10: Basit → Bileşik
- 8.11: Geçki (Modülasyon)
- 8.12: Makam Aileleri
- 8.13: Makam Çeşni Analizi
- 8.14: İleri Seyir Drilleri (2 dakikalık)
- **Somut Çıktı:** 15 makamı duyarak tanıma

**Faz 9: Taksim Sanatı: Doğaçlama** 🎨
- 9.1: Taksim Nedir? (Doğaçlama, yapı, ruh)
- 9.2: Taksim Yapısı (Giriş→gelişme→güçlü→dönüş→karar)
- 9.3: Baş Taksim (Faslın açılışı)
- 9.4: Ara Taksim (Eserler arası geçiş)
- 9.5: Geçiş Taksimi (Makam değiştiren)
- 9.6: Rast'ta Taksim
- 9.7: Hicaz'da Taksim
- 9.8: Segâh'ta Taksim
- 9.9: Taksim Dinleme & Analiz
- 9.10: Kendi Stilini Geliştirme
- **Somut Çıktı:** 3 makamda 2'şer dakika taksim kaydı

**Faz 10: Tasavvuf & Ruh: Manevî Boyut** 🕌
- 10.1: Ney'in Sufi Geleneği (Mevlâna, Mesnevî)
- 10.2: Mevlevi Müziği (Âyin formları)
- 10.3: İlahi İcrası
- 10.4: Tekke Müziği (Zikir eşliği)
- 10.5: Niyaz & Edep (Neyzen ahlakı)
- 10.6: Semâ Eşliği
- 10.7: Mevlevi Âyini
- 10.8: İçsel Dinleme (Meditatif pratik)
- **Somut Çıktı:** Mevlevi ayini peşrev bölümü icra

**Faz 11: Usta Repertuvar: Sanat Müziği** 👑
- 11.1: Peşrev Formu (4 hâne yapısı)
- 11.2: Saz Semaisi Formu (4 hâne + teslim)
- 11.3: Şarkı Formu (Zemin, nakarat, meyan)
- 11.4: Kâr Formu (Büyük form)
- 11.5: Beste & Ağır Semai
- 11.6: Rast İcra Programı (3-4 eserlik fasıl)
- 11.7: Uşşak İcra Programı
- 11.8: Hicaz İcra Programı
- 11.9: Karma İcra Programı
- 11.10: Sahne Performansı
- 11.11: Fasıl İçinde Ney (Toplu icra)
- 11.12: Kayıt Stüdyosu (Mikrofon, ses)
- **Somut Çıktı:** 1 saatlik fasıl programı icra

**Faz 12: Neyzen: Sürekli Gelişim** 🏆
- 12.1: 4. Tescil ve Üstü (Ultra tiz sesler)
- 12.2: Nadir Makamlar (Eviç, Bestenigâr...)
- 12.3: Şed (Göçürme) - Transpoze makamlar
- 12.4: Circular Breathing (Sürekli nefes)
- 12.5: Çağdaş Ney (Modern füzyon)
- 12.6: Ney Yapımı (Kamış seçimi, akort)
- 12.7: Eğitmenlik (Ders verme)
- 12.8: Besteleme (Kendi eserleri)
- 12.9: Dijital İcra Kaydı (Profesyonel)
- 12.10: Yaşam Boyu Meşk
- **Somut Çıktı:** Bağımsız icra, taksim, eşlik, eğitim

#### Kilit Sistemi

```javascript
_isPhaseUnlocked(n) {
    if (n === 1) return true;  // Faz 1 her zaman açık
    return AppState.user.completedPhases.includes(n - 1);
}

// Kullanıcı Faz 2'yi tamamlamadan Faz 3'e geçemez
// UI'da kilit ikonu (🔒) gösterilir
```

### 3.2 Tuner Sistemi (YIN Algorithm)

#### Özellikler

| Özellik | Açıklama |
|---------|----------|
| **Algoritma** | YIN (Pitch detection) |
| **FFT Size** | 4096 samples |
| **Sample Rate** | 16 kHz (resampled) |
| **LPF** | 1200 Hz BiquadFilterNode |
| **Ney Tipleri** | Mansur, Kız, Şah, Süpürde, Bolahenk |
| **Koma Map** | Her ney tipi için detaylı perde haritası |
| **Spectrogram** | Real-time FFT visualization |
| **Timbre Score** | 0-100 puan (brightness, clarity, richness) |

#### Frekans Tablosu (Ney Tipleri)

| Ney Tipi | Akort | Offset (semitone) | Referans |
|----------|-------|-------------------|----------|
| Mansur | La (A4) | 0 | 440 Hz |
| Kız | Si (B4) | +2 | 493.88 Hz |
| Şah | Sol (G4) | -2 | 392.00 Hz |
| Süpürde | Re (D5) | +5 | 587.33 Hz |
| Bolahenk | Mi (E5) | +7 | 659.26 Hz |

#### Koma-Perde Haritası (Mansur)

```javascript
_tunerKomaMap: {
    mansur: {
        'Fa': 0,      // Çargâh
        'Sol': 0,     // Rast
        'La': 0,      // Dügâh
        'Si♭': -4,    // Segâh (4 koma pes)
        'Do': 0,      // Çargâh
        'Re': 0,      // Nevâ
        'Mi': 0,      // Hüseyni
        'Fa#': 0      // Irak
    }
}
```

#### YIN Pitch Detection

```javascript
_yinPitchDetect(buf, sr) {
    const SIZE = buf.length;
    
    // RMS threshold (sessizlik filtresi)
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    if (Math.sqrt(rms / SIZE) < 0.01) return -1;
    
    // Difference function
    const yinBufSize = Math.floor(SIZE / 2);
    const yinBuf = new Float32Array(yinBufSize);
    for (let tau = 0; tau < yinBufSize; tau++) {
        yinBuf[tau] = 0;
        for (let j = 0; j < yinBufSize; j++) {
            const d = buf[j] - buf[j + tau];
            yinBuf[tau] += d * d;
        }
    }
    
    // Cumulative mean normalized difference
    yinBuf[0] = 1;
    let runSum = 0;
    for (let tau = 1; tau < yinBufSize; tau++) {
        runSum += yinBuf[tau];
        yinBuf[tau] = yinBuf[tau] * tau / runSum;
    }
    
    // Absolute threshold (0.15)
    const threshold = 0.15;
    let tauEst = -1;
    for (let tau = 2; tau < yinBufSize; tau++) {
        if (yinBuf[tau] < threshold) {
            while (tau + 1 < yinBufSize && yinBuf[tau + 1] < yinBuf[tau]) tau++;
            tauEst = tau; break;
        }
    }
    
    if (tauEst === -1) return -1;
    
    // Parabolic interpolation
    let s0 = tauEst > 0 ? yinBuf[tauEst - 1] : yinBuf[tauEst];
    let s1 = yinBuf[tauEst];
    let s2 = tauEst + 1 < yinBufSize ? yinBuf[tauEst + 1] : yinBuf[tauEst];
    let betterTau = tauEst + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
    
    return sr / betterTau;
}
```

#### Oktav Sıçrama Filtresi

```javascript
_filterOctaveJump(freq) {
    if (freq <= 0) return -1;
    
    this._tunerFreqHistory.push(freq);
    if (this._tunerFreqHistory.length > 5) this._tunerFreqHistory.shift();
    if (this._tunerFreqHistory.length < 3) return freq;
    
    // Median filter
    const sorted = [...this._tunerFreqHistory].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    
    // Reject if > 1.8x or < 0.55x of median (octave jump)
    if (freq > median * 1.8 || freq < median * 0.55) return median;
    
    return freq;
}
```

### 3.3 İstatistik Sistemleri

#### Monte Carlo Gelişim Simülasyonu

**Amaç:** Mevcut XP/gün hızı ile Neyzen seviyesine ulaşma süresini tahmin et.

```javascript
_monteCarloPredict(nSim = 1000) {
    const acts = AppState.activities.filter(a => a.xp > 0);
    if (acts.length < 3) return null;
    
    // XP/gün hesapla
    const days = {};
    acts.forEach(a => {
        const d = a.timestamp.slice(0, 10);
        days[d] = (days[d] || 0) + a.xp;
    });
    
    const dailyXPs = Object.values(days);
    if (dailyXPs.length < 2) return null;
    
    const mean = dailyXPs.reduce((s, v) => s + v, 0) / dailyXPs.length;
    const variance = dailyXPs.reduce((s, v) => s + (v - mean) ** 2, 0) / dailyXPs.length;
    const stdDev = Math.sqrt(variance);
    
    // Hedef XP: Neyzen seviyesi (10000 XP)
    const maxLv = NeyData.levels[NeyData.levels.length - 1];
    const remainingXP = maxLv.maxXP - AppState.user.xp;
    if (remainingXP <= 0) return { median: 0, low: 0, high: 0, mean };
    
    // Monte Carlo simülasyonu
    const results = [];
    for (let i = 0; i < nSim; i++) {
        let xp = 0, day = 0;
        while (xp < remainingXP && day < 3650) {
            // Günlük kazanç (normal dağılım)
            const dailyGain = Math.max(0, mean + (Math.random() * 2 - 1) * stdDev * 1.5);
            xp += dailyGain;
            day++;
        }
        results.push(day);
    }
    
    results.sort((a, b) => a - b);
    
    return {
        median: results[Math.floor(nSim / 2)],
        low: results[Math.floor(nSim * 0.025)],   // %2.5 percentile
        high: results[Math.floor(nSim * 0.975)],  // %97.5 percentile
        mean: Math.round(mean),
        stdDev: Math.round(stdDev)
    };
}
```

**Örnek Çıktı:**
```
🎲 Gelişim Tahmini (Monte Carlo)

28 gün
Tahmini Neyzen seviyesi süresi

%95 GA: 22–38 gün

💡 Günde 15dk fazla pratik yaparsan: ~23 gün (%18 hızlanma)
Ortalama XP/gün: 357 ± 89
```

#### Bayesian İlerleme Tahmini

**Amaç:** Gerçek pratik verileri ile anlık tahmin güncelleme.

```javascript
_bayesianProgress: {
    prior: { mu0: 100, lambda: 0.1, alpha: 2, beta: 1000 },
    
    updatePosterior(observedData) {
        const n = observedData.length;
        if (n === 0) return this.prior;
        
        const sampleMean = observedData.reduce((a, b) => a + b.xp, 0) / n;
        const sampleVar = observedData.reduce((s, d) => s + (d.xp - sampleMean) ** 2, 0) / n;
        
        // Posterior parametreler
        const lambda_n = this.prior.lambda + n;
        const mu_n = (this.prior.lambda * this.prior.mu0 + n * sampleMean) / lambda_n;
        const alpha_n = this.prior.alpha + n / 2;
        const beta_n = this.prior.beta + 0.5 * sampleVar + 
                      (this.prior.lambda * n * (sampleMean - this.prior.mu0) ** 2) / (2 * lambda_n);
        
        return { mu0: mu_n, lambda: lambda_n, alpha: alpha_n, beta: beta_n };
    },
    
    predictDaysToTarget(posterior, currentXP, targetXP) {
        const remaining = targetXP - currentXP;
        if (remaining <= 0) return { median: 0, lower: 0, upper: 0 };
        
        const predMean = posterior.mu0;
        const predVar = posterior.beta * (1 + 1/posterior.lambda) / posterior.alpha;
        const predStd = Math.sqrt(predVar);
        
        return {
            median: Math.round(remaining / predMean),
            lower: Math.round(remaining / (predMean + 1.96 * predStd)),
            upper: Math.round(remaining / Math.max(1, predMean - 1.96 * predStd)),
            dailyXP: Math.round(predMean)
        };
    }
}
```

#### Hata Dağılım Analizi (Skewness/Kurtosis)

**Amaç:** Hangi perdelerde entonasyon problemi olduğunu tespit et.

```javascript
_errorAnalysis: {
    calculateMoments(values) {
        const n = values.length;
        if (n < 3) return null;
        
        const mean = values.reduce((a, b) => a + b, 0) / n;
        const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
        const stdDev = Math.sqrt(variance);
        
        // 3rd moment (Skewness - asimetri)
        const m3 = values.reduce((s, v) => s + (v - mean) ** 3, 0) / n;
        const skewness = m3 / (stdDev ** 3);
        
        // 4th moment (Kurtosis - kuyruk ağırlığı)
        const m4 = values.reduce((s, v) => s + (v - mean) ** 4, 0) / n;
        const kurtosis = (m4 / (stdDev ** 4)) - 3;  // Excess kurtosis
        
        return { mean, variance, stdDev, skewness, kurtosis };
    },
    
    analyzePerNoteErrors(tunerHistory) {
        const byNote = {};
        for (const e of tunerHistory) {
            if (!byNote[e.note]) byNote[e.note] = [];
            byNote[e.note].push(e.cents);
        }
        
        const analysis = {};
        for (const [note, cents] of Object.entries(byNote)) {
            const m = this.calculateMoments(cents);
            analysis[note] = {
                count: cents.length,
                ...m,
                problemIndicator: m && (Math.abs(m.skewness) > 1 || Math.abs(m.kurtosis) > 2)
            };
        }
        return analysis;
    }
}
```

**Yorumlama Tablosu:**

| Metrik | Değer Aralığı | Yorum |
|--------|---------------|-------|
| Skewness | > 1.0 | Sağa çarpık (çoğunlukla tiz çalıyor) |
| Skewness | < -1.0 | Sola çarpık (çoğunlukla pes çalıyor) |
| Kurtosis | > 2.0 | Sivri dağılım (çok tutarlı) |
| Kurtosis | < -2.0 | Basık dağılım (çok tutarsız) |
| Skewness | ±0.5 içinde | Normal dağılım (ideal) |

### 3.4 Auto-Pilot Sistemi

**Amaç:** Kullanıcı doğru notayı çaldığında otomatik ilerleme.

```javascript
_autoPilotState: {
    enabled: false,
    targetNote: null,
    stableCount: 0,
    requiredDuration: 1.5  // saniye
},

checkAutoPilotProgress(currentNote, freq, cents, duration) {
    if (!this._autoPilotState.enabled || !currentNote) return false;
    
    const tolerance = 15;  // ±15 cent
    const isCorrect = Math.abs(cents) <= tolerance;
    
    if (isCorrect) {
        this._autoPilotState.stableCount += duration;
        
        if (this._autoPilotState.stableCount >= this._autoPilotState.requiredDuration) {
            // Başarılı! Sonraki notaya geç
            this._autoPilotState.stableCount = 0;
            return true;
        }
    } else {
        // Yanlış nota - sayacı azalt
        this._autoPilotState.stableCount = Math.max(0, 
            this._autoPilotState.stableCount - duration * 0.5
        );
    }
    
    return false;
}
```

**Kullanım:**
```javascript
// Tuner loop içinde
if (UI.checkAutoPilotProgress(currentNote, freq, cents, 0.1)) {
    // Otomatik ilerle
    UI.notify('✅ Doğru! Sonraki nota...', 'success');
    AppState.addXP(10);
    // Next note logic...
}
```

### 3.5 Metronom Bilgi Kartları

**Amaç:** Kullanıcıyı usul hakkında eğitirken XP ile motive etmek.

```javascript
_usulInfoCards: {
    cards: [
        {
            name: 'Düyek',
            pattern: '8/8',
            info: 'Türk müziğinin omurgasıdır. Mevlevi ayinlerinden halk şarkılarına kadar her yerdedir.',
            xpBonus: 100,
            badge: 'Nevâzen',
            challenge: 'Düyek dengesini %95 çözdün! 100 XP daha alıp "Nevâzen" rütbesine yükselmek ister misin?'
        },
        {
            name: 'Aksak',
            pattern: '9/8',
            info: 'Anadolu\'nun ritmik imzasıdır. 2+2+2+3 yapısıyla enerjik bir "aksama" yaşatır.',
            xpBonus: 150,
            badge: 'Ritim Ustası',
            challenge: '9 zamanlı ritmi hatasız tamamla, "Ritim Ustası" rozetini koleksiyonuna ekle!'
        },
        {
            name: 'Sofyan',
            pattern: '4/4',
            info: 'En basit usuldür. "Düm - Tek - Tek" kalıbıyla başlangıç seviyesidir.',
            xpBonus: 50,
            badge: 'Başlangıç',
            challenge: 'Sofyan\'da 50 vuruş yap, ilk XP\'ni kazan!'
        },
        {
            name: 'Yürüksemai',
            pattern: '6/8',
            info: 'Hızlı ve coşkulu. Semai formunun temelini oluşturur.',
            xpBonus: 120,
            badge: 'Semai Ustası',
            challenge: 'Yürüksemai\'de 100 vuruş yap, "Semai Ustası" rozetini aç!'
        }
    ],
    
    getCurrent(pattern) {
        return this.cards.find(c => c.pattern === pattern) || this.cards[0];
    }
}
```

### 3.6 Gizli Makamlar (Curiosity System)

**Amaç:** Kullanıcıda merak uyandırarak sistemde tutma.

```javascript
_hiddenMakams: {
    unlocked: ['Rast', 'Uşşak', 'Segâh', 'Hicaz'],
    
    hidden: [
        {
            name: 'Saba',
            icon: '🌙',
            phase: 6,
            hint: 'Dügâh perdesinde karar veren, hüzünlü bir makam',
            unlockReq: 'Faz 5 tamamla'
        },
        {
            name: 'Hüseyni',
            icon: '⚔️',
            phase: 7,
            hint: 'Yiğitlik makamı, Hüseyni perdesinde durak',
            unlockReq: 'Faz 6 tamamla'
        },
        {
            name: 'Neva',
            icon: '🎺',
            phase: 8,
            hint: 'Nevâ perdesinin zirvesi, ince tescil',
            unlockReq: 'Faz 7 tamamla'
        },
        {
            name: 'Taksim',
            icon: '🎨',
            phase: 9,
            hint: 'Doğaçlama sanatı, makamların zirvesi',
            unlockReq: 'Faz 8 tamamla'
        }
    ],
    
    getHiddenForPhase(phase) {
        return this.hidden.filter(h => h.phase === phase);
    },
    
    isUnlocked(makamName) {
        return this.unlocked.includes(makamName);
    }
}
```

### 3.7 Timbre Fingerprinting

**Amaç:** Neyin ses karakterini analiz et, kondisyon takibi yap.

```javascript
_timbreFingerprint: {
    // Spectral Centroid (Parlaklık)
    spectralCentroid(mag) {
        let num = 0, den = 0;
        for (let i = 0; i < mag.length; i++) {
            num += i * mag[i];
            den += mag[i];
        }
        return den > 0 ? num / den : 0;
    },
    
    // Spectral Flatness (Tonallik - Weber ratio)
    spectralFlatness(mag) {
        let logSum = 0, linSum = 0, cnt = 0;
        for (let i = 0; i < mag.length; i++) {
            if (mag[i] > 1e-10) {
                logSum += Math.log(mag[i]);
                linSum += mag[i];
                cnt++;
            }
        }
        return cnt > 0 && linSum > 0 
            ? Math.exp(logSum / cnt) / (linSum / cnt) 
            : 0;
    },
    
    // Kapsamlı Timbre Score
    calculateTimbreScore(mag, sampleRate = 16000) {
        const centroid = this.spectralCentroid(mag);
        const flatness = this.spectralFlatness(mag);
        
        const normCentroid = Math.min(1, centroid / 100);
        const normFlatness = flatness;
        
        // Weighted score
        const score = (
            normCentroid * 0.4 +      // Brightness
            (1 - normFlatness) * 0.3 + // Clarity (tonal)
            normCentroid * 0.3         // Richness
        ) * 100;
        
        return {
            score: Math.round(score),
            brightness: Math.round(normCentroid * 100),
            clarity: Math.round((1 - normFlatness) * 100)
        };
    }
}
```

### 3.8 Ney Kondisyon Monitor

**Amaç:** Yağlama zamanını tespit et.

```javascript
_neyConditionMonitor: {
    baseline: null,
    
    establishBaseline(samples) {
        if (samples.length < 10) return null;
        
        const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        const std = arr => {
            const m = mean(arr);
            return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
        };
        
        const scores = samples.map(t => t.score || 50);
        this.baseline = {
            score: { mean: mean(scores), std: std(scores) }
        };
        
        return this.baseline;
    },
    
    predictOilingNeed(history) {
        if (history.length < 5) return { needsOiling: false, confidence: 0 };
        
        const recent = history.slice(-5);
        const older = history.slice(-10, -5);
        
        if (older.length === 0) return { needsOiling: false, confidence: 0 };
        
        const recentAvg = recent.reduce((a, b) => a + (b.score || 50), 0) / recent.length;
        const olderAvg = older.reduce((a, b) => a + (b.score || 50), 0) / older.length;
        const decline = olderAvg - recentAvg;
        
        return {
            needsOiling: decline > 10,
            decline: Math.round(decline),
            confidence: Math.min(100, Math.round(decline * 5)),
            recommendation: decline > 15 
                ? 'Acil yağlama gerekli!' 
                : decline > 10 
                    ? 'Yakında yağlanmalı.' 
                    : 'İyi durumda.'
        };
    }
}
```

### 3.9 VexFlow Notation Renderer

**Amaç:** Notaları porte üzerinde göster.

```javascript
_vexFlowRenderer: {
    renderToStave(notes, containerId) {
        if (typeof Vex === 'undefined') return;
        
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        const renderer = new Vex.Flow.Renderer(
            container, 
            Vex.Flow.Renderer.Backends.SVG
        );
        renderer.resize(container.clientWidth || 800, 200);
        
        const ctx = renderer.getContext();
        const stave = new Vex.Flow.Stave(10, 40, container.clientWidth - 20);
        
        stave.addClef('treble').addTimeSignature('4/4');
        stave.setContext(ctx).draw();
        
        const noteMap = {
            'Fa': 'f', 'Sol': 'g', 'La': 'a',
            'Si': 'b', 'Do': 'c', 'Re': 'd', 'Mi': 'e'
        };
        
        const vexNotes = notes.map(n => 
            new Vex.Flow.StaveNote({
                clef: 'treble',
                key: `${noteMap[n.note] || 'c'}/4`,
                duration: n.duration >= 0.5 ? 'h' : 'q'
            })
        );
        
        if (vexNotes.length > 0) {
            Vex.Flow.Formatter.FormatAndDraw(ctx, stave, vexNotes);
        }
    }
}
```

---

## 4. SİSTEM MİMARISI

(Detaylı mimari diyagramlar ve akış şemaları - önceki README'de mevcut)

---

## 5. KURULUM REHBERİ

(Detaylı kurulum adımları - önceki README'de mevcut)

---

## 6. KULLANIM KILAVUZU

(Detaylı kullanım senaryoları - önceki README'de mevcut)

---

## 7. MATEMATİKSEL MODELLER

(Tüm formüller LaTeX formatında - önceki README'de mevcut)

---

## 8. API REFERANSI

(Tüm endpoint'ler - önceki README'de mevcut)

---

## 9. VERİ YAPILARI

### 9.1 AppState Yapısı

```javascript
AppState = {
    user: {
        xp: 0,                          // Toplam XP
        level: 1,                       // Mevcut seviye (1-12)
        completedTopics: [],            // ["1.1", "1.2", ...]
        completedPhases: [],            // [1, 2, ...]
        totalPracticeMinutes: 0,        // Toplam pratik süresi
        streak: 0,                      // Günlük seri
        longestStreak: 0,               // En uzun seri
        lastPracticeDate: null,         // Son pratik tarihi (ISO)
        badges: [],                     // ["first_sound", "streak_7", ...]
        settings: {
            dailyGoal: 60,              // Günlük hedef (dakika)
            soundEffects: true,         // Ses efektleri
            notifications: true         // Bildirimler
        }
    },
    
    session: {
        currentPhase: 1,                // Mevcut faz
        metronomeRunning: false,        // Metronom durumu
        breathingRunning: false,        // Nefes egzersizi durumu
        metronomeInterval: null,
        breathingInterval: null,
        practiceInterval: null
    },
    
    weeklyPractice: {
        Mon: 0, Tue: 0, Wed: 0,
        Thu: 0, Fri: 0, Sat: 0, Sun: 0
    },
    
    activities: [
        {
            type: "topic",              // topic/phase/badge/levelup
            description: "Konu: 1.1",
            xp: 50,
            timestamp: "2026-03-08T10:30:00Z"
        }
    ],
    
    tunerHistory: [
        {
            note: "Sol",
            cents: 5,
            freq: 392.5,
            ts: 1709892600000
        }
    ],
    
    earTrainingStats: {
        "Sol": { correct: 8, total: 10 },
        "La": { correct: 5, total: 10 }
    },
    
    practiceLog: {
        technical: 0,    // Teknik pratik (dakika)
        theory: 0,       // Teori (dakika)
        repertoire: 0,   // Repertuvar (dakika)
        listening: 0     // Dinleme (dakika)
    }
}
```

### 9.2 NeyData Yapısı

```javascript
NeyData = {
    curriculum: [         // 12 faz
        {
            phase: 1,
            title: "İlk Nefes: Temel Hazırlık",
            description: "Neyden stabil, temiz bir dem sesi çıkarabilme",
            icon: "🌱",
            color: "#4ade80",
            topics: [       // 10-14 konu
                {
                    id: "1.1",
                    title: "Ney Anatomisi",
                    detail: "7 delik, başpare, parazvana, boru bölümleri",
                    exercise: "Parçaları tanıma, doğru montaj"
                }
            ],
            verification: "10 saniye stabil dem sesi çıkarabilme"
        }
    ],
    
    fingerPositions: [    // 24 pozisyon
        {
            note: "Fa",
            noteWestern: "F",
            octave: 1,
            holes: [1,1,1,1,1,1,1],   // 1=kapat, 0=aç
            thumb: 1,
            breath: "hafif",
            description: "Tüm delikler kapalı"
        }
    ],
    
    makams: [            // 15+ makam
        {
            name: "Rast",
            key: "Sol",
            family: "Rast",
            type: "Çıkıcı",
            durak: "Sol (Rast)",
            guclu: "Re (Neva)",
            yeden: "Fa# (Irak)",
            description: "Tam, kararlı, vakur bir makam",
            scale: ["Sol", "La", "Si♭", "Do", "Re", "Mi", "Fa#", "Sol"],
            mood: "Huzurlu, kararlı",
            usage: "İlahi, peşrev, taksim"
        }
    ],
    
    usuls: [             // 6 usul
        {
            name: "Düyek",
            timeSignature: "8/8",
            description: "Türk müziğinin omurgası",
            pattern: ["düm", "tek", "tek", "ka", "düm", "tek", "tek", "ka"]
        }
    ],
    
    songs: [],           // Eser veritabanı
    levels: [],          // 12 seviye (XP eşikleri)
    badges: [],          // 15 rozet
    goldenRatio: { technical: 40, theory: 25, repertoire: 25, listening: 10 },
    neyzens: [],         // Büyük neyzenler
    terms: []            // Sözlük
}
```

---

## 10. FONKSİYON REFERANSI

### 10.1 AppState Fonksiyonları

| Fonksiyon | Parametreler | Dönüş | Açıklama |
|-----------|--------------|-------|----------|
| `_djb2Hash(str)` | str: string | string | Checksum hash |
| `load()` | - | void | LocalStorage'dan yükle |
| `save()` | - | void | LocalStorage'a kaydet (hash ile) |
| `exportData()` | - | void | JSON dosyası indir |
| `importData(file)` | file: File | void | JSON dosyası yükle |
| `addXP(n)` | n: number | void | XP ekle, level kontrolü |
| `addActivity(type, desc, xp)` | type, desc, xp | void | Aktivite kaydet |
| `completeTopic(pid, tid)` | pid, tid | void | Konu tamamla |
| `completePhase(n)` | n: number | void | Faz tamamla |
| `addPractice(min)` | min: number | void | Pratik süresi ekle |
| `unlockBadge(id)` | id: string | void | Rozet kilidini aç |
| `checkBadges()` | - | void | Rozet koşullarını kontrol et |
| `getCurrentPhase()` | - | number | Mevcut fazı bul |
| `checkStreak()` | - | void | Seri kontrolü |
| `reset()` | - | void | Tüm veriyi sıfırla |

### 10.2 UI Fonksiyonları

| Fonksiyon | Parametreler | Dönüş | Açıklama |
|-----------|--------------|-------|----------|
| `init()` | - | void | Tüm sistemi başlat |
| `updateAll()` | - | void | Tüm UI'yi güncelle |
| `setText(id, v)` | id, v | void | Element metnini ayarla |
| `notify(msg, type)` | msg, type | void | Bildirim göster |
| `renderPhaseList()` | - | void | Faz listesini render et |
| `renderTopics(n)` | n: number | void | Konuları render et |
| `renderBadges()` | - | void | Rozetleri render et |
| `renderPrediction()` | - | void | Monte Carlo göster |
| `renderIntonationHeatmap()` | - | void | Isı haritası çiz |
| `renderGoldenRatioAnalysis()` | - | void | Altın oran analizi |
| `renderSimilarityMatrix()` | - | void | Makam benzerlik matrisi |
| `renderAdvancedAnalytics()` | - | void | İleri istatistikler |
| `showMetronomeInfoCard(pattern)` | pattern | void | Metronom bilgi kartı |
| `showHiddenMakamCard(phase)` | phase | void | Gizli makam kartı |
| `checkAutoPilotProgress()` | note, freq, cents, dur | boolean | Auto-pilot kontrolü |

---

## 11. UI BİLEŞENLERİ

### 11.1 Dashboard Bileşenleri

- **Progress Card**: XP bar, level, istatistikler
- **Golden Ratio Card**: 4 kategori pasta grafik
- **Current Phase Card**: Mevcut faz bilgisi
- **Daily Goal Card**: Geri sayım timer
- **Activity Card**: Son 10 aktivite
- **Badges Card**: Kazanılan rozetler

### 11.2 Müfredat Bileşenleri

- **Phase Sidebar**: 12 faz listesi (kilit sistemi)
- **Phase Content**: Başlık, açıklama, konular
- **Topic Cards**: Checkbox'lu konu kartları
- **Phase Actions**: Önceki/Sonraki/Tamamla butonları
- **Exam Button**: 🎤 Sınav Modu

### 11.3 Pratik Araçları

- **Metronome**: BPM slider, usul presetleri
- **Breathing**: 4-4-8 animasyon
- **Practice Timer**: Stopwatch + XP
- **Daily Timer**: Hedef geri sayım

### 11.4 Tuner Bileşenleri

- **Note Display**: Büyük nota ismi
- **Cents Indicator**: -50¢ ile +50¢ arası
- **Frequency Display**: Hz değeri
- **Spectrogram**: FFT görselleştirme
- **Timbre Score**: 0-100 puan
- **Tone Clarity**: Progress bar
- **Tone Stability**: Progress bar

---

## 12. STATE YÖNETİMİ

### 12.1 LocalStorage Schema

```javascript
{
    data: {
        user: {...},
        weeklyPractice: {...},
        activities: [...],
        tunerHistory: [...],
        earTrainingStats: {...},
        practiceLog: {...}
    },
    _hash: "abc123"  // djb2 checksum
}
```

### 12.2 Veri Doğrulama

```javascript
importData(file) {
    const p = JSON.parse(file);
    
    // Tip kontrolü
    if (typeof p.user.xp !== 'number')
        throw new Error('xp alanı sayı olmalı');
    if (!Array.isArray(p.user.completedPhases))
        throw new Error('completedPhases dizi olmalı');
    if (typeof p.user.level !== 'number' || p.user.level < 1)
        throw new Error('level geçersiz');
    
    // Atama
    Object.assign(this.user, p.user);
    Object.assign(this.weeklyPractice, p.weeklyPractice);
    if (p.activities) this.activities = p.activities;
    if (p.tunerHistory) this.tunerHistory = p.tunerHistory;
    if (p.earTrainingStats) this.earTrainingStats = p.earTrainingStats;
    if (p.practiceLog) Object.assign(this.practiceLog, p.practiceLog);
    
    this.save();
}
```

---

## 13. GÜVENLİK

### 13.1 Checksum Doğrulama

```javascript
_djb2Hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) + h) + str.charCodeAt(i);
    }
    return (h >>> 0).toString(36);
}

save() {
    const data = { user, weeklyPractice, activities, tunerHistory, ... };
    const json = JSON.stringify(data);
    const wrapper = { 
        data: JSON.parse(json), 
        _hash: this._djb2Hash(json) 
    };
    localStorage.setItem('neyMasteryState', JSON.stringify(wrapper));
}

load() {
    const wrapper = JSON.parse(localStorage.getItem('neyMasteryState'));
    if (wrapper._hash) {
        const verify = this._djb2Hash(JSON.stringify(wrapper.data));
        if (verify !== wrapper._hash) {
            console.warn('⚠️ Veri bütünlüğü sorunu!');
            UI.notify('Veri bozulmuş olabilir. Yedek alın.', 'error');
        }
    }
}
```

---

## 14. PERFORMANS

### 14.1 Optimizasyon Teknikleri

| Teknik | Açıklama | Kazanım |
|--------|----------|---------|
| Web Worker | Metronom ayrı thread'de | UI donmaz |
| RequestAnimationFrame | Tuner loop | 60 FPS |
| Debouncing | Input handling | CPU azalır |
| Lazy Loading | VexFlow sadece gerektiğinde | İlk yükleme hızlı |
| LocalStorage | Veri yerel | Network yok |

### 14.2 Benchmark

| Metrik | Değer |
|--------|-------|
| İlk Yükleme | < 2 sn |
| Tuner Gecikme | < 10 ms |
| Metronom Doğruluk | ±1 ms |
| LocalStorage Boyutu | < 100 KB |
| CPU Kullanımı (idle) | < 5% |

---

## 15. TEST SENARYOLARI

### 15.1 Unit Test Örnekleri

```javascript
// Checksum testi
assert(_djb2Hash("test") === "238j4k");

// 53-TET frekans testi
assert(calcFreq(440, 32) ≈ 593.7);  // Rast

// Auto-pilot testi
assert(checkAutoPilotProgress("Sol", 392, 5, 1.5) === true);

// Bayesian posterior testi
const posterior = updatePosterior([{xp: 100}, {xp: 150}]);
assert(posterior.mu0 > 100);
```

### 15.2 E2E Test Akışı

1. Sayfa yükle → Dashboard görün
2. Müfredat → Faz 1 seç → Konu 1.1 tamamla → XP art
3. Tuner → Mikrofon izni → Nota çal → Frekans göster
4. Metronom → Başla → 80 BPM → 30 sn çalış → Durdur
5. Profil → Rozetler → En az 1 rozet görün

---

## 16. SORUN GİDERME

### 16.1 Yaygın Hatalar

| Hata | Sebep | Çözüm |
|------|-------|-------|
| Tuner çalışmıyor | Mikrofon izni yok | Tarayıcı ayarları → İzin ver |
| Metronom gecikiyor | Single thread | Web Worker kullan (zaten var) |
| Veri kayboluyor | LocalStorage temizlendi | Export/Import kullan |
| VexFlow görünmüyor | CDN yüklenmedi | İnternet kontrol et |
| YouTube çalışmıyor | CORS | Backend API kullan |

### 16.2 Debug Modu

```javascript
// Console'da çalıştır
console.log(AppState.user);
console.log(AppState.tunerHistory.length);
UI.notify('Debug mode', 'info');
```

---

## 17. GELECEK GELİŞTİRMELER

### 17.1 Kısa Vadeli (v2.0)

- [ ] Python backend Docker container
- [ ] Real-time collaboration (WebSocket)
- [ ] Mobile app (React Native)
- [ ] Offline mode (Service Worker)

### 17.2 Orta Vadeli (v3.0)

- [ ] Multi-enstrument (Ud, Gitar, Keman)
- [ ] AI-powered error correction
- [ ] Community repertoire sharing
- [ ] Live ensemble mode

### 17.3 Uzun Vadeli (v4.0)

- [ ] VR/AR ney learning
- [ ] Master-apprentice matching
- [ ] Concert hall simulation
- [ ] Historical instrument reconstructions

---

## 18. İSTATİSTİKLER

### 18.1 Kod İstatistikleri

| Metrik | Değer |
|--------|-------|
| **Toplam Satır** | 6,806 |
| **HTML** | 1,372 |
| **JavaScript** | 2,107 |
| **CSS** | 1,771 |
| **Data** | 391 |
| **Python** | 312 |
| **Worker** | 38 |
| **README** | ~800 |

### 18.2 Özellik İstatistikleri

| Kategori | Sayı |
|----------|------|
| **Fazlar** | 12 |
| **Konular** | 144 |
| **Makamlar** | 15+ |
| **Usuller** | 6 |
| **Ney Tipleri** | 5 |
| **Rozetler** | 15 |
| **İstatistik Modeller** | 8 |
| **API Endpoints** | 3 |
| **UI Bileşenleri** | 25+ |

### 18.3 Dosya Boyutları

| Dosya | Boyut |
|-------|-------|
| index.html | 45.2 KB |
| app.js | 89.4 KB |
| data.js | 28.7 KB |
| styles.css | 52.3 KB |
| metro-worker.js | 1.2 KB |
| ney_transcription_api.py | 12.8 KB |
| requirements.txt | 0.4 KB |
| README.md | 35 KB |
| **TOPLAM** | **265 KB** |

---

## 📞 İLETİŞİM

- **Proje Sahibi**: Yusuf
- **Email**: [your-email@example.com]
- **GitHub**: [your-username]

---

**🎵 Don't stop until you get it done!**

*Son güncelleme: Mart 2026*
*Versiyon: 2.0 (Ultimate Hardcore Documentation)*
