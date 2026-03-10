/**
 * Ney Mastery - Comprehensive Data Module
 * Complete curriculum, finger positions, makams, usuls, and song database
 */

const NeyData = {
  // 12-Phase Curriculum with detailed subtopics
  curriculum: [
    {
      phase: 1,
      title: "İlk Nefes: Temel Hazırlık",
      description: "Neyden stabil, temiz bir dem sesi çıkarabilme",
      icon: "🌱",
      color: "#4ade80",
      topics: [
        { id: "1.1", title: "Ney Anatomisi", detail: "7 delik, başpare, parazvana, boru bölümleri, kamış yapısı", exercise: "Parçaları tanıma, doğru montaj" },
        { id: "1.2", title: "Ney Çeşitleri", detail: "Mansur (La), Kız (Si), Şah (Sol), Süpürde (Re), Bolahenk (Mi)", exercise: "Farklı ney seslerini dinle/ayırt et" },
        { id: "1.3", title: "Tutuş Pozisyonu", detail: "Sağ el yukarı, sol el aşağı, 45° açı", exercise: "10 dk/gün tutuş alıştırması" },
        { id: "1.4", title: "Diyafram Nefes Eğitimi", detail: "Göğüs vs diyafram, 4-4-8 döngüsü", exercise: "Günde 3×10 dk nefes egzersizi" },
        { id: "1.5", title: "Başpare Tanışma", detail: "Dudak yerleşimi, başpare açısı", exercise: "Başparesiz kuru üfleme" },
        { id: "1.6", title: "İlk Ses Çıkarma", detail: "45° açı, hafif nefes, dem sesi", exercise: "Günde minimum 30 dk üfleme" },
        { id: "1.7", title: "Ses Stabilizasyonu", detail: "Aynı sesi 5-10 sn tutma", exercise: "Süre artırma egzersizi" },
        { id: "1.8", title: "Nefes Kapasitesi", detail: "Uzun dem sesleri, circular breathing hazırlık", exercise: "15 sn → 30 sn → 60 sn hedef" },
        { id: "1.9", title: "Başpare Malzeme Bilgisi", detail: "Manda boynuzu, delrin, plastik", exercise: "Farklı başpare deneyleri" },
        { id: "1.10", title: "Pratik Günlüğü Başlangıcı", detail: "İlk pratik kaydı, günlük hedef", exercise: "İlk hafta planı oluşturma" }
      ],
      verification: "10 saniye stabil dem sesi çıkarabilme"
    },
    {
      phase: 2,
      title: "Parmakların Dili: Temel Notalar",
      description: "İlk 7 notayı temiz çalabilme (Rast→Neva arası)",
      icon: "🎵",
      color: "#60a5fa",
      topics: [
        { id: "2.1", title: "Parmak Yerleşimi", detail: "7 delik haritası, yastık bölgesi", exercise: "Her parmağın doğru yerini bulma" },
        { id: "2.2", title: "Aşiran Perdesi (Fa)", detail: "Tüm delikler kapalı + başparmak", exercise: "Hafif nefes ile Fa sesi" },
        { id: "2.3", title: "Rast Perdesi (Sol)", detail: "Alt 1 delik açık", exercise: "Nefes ayarı ile temiz Sol" },
        { id: "2.4", title: "Dügâh Perdesi (La)", detail: "Alt 2 delik açık", exercise: "La sesi stabilizasyonu" },
        { id: "2.5", title: "Segâh Perdesi (Si♭)", detail: "Alt 3 delik açık", exercise: "İnce ayar ile Si♭" },
        { id: "2.6", title: "Çargâh Perdesi (Do)", detail: "Alt 4 delik açık", exercise: "Do sesi temiz çalma" },
        { id: "2.7", title: "Nevâ Perdesi (Re)", detail: "Alt 5 delik açık", exercise: "Re sesi stabilizasyonu" },
        { id: "2.8", title: "Hüseyni Perdesi (Mi)", detail: "Alt 6 delik açık", exercise: "Mi sesi temiz çalma" },
        { id: "2.9", title: "Nota Geçiş Egzersizleri", detail: "Ardışık geçişler", exercise: "Do-Re-Mi-Re-Do kalıpları" },
        { id: "2.10", title: "Yarım Delik Tekniği", detail: "Parmağı yarım kapatma", exercise: "Koma hassasiyeti" },
        { id: "2.11", title: "Temiz Geçiş Drilleri", detail: "Hız artırma", exercise: "Metronom ile geçiş" },
        { id: "2.12", title: "İlk Perde Ölçümü", detail: "Tuner ile kontrol", exercise: "Entonasyon ayarı" }
      ],
      verification: "7 temel notayı sırayla temiz ve stabil çalabilme"
    },
    {
      phase: 3,
      title: "Nota Okuma Temelleri",
      description: "Porte üzerinden basit bir melodiyi okuyup çalabilme",
      icon: "📝",
      color: "#fbbf24",
      topics: [
        { id: "3.1", title: "Porte & Sol Anahtarı", detail: "Çizgi ve aralıklar", exercise: "Nota yerlerini öğrenme" },
        { id: "3.2", title: "Nota Değerleri", detail: "Birlik, ikilik, dörtlük, sekizlik", exercise: "Ritim sayma" },
        { id: "3.3", title: "Sus İşaretleri", detail: "Her nota için sus", exercise: "Sus sürelerini sayma" },
        { id: "3.4", title: "Ölçü ve Birim Zamanı", detail: "2/4, 3/4, 4/4", exercise: "Ölçü çizgisi ile ayırma" },
        { id: "3.5", title: "Türk Müziği Özel İşaretleri", detail: "Koma diyez/bemol", exercise: "AEU donanım tanıma" },
        { id: "3.6", title: "Perde İsimleri ↔ Nota", detail: "Rast=Sol, Dügâh=La...", exercise: "Tam eşleme tablosu" },
        { id: "3.7", title: "Bona Çalışmaları", detail: "Ritimli nota okuma", exercise: "Basit bonalar" },
        { id: "3.8", title: "Solfej Çalışmaları", detail: "Nota okuyarak ses verme", exercise: "Kulak eğitimi" },
        { id: "3.9", title: "Basit Melodi Okuma", detail: "4-8 ölçülük parçalar", exercise: "Porte'den çalma" },
        { id: "3.10", title: "Nota Okuma Quizi", detail: "İnteraktif testler", exercise: "Nota tanıma" }
      ],
      verification: "Basit bir ilahi notasını porte'den bakarak çalabilme"
    },
    {
      phase: 4,
      title: "İlk Melodiler: Basit Eserler",
      description: "5 basit parçayı ezbere çalabilme",
      icon: "🎶",
      color: "#f472b6",
      topics: [
        { id: "4.1", title: "Basit İlahiler", detail: "Rast makamı temel ilahiler", exercise: "Ezberleme" },
        { id: "4.2", title: "Halk Ezgileri", detail: "Pentatonik türküler", exercise: "Kolay ezgiler" },
        { id: "4.3", title: "Dem Sesi Geliştirme", detail: "Vapur sesi tınısı", exercise: "Vibrasyon ekleme" },
        { id: "4.4", title: "Legato Tekniği", detail: "Kesintisiz geçiş", exercise: "Bağlı çalma" },
        { id: "4.5", title: "Staccato Tekniği", detail: "Kesik kesik nota", exercise: "Vurgulu çalma" },
        { id: "4.6", title: "Nüans Kontrolü", detail: "p - mf - f", exercise: "Üfleme farkları" },
        { id: "4.7", title: "2 Oktav Egzersizleri", detail: "Pes'ten orta'ya", exercise: "Geçiş çalışması" },
        { id: "4.8", title: "Eser Ezberleme", detail: "Cümle cümle", exercise: "Tekrar stratejisi" },
        { id: "4.9", title: "Basit Şarkılar", detail: "Tanıdık melodiler", exercise: "Ney uyarlaması" },
        { id: "4.10", title: "İlk Performans Kaydı", detail: "Kendini kaydet", exercise: "Dinle, değerlendir" }
      ],
      verification: "5 parçayı ezbere, nüanslı çalma + ses kaydı"
    },
    {
      phase: 5,
      title: "Makam Kapısı: Teori Girişi",
      description: "5 temel makamın dizisini, seyirini ve karakterini bilme",
      icon: "🎼",
      color: "#a78bfa",
      topics: [
        { id: "5.1", title: "Makam Nedir?", detail: "Dizi + seyir + karakter", exercise: "Batı gamından farkı" },
        { id: "5.2", title: "Koma Sistemi", detail: "1 tam ses = 9 koma", exercise: "Mikrotonal aralıklar" },
        { id: "5.3", title: "AEU Sistemi", detail: "24-perdeli sistem", exercise: "Donanım işaretleri" },
        { id: "5.4", title: "6 Dörtlü (Çeşni)", detail: "Çargâh, Buselik, Kürdi, Rast, Uşşak, Hicaz", exercise: "Dörtlü dizileri" },
        { id: "5.5", title: "6 Beşli (Çeşni)", detail: "Beşli diziler", exercise: "Beşli aralıklar" },
        { id: "5.6", title: "Durak & Güçlü & Yeden", detail: "Karar, asma, çekim", exercise: "Ses fonksiyonları" },
        { id: "5.7", title: "Seyir Kuralları", detail: "Çıkıcı/İnici/İnici-Çıkıcı", exercise: "Seyir tipleri" },
        { id: "5.8", title: "Rast Makamı", detail: "Dizi, seyir, durak=Sol, güçlü=Re", exercise: "Rast seyri çalma" },
        { id: "5.9", title: "Uşşak Makamı", detail: "Dizi, seyir, durak=La, güçlü=Re", exercise: "Uşşak seyri" },
        { id: "5.10", title: "Buselik Makamı", detail: "Dizi, seyir, durak=La, güçlü=Mi", exercise: "Buselik seyri" },
        { id: "5.11", title: "Kürdi Makamı", detail: "Minor karakter", exercise: "Kürdi seyri" },
        { id: "5.12", title: "Hicaz Makamı", detail: "Augmented 2nd, dramatik", exercise: "Hicaz seyri" },
        { id: "5.13", title: "Makam Duyma", detail: "Kulak eğitimi", exercise: "5 makamı ayırt etme" },
        { id: "5.14", title: "Makam Seyir Çalışması", detail: "Her makam için seyir", exercise: "Seyir çalma" }
      ],
      verification: "Dinleyerek 5 makamı ayırt etme + seyirlerini çalma"
    },
    {
      phase: 6,
      title: "Ritmin Kalbi: Usul Sistemi",
      description: "6 temel usulü neyde uygulayabilme",
      icon: "🥁",
      color: "#fb923c",
      topics: [
        { id: "6.1", title: "Usul Nedir?", detail: "Güçlü/zayıf vuruşlar", exercise: "Düm-tek sistemi" },
        { id: "6.2", title: "Düyek (8/8)", detail: "En yaygın usul", exercise: "düm-tek-tek-ka-düm-tek-tek-ka" },
        { id: "6.3", title: "Sofyan (4/4)", detail: "Basit usul", exercise: "düm-tek-tek" },
        { id: "6.4", title: "Aksak (9/8)", detail: "Aksak ritim", exercise: "düm-tek-tek-düm-tek" },
        { id: "6.5", title: "Yürüksemai (6/8)", detail: "Hızlı usul", exercise: "6/8 vuruş" },
        { id: "6.6", title: "Sengin Semai (6/4)", detail: "Ağır usul", exercise: "6/4 vuruş" },
        { id: "6.7", title: "Türk Aksağı (5/8)", detail: "2+3 veya 3+2", exercise: "5/8 vuruş" },
        { id: "6.8", title: "Metronom ile Çalışma", detail: "Tempo kontrolü", exercise: "Her usulde drill" },
        { id: "6.9", title: "Eser İçinde Usul", detail: "Bestelenen eserler", exercise: "Uygulama" },
        { id: "6.10", title: "Usul Duyma", detail: "Dinleyerek tanıma", exercise: "Usul quiz" }
      ],
      verification: "6 usulde vuruş yaparak neyde tempo tutabilme"
    },
    {
      phase: 7,
      title: "Orta Yol: Pişkin Sesler",
      description: "3 oktav aralığında kontrollü icra, vibrato kullanımı",
      icon: "🎭",
      color: "#34d399",
      topics: [
        { id: "7.1", title: "2. Tescil (Orta Oktav)", detail: "Aynı parmak + güçlü nefes", exercise: "Orta oktav çıkarma" },
        { id: "7.2", title: "3. Tescil (Tiz Oktav)", detail: "Şiddet + baş açısı", exercise: "Tiz sesler" },
        { id: "7.3", title: "Tescil Geçişleri", detail: "Pes→orta→tiz", exercise: "Geçiş drilleri" },
        { id: "7.4", title: "Vibrato", detail: "Diyafram vibratosu", exercise: "Hız ve genlik" },
        { id: "7.5", title: "Çarpma Tekniği", detail: "Parmakla süsleme", exercise: "Hızlı açma/kapama" },
        { id: "7.6", title: "Portamento", detail: "Kayarak geçiş", exercise: "Glissando" },
        { id: "7.7", title: "Ses Pişirme", detail: "Ham vs pişmiş", exercise: "Ton kalitesi" },
        { id: "7.8", title: "Nefes Bölme", detail: "Doğru yerde alma", exercise: "Frey tekniği" },
        { id: "7.9", title: "Dinamik Kontrol", detail: "pp → ff", exercise: "Crescendo/diminuendo" },
        { id: "7.10", title: "Orta Seviye Eserler", detail: "Rast/Uşşak/Hicaz", exercise: "Uygulama" },
        { id: "7.11", title: "Meşk Çalışması", detail: "Dinle → taklit et", exercise: "Karşılaştır" },
        { id: "7.12", title: "İkinci Performans Kaydı", detail: "İlerleme karşılaştırması", exercise: "Kayıt analizi" }
      ],
      verification: "Vibratolu, 3 oktav bir eseri nüanslı icra + kayıt"
    },
    {
      phase: 8,
      title: "Makam Derinliği: İleri Makamlar",
      description: "15+ makamı bilme, her birinde seyir çalabilme",
      icon: "🌟",
      color: "#818cf8",
      topics: [
        { id: "8.1", title: "Segâh Makamı", detail: "Mistik karakter", exercise: "Mevlevi müziği" },
        { id: "8.2", title: "Hüseyni Makamı", detail: "Yiğitlik, inici-çıkıcı", exercise: "Hüseyni seyri" },
        { id: "8.3", title: "Nihavend Makamı", detail: "Batı minör, hüzünlü", exercise: "Nihavend seyri" },
        { id: "8.4", title: "Muhayyer Makamı", detail: "Uşşak'ın tiz versiyonu", exercise: "Muhayyer seyri" },
        { id: "8.5", title: "Bayâtî Makamı", detail: "Uşşak ailesi", exercise: "Bayâtî seyri" },
        { id: "8.6", title: "Acemaşîran Makamı", detail: "Fa durakta çargâh", exercise: "Acemaşîran seyri" },
        { id: "8.7", title: "Sultanîyegâh Makamı", detail: "İnici seyir, ağır hüzün", exercise: "Sultanîyegâh seyri" },
        { id: "8.8", title: "Sûzinâk Makamı", detail: "Rast + Hicaz", exercise: "Sûzinâk seyri" },
        { id: "8.9", title: "Şedaraban Makamı", detail: "Çift augmented", exercise: "Şedaraban seyri" },
        { id: "8.10", title: "Basit → Bileşik", detail: "Makam birleştirme", exercise: "Bileşik analiz" },
        { id: "8.11", title: "Geçki (Modülasyon)", detail: "Makam değiştirme", exercise: "Geçki kuralları" },
        { id: "8.12", title: "Makam Aileleri", detail: "Rast, Uşşak, Hicaz", exercise: "Sınıflama" },
        { id: "8.13", title: "Makam Çeşni Analizi", detail: "Eserlerde tespit", exercise: "Çeşni bulma" },
        { id: "8.14", title: "İleri Seyir Drilleri", detail: "2 dakikalık seyir", exercise: "Her makamda" }
      ],
      verification: "15 makamı duyarak tanıma + seyirlerini çalma"
    },
    {
      phase: 9,
      title: "Taksim Sanatı: Doğaçlama",
      description: "3 farklı makamda yapılandırılmış taksim yapabilme",
      icon: "🎨",
      color: "#f472b6",
      topics: [
        { id: "9.1", title: "Taksim Nedir?", detail: "Doğaçlama, yapı, ruh", exercise: "Taksim analizi" },
        { id: "9.2", title: "Taksim Yapısı", detail: "Giriş→gelişme→güçlü→dönüş→karar", exercise: "Yapı kurma" },
        { id: "9.3", title: "Baş Taksim", detail: "Faslın açılışı", exercise: "Açılış taksimi" },
        { id: "9.4", title: "Ara Taksim", detail: "Eserler arası geçiş", exercise: "Geçiş taksimi" },
        { id: "9.5", title: "Geçiş Taksimi", detail: "Makam değiştiren", exercise: "Modülasyon" },
        { id: "9.6", title: "Rast'ta Taksim", detail: "Rehberli doğaçlama", exercise: "Rast taksimi" },
        { id: "9.7", title: "Hicaz'da Taksim", detail: "Dramatik ifade", exercise: "Hicaz taksimi" },
        { id: "9.8", title: "Segâh'ta Taksim", detail: "Mistik derinlik", exercise: "Segâh taksimi" },
        { id: "9.9", title: "Taksim Dinleme & Analiz", detail: "Usta taksimleri", exercise: "Cümle analizi" },
        { id: "9.10", title: "Kendi Stilini Geliştirme", detail: "Kişisel ifade", exercise: "Özgün yaklaşım" }
      ],
      verification: "3 makamda 2'şer dakikalık kayıt altına alınmış taksim"
    },
    {
      phase: 10,
      title: "Tasavvuf & Ruh: Manevî Boyut",
      description: "Mevlevi ayini eşliğinde icra edebilme düzeyi",
      icon: "🕌",
      color: "#10b981",
      topics: [
        { id: "10.1", title: "Ney'in Sufi Geleneği", detail: "Mevlâna, Mesnevî", exercise: "Kamış-insan metaforu" },
        { id: "10.2", title: "Mevlevi Müziği", detail: "Âyin formları", exercise: "Naat, Peşrev, Selam" },
        { id: "10.3", title: "İlahi İcrası", detail: "Farklı makamlar", exercise: "İlahi repertuvarı" },
        { id: "10.4", title: "Tekke Müziği", detail: "Zikir eşliği", exercise: "Kasîde formu" },
        { id: "10.5", title: "Niyaz & Edep", detail: "Neyzen ahlakı", exercise: "Usta-çırak" },
        { id: "10.6", title: "Semâ Eşliği", detail: "Sema'da ney", exercise: "Tempo ayarlama" },
        { id: "10.7", title: "Mevlevi Âyini", detail: "Tam âyin", exercise: "Ney partisi hazırlama" },
        { id: "10.8", title: "İçsel Dinleme", detail: "Meditatif pratik", exercise: "Nefes meditasyonu" }
      ],
      verification: "Bir Mevlevi ayininin peşrev bölümünü icra"
    },
    {
      phase: 11,
      title: "Usta Repertuvar: Sanat Müziği",
      description: "20+ eserlik profesyonel repertuvar",
      icon: "👑",
      color: "#fbbf24",
      topics: [
        { id: "11.1", title: "Peşrev Formu", detail: "Enstrümantal giriş", exercise: "4 hâne yapısı" },
        { id: "11.2", title: "Saz Semaisi Formu", detail: "4 hâne + teslim", exercise: "Saz semai analizi" },
        { id: "11.3", title: "Şarkı Formu", detail: "Zemin, nakarat, meyan", exercise: "Şarkı formu" },
        { id: "11.4", title: "Kâr Formu", detail: "Büyük form", exercise: "Kâr analizi" },
        { id: "11.5", title: "Beste & Ağır Semai", detail: "Klasik form", exercise: "Ağır tempo" },
        { id: "11.6", title: "Rast İcra Programı", detail: "3-4 eserlik fasıl", exercise: "Rast programı" },
        { id: "11.7", title: "Uşşak İcra Programı", detail: "3-4 eserlik fasıl", exercise: "Uşşak programı" },
        { id: "11.8", title: "Hicaz İcra Programı", detail: "3-4 eserlik fasıl", exercise: "Hicaz programı" },
        { id: "11.9", title: "Karma İcra Programı", detail: "Çoklu makam", exercise: "Program hazırlığı" },
        { id: "11.10", title: "Sahne Performansı", detail: "Sahne duruşu", exercise: "Dinleyici iletişimi" },
        { id: "11.11", title: "Fasıl İçinde Ney", detail: "Toplu icra", exercise: "Hânendeye eşlik" },
        { id: "11.12", title: "Kayıt Stüdyosu", detail: "Mikrofon, ses", exercise: "Kayıt tekniği" }
      ],
      verification: "1 saatlik fasıl programı icra (taksim + eser)"
    },
    {
      phase: 12,
      title: "Neyzen: Sürekli Gelişim",
      description: "Bağımsız müzisyen, öğretebilir, icra edebilir, analiz edebilir",
      icon: "🏆",
      color: "#f59e0b",
      topics: [
        { id: "12.1", title: "4. Tescil ve Üstü", detail: "Ultra tiz sesler", exercise: "İleri nefes" },
        { id: "12.2", title: "Nadir Makamlar", detail: "Eviç, Bestenigâr...", exercise: "Nadir seyirler" },
        { id: "12.3", title: "Şed (Göçürme)", detail: "Transpoze makamlar", exercise: "Şed analizi" },
        { id: "12.4", title: "Circular Breathing", detail: "Sürekli nefes", exercise: "Dairesel soluk" },
        { id: "12.5", title: "Çağdaş Ney", detail: "Modern füzyon", exercise: "World music" },
        { id: "12.6", title: "Ney Yapımı", detail: "Kamış seçimi, akort", exercise: "Yapım süreci" },
        { id: "12.7", title: "Eğitmenlik", detail: "Ders verme", exercise: "Öğrenci değerlendirme" },
        { id: "12.8", title: "Besteleme", detail: "Kendi eserleri", exercise: "Basit formlar" },
        { id: "12.9", title: "Dijital İcra Kaydı", detail: "Profesyonel kayıt", exercise: "Düzenleme" },
        { id: "12.10", title: "Yaşam Boyu Meşk", detail: "Sürekli öğrenme", exercise: "Felsefe" }
      ],
      verification: "Bağımsız icra, taksim, eşlik, eğitim verebilir düzey"
    }
  ],

  // Finger positions database (complete for all notes and octaves)
  fingerPositions: [
    // First octave (pes tescil)
    { note: "Fa", noteWestern: "F", octave: 1, freq: 349.23, holes: [1, 1, 1, 1, 1, 1, 1], thumb: 1, breath: "hafif", description: "Tüm delikler kapalı" },
    { note: "Sol", noteWestern: "G", octave: 1, freq: 392.00, holes: [0, 1, 1, 1, 1, 1, 1], thumb: 1, breath: "orta", description: "Alt 1 delik açık" },
    { note: "La", noteWestern: "A", octave: 1, freq: 440.00, holes: [0, 0, 1, 1, 1, 1, 1], thumb: 1, breath: "orta", description: "Alt 2 delik açık" },
    { note: "Si♭", noteWestern: "Bb", octave: 1, freq: 466.16, holes: [0, 0, 0, 1, 1, 1, 1], thumb: 1, breath: "orta", description: "Alt 3 delik açık" },
    { note: "Do", noteWestern: "C", octave: 1, freq: 523.25, holes: [0, 0, 0, 0, 1, 1, 1], thumb: 1, breath: "orta", description: "Alt 4 delik açık" },
    { note: "Re", noteWestern: "D", octave: 1, freq: 587.33, holes: [0, 0, 0, 0, 0, 1, 1], thumb: 1, breath: "orta", description: "Alt 5 delik açık" },
    { note: "Mi", noteWestern: "E", octave: 1, freq: 659.25, holes: [0, 0, 0, 0, 0, 0, 1], thumb: 1, breath: "orta", description: "Alt 6 delik açık" },
    { note: "Fa#", noteWestern: "F#", octave: 1, freq: 739.99, holes: [0, 0, 0, 0, 0, 0, 0], thumb: 1, breath: "orta", description: "Tüm delikler açık" },

    // Second octave (orta tescil)
    { note: "Sol", noteWestern: "G", octave: 2, freq: 783.99, holes: [0, 1, 1, 1, 1, 1, 1], thumb: 1, breath: "kuvvetli", description: "Orta tescil Sol" },
    { note: "La", noteWestern: "A", octave: 2, freq: 880.00, holes: [0, 0, 1, 1, 1, 1, 1], thumb: 1, breath: "kuvvetli", description: "Orta tescil La" },
    { note: "Si♭", noteWestern: "Bb", octave: 2, freq: 932.33, holes: [0, 0, 0, 1, 1, 1, 1], thumb: 1, breath: "kuvvetli", description: "Orta tescil Si♭" },
    { note: "Do", noteWestern: "C", octave: 2, freq: 1046.50, holes: [0, 0, 0, 0, 1, 1, 1], thumb: 1, breath: "kuvvetli", description: "Orta tescil Do" },
    { note: "Re", noteWestern: "D", octave: 2, freq: 1174.66, holes: [0, 0, 0, 0, 0, 1, 1], thumb: 1, breath: "kuvvetli", description: "Orta tescil Re" },
    { note: "Mi", noteWestern: "E", octave: 2, freq: 1318.51, holes: [0, 0, 0, 0, 0, 0, 1], thumb: 1, breath: "kuvvetli", description: "Orta tescil Mi" },
    { note: "Fa#", noteWestern: "F#", octave: 2, freq: 1479.98, holes: [0, 0, 0, 0, 0, 0, 0], thumb: 1, breath: "kuvvetli", description: "Orta tescil Fa#" },

    // Third octave (tiz tescil)
    { note: "Sol", noteWestern: "G", octave: 3, freq: 1567.98, holes: [0, 1, 1, 1, 1, 1, 1], thumb: 1, breath: "çok kuvvetli", description: "Tiz tescil Sol" },
    { note: "La", noteWestern: "A", octave: 3, freq: 1760.00, holes: [0, 0, 1, 1, 1, 1, 1], thumb: 1, breath: "çok kuvvetli", description: "Tiz tescil La" },
    { note: "Si♭", noteWestern: "Bb", octave: 3, freq: 1864.66, holes: [0, 0, 0, 1, 1, 1, 1], thumb: 1, breath: "çok kuvvetli", description: "Tiz tescil Si♭" },
    { note: "Do", noteWestern: "C", octave: 3, freq: 2093.00, holes: [0, 0, 0, 0, 1, 1, 1], thumb: 1, breath: "çok kuvvetli", description: "Tiz tescil Do" },
    { note: "Re", noteWestern: "D", octave: 3, freq: 2349.32, holes: [0, 0, 0, 0, 0, 1, 1], thumb: 1, breath: "çok kuvvetli", description: "Tiz tescil Re" },
    { note: "Mi", noteWestern: "E", octave: 3, freq: 2637.02, holes: [0, 0, 0, 0, 0, 0, 1], thumb: 1, breath: "çok kuvvetli", description: "Tiz tescil Mi" }
  ],

  // Makams database (15+ makams)
  makams: [
    { name: "Rast", key: "Sol", family: "Rast", type: "Çıkıcı", durak: "Sol (Rast)", guclu: "Re (Neva)", yeden: "Fa# (Irak)", description: "Tam, kararlı, vakur bir makam", scale: ["Sol", "La", "Si♭", "Do", "Re", "Mi", "Fa#", "Sol"], mood: "Huzurlu, kararlı", usage: "İlahi, peşrev, taksim" },
    { name: "Uşşak", key: "La", family: "Uşşak", type: "Çıkıcı", durak: "La (Dügâh)", guclu: "Re (Neva)", yeden: "Sol (Rast)", description: "Hüzünlü ama umutlu", scale: ["La", "Si♭", "Do", "Re", "Mi", "Fa#", "Sol", "La"], mood: "Hüzünlü, romantik", usage: "Şarkı, ilahi, taksim" },
    { name: "Buselik", key: "La", family: "Buselik", type: "Çıkıcı", durak: "La (Dügâh)", guclu: "Mi (Hüseyni)", yeden: "Sol (Rast)", description: "Yalın, sade makam", scale: ["La", "Si♭", "Do", "Re", "Mi", "Fa", "Sol", "La"], mood: "Sade, doğal", usage: "İlahi, şarkı" },
    { name: "Kürdi", key: "La", family: "Kürdi", type: "İnici", durak: "La (Dügâh)", guclu: "Re (Neva)", yeden: "Sol#", description: "Minor karakter, hüzünlü", scale: ["La", "Si", "Do", "Re", "Mi", "Fa", "Sol#", "La"], mood: "Hüzünlü, dramatik", usage: "Şarkı, taksim" },
    { name: "Hicaz", key: "La", family: "Hicaz", type: "Çıkıcı", durak: "La (Dügâh)", guclu: "Mi (Hüseyni)", yeden: "Sol#", description: "Dramatik, augmented 2nd aralık", scale: ["La", "Si♭", "Do#", "Re", "Mi", "Fa", "Sol#", "La"], mood: "Dramatik, tutkulu", usage: "Şarkı, ilahi, taksim" },
    { name: "Segâh", key: "Mi", family: "Segâh", type: "İnici-Çıkıcı", durak: "Mi (Segâh)", guclu: "La (Dügâh)", yeden: "Re (Çargâh)", description: "Mistik, Mevlevi müziği", scale: ["Mi", "Fa", "Sol#", "La", "Si♭", "Do", "Re#", "Mi"], mood: "Mistik, derin", usage: "Mevlevi, ilahi, taksim" },
    { name: "Hüseyni", key: "Mi", family: "Hüseyni", type: "İnici-Çıkıcı", durak: "Mi (Hüseyni)", guclu: "La (Dügâh)", yeden: "Re (Çargâh)", description: "Yiğitlik, gurur makamı", scale: ["Mi", "Fa#", "Sol", "La", "Si♭", "Do", "Re", "Mi"], mood: "Yiğit, gururlu", usage: "Peşrev, şarkı" },
    { name: "Nihavend", key: "La", family: "Nihavend", type: "Çıkıcı", durak: "La (Dügâh)", guclu: "Re (Neva)", yeden: "Sol (Rast)", description: "Batı minörüne yakın", scale: ["La", "Si", "Do", "Re", "Mi", "Fa", "Sol", "La"], mood: "Hüzünlü, lirik", usage: "Şarkı, taksim" },
    { name: "Muhayyer", key: "La", family: "Uşşak", type: "İnici", durak: "La (Muhayyer)", guclu: "Re (Neva)", yeden: "Sol (Rast)", description: "Uşşak'ın tiz versiyonu", scale: ["La", "Si♭", "Do", "Re", "Mi", "Fa#", "Sol", "La"], mood: "Hüzünlü, zarif", usage: "Şarkı, ilahi" },
    { name: "Bayâtî", key: "La", family: "Uşşak", type: "Çıkıcı", durak: "La (Dügâh)", guclu: "Re (Neva)", yeden: "Sol (Rast)", description: "Uşşak ailesi, farklı genişleme", scale: ["La", "Si♭", "Do", "Re", "Mi", "Fa#", "La", "Si♭"], mood: "Hüzünlü, içli", usage: "İlahi, şarkı" },
    { name: "Acemaşîran", key: "Fa", family: "Rast", type: "Çıkıcı", durak: "Fa (Aşîran)", guclu: "Do (Çargâh)", yeden: "Mi (Hüseyni)", description: "Fa durakta çargâh beşlisi", scale: ["Fa", "Sol", "La", "Si♭", "Do", "Re", "Mi", "Fa"], mood: "Ağır, vakur", usage: "Peşrev, taksim" },
    { name: "Sultanîyegâh", key: "La", family: "Sultanîyegâh", type: "İnici", durak: "La (Dügâh)", guclu: "Re (Neva)", yeden: "Sol (Rast)", description: "Ağır hüzün, iniçi seyir", scale: ["La", "Si♭", "Do", "Re", "Mi", "Fa#", "Sol", "La"], mood: "Ağır hüzün, asil", usage: "Ağır semai, taksim" },
    { name: "Sûzinâk", key: "La", family: "Sûzinâk", type: "Çıkıcı", durak: "La (Dügâh)", guclu: "Mi (Hüseyni)", yeden: "Sol#", description: "Rast + Hicaz birleşimi", scale: ["La", "Si♭", "Do#", "Re", "Mi", "Fa#", "Sol", "La"], mood: "Yanıcı, tutkulu", usage: "Şarkı, taksim" },
    { name: "Şedaraban", key: "La", family: "Şedaraban", type: "Çıkıcı", durak: "La (Dügâh)", guclu: "Mi (Hüseyni)", yeden: "Sol#", description: "Çift augmented aralık", scale: ["La", "Si♭", "Do#", "Re", "Mi", "Fa#", "Sol#", "La"], mood: "Çok dramatik", usage: "Taksim, şarkı" },
    { name: "Eviç", key: "Si", family: "Eviç", type: "Çıkıcı", durak: "Si (Eviç)", guclu: "Fa# (Irak)", yeden: "La (Dügâh)", description: "Nadir makam, parlak", scale: ["Si", "Do#", "Re#", "Mi", "Fa#", "Sol#", "La", "Si"], mood: "Parlak, neşeli", usage: "Taksim, şarkı" }
  ],

  // Usuls database (8 usuls)
  usuls: [
    { name: "Düyek", beats: 8, timeSignature: "8/8", pattern: ["düm", "tek", "tek", "ka", "düm", "tek", "tek", "ka"], accents: [1, 0, 0, 0, 1, 0, 0, 0], bpm: 80, description: "En yaygın usul", usage: "Şarkı, ilahi, zeybek" },
    { name: "Sofyan", beats: 4, timeSignature: "4/4", pattern: ["düm", "tek", "tek", ""], accents: [1, 0, 0, 0], bpm: 100, description: "Basit usul", usage: "Ağır eserler" },
    { name: "Aksak", beats: 9, timeSignature: "9/8", pattern: ["düm", "tek", "tek", "düm", "tek"], accents: [1, 0, 0, 1, 0], bpm: 90, description: "Aksak ritim (2+2+2+3)", usage: "Türküler, halk ezgileri" },
    { name: "Yürüksemai", beats: 6, timeSignature: "6/8", pattern: ["düm", "tek", "tek", "düm", "tek", ""], accents: [1, 0, 0, 1, 0, 0], bpm: 120, description: "Hızlı usul", usage: "Şarkı, oyun havası" },
    { name: "Sengin Semai", beats: 6, timeSignature: "6/4", pattern: ["düm", "tek", "tek", "düm", "tek", ""], accents: [1, 0, 0, 1, 0, 0], bpm: 50, description: "Ağır semai usulü", usage: "Ağır semai" },
    { name: "Türk Aksağı", beats: 5, timeSignature: "5/8", pattern: ["düm", "tek", "düm", "tek", ""], accents: [1, 0, 1, 0, 0], bpm: 85, description: "5/8 aksak (2+3 veya 3+2)", usage: "Türküler" },
    { name: "Devr-i Kebir", beats: 28, timeSignature: "28/4", pattern: ["düm", "tek", "tek", "düm", "tek", "tek", "düm", "tek"], accents: [1, 0, 0, 1, 0, 0, 1, 0], bpm: 40, description: "Büyük usul", usage: "Kâr, ağır eserler" },
    { name: "Ağır Aksak", beats: 9, timeSignature: "9/4", pattern: ["düm", "tek", "tek", "düm", "tek"], accents: [1, 0, 0, 1, 0], bpm: 45, description: "Ağır aksak", usage: "Ağır eserler" }
  ],

  // Song database
  songs: [
    { title: "Rast Peşrevi", composer: "Tanburi Cemil Bey", makam: "Rast", usul: "Düyek", difficulty: "Orta", phase: 11, notes: ["Sol", "La", "Si♭", "Do", "Re", "Do", "Si♭", "La", "Sol"] },
    { title: "Uşşak Peşrev", composer: "Cemil Reşit Rey", makam: "Uşşak", usul: "Düyek", difficulty: "Orta", phase: 11, notes: ["La", "Si♭", "Do", "Re", "Mi", "Re", "Do", "Si♭", "La"] },
    { title: "Hicaz Saz Semaisi", composer: "Refik Talat Alpman", makam: "Hicaz", usul: "Aksak", difficulty: "İleri", phase: 11, notes: ["La", "Si♭", "Do#", "Re", "Mi", "Re", "Do#", "Si♭", "La"] },
    { title: "Rast İlahi", composer: "Geleneksel", makam: "Rast", usul: "Sofyan", difficulty: "Başlangıç", phase: 4, notes: ["Sol", "Sol", "La", "Si♭", "Do", "Re", "Do", "Si♭", "La", "Sol"] },
    { title: "Kürdilihicazkâr", composer: "Hacı Arif Bey", makam: "Kürdilihicazkâr", usul: "Yürüksemai", difficulty: "İleri", phase: 11, notes: ["La", "Si♭", "Do#", "Re", "Mi", "Fa", "Sol#", "La"] },
    { title: "Segâh Taksim", composer: "Neyzen Tevfik", makam: "Segâh", usul: "Serbest", difficulty: "İleri", phase: 9, notes: ["Mi", "Fa", "Sol#", "La", "Si♭", "La", "Sol#", "Fa", "Mi"] }
  ],

  // Golden ratio practice distribution
  goldenRatio: { technical: 40, theory: 25, repertoire: 25, listening: 10 },

  // Gamification levels (10 levels)
  levels: [
    { level: 1, title: "Meraklı", minXP: 0, maxXP: 100 },
    { level: 2, title: "Çırak", minXP: 100, maxXP: 300 },
    { level: 3, title: "Talebe", minXP: 300, maxXP: 600 },
    { level: 4, title: "Nevâzen", minXP: 600, maxXP: 1000 },
    { level: 5, title: "Meşkçi", minXP: 1000, maxXP: 1500 },
    { level: 6, title: "Sâzende", minXP: 1500, maxXP: 2200 },
    { level: 7, title: "Hânende", minXP: 2200, maxXP: 3000 },
    { level: 8, title: "Neyzen", minXP: 3000, maxXP: 4000 },
    { level: 9, title: "Üstad", minXP: 4000, maxXP: 5500 },
    { level: 10, title: "Pîr", minXP: 5500, maxXP: 999999 }
  ],

  // Badges (15 badges)
  badges: [
    { id: "first_sound", name: "İlk Dem", description: "İlk stabil dem sesi", icon: "🎵", requirement: "Faz 1 tamamla" },
    { id: "first_notes", name: "İlk Notalar", description: "7 temel notayı çal", icon: "🎶", requirement: "Faz 2 tamamla" },
    { id: "note_reader", name: "Nota Okur", description: "Porte okuyabilme", icon: "📝", requirement: "Faz 3 tamamla" },
    { id: "first_songs", name: "İlk Ezgiler", description: "5 parça ezberle", icon: "🎵", requirement: "Faz 4 tamamla" },
    { id: "makam_apprentice", name: "Makam Çırağı", description: "5 makamı tanı", icon: "🎼", requirement: "Faz 5 tamamla" },
    { id: "rhythm_master", name: "Ritim Ustası", description: "6 usulü bil", icon: "🥁", requirement: "Faz 6 tamamla" },
    { id: "vibrato", name: "Titreşim", description: "Vibrato yapabilmek", icon: "🎭", requirement: "Faz 7 tamamla" },
    { id: "makam_master", name: "Makam Avcısı", description: "15 makamı tanı", icon: "🌟", requirement: "Faz 8 tamamla" },
    { id: "taksim", name: "Taksim Ustası", description: "3 makamda taksim", icon: "🎨", requirement: "Faz 9 tamamla" },
    { id: "sufi", name: "Sufi", description: "Mevlevi ayini icra", icon: "🕌", requirement: "Faz 10 tamamla" },
    { id: "repertoire", name: "Repertuvar", description: "20+ eser", icon: "👑", requirement: "Faz 11 tamamla" },
    { id: "neyzen", name: "Neyzen", description: "Tüm fazları tamamla", icon: "🏆", requirement: "Faz 12 tamamla" },
    { id: "100_hours", name: "100 Saat", description: "100 saat pratik", icon: "⏰", requirement: "100 saat pratik" },
    { id: "streak_7", name: "1 Hafta", description: "7 günlük seri", icon: "🔥", requirement: "7 gün seri" },
    { id: "streak_30", name: "1 Ay", description: "30 günlük seri", icon: "🔥🔥", requirement: "30 gün seri" }
  ],

  // Practice time recommendations per phase
  practiceRecommendations: {
    1: { daily: 60, technical: 40, theory: 15, repertoire: 0, listening: 5 },
    2: { daily: 90, technical: 50, theory: 20, repertoire: 15, listening: 5 },
    3: { daily: 90, technical: 45, theory: 25, repertoire: 15, listening: 5 },
    4: { daily: 120, technical: 50, theory: 25, repertoire: 35, listening: 10 },
    5: { daily: 120, technical: 45, theory: 35, repertoire: 30, listening: 10 },
    6: { daily: 120, technical: 45, theory: 30, repertoire: 35, listening: 10 },
    7: { daily: 150, technical: 60, theory: 30, repertoire: 45, listening: 15 },
    8: { daily: 150, technical: 55, theory: 40, repertoire: 40, listening: 15 },
    9: { daily: 150, technical: 50, theory: 30, repertoire: 50, listening: 20 },
    10: { daily: 180, technical: 60, theory: 40, repertoire: 60, listening: 20 },
    11: { daily: 180, technical: 60, theory: 40, repertoire: 60, listening: 20 },
    12: { daily: 180, technical: 60, theory: 40, repertoire: 60, listening: 20 }
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NeyData;
}
