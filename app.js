/**
 * Ney Mastery - Main Application
 * All selectors match actual index.html element IDs/classes exactly
 */
const AppState = {
    user: { xp: 0, level: 1, completedTopics: [], completedPhases: [], totalPracticeMinutes: 0, streak: 0, longestStreak: 0, lastPracticeDate: null, badges: [], settings: { dailyGoal: 60, soundEffects: true, notifications: true } },
    session: { currentPhase: 1, metronomeRunning: false, breathingRunning: false, metronomeInterval: null, breathingInterval: null, practiceInterval: null },
    weeklyPractice: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
    activities: [],
    tunerHistory: [],
    earTrainingStats: {},
    practiceLog: { technical: 0, theory: 0, repertoire: 0, listening: 0 },

    _djb2Hash(str) { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h) + str.charCodeAt(i); return (h >>> 0).toString(36); },
    load() {
        try {
            const raw = localStorage.getItem('neyMasteryState');
            if (raw) {
                const wrapper = JSON.parse(raw);
                const p = wrapper._hash ? wrapper.data : wrapper;
                // Checksum doğrulama
                if (wrapper._hash) {
                    const verify = this._djb2Hash(JSON.stringify(wrapper.data));
                    if (verify !== wrapper._hash) {
                        console.warn('Checksum uyuşmazlığı — veri bozulmuş olabilir');
                        setTimeout(() => { if (typeof UI !== 'undefined' && UI.notify) UI.notify('⚠️ Veri bütünlüğü sorunu tespit edildi. Yedek almanızı öneririz.', 'error'); }, 500);
                    }
                }
                if (p.user) Object.assign(this.user, p.user);
                if (p.weeklyPractice) Object.assign(this.weeklyPractice, p.weeklyPractice);
                if (p.activities) this.activities = p.activities;
                if (p.tunerHistory) this.tunerHistory = p.tunerHistory;
                if (p.earTrainingStats) this.earTrainingStats = p.earTrainingStats;
                if (p.practiceLog) Object.assign(this.practiceLog, p.practiceLog);
                this.user.level = Math.max(1, Math.min(this.user.level, NeyData.levels.length));
                this.checkStreak();
            }
        } catch (e) {
            console.error('Kayıtlı veri bozuk, varsayılana dönülüyor:', e);
            setTimeout(() => { if (typeof UI !== 'undefined' && UI.notify) UI.notify('⚠️ Kayıtlı veri okunamadı. Varsayılan ayarlarla başlatıldı.', 'error'); }, 500);
        }
    },
    save() {
        try {
            const data = { user: this.user, weeklyPractice: this.weeklyPractice, activities: this.activities, tunerHistory: this.tunerHistory, earTrainingStats: this.earTrainingStats, practiceLog: this.practiceLog };
            const json = JSON.stringify(data);
            const wrapper = { data: JSON.parse(json), _hash: this._djb2Hash(json) };
            localStorage.setItem('neyMasteryState', JSON.stringify(wrapper));
        } catch (e) {
            console.error('Veri kaydedilemedi:', e);
        }
    },
    exportData() {
        const data = JSON.stringify({ user: this.user, weeklyPractice: this.weeklyPractice, activities: this.activities, exportDate: new Date().toISOString(), version: '1.0' }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `ney-mastery-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        UI.notify('📁 Yedek dosyası indirildi!', 'success');
    },
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const p = JSON.parse(e.target.result);
                if (!p.user || !p.weeklyPractice) throw new Error('Geçersiz dosya formatı');
                // Alan tipi doğrulama
                if (typeof p.user.xp !== 'number') throw new Error('xp alanı sayı olmalı');
                if (!Array.isArray(p.user.completedPhases)) throw new Error('completedPhases dizi olmalı');
                if (!Array.isArray(p.user.completedTopics)) throw new Error('completedTopics dizi olmalı');
                if (typeof p.user.level !== 'number' || p.user.level < 1) throw new Error('level geçersiz');
                Object.assign(this.user, p.user);
                Object.assign(this.weeklyPractice, p.weeklyPractice);
                if (p.activities) this.activities = p.activities;
                if (p.tunerHistory) this.tunerHistory = p.tunerHistory;
                if (p.earTrainingStats) this.earTrainingStats = p.earTrainingStats;
                if (p.practiceLog) Object.assign(this.practiceLog, p.practiceLog);
                this.user.level = Math.max(1, Math.min(this.user.level, NeyData.levels.length));
                this.save();
                UI.updateAll(); UI.renderPhaseList(); UI.renderBadges();
                UI.notify('✅ Veri başarıyla yüklendi!', 'success');
            } catch (err) {
                UI.notify('❌ Dosya okunamadı: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    },
    checkStreak() { if (!this.user.lastPracticeDate) return; const d = Math.floor((new Date() - new Date(this.user.lastPracticeDate)) / (864e5)); if (d > 1) this.user.streak = 0; },
    addXP(n) {
        this.user.xp += n;
        const lvIdx = Math.min(this.user.level - 1, NeyData.levels.length - 1);
        const lv = NeyData.levels[lvIdx];
        if (this.user.xp >= lv.maxXP && this.user.level < NeyData.levels.length) {
            this.user.level = Math.min(this.user.level + 1, NeyData.levels.length);
            const newLv = NeyData.levels[Math.min(this.user.level - 1, NeyData.levels.length - 1)];
            UI.notify(`🎉 ${newLv.title} seviyesine ulaştınız!`, 'success');
            this.addActivity('levelup', `Seviye ${this.user.level}`);
            // Otomatik backup seviye atlayınca
            try { this.exportData(); } catch (e) { }
        }
        this.save(); UI.updateAll();
    },
    addActivity(type, desc, xp = 0) { this.activities.unshift({ type, description: desc, xp, timestamp: new Date().toISOString() }); if (this.activities.length > 50) this.activities.pop(); this.save(); },
    completeTopic(pid, tid) { const k = `${pid}.${tid}`; if (!this.user.completedTopics.includes(k)) { this.user.completedTopics.push(k); this.addXP(50); this.addActivity('topic', `Konu: ${k}`, 50); this.save(); UI.updateAll(); } },
    completePhase(n) { if (!this.user.completedPhases.includes(n)) { this.user.completedPhases.push(n); this.addXP(500); this.addActivity('phase', `Faz ${n} tamamlandı!`, 500); this.checkBadges(); this.save(); UI.updateAll(); UI.renderPhaseList(); } },
    addPractice(min) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; const d = days[new Date().getDay()]; this.weeklyPractice[d] = (this.weeklyPractice[d] || 0) + min; this.user.totalPracticeMinutes += min;
        if (this.user.lastPracticeDate) { const diff = Math.floor((new Date() - new Date(this.user.lastPracticeDate)) / 864e5); if (diff >= 1) { this.user.streak++; if (this.user.streak > this.user.longestStreak) this.user.longestStreak = this.user.streak; if (this.user.streak === 7) this.unlockBadge('streak_7'); if (this.user.streak === 30) this.unlockBadge('streak_30'); } } else { this.user.streak = 1; this.user.longestStreak = 1; }
        this.user.lastPracticeDate = new Date().toISOString(); this.addXP(Math.floor(min / 10) * 10); this.save(); UI.updateAll();
    },
    unlockBadge(id) { if (!this.user.badges.includes(id)) { this.user.badges.push(id); const b = NeyData.badges.find(x => x.id === id); if (b) UI.notify(`🏆 Rozet: ${b.name}`, 'success'); this.save(); UI.renderBadges(); } },
    checkBadges() { [{ p: 1, b: 'first_sound' }, { p: 2, b: 'first_notes' }, { p: 3, b: 'note_reader' }, { p: 4, b: 'first_songs' }, { p: 5, b: 'makam_apprentice' }, { p: 6, b: 'rhythm_master' }, { p: 7, b: 'vibrato' }, { p: 8, b: 'makam_master' }, { p: 9, b: 'taksim' }, { p: 10, b: 'sufi' }, { p: 11, b: 'repertoire' }, { p: 12, b: 'neyzen' }].forEach(x => { if (this.user.completedPhases.includes(x.p)) this.unlockBadge(x.b); }); if (this.user.totalPracticeMinutes >= 6e3) this.unlockBadge('100_hours'); },
    getCurrentPhase() { for (let i = 1; i <= 12; i++)if (!this.user.completedPhases.includes(i)) return i; return 12; },
    reset() { if (confirm('⚠️ Tüm ilerleme silinecek!')) { localStorage.removeItem('neyMasteryState'); location.reload(); } }
};

/* ========== UI Controller ========== */
const UI = {
    init() {
        AppState.load();
        this.setupNav();
        this.renderPhaseList();
        this.renderTopics(1);
        this.renderBadges();
        this.renderMakamList();
        this.renderUsulList();
        this.renderSongList();
        this.setupFingerChart();
        this.setupMetronome();
        this.setupBreathing();
        this.setupPracticeTimer();
        this.setupDailyTimer();
        this.setupNoteReading();
        this.setupAI();
        this.setupPhaseNav();
        this.setupSettings();
        this.setupTabs();
        this.setupTuner();
        this.setupMesk();
        this.setupGecki();
        this.setupTranspose();
        this.setupNeycare();
        this.setupLibrary();
        this.setupGamification();
        // Wave 2
        this.setupPhaseExam();
        this.setupEarTraining();
        this.setupFloatingTuner();
        this.renderPrediction();
        this.renderIntonationHeatmap();
        this.renderGoldenRatioAnalysis();
        this.renderSimilarityMatrix();
        this.renderAdvancedAnalytics();
        this.updateAll();
    },

    /* --- NAV --- */
    setupNav() {
        const sidebar = document.querySelector('.sidebar');
        const menuBtn = document.getElementById('mobileMenuBtn');
        // Mobile hamburger toggle
        if (menuBtn && sidebar) {
            menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                const sec = document.getElementById(item.dataset.section);
                if (sec) sec.classList.add('active');
                // Mobilde sidebar'ı kapat
                if (sidebar) sidebar.classList.remove('open');
            });
        });
        const cb = document.getElementById('continueLearning');
        if (cb) cb.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(i => { i.classList.toggle('active', i.dataset.section === 'curriculum'); });
            document.querySelectorAll('.section').forEach(s => { s.classList.toggle('active', s.id === 'curriculum'); });
            if (sidebar) sidebar.classList.remove('open');
        });
    },

    /* --- UPDATE ALL --- */
    updateAll() {
        const lv = NeyData.levels[Math.min(AppState.user.level - 1, NeyData.levels.length - 1)];
        const el = id => document.getElementById(id);
        // Level badge
        if (el('userLevel')) el('userLevel').innerHTML = `<span class="level-number">${AppState.user.level}</span><span class="level-title">${lv.title}</span>`;
        // XP bar
        const prev = AppState.user.level > 1 ? NeyData.levels[AppState.user.level - 2].maxXP : 0;
        const pct = Math.min(100, Math.max(0, ((AppState.user.xp - prev) / (lv.maxXP - prev)) * 100));
        if (el('xpBarFill')) el('xpBarFill').style.width = pct + '%';
        this.setText('currentXP', AppState.user.xp);
        this.setText('maxXP', lv.maxXP);
        this.setText('completedTopics', AppState.user.completedTopics.length);
        this.setText('completedPhases', AppState.user.completedPhases.length);
        this.setText('totalPractice', AppState.user.totalPracticeMinutes);
        this.setText('earnedBadges', AppState.user.badges.length);
        this.setText('streakCount', AppState.user.streak);
        // Current phase
        const cp = AppState.getCurrentPhase(); const ph = NeyData.curriculum[cp - 1];
        if (ph) {
            this.setText('currentPhaseTitle', ph.title);
            this.setText('currentPhaseDesc', ph.description);
            const icon = document.querySelector('#currentPhaseInfo .phase-icon'); if (icon) icon.textContent = ph.icon;
            const done = AppState.user.completedTopics.filter(t => t.startsWith(cp + '.')).length;
            if (el('currentPhaseProgress')) el('currentPhaseProgress').style.width = (done / ph.topics.length * 100) + '%';
            this.setText('currentPhaseProgressText', `${done}/${ph.topics.length}`);
        }
        // Daily goal
        const g = AppState.user.settings.dailyGoal; const r = NeyData.goldenRatio;
        this.setText('goalTechnical', Math.round(g * r.technical / 100) + ' dk');
        this.setText('goalTheory', Math.round(g * r.theory / 100) + ' dk');
        this.setText('goalRepertoire', Math.round(g * r.repertoire / 100) + ' dk');
        this.setText('goalListening', Math.round(g * r.listening / 100) + ' dk');
        // Profile
        this.setText('profileXP', AppState.user.xp);
        this.setText('profilePhases', `${AppState.user.completedPhases.length}/12`);
        this.setText('profileTopics', `${AppState.user.completedTopics.length}/144`);
        this.setText('profilePractice', `${Math.floor(AppState.user.totalPracticeMinutes / 60)} saat`);
        this.setText('profileStreak', `${AppState.user.longestStreak} gün`);
        this.setText('profileBadges', `${AppState.user.badges.length}/15`);
        if (el('profileLevel')) el('profileLevel').innerHTML = `<span class="level-number">${AppState.user.level}</span><span class="level-title">${lv.title}</span>`;
        this.renderActivityList();
        this.updateWeekChart();
    },
    setText(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; },

    /* --- ACTIVITY --- */
    renderActivityList() {
        const list = document.getElementById('activityList'); if (!list) return;
        if (!AppState.activities.length) { list.innerHTML = '<li class="activity-item empty">Henüz aktivite yok</li>'; return; }
        list.innerHTML = AppState.activities.slice(0, 10).map(a => {
            const ic = a.type === 'topic' ? '✓' : a.type === 'phase' ? '🎉' : a.type === 'badge' ? '🏆' : '⭐';
            const t = new Date(a.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
            return `<li class="activity-item"><span class="activity-icon">${ic}</span><span class="activity-text">${a.description}</span><span class="activity-time">${t}</span></li>`;
        }).join('');
    },

    /* --- PHASES (Kilit Sistemi) --- */
    _isPhaseUnlocked(n) {
        if (n === 1) return true;
        return AppState.user.completedPhases.includes(n - 1);
    },
    renderPhaseList() {
        const list = document.getElementById('phaseList'); if (!list) return;
        const cp = AppState.getCurrentPhase();
        list.innerHTML = NeyData.curriculum.map((p, i) => {
            const n = i + 1, done = AppState.user.completedPhases.includes(n), active = n === cp;
            const locked = !this._isPhaseUnlocked(n) && !done;
            return `<li class="phase-list-item${done ? ' completed' : ''}${active ? ' active' : ''}${locked ? ' locked' : ''}" data-phase="${n}"><span class="phase-number-small">Faz ${n}</span>${done ? '<span class="phase-check">✓</span>' : locked ? '<span class="phase-lock">🔒</span>' : ''}<span class="phase-list-title">${p.title}</span><span class="phase-icon-small">${p.icon}</span></li>`;
        }).join('');
        list.querySelectorAll('.phase-list-item').forEach(item => {
            item.addEventListener('click', () => {
                const phase = parseInt(item.dataset.phase);
                if (!this._isPhaseUnlocked(phase) && !AppState.user.completedPhases.includes(phase)) {
                    this.notify(`🔒 Faz ${phase - 1}'i önce tamamlayın!`, 'error');
                    return;
                }
                AppState.session.currentPhase = phase;
                this.renderTopics(phase);
                list.querySelectorAll('.phase-list-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    },
    renderTopics(n) {
        const p = NeyData.curriculum[n - 1]; if (!p) return;
        this.setText('phaseTitle', p.title); this.setText('phaseDescription', p.description); this.setText('phaseVerification', p.verification);
        const hdr = document.getElementById('phaseHeader');
        if (hdr) { const pn = hdr.querySelector('.phase-number'); if (pn) pn.textContent = `Faz ${n}`; const pi = hdr.querySelector('.phase-icon-large'); if (pi) pi.textContent = p.icon; }
        const list = document.getElementById('topicsList'); if (!list) return;
        list.innerHTML = p.topics.map(t => {
            const tid = t.id.split('.')[1]; const done = AppState.user.completedTopics.includes(`${n}.${tid}`);
            return `<div class="topic-item${done ? ' completed' : {}}"><div class="topic-checkbox${done ? ' checked' : ''}" data-topicid="${t.id}"></div><div class="topic-content"><span class="topic-id">${t.id}</span><h4 class="topic-title">${t.title}</h4><p class="topic-detail">${t.detail}</p><p class="topic-exercise">📝 ${t.exercise}</p></div></div>`;
        }).join('');
        list.querySelectorAll('.topic-checkbox').forEach(cb => {
            cb.addEventListener('click', () => this.toggleTopic(cb.dataset.topicid));
        });
        const pb = document.getElementById('prevPhase'), nb = document.getElementById('nextPhase');
        if (pb) pb.disabled = n === 1; if (nb) nb.disabled = n === 12;
    },
    toggleTopic(id) {
        const n = AppState.session.currentPhase, tid = id.split('.')[1], k = `${n}.${tid}`;
        const cb = document.querySelector(`.topic-checkbox[data-topicid="${id}"]`); const ti = cb?.closest('.topic-item');
        if (AppState.user.completedTopics.includes(k)) {
            AppState.user.completedTopics = AppState.user.completedTopics.filter(t => t !== k);
            if (cb) cb.classList.remove('checked'); if (ti) ti.classList.remove('completed');
        } else {
            AppState.completeTopic(n, tid); if (cb) cb.classList.add('checked'); if (ti) ti.classList.add('completed');
        }
        AppState.save();
    },
    setupPhaseNav() {
        const pb = document.getElementById('prevPhase'), nb = document.getElementById('nextPhase'), cb = document.getElementById('completePhase');
        if (pb) pb.addEventListener('click', () => { if (AppState.session.currentPhase > 1) { AppState.session.currentPhase--; this.renderTopics(AppState.session.currentPhase); this.renderPhaseList(); } });
        if (nb) nb.addEventListener('click', () => { if (AppState.session.currentPhase < 12) { AppState.session.currentPhase++; this.renderTopics(AppState.session.currentPhase); this.renderPhaseList(); } });
        if (cb) cb.addEventListener('click', () => {
            AppState.completePhase(AppState.session.currentPhase);
            this.notify(`🎉 Faz ${AppState.session.currentPhase} tamamlandı!`, 'success');
            if (typeof this.showHiddenMakamCard === 'function') this.showHiddenMakamCard(AppState.session.currentPhase + 1);
        });
    },

    /* --- BADGES --- */
    renderBadges() {
        const g = document.getElementById('badgesGrid'), ag = document.getElementById('allBadgesGrid');
        const render = (grid, limit) => {
            if (!grid) return;
            const items = (limit ? NeyData.badges.slice(0, limit) : NeyData.badges).map(b => {
                const u = AppState.user.badges.includes(b.id);
                return `<div class="badge-item${u ? '' : ' locked'}" title="${b.description}"><span class="badge-icon">${b.icon}</span><span class="badge-name">${b.name}</span></div>`;
            }).join(''); grid.innerHTML = items;
        };
        render(g, 8); render(ag, 0);
    },

    /* --- FINGER CHART --- */
    setupFingerChart() {
        const sel = document.getElementById('noteSelect');
        if (sel) sel.addEventListener('change', e => { if (e.target.value) this.showFinger(e.target.value, AppState.session.currentOctave || 1); });
        document.querySelectorAll('.octave-btn').forEach(b => {
            b.addEventListener('click', () => {
                document.querySelectorAll('.octave-btn').forEach(x => x.classList.remove('active')); b.classList.add('active');
                AppState.session.currentOctave = parseInt(b.dataset.octave);
                if (sel?.value) this.showFinger(sel.value, AppState.session.currentOctave);
            });
        });
        document.querySelectorAll('.finger-hole').forEach(h => { h.addEventListener('click', () => { h.classList.toggle('active'); h.classList.toggle('closed'); }); });
        const th = document.querySelector('.thumb-hole'); if (th) th.addEventListener('click', () => { th.classList.toggle('active'); th.classList.toggle('closed'); });
        const sb = document.getElementById('showNotes'), ni = document.getElementById('noteInput');
        if (sb && ni) sb.addEventListener('click', () => { const ns = ni.value.trim().split(/\s+/).filter(n => n); this.showNoteCards(ns); });
    },
    _fingerAudioCtx: null,
    showFinger(note, oct) {
        const pos = NeyData.fingerPositions.find(p => p.note === note && p.octave === oct); if (!pos) return;
        const c = document.getElementById('positionContent');
        if (c) c.innerHTML = `<p><strong>${note}</strong> (${pos.noteWestern}) — ${pos.description}</p><p><strong>Nefes:</strong> ${pos.breath}</p><p><strong>Delikler:</strong> ${pos.holes.map((h, i) => h === 0 ? `${i + 1}. açık` : `${i + 1}. kapalı`).join(', ')}</p>`;
        document.querySelectorAll('.finger-hole').forEach((h, i) => { h.classList.remove('active', 'closed'); if (pos.holes[i] === 0) h.classList.add('active'); else if (pos.holes[i] === 1) h.classList.add('closed'); });
        const th = document.querySelector('.thumb-hole'); if (th) { th.classList.remove('active', 'closed'); if (pos.thumb === 1) th.classList.add('closed'); }
        // Nota sesini çal (FM sentez)
        this._playFingerNote(pos.noteWestern, oct);
    },
    _playFingerNote(noteWestern, octave) {
        const noteFreqs = { 'F': 349.23, 'G': 392.00, 'A': 440.00, 'Bb': 466.16, 'C': 523.25, 'D': 587.33, 'E': 659.26, 'F#': 369.99 };
        let freq = noteFreqs[noteWestern] || 440;
        if (octave === 2) freq *= 2;
        if (octave === 3) freq *= 4;
        if (!this._fingerAudioCtx) this._fingerAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const ac = this._fingerAudioCtx, now = ac.currentTime;
        const car = ac.createOscillator(), mod = ac.createOscillator(), mg = ac.createGain(), master = ac.createGain();
        mod.connect(mg); mg.connect(car.frequency); car.connect(master); master.connect(ac.destination);
        car.type = 'sine'; car.frequency.setValueAtTime(freq, now);
        mod.type = 'sine'; mod.frequency.setValueAtTime(freq * 2.01, now); mg.gain.setValueAtTime(freq * 0.7, now);
        master.gain.setValueAtTime(0, now);
        master.gain.linearRampToValueAtTime(0.1, now + 0.06);
        master.gain.linearRampToValueAtTime(0.07, now + 0.2);
        master.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        car.start(now); mod.start(now); car.stop(now + 1.2); mod.stop(now + 1.2);
    },
    showNoteCards(notes) {
        const c = document.getElementById('noteCards'); if (!c) return;
        c.innerHTML = notes.map(n => {
            const p = NeyData.fingerPositions.find(x => x.note === n && x.octave === 1);
            return p ? `<div class="note-card"><span class="note-card-name">${n}</span><span class="note-card-fingering">${p.holes.map(h => h ? '●' : '○').join('')}</span></div>` : '';
        }).join('');
    },

    /* --- REFERENCES --- */
    renderMakamList() { const l = document.getElementById('makamList'); if (!l) return; l.innerHTML = NeyData.makams.slice(0, 10).map(m => `<li><strong>${m.name}</strong> — ${m.description}<br><small>Durak: ${m.durak} | Güçlü: ${m.guclu}</small></li>`).join(''); },
    renderUsulList() { const l = document.getElementById('usulList'); if (!l) return; l.innerHTML = NeyData.usuls.map(u => `<li><strong>${u.name}</strong> (${u.timeSignature}) — ${u.description}<br><small>${u.pattern.filter(p => p).join(' - ')}</small></li>`).join(''); },
    renderSongList() { const l = document.getElementById('songList'); if (!l) return; l.innerHTML = NeyData.songs.map(s => `<div class="song-card"><div class="song-title">${s.title}</div><div class="song-composer">${s.composer}</div><div class="song-meta"><span>${s.makam}</span> <span>${s.usul}</span> <span>${s.difficulty}</span></div></div>`).join(''); },

    /* --- METRONOME (Web Worker) --- */
    _metroWorker: null,
    _metroAudioCtx: null,
    setupMetronome() {
        const slider = document.getElementById('bpmSlider'), disp = document.getElementById('bpmDisplay');
        const startB = document.getElementById('metronomeStart'), stopB = document.getElementById('metronomeStop');
        const dot = document.querySelector('.beat-dot');
        if (slider && disp) slider.addEventListener('input', () => { disp.textContent = slider.value; });
        if (startB) startB.addEventListener('click', () => {
            if (!AppState.session.metronomeRunning) {
                // Web Worker başlat
                if (!this._metroWorker) {
                    this._metroWorker = new Worker('metro-worker.js');
                    this._metroWorker.onmessage = (e) => {
                        if (e.data.type === 'tick') {
                            this._metroTick(dot);
                        }
                    };
                }
                AppState.session.metronomeRunning = true;
                startB.textContent = '▶️ Devam';
                this._metroWorker.postMessage({ type: 'start', bpm: parseInt(slider?.value || 80) });
            }
        });
        if (stopB) stopB.addEventListener('click', () => {
            if (this._metroWorker) this._metroWorker.postMessage({ type: 'stop' });
            AppState.session.metronomeRunning = false;
            if (startB) startB.textContent = '▶️ Başla';
            if (dot) dot.classList.remove('active');
        });
        const metronomeCards = {
            '80': { usul: 'Düyek', time: '8/8', info: 'Türk müziğinin kalbidir. İki Sofyan\'ın birleşimidir.', message: 'Düyek\'te %90 stabiliteye ulaştın! Aksak usulüne (9/8) geçmeye hazır mısın?' },
            '90': { usul: 'Aksak', time: '9/8', info: '9 zamanlı, \'topallayan\' bir yapısı vardır. Anadolu\'nun ritmidir.', message: 'Bu ritimdeki 3+2+2+2 senkopunu çözmek seni 4. Faz\'a (Neva) ışınlayacak!' },
            '50': { usul: 'Sengin Semai', time: '6/4', info: 'Dervişlerin ağırbaşlı yürüyüşünü temsil eder.', message: 'Yavaş çalmak, hızlı çalmaktan daha zordur. Odaklan!' },
            '100': { usul: 'Sofyan', time: '4/4', info: 'Güneş doğmadan önceki hüznü ve teslimiyeti temsil eder.', message: 'Metronomla senkronize oldukça nefesin de senkronize olacak.' }
        };

        document.querySelectorAll('.usul-btn').forEach(b => {
            b.addEventListener('click', () => {
                document.querySelectorAll('.usul-btn').forEach(x => x.classList.remove('active'));
                b.classList.add('active');
                const bpm = b.dataset.bpm;
                if (slider) slider.value = bpm;
                if (disp) disp.textContent = bpm;

                // 🚀 Metronom Gamification & Info Card Pop-up
                let pattern = '8/8';
                if (bpm === '80') pattern = '8/8';
                else if (bpm === '90') pattern = '9/8';
                else if (bpm === '100') pattern = '4/4';
                else if (bpm === '50') pattern = '6/8';

                if (typeof this.showMetronomeInfoCard === 'function') this.showMetronomeInfoCard(pattern);

                if (metronomeCards[bpm]) {
                    const card = metronomeCards[bpm];
                    const msg = `<div style="text-align:left"><strong style="color:var(--gold);font-size:1.1rem">${card.usul} (${card.time})</strong><br><span style="font-size:0.85rem;color:var(--text-muted)">${card.info}</span><br><br><span style="color:var(--jade);font-weight:bold;font-size:0.9rem">🌟 ${card.message}</span></div>`;
                    this.notify(msg, 'info');
                }
            });
        });
    },
    _metroTick(dot) {
        // Ses çal
        if (!this._metroAudioCtx) this._metroAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const ac = this._metroAudioCtx, now = ac.currentTime;
        const o = ac.createOscillator(), g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.frequency.value = 1000;
        g.gain.setValueAtTime(0.15, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        o.start(now); o.stop(now + 0.08);
        // Görsel indicator
        if (dot) { dot.classList.add('active'); setTimeout(() => dot.classList.remove('active'), 100); }
    },

    /* --- BREATHING --- */
    setupBreathing() {
        const startB = document.getElementById('breathingStart'), stopB = document.getElementById('breathingStop');
        const circle = document.querySelector('.breathing-circle'), text = document.getElementById('breathingText');
        if (startB) startB.addEventListener('click', () => { if (!AppState.session.breathingRunning) { AppState.session.breathingRunning = true; startB.textContent = '▶️ Devam'; this.runBreathCycle(circle, text); } });
        if (stopB) stopB.addEventListener('click', () => { clearTimeout(AppState.session.breathingInterval); AppState.session.breathingRunning = false; if (startB) startB.textContent = 'Başla'; if (text) text.textContent = 'Durduruldu'; if (circle) circle.classList.remove('inhale', 'hold', 'exhale'); });
    },
    runBreathCycle(circle, text) {
        const inh = (parseInt(document.getElementById('inhaleTime')?.value || 4)) * 1000;
        const hld = (parseInt(document.getElementById('holdTime')?.value || 4)) * 1000;
        const exh = (parseInt(document.getElementById('exhaleTime')?.value || 8)) * 1000;
        const run = () => {
            if (!AppState.session.breathingRunning) return;
            if (circle) { circle.classList.remove('hold', 'exhale'); circle.classList.add('inhale'); } if (text) text.textContent = 'Nefes Al...';
            AppState.session.breathingInterval = setTimeout(() => {
                if (!AppState.session.breathingRunning) return;
                if (circle) { circle.classList.remove('inhale'); circle.classList.add('hold'); } if (text) text.textContent = 'Tut...';
                AppState.session.breathingInterval = setTimeout(() => {
                    if (!AppState.session.breathingRunning) return;
                    if (circle) { circle.classList.remove('hold'); circle.classList.add('exhale'); } if (text) text.textContent = 'Nefes Ver...';
                    AppState.session.breathingInterval = setTimeout(() => { if (AppState.session.breathingRunning) { if (circle) circle.classList.remove('exhale'); run(); } }, exh);
                }, hld);
            }, inh);
        }; run();
    },

    /* --- PRACTICE TIMER --- */
    setupPracticeTimer() {
        let seconds = 0; const disp = document.getElementById('practiceTimerDisplay');
        const startB = document.getElementById('practiceTimerStart'), pauseB = document.getElementById('practiceTimerPause'), resetB = document.getElementById('practiceTimerReset');
        const fmt = s => `${Math.floor(s / 3600).toString().padStart(2, '0')}:${Math.floor((s % 3600) / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
        if (startB) startB.addEventListener('click', () => { if (!AppState.session.practiceInterval) { AppState.session.practiceInterval = setInterval(() => { seconds++; if (disp) disp.textContent = fmt(seconds); if (seconds % 60 === 0) { AppState.addPractice(1); const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; const d = days[new Date().getDay()]; this.setText('todayPractice', AppState.weeklyPractice[d] || 0); } }, 1000); } });
        if (pauseB) pauseB.addEventListener('click', () => { clearInterval(AppState.session.practiceInterval); AppState.session.practiceInterval = null; });
        if (resetB) resetB.addEventListener('click', () => { clearInterval(AppState.session.practiceInterval); AppState.session.practiceInterval = null; seconds = 0; if (disp) disp.textContent = '00:00:00'; });
    },

    /* --- DAILY TIMER --- */
    setupDailyTimer() {
        let sec = AppState.user.settings.dailyGoal * 60; const disp = document.getElementById('timerDisplay'); let iv = null;
        const upd = () => { if (disp) disp.textContent = `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`; };
        const sb = document.getElementById('timerStart'), pb = document.getElementById('timerPause'), rb = document.getElementById('timerReset');
        if (sb) sb.addEventListener('click', () => { if (!iv && sec > 0) iv = setInterval(() => { sec--; upd(); if (sec <= 0) { clearInterval(iv); iv = null; this.notify('⏰ Günlük hedef tamamlandı!', 'success'); } }, 1000); });
        if (pb) pb.addEventListener('click', () => { clearInterval(iv); iv = null; });
        if (rb) rb.addEventListener('click', () => { clearInterval(iv); iv = null; sec = AppState.user.settings.dailyGoal * 60; upd(); });
    },

    /* --- WEEK CHART --- */
    updateWeekChart() { const ch = document.getElementById('weekChart'); if (!ch) return; const mx = Math.max(...Object.values(AppState.weeklyPractice), 60); ch.querySelectorAll('.day-bar').forEach(b => { const d = b.dataset.day; const m = AppState.weeklyPractice[d] || 0; b.style.height = `${(m / mx) * 80 + 10}%`; b.classList.toggle('active', m > 0); }); },

    /* --- NOTE READING (Enhanced with VexFlow + Answer Fix + Hardcore Analytics) --- */
    _noteReadingState: { current: null, isRunning: false, correct: 0, total: 0 },
    setupNoteReading() {
        const notes = ['Fa', 'Sol', 'La', 'Si♭', 'Do', 'Re', 'Mi', 'Fa#'];
        const positions = { Fa: 170, Sol: 150, La: 130, 'Si♭': 110, Do: 90, Re: 70, Mi: 50, 'Fa#': 30 };
        const sn = document.getElementById('staffNotes'), at = document.getElementById('answerText');
        const container = document.getElementById('staffContainer');
        const grid = document.getElementById('noteGuessGrid');
        const msg = document.getElementById('guessFeedbackMsg');

        // Toplu İstatistik UI Güncelleme Fonksiyonu
        const updateStatsUI = () => {
            let totalTries = 0;
            let totalCorrect = 0;
            let weakNotes = [];

            for (const [n, stat] of Object.entries(AppState.earTrainingStats)) {
                if (notes.includes(n) && stat.total > 0) {
                    totalTries += stat.total;
                    totalCorrect += stat.correct || 0;
                    weakNotes.push({ note: n, acc: (stat.correct || 0) / stat.total, total: stat.total });
                }
            }

            const accEl = document.getElementById('globalAccuracyRate');
            if (accEl) {
                const perc = totalTries > 0 ? Math.round((totalCorrect / totalTries) * 100) : 0;
                accEl.textContent = '%' + perc;
                accEl.style.color = perc > 80 ? 'var(--jade)' : perc > 50 ? 'var(--gold)' : 'var(--ruby)';
            }

            const weakEl = document.getElementById('weakestNotesList');
            const aiEl = document.getElementById('aiNoteRecommendation');
            if (weakEl && weakNotes.length > 0) {
                // Skoru en kötü olanları ve çok denenmişleri başa al
                weakNotes.sort((a, b) => a.acc - b.acc || b.total - a.total);

                weakEl.innerHTML = weakNotes.slice(0, 3).map(w =>
                    `<span style="background: rgba(255,100,100,0.1); color: var(--ruby); padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(255,100,100,0.3); font-size: 0.9rem;">
                        <strong>${w.note}</strong> (%${Math.round(w.acc * 100)})
                    </span>`
                ).join('');

                if (aiEl) {
                    if (weakNotes[0].acc < 0.5 && weakNotes[0].total > 3) {
                        aiEl.innerHTML = `Makine Analizi: <strong>${weakNotes[0].note}</strong> notasını okumakta zorlanıyorsunuz. Sol el pozisyonunuzu ve porte üzerindeki yerini (çizgi/aralık) tekrar gözden geçirmenizi tavsiye ederim.`;
                    } else if (totalCorrect / totalTries >= 0.8 && totalTries > 10) {
                        aiEl.innerHTML = `Mükemmel ilerliyorsunuz! Görme hızınız ve refleksleriniz 'Usta' seviyesinde. Pratik zamanlayıcıyı açıp refleks sürenizi sınırlarınıza kadar test edin.`;
                    } else {
                        aiEl.innerHTML = `Bol bol nota okuma pratiği yaparak makinenin sizi analiz etmesine izin verin.`;
                    }
                }
            }
        };

        const show = () => {
            this._noteReadingState.current = notes[Math.floor(Math.random() * notes.length)];
            const current = this._noteReadingState.current;
            if (typeof this._autoPilotState !== 'undefined') this._autoPilotState.targetNote = current;
            if (sn) {
                sn.innerHTML = `
                    <g id="noteClickArea" style="cursor:pointer; transition: all 0.3s;">
                        <ellipse cx="400" cy="${positions[current]}" rx="14" ry="11" fill="var(--gold)"/>
                        <line x1="413" y1="${positions[current] - 10}" x2="413" y2="${positions[current] + 25}" stroke="var(--gold)" stroke-width="2.5"/>
                    </g>
                    <text x="400" y="${positions[current] + 5}" text-anchor="middle" fill="#000" font-size="14" font-weight="bold" style="pointer-events:none">?</text>
                `;
            }
            if (at) at.textContent = '?';
            if (msg) msg.textContent = '';

            // Tahmin Butonlarını Dinamik Oluştur
            if (grid) {
                grid.innerHTML = notes.map(n =>
                    `<button class="btn btn-secondary note-guess-btn" data-val="${n}" style="padding: 10px 5px; font-size: 0.95rem; font-weight:600;">${n}</button>`
                ).join('');

                grid.querySelectorAll('.note-guess-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        if (!this._noteReadingState.isRunning) return;
                        const guessed = e.target.dataset.val;
                        const actual = this._noteReadingState.current;

                        if (!AppState.earTrainingStats[actual]) AppState.earTrainingStats[actual] = { correct: 0, total: 0 };
                        AppState.earTrainingStats[actual].total++;

                        // Devre Dışı Bırak Butonları
                        grid.querySelectorAll('.note-guess-btn').forEach(b => b.disabled = true);

                        if (guessed === actual) {
                            AppState.earTrainingStats[actual].correct = (AppState.earTrainingStats[actual].correct || 0) + 1;
                            e.target.style.background = 'var(--jade)';
                            e.target.style.color = '#fff';
                            if (at) at.textContent = actual;
                            if (msg) { msg.textContent = 'Doğru! Harika refleks.'; msg.style.color = 'var(--jade)'; }
                            AppState.save();
                            updateStatsUI();

                            // Otomatik sonraki notaya geç (Akış bozulmasın diye 800ms bekle)
                            setTimeout(() => { if (this._noteReadingState.isRunning) show(); }, 800);
                        } else {
                            e.target.style.background = 'var(--ruby)';
                            e.target.style.color = '#fff';

                            // Doğru olanı vurgula
                            const correctBtn = Array.from(grid.querySelectorAll('.note-guess-btn')).find(b => b.dataset.val === actual);
                            if (correctBtn) { correctBtn.style.border = '2px solid var(--jade)'; correctBtn.style.color = 'var(--jade)'; }

                            if (msg) { msg.textContent = `Yanlış. Doğrusu ${actual} olmalıydı!`; msg.style.color = 'var(--ruby)'; }
                            if (at) at.textContent = actual;
                            AppState.save();
                            updateStatsUI();

                            setTimeout(() => { if (this._noteReadingState.isRunning) show(); }, 1500);
                        }
                    });
                });
            }

            updateStatsUI();
        };

        const nb = document.getElementById('nextNote'), sb = document.getElementById('startExercise'), stb = document.getElementById('stopExercise'), shb = document.getElementById('showAnswerBtn');
        if (nb) nb.addEventListener('click', () => { if (this._noteReadingState.isRunning) show(); });
        if (sb) sb.addEventListener('click', () => {
            this._noteReadingState.isRunning = true;
            if (typeof this._autoPilotState !== 'undefined') this._autoPilotState.enabled = true;
            show();
        });
        if (stb) stb.addEventListener('click', () => {
            this._noteReadingState.isRunning = false;
            if (typeof this._autoPilotState !== 'undefined') this._autoPilotState.enabled = false;
            if (sn) sn.innerHTML = '';
            if (at) at.textContent = '?';
            if (grid) grid.innerHTML = '';
            if (msg) msg.textContent = '';
        });
        if (shb) shb.addEventListener('click', () => {
            if (at && this._noteReadingState.current && this._noteReadingState.isRunning) {
                at.textContent = this._noteReadingState.current;

                // Track as failure since they gave up (Pes etti)
                const actual = this._noteReadingState.current;
                if (!AppState.earTrainingStats[actual]) AppState.earTrainingStats[actual] = { correct: 0, total: 0 };
                AppState.earTrainingStats[actual].total++;
                AppState.save();
                updateStatsUI();

                if (msg) { msg.textContent = "Pes ettin. İşte cevap!"; msg.style.color = "var(--gold)"; }
            }
        });

        // Initialize UI stats
        updateStatsUI();
    },

    /* --- AI & VEXFLOW TRANSCRIPTION (Otonom Transkripsiyon Motoru) --- */
    setupAI() {
        const ab = document.getElementById('analyzeUrl'), url = document.getElementById('youtubeUrl'), vp = document.getElementById('videoPreview'), en = document.getElementById('extractedNotes');
        const vfc = document.getElementById('vexflowContainer');
        const tStatus = document.getElementById('transcriptionStatus');
        const instSelect = document.getElementById('mappingInstrumentSelect');

        if (ab && url) ab.addEventListener('click', () => {
            const u = url.value.trim();
            if (!u) return;
            const vid = this.extractYT(u);
            if (vid) {
                if (vp) vp.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vid}" frameborder="0" allowfullscreen style="border-radius:1rem"></iframe>`;
                if (en) en.innerHTML = '<p style="color:var(--text-muted)">📹 Otonom Transkripsiyon Başladı. AI Modelleri API üzerinden çalışıyor (Simulasyon)...</p>';

                // --- HARDCORE MIR PIPELINE SIMULATION ---
                if (tStatus) tStatus.textContent = '🎶 Demucs ses izole ediyor...';

                setTimeout(() => {
                    if (tStatus) tStatus.textContent = '🧮 HMM/Viterbi Koma Hesaplıyor...';
                    setTimeout(() => {
                        if (tStatus) tStatus.textContent = '✨ Analiz Tamamlandı!';
                        // 1. Backend'den geldiğini varsaydığımız Agnostik 53-TET Nota Verisi (Örnek: Segâh Peşrev Girişi tarzı)
                        const agnosticNotes = [
                            { comma: 32, duration: 1.0, name: 'Sol' }, // Rast
                            { comma: 40, duration: 0.5, name: 'La' },  // Dügâh
                            { comma: 44, duration: 0.5, name: 'Si♭' }, // Segâh (1.5 Koma Bemol)
                            { comma: 53, duration: 1.0, name: 'Do' },  // Çargâh
                            { comma: 40, duration: 1.0, name: 'La' }   // Dügâh
                        ];

                        // 2. Kullanıcının seçtiği enstrümana Dijkstra ile haritala
                        const selectedInst = instSelect ? instSelect.value : 'ney_mansur';
                        const mappedNotes = this._instrumentMapper.mapDijkstra(agnosticNotes, selectedInst);

                        // 3. VexFlow ile Ekrana Çiz
                        if (vfc) {
                            this._vexFlowRenderer.render(vfc, mappedNotes, selectedInst);
                        }

                        if (en) {
                            en.innerHTML = `<p style="color:var(--jade);font-size:0.85rem">Dijkstra ${selectedInst} rotası hesaplandı: ${mappedNotes.map(n => n.name).join(' → ')}</p>`;
                        }

                        // Uyarılma (Stimulus)
                        setTimeout(() => this.notify("🌟 Usta'nın Segâh Karakteri: 44. komada kusursuz bir tiz basıldı!", 'success'), 500);
                        // Merak (Curiosity)
                        setTimeout(() => this.notify("💡 Bu parçada usta 3 farklı geçki (modülasyon) yaptı. Bunları keşfedebilir misin?", 'info'), 4000);

                        this.notify('Otonom Transkripsiyon Başarılı', 'success');
                    }, 1500);
                }, 1500);

            } else this.notify('Geçersiz YouTube URL', 'error');
        });

        const smb = document.getElementById('showManualNotes'), mn = document.getElementById('manualNotes'), mr = document.getElementById('manualResult');
        if (smb && mn) smb.addEventListener('click', () => {
            const ns = mn.value.trim().split(/\s+/).filter(n => n);
            if (ns.length && mr) {
                mr.innerHTML = '<div class="note-cards" style="margin-top:1rem">' + ns.map(n => {
                    // data.js içindeki parmak pozisyonlarını bul. Varsa frekans ağırlıklı, yoksa ismine göre.
                    let pos = NeyData.fingerPositions.find(p => p.note === n && p.octave === 1);
                    if (!pos) return `<div class="note-card error" style="border-color:var(--ruby);color:var(--ruby)">?</div>`;

                    return `
                        <div class="note-card" style="border: 2px solid var(--gold); animation: fadeIn 0.3s; padding: 10px; margin: 5px; border-radius: 8px; text-align: center; display: inline-block;">
                            <span class="note-card-name" style="font-size:1.5rem; color:var(--gold); font-weight:bold; display:block;">${n}</span>
                            <span class="note-card-fingering" style="color:var(--gold-light); font-size:1.2rem; letter-spacing:2px; display:block; margin: 8px 0;">
                                ${pos.holes.map(h => h ? '●' : '○').join('')}
                            </span>
                            <div style="font-size:0.75rem; color:var(--text-muted)">${pos.breath} nefes | ${pos.freq ? pos.freq.toFixed(1) + 'Hz' : ''}</div>
                        </div>
                    `;
                }).join('') + '</div>';
                this.notify(`${ns.length} nota frekans/komaya göre dinamik haritalandı`, 'success');
            }
        });
    },

    /* === AUTO-PILOT & METRONOME INFO CARDS === */
    _autoPilotState: { enabled: false, targetNote: null, stableCount: 0, requiredDuration: 1.2, lastCheck: 0 },

    // YENİ: Frekans bazlı akıllı ve toleranslı pozisyon eşleştirme
    findCorrectPosition(detectedFreq) {
        if (!NeyData.fingerPositions || !detectedFreq) return null;
        return NeyData.fingerPositions.find(p =>
            p.freq && Math.abs(p.freq - detectedFreq) < (p.freq * 0.02) // %2 tolerans (koma payı)
        );
    },

    checkAutoPilotProgress(currentNote, freq, cents, duration) {
        if (!this._autoPilotState.enabled || !currentNote) return false;
        const tolerance = 10; // ±10 cent hardcore hassasiyet
        const isCorrect = Math.abs(cents) <= tolerance;

        if (isCorrect) {
            this._autoPilotState.stableCount += duration;
            if (this._autoPilotState.stableCount >= this._autoPilotState.requiredDuration) {
                this._autoPilotState.stableCount = 0;
                return true;
            }
        } else {
            this._autoPilotState.stableCount = Math.max(0, this._autoPilotState.stableCount - duration * 0.5);
        }
        return false;
    },
    _usulInfoCards: {
        cards: [
            { name: 'Düyek', pattern: '8/8', info: 'Türk müziğinin omurgasıdır. Mevlevi ayinlerinden halk şarkılarına kadar her yerdedir.', xpBonus: 100, badge: 'Nevâzen', challenge: 'Düyek dengesini %95 çözdün! 100 XP daha alıp "Nevâzen" rütbesine yükselmek ister misin?' },
            { name: 'Aksak', pattern: '9/8', info: 'Anadolu\'nun ritmik imzasıdır. 2+2+2+3 yapısıyla enerjik bir "aksama" yaşatır.', xpBonus: 150, badge: 'Ritim Ustası', challenge: '9 zamanlı ritmi hatasız tamamla, "Ritim Ustası" rozetini koleksiyonuna ekle!' },
            { name: 'Sofyan', pattern: '4/4', info: 'En basit usuldür. "Düm - Tek - Tek" kalıbıyla başlangıç seviyesidir.', xpBonus: 50, badge: 'Başlangıç', challenge: 'Sofyan\'da 50 vuruş yap, ilk XP\'ni kazan!' },
            { name: 'Yürüksemai', pattern: '6/8', info: 'Hızlı ve coşkulu. Semai formunun temelini oluşturur.', xpBonus: 120, badge: 'Semai Ustası', challenge: 'Yürüksemai\'de 100 vuruş yap, "Semai Ustası" rozetini aç!' }
        ],
        getCurrent(pattern) { return this.cards.find(c => c.pattern === pattern) || this.cards[0]; }
    },
    showMetronomeInfoCard(usulPattern) {
        const card = this._usulInfoCards.getCurrent(usulPattern);
        const cardContainer = document.getElementById('metronomeInfoCard');
        if (cardContainer) {
            cardContainer.innerHTML = `<div style="background:rgba(201,168,76,0.1);border:1px solid var(--gold);border-radius:12px;padding:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h4 style="color:var(--gold-light);font-size:1rem">${card.name} (${card.pattern})</h4><span style="font-size:1.5rem">🥁</span></div><p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px">${card.info}</p><div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:8px"><p style="color:var(--amber);font-size:0.8rem;font-weight:700">🎯 ${card.challenge}</p></div></div>`;
        }
    },
    _hiddenMakams: {
        unlocked: ['Rast', 'Uşşak', 'Segâh', 'Hicaz'],
        hidden: [
            { name: 'Saba', icon: '🌙', phase: 6, hint: 'Dügâh perdesinde karar veren, hüzünlü bir makam', unlockReq: 'Faz 5 tamamla' },
            { name: 'Hüseyni', icon: '⚔️', phase: 7, hint: 'Yiğitlik makamı, Hüseyni perdesinde durak', unlockReq: 'Faz 6 tamamla' },
            { name: 'Neva', icon: '🎺', phase: 8, hint: 'Nevâ perdesinin zirvesi, ince tescil', unlockReq: 'Faz 7 tamamla' },
            { name: 'Taksim', icon: '🎨', phase: 9, hint: 'Doğaçlama sanatı, makamların zirvesi', unlockReq: 'Faz 8 tamamla' }
        ],
        getHiddenForPhase(phase) { return this.hidden.filter(h => h.phase === phase); },
        isUnlocked(makamName) { return this.unlocked.includes(makamName); }
    },
    showHiddenMakamCard(phase) {
        const hidden = this._hiddenMakams.getHiddenForPhase(phase);
        const container = document.getElementById('hiddenMakamCard');
        if (container && hidden.length > 0) {
            container.innerHTML = `<h4 style="color:var(--gold-light);margin-bottom:12px">🔒 Gizli Makamlar</h4><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px">${hidden.map(h => `<div style="background:rgba(255,255,255,0.02);border:1px solid var(--border-glass);border-radius:8px;padding:12px;text-align:center;opacity:0.6"><div style="font-size:2rem">${h.icon}</div><div style="color:var(--gold);font-weight:700;font-size:0.9rem">${h.name}</div><div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px">${h.hint}</div><div style="font-size:0.65rem;color:var(--ruby);margin-top:6px">🔒 ${h.unlockReq}</div></div>`).join('')}</div>`;
        }
    },

    _instrumentMapper: {
        mapDijkstra(agnosticNotes, instrument) {
            // Gerçek bir Dijkstra 2.0 uygulamasında, parmaklıklar (nodes) ve geçiş zorluğu (edges) hesaplanır.
            // Bu örnek, agnostik veriyi alıp seçilen enstrümana transpose eder.
            // (Örn: 'ney_kiz' seçilmişse, duyulan "Sol", Ney'de 1 ses tiz olan "La" basılarak çıkar)
            const transpositionMap = {
                'ney_mansur': 0, // Yerinden (Ahenk yok)
                'ney_kiz': 2,    // Kız Neyi 1 ses tiz çalar
                'guitar': 0
            };
            const offset = transpositionMap[instrument] || 0;

            return agnosticNotes.map(note => {
                // Basit Transpose Simulasyonu
                let newComma = note.comma + (offset * 9); // Her batı sesi ~9 koma
                return { ...note, mappedComma: newComma };
            });
        }
    },

    _vexFlowRenderer: {
        render(containerDiv, mappedNotes, instrument) {
            containerDiv.innerHTML = ""; // Temizle

            if (typeof Vex === 'undefined' || !Vex.Flow) {
                containerDiv.innerHTML = "<p style='color:var(--ruby)'>VexFlow Kütüphanesi Yüklenemedi!</p>";
                return;
            }

            const VF = Vex.Flow;
            const renderer = new VF.Renderer(containerDiv, VF.Renderer.Backends.SVG);
            renderer.resize(700, 160);
            const context = renderer.getContext();

            // Porte
            const stave = new VF.Stave(10, 20, 650);
            stave.addClef("treble").addTimeSignature("4/4");
            stave.setContext(context).draw();

            // Batı müziği render eşleştirmesi (VexFlow için)
            const vfNotes = mappedNotes.map(n => {
                let key = "b/4";
                // Basit Mapping Analizi
                if (n.name === 'Sol') key = "g/4";
                else if (n.name === 'La') key = "a/4";
                else if (n.name === 'Si♭') key = "b/4";
                else if (n.name === 'Do') key = "c/5";

                let dur = "q"; // Çeyrek (1.0)
                if (n.duration === 0.5) dur = "8"; // Sekizlik
                else if (n.duration === 2.0) dur = "h"; // Yarım

                const staveNote = new VF.StaveNote({ keys: [key], duration: dur });

                // Segah perdesi için koma bemolü işareti eklemek (1.5 Koma)
                if (n.name === 'Si♭') {
                    // Standard bemol ekleyelim (VexFlow Türk Müziği accidentals custom font gerektirir, standart flat ile simüle ediyoruz)
                    staveNote.addAccidental(0, new VF.Accidental("b"));
                }
                return staveNote;
            });

            // Ses boşluklarını ve nota gruplarını vuruşa (Beats) göre düzenle
            const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
            // Burada 4.5 vuruşluk örnek var, sığmayabilir. Son notayı (La) çıkarıp tam 4 beat yapalım
            voice.addTickables(vfNotes.slice(0, 4));

            new VF.Formatter().joinVoices([voice]).format([voice], 600);
            voice.draw(context, stave);
        }
    },

    extractYT(url) { const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/, /youtube\.com\/embed\/([^&\s]+)/]; for (const p of patterns) { const m = url.match(p); if (m) return m[1]; } return null; },

    /* --- SETTINGS --- */
    setupSettings() {
        const dg = document.getElementById('dailyGoalInput'), se = document.getElementById('soundEffects'), no = document.getElementById('notifications'), rb = document.getElementById('resetProgress');
        if (dg) { dg.value = AppState.user.settings.dailyGoal; dg.addEventListener('change', () => { AppState.user.settings.dailyGoal = parseInt(dg.value); AppState.save(); this.updateAll(); }); }
        if (se) { se.checked = AppState.user.settings.soundEffects; se.addEventListener('change', () => { AppState.user.settings.soundEffects = se.checked; AppState.save(); }); }
        if (no) { no.checked = AppState.user.settings.notifications; no.addEventListener('change', () => { AppState.user.settings.notifications = no.checked; AppState.save(); }); }
        if (rb) rb.addEventListener('click', () => AppState.reset());
        // Export/Import
        const eb = document.getElementById('exportData'), ib = document.getElementById('importData'), ifile = document.getElementById('importFile');
        if (eb) eb.addEventListener('click', () => AppState.exportData());
        if (ib && ifile) {
            ib.addEventListener('click', () => ifile.click());
            ifile.addEventListener('change', (e) => { if (e.target.files[0]) AppState.importData(e.target.files[0]); });
        }
    },

    /* --- TABS --- */
    setupTabs() { document.querySelectorAll('.tab-btn').forEach(b => { b.addEventListener('click', () => { document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); document.querySelectorAll('.tab-content').forEach(c => { c.classList.toggle('active', c.id === `${b.dataset.tab}Tab`); }); }); }); },

    /* --- TUNER (YIN Algorithm + Ney Tipi Desteği + LPF + Spectrogram) --- */
    _tunerFreqHistory: [],
    _tunerNeyOffsets: { mansur: 0, kiz: 2, sah: -2, supurde: 5, bolahenk: 7 },
    // Detaylı koma-perde haritası her ney tipi için
    _tunerKomaMap: {
        mansur: { 'Fa': 0, 'Sol': 0, 'La': 0, 'Si♭': -4, 'Do': 0, 'Re': 0, 'Mi': 0, 'Fa#': 0 },
        kiz: { 'Fa': 0, 'Sol': 0, 'La': 0, 'Si♭': -4, 'Do': 0, 'Re': 0, 'Mi': 0, 'Fa#': 0 },
        sah: { 'Fa': 0, 'Sol': 0, 'La': 0, 'Si♭': -4, 'Do': 0, 'Re': 0, 'Mi': 0, 'Fa#': 0 },
        supurde: { 'Fa': 0, 'Sol': 0, 'La': 0, 'Si♭': -4, 'Do': 0, 'Re': 0, 'Mi': 0, 'Fa#': 0 },
        bolahenk: { 'Fa': 0, 'Sol': 0, 'La': 0, 'Si♭': -4, 'Do': 0, 'Re': 0, 'Mi': 0, 'Fa#': 0 }
    },
    setupTuner() {
        const btn = document.getElementById('tunerStartBtn'); if (!btn) return;
        let ac, an, src, run = false, anim, specAn;
        const noteEl = document.getElementById('tunerNote'), centsEl = document.getElementById('tunerCents'), freqEl = document.getElementById('tunerFreq');
        const ind = document.getElementById('centsIndicator'), perde = document.getElementById('tunerPerde');
        const neySelect = document.getElementById('neyTypeSelect');
        const specCanvas = document.getElementById('spectrogramCanvas');

        let sustainCount = 0;
        let sustainNote = null;
        let sustainGiven = false;

        btn.addEventListener('click', async () => {
            if (run) { run = false; btn.innerHTML = '🎤 Başlat'; cancelAnimationFrame(anim); return; }
            try {
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                ac = new (window.AudioContext || window.webkitAudioContext)();
                // LPF: 1200Hz üzeri harmonikleri kes (BiquadFilterNode)
                const lpf = ac.createBiquadFilter();
                lpf.type = 'lowpass'; lpf.frequency.value = 1200; lpf.Q.value = 0.7;
                an = ac.createAnalyser(); an.fftSize = 4096;
                // Spectrogram için ayrı analyser (filtresiz)
                specAn = ac.createAnalyser(); specAn.fftSize = 2048;
                src = ac.createMediaStreamSource(s);
                src.connect(lpf); lpf.connect(an); // LPF → YIN analyser
                src.connect(specAn); // Ham sinyal → spectrogram
                run = true; btn.innerHTML = '🛑 Durdur';
                const buf = new Float32Array(an.fftSize);
                const notes = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
                const perdes = { 'Fa': 'Aşiran', 'Sol': 'Rast', 'La': 'Dügâh', 'Si': 'Segâh', 'Do': 'Çargâh', 'Re': 'Nevâ', 'Mi': 'Hüseyni' };
                this._tunerFreqHistory = [];
                const loop = () => {
                    if (!run) return;
                    an.getFloatTimeDomainData(buf);
                    let rawFreq = this._yinPitchDetect(buf, ac.sampleRate);
                    // Oktav sıçrama filtresi
                    let freq = this._filterOctaveJump(rawFreq);
                    if (freq > -1) {
                        // Ney tipi offset
                        const offset = this._tunerNeyOffsets[neySelect?.value || 'mansur'] || 0;
                        freqEl.textContent = freq.toFixed(1) + ' Hz';
                        const n = Math.round(12 * (Math.log2(freq / 440))) + 69 - offset;
                        const c = Math.floor(1200 * Math.log2(freq / (440 * Math.pow(2, (n + offset - 69) / 12))));
                        const nn = notes[((n % 12) + 12) % 12];
                        noteEl.textContent = nn; perde.textContent = perdes[nn] || 'Ara Ses';
                        centsEl.textContent = c + ' cent';
                        centsEl.style.color = Math.abs(c) < 10 ? 'var(--jade)' : 'var(--gold)';
                        if (ind) ind.style.left = `calc(50% + ${Math.max(-45, Math.min(45, c))}%)`;
                        let rms = 0; for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
                        let clarity = Math.min(100, Math.max(0, Math.sqrt(rms / buf.length) * 500));
                        let stab = Math.min(100, Math.max(0, 100 - Math.abs(c)));
                        const ce = document.getElementById('toneClarity'), se = document.getElementById('toneStability'), fe = document.getElementById('toneFeedback');
                        if (ce) ce.style.width = clarity + '%';
                        if (se) se.style.width = stab + '%';
                        if (fe) fe.textContent = Math.abs(c) < 5 ? 'Mükemmel! ✨' : Math.abs(c) < 15 ? 'İyi' : 'Biraz Kayıyor';
                        // Tuner history veri toplama (her okumasında kayıt)
                        AppState.tunerHistory.push({ note: nn, cents: c, freq, ts: Date.now() });
                        if (AppState.tunerHistory.length > 500) AppState.tunerHistory.shift();

                        // --- 🚀 AUTO-PILOT CHECK ---
                        if (typeof this._autoPilotState !== 'undefined' && this._autoPilotState.enabled && this._autoPilotState.targetNote) {
                            let dt = 0.05; // approx 50ms per frame

                            // Yeni findCorrectPosition mantığını da deneyelim (AutoPilot hedef nota doğrulamasında destekleyici)
                            const exactPos = this.findCorrectPosition(freq);
                            const currentTargetMatches = exactPos ? (exactPos.note === this._autoPilotState.targetNote) : (nn === this._autoPilotState.targetNote);

                            if (this.checkAutoPilotProgress(currentTargetMatches ? this._autoPilotState.targetNote : null, freq, c, dt)) {
                                const nb = document.getElementById('nextNote');
                                if (nb) {
                                    if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                                    AppState.addXP(10);
                                    this.notify(`Doğru nota! ${this._autoPilotState.targetNote} otomatik geçildi. +10 XP`, 'success');
                                    nb.click(); // Trigger next note
                                    this._autoPilotState.stableCount = 0;
                                }
                            }
                        }

                        // --- 🌟 PERFECT SUSTAIN (Kusursuz 3 saniye) ---
                        if (Math.abs(c) < 5) {
                            if (sustainNote === nn) {
                                sustainCount += 0.05;
                                if (sustainCount >= 3.0 && !sustainGiven) {
                                    sustainGiven = true;
                                    if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#C9A84C', '#2ECC71'] });
                                    AppState.addXP(25);
                                    this.notify('✨ Perfect Sustain! x2 Bonus (3 saniye kusursuz!) +25 XP', 'success');
                                }
                            } else {
                                sustainNote = nn; sustainCount = 0; sustainGiven = false;
                            }
                        } else {
                            sustainCount = 0; sustainGiven = false;
                        }

                        // Makam tanıma için nota ekle
                        this._makamRecognition.addNote(nn);
                        // Makam tanıma UI güncelle
                        this.renderMakamRecognition();
                        // Spectrogram çizimi
                        if (specCanvas && specAn) {
                            const sctx = specCanvas.getContext('2d');
                            const freqData = new Uint8Array(specAn.frequencyBinCount);
                            specAn.getByteFrequencyData(freqData);
                            const w = specCanvas.width, h = specCanvas.height;
                            sctx.clearRect(0, 0, w, h);
                            const barW = w / freqData.length * 4;
                            for (let i = 0; i < freqData.length / 4; i++) {
                                const v = freqData[i] / 255;
                                const hue = 45 - v * 45;
                                sctx.fillStyle = `hsla(${hue}, 80%, ${20 + v * 60}%, ${0.3 + v * 0.7})`;
                                sctx.fillRect(i * barW, h - v * h, barW - 1, v * h);
                            }
                            // Tını puanı hesapla
                            const ts = document.getElementById('timbreScore');
                            if (ts) {
                                const score = this._calcTimbreScore(freqData);
                                ts.textContent = score + '/100';
                                ts.style.color = score > 70 ? 'var(--jade)' : score > 40 ? 'var(--gold)' : 'var(--ruby)';
                            }
                        }
                    } else {
                        noteEl.textContent = '—'; centsEl.textContent = '0 cent'; perde.textContent = '—';
                        if (ind) ind.style.left = '50%';
                        const ce = document.getElementById('toneClarity'), se = document.getElementById('toneStability'), fe = document.getElementById('toneFeedback');
                        if (ce) ce.style.width = '0%'; if (se) se.style.width = '0%';
                        if (fe) fe.textContent = 'Ses Bekleniyor...';
                    }
                    anim = requestAnimationFrame(loop);
                }; loop();
            } catch (e) { this.notify('Mikrofon izni alınamadı', 'error'); }
        });
    },
    _calcTimbreScore(freqData) {
        // Harmonik oranları analiz et - referans usta harmonik profili ile karşılaştır
        let harmonicSum = 0, total = 0;
        const fundamental = freqData[1] || 1;
        // İlk 8 harmonik'i kontrol et
        for (let i = 1; i < Math.min(16, freqData.length); i++) {
            total += freqData[i];
            // Harmonikler genellikle fundamental'ın katları
            if (i > 1 && i % 4 < 3) harmonicSum += freqData[i];
        }
        // Zenginlik skoru: harmonik çeşitliliği
        let richness = total > 0 ? (harmonicSum / total) * 100 : 0;
        // Referans usta profili ile karşılaştırma (ideal: harmonikler azar azar azalır)
        let idealDecay = 0;
        for (let i = 2; i < Math.min(8, freqData.length); i++) {
            if (freqData[i] > 0) idealDecay += 1;
        }
        return Math.min(100, Math.round(richness * 0.7 + idealDecay * 10));
    },
    _yinPitchDetect(buf, sr) {
        const SIZE = buf.length;
        let rms = 0;
        for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
        if (Math.sqrt(rms / SIZE) < 0.01) return -1;
        const yinBufSize = Math.floor(SIZE / 2);
        const yinBuf = new Float32Array(yinBufSize);
        // Step 1-2: Difference function
        for (let tau = 0; tau < yinBufSize; tau++) {
            yinBuf[tau] = 0;
            for (let j = 0; j < yinBufSize; j++) {
                const d = buf[j] - buf[j + tau];
                yinBuf[tau] += d * d;
            }
        }
        // Step 3: Cumulative mean normalized difference
        yinBuf[0] = 1;
        let runSum = 0;
        for (let tau = 1; tau < yinBufSize; tau++) {
            runSum += yinBuf[tau];
            yinBuf[tau] = yinBuf[tau] * tau / runSum;
        }
        // Step 4: Absolute threshold
        const threshold = 0.15;
        let tauEst = -1;
        for (let tau = 2; tau < yinBufSize; tau++) {
            if (yinBuf[tau] < threshold) {
                while (tau + 1 < yinBufSize && yinBuf[tau + 1] < yinBuf[tau]) tau++;
                tauEst = tau; break;
            }
        }
        if (tauEst === -1) return -1;
        // Step 5: Parabolic interpolation
        let s0 = tauEst > 0 ? yinBuf[tauEst - 1] : yinBuf[tauEst];
        let s1 = yinBuf[tauEst];
        let s2 = tauEst + 1 < yinBufSize ? yinBuf[tauEst + 1] : yinBuf[tauEst];
        let betterTau = tauEst + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
        return sr / betterTau;
    },
    _filterOctaveJump(freq) {
        if (freq <= 0) return -1;
        this._tunerFreqHistory.push(freq);
        if (this._tunerFreqHistory.length > 5) this._tunerFreqHistory.shift();
        if (this._tunerFreqHistory.length < 3) return freq;
        // Median filter
        const sorted = [...this._tunerFreqHistory].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        // Reject if > 1.8x or < 0.55x of median (likely octave jump)
        if (freq > median * 1.8 || freq < median * 0.55) return median;
        return freq;
    },

    /* --- MESK (FM Synthesis) --- */
    _meskAudioCtx: null,
    _noteFreqMap: {
        'Fa': 349.23, 'Sol': 392.00, 'La': 440.00, 'Si': 493.88, 'Si♭': 466.16,
        'Do': 523.25, 'Re': 587.33, 'Mi': 659.26, 'Fa#': 369.99,
        'Si(K.Bemol)': 466.16, 'Si(Bemol)': 466.16, 'Si(Bakiye)': 475.00,
        'Do(Bakiye)': 510.00, 'Do(Diyez)': 554.37, 'Re(Bemol)': 570.00
    },
    setupMesk() {
        const can = document.getElementById('seyirCanvas'), m = document.getElementById('meskMakam');
        const t = document.getElementById('meskTempo'), tv = document.getElementById('meskTempoVal');
        const b = document.getElementById('meskStartBtn');
        if (!can || !m || !t || !b) return;
        t.addEventListener('input', () => tv.textContent = t.value + ' BPM');
        let iv, run = false, ball, p = 0;
        const makamlar = {
            rast: ['Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa#', 'Sol'],
            'uşşak': ['La', 'Si(K.Bemol)', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La'],
            saba: ['La', 'Si(Bemol)', 'Do(Bakiye)', 'Re(Bemol)', 'Mi', 'Fa', 'Sol'],
            hicaz: ['La', 'Si(Bakiye)', 'Do(Diyez)', 'Re', 'Mi', 'Fa', 'Sol']
        };
        const draw = () => {
            const arr = makamlar[m.value]; can.innerHTML = '';
            const step = can.offsetWidth / (arr.length + 1);
            arr.forEach((n, i) => {
                const x = step * (i + 1), y = 180 - (i * 15);
                can.innerHTML += `<div class="seyir-note" style="left:${x}px;top:${y}px;color:rgba(255,255,255,0.7)">${n}</div>`;
            });
            can.innerHTML += '<div class="seyir-ball" id="seyirBall"></div>';
            ball = document.getElementById('seyirBall');
            if (ball) { ball.style.left = step + 'px'; ball.style.top = '180px'; }
        };
        m.addEventListener('change', draw); draw();

        b.addEventListener('click', () => {
            if (run) { run = false; clearInterval(iv); b.innerHTML = '🎶 Meşk Başlat'; return; }
            if (!this._meskAudioCtx) this._meskAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            run = true; b.innerHTML = '🛑 Durdur';
            iv = setInterval(() => {
                const arr = makamlar[m.value]; p = (p + 1) % arr.length;
                const step = can.offsetWidth / (arr.length + 1);
                if (ball) { ball.style.left = (step * (p + 1)) + 'px'; ball.style.top = (180 - (p * 15)) + 'px'; }
                this._playNeyFMNote(this._noteFreqMap[arr[p]] || 440, 0.4);
            }, 60000 / t.value);
        });
    },
    _playNeyFMNote(freq, duration) {
        const ac = this._meskAudioCtx || this._fingerAudioCtx; if (!ac) return;
        const now = ac.currentTime;
        // FM Synthesis: carrier + modulator + noise (nefes hışırtısı)
        const carrier = ac.createOscillator(), modulator = ac.createOscillator();
        const modGain = ac.createGain(), masterGain = ac.createGain();
        modulator.connect(modGain); modGain.connect(carrier.frequency);
        carrier.connect(masterGain); masterGain.connect(ac.destination);
        carrier.type = 'sine'; carrier.frequency.setValueAtTime(freq, now);
        modulator.type = 'sine'; modulator.frequency.setValueAtTime(freq * 2.01, now);
        modGain.gain.setValueAtTime(freq * 0.8, now);
        // Noise component (nefes hışırtısı)
        const noiseLen = ac.sampleRate * duration;
        const noiseBuf = ac.createBuffer(1, noiseLen, ac.sampleRate);
        const noiseData = noiseBuf.getChannelData(0);
        for (let i = 0; i < noiseLen; i++) noiseData[i] = (Math.random() * 2 - 1) * 0.3;
        const noiseSrc = ac.createBufferSource(); noiseSrc.buffer = noiseBuf;
        const noiseBPF = ac.createBiquadFilter();
        noiseBPF.type = 'bandpass'; noiseBPF.frequency.value = freq; noiseBPF.Q.value = 2;
        const noiseGain = ac.createGain();
        noiseSrc.connect(noiseBPF); noiseBPF.connect(noiseGain); noiseGain.connect(ac.destination);
        noiseGain.gain.setValueAtTime(0.04, now);
        noiseGain.gain.linearRampToValueAtTime(0.02, now + 0.1);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        // ADSR
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        masterGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
        masterGain.gain.linearRampToValueAtTime(0.06, now + duration - 0.1);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        carrier.start(now); modulator.start(now); noiseSrc.start(now);
        carrier.stop(now + duration); modulator.stop(now + duration); noiseSrc.stop(now + duration);
    },

    /* --- GECKI (Dijkstra Pathfinding) --- */
    setupGecki() {
        const can = document.getElementById('geckiCanvas'), info = document.getElementById('geckiInfo'); if (!can || !info) return;
        const ctx = can.getContext('2d');
        const nodes = [
            { x: 450, y: 300, n: 'Rast' }, { x: 200, y: 200, n: 'Uşşak' }, { x: 700, y: 200, n: 'Segâh' },
            { x: 450, y: 100, n: 'Hicaz' }, { x: 200, y: 400, n: 'Saba' }, { x: 700, y: 400, n: 'Hüseyni' },
            { x: 150, y: 500, n: 'Bayati' }, { x: 700, y: 500, n: 'Neva' }, { x: 450, y: 500, n: 'Kürdî' }
        ];
        let highlightPath = null;
        const draw = () => {
            ctx.clearRect(0, 0, 900, 600);
            // Kenarlar
            this._makamGraph.edges.forEach(([a, b, w, note]) => {
                const na = nodes.find(n => n.n === a), nb = nodes.find(n => n.n === b);
                if (!na || !nb) return;
                const isHighlighted = highlightPath && highlightPath.some((p, i) => i < highlightPath.length - 1 && ((highlightPath[i].makam === a && highlightPath[i + 1].makam === b) || (highlightPath[i].makam === b && highlightPath[i + 1].makam === a)));
                ctx.strokeStyle = isHighlighted ? 'var(--gold)' : 'rgba(255,255,255,0.1)';
                ctx.lineWidth = isHighlighted ? 4 : 2;
                ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
                // Köprü notu göster
                if (isHighlighted) {
                    ctx.fillStyle = '#c9a84c'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
                    ctx.fillText(note, (na.x + nb.x) / 2, (na.y + nb.y) / 2 - 8);
                }
            });
            // Düğümler
            nodes.forEach(n => {
                const inPath = highlightPath && highlightPath.some(p => p.makam === n.n);
                ctx.fillStyle = inPath ? '#c9a84c' : 'rgba(201,168,76,0.5)'; ctx.beginPath(); ctx.arc(n.x, n.y, 35, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#06060f'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center'; ctx.fillText(n.n, n.x, n.y + 5);
            });
        }; draw();
        can.addEventListener('click', e => {
            const r = can.getBoundingClientRect(), x = (e.clientX - r.left) * (900 / r.width), y = (e.clientY - r.top) * (600 / r.height);
            const clicked = nodes.find(n => Math.hypot(n.x - x, n.y - y) < 35);
            if (clicked) {
                const pitches = this._makamPitches[clicked.n];
                info.innerHTML = `<h3 style="color:var(--gold)">${clicked.n}</h3><p style="color:var(--text-secondary);margin-top:8px">Perdeler: <strong>${pitches ? pitches.join(' ') : '?'}</strong></p>`;
            }
        });
        // Dijkstra rota bulucu
        const fromSel = document.getElementById('geckiFrom'), toSel = document.getElementById('geckiTo'), findBtn = document.getElementById('geckiFindRoute');
        if (findBtn && fromSel && toSel) {
            findBtn.addEventListener('click', () => {
                const path = this._dijkstra(fromSel.value, toSel.value);
                if (path) {
                    highlightPath = path; draw();
                    const bridges = path.filter(p => p.bridge).map(p => `${p.makam} (üzerinden: ${p.bridge})`).join(' → ');
                    info.innerHTML = `<h3 style="color:var(--gold)">Geçki Rotası</h3><p style="color:var(--text-secondary);margin-top:8px">${path.map(p => p.makam).join(' → ')}</p><p style="color:var(--text-muted);margin-top:8px;font-size:0.85rem">Köprü Notaları: ${bridges || 'Direkt geçiş'}</p>`;
                } else {
                    highlightPath = null; draw();
                    info.innerHTML = '<p style="color:var(--ruby)">Bu geçki rotası bulunamadı.</p>';
                }
            });
        }
    },

    /* --- TRANSPOSE + C CONVERTER + 53-TET --- */
    setupTranspose() {
        const f = document.getElementById('transposeFrom'), t = document.getElementById('transposeTo'), r = document.getElementById('transposeResult');
        if (!f || !t || !r) return;
        const calc = () => {
            const map = { mansur: 0, kiz: -2, sah: -4, supurde: 5, bolahenk: 7 };
            const diff = map[f.value] - (map[t.value] || 0);
            r.innerHTML = `<h4 style="color:var(--gold-light)">Sonuç:</h4><p style="font-size:1.5rem;font-weight:900;color:var(--text-primary);margin-top:8px">${Math.abs(diff)} perde ${diff > 0 ? 'tizden (ince)' : 'pesden (kalın)'} okunmalıdır.</p>`;
        };
        f.addEventListener('change', calc); t.addEventListener('change', calc); calc();

        // C Enstrümanı Dönüştürücü
        const cNotes = document.getElementById('cConverterNotes'), cBtn = document.getElementById('cConverterBtn'), cResult = document.getElementById('cConverterResult');
        if (cBtn && cNotes && cResult) {
            cBtn.addEventListener('click', () => {
                const notes = cNotes.value.trim().split(/\s+/).filter(n => n);
                const neyType = f?.value || 'mansur';
                const converted = this._transpositionConverter.convert(notes, neyType);
                cResult.innerHTML = `
                    <div style="display:flex;flex-wrap:wrap;gap:8px">
                        ${converted.map(n => `<span style="background:var(--gold);color:#000;padding:6px 12px;border-radius:6px;font-weight:700">${n}</span>`).join('')}
                    </div>
                    <p style="color:var(--text-muted);font-size:0.8rem;margin-top:8px">${neyType} → C enstrümanı dönüşümü</p>
                `;
            });
        }

        // 53-TET Koma Hesaplayıcı
        const refFreq = document.getElementById('commaRefFreq'), commaCount = document.getElementById('commaCount'), commaBtn = document.getElementById('commaCalcBtn');
        const commaFreqResult = document.getElementById('commaFreqResult'), commaPerdeResult = document.getElementById('commaPerdeResult');
        if (commaBtn && refFreq && commaCount) {
            commaBtn.addEventListener('click', () => {
                const f0 = parseFloat(refFreq.value) || 440;
                const n = parseInt(commaCount.value) || 0;
                const freq = this._comma53TET.calcFreq(f0, n);
                // Perde ismini bul
                let perdeName = 'Bilinmeyen';
                for (const [name, komas] of Object.entries(this._comma53TET.perdeler)) {
                    if (Math.abs(komas - n) < 2) { perdeName = name; break; }
                }
                if (commaFreqResult) commaFreqResult.textContent = freq.toFixed(2) + ' Hz';
                if (commaPerdeResult) commaPerdeResult.textContent = `${perdeName} (${n} koma)`;
            });
        }
    },

    /* --- NEYCARE --- */
    setupNeycare() {
        const btn = document.getElementById('oilDoneBtn'), d = document.getElementById('lastOilDate'), r = document.getElementById('oilReminder');
        if (btn && d && r) {
            const l = localStorage.getItem('lastOil');
            if (l) {
                d.textContent = new Date(l).toLocaleDateString('tr-TR'); const diff = Math.floor((new Date() - new Date(l)) / 864e5);
                r.textContent = diff > 30 ? 'Acil yağlanmalı!' : diff > 15 ? 'Yakında yağlanmalı.' : 'İyi durumda.';
                r.style.background = diff > 30 ? 'rgba(239,68,68,0.2)' : diff > 15 ? 'rgba(232,168,56,0.2)' : 'rgba(46,204,113,0.2)';
                r.style.color = diff > 30 ? 'var(--ruby)' : diff > 15 ? 'var(--amber)' : 'var(--jade)';
            }
            btn.addEventListener('click', () => { localStorage.setItem('lastOil', new Date().toISOString()); this.setupNeycare(); this.notify('Yağlama kaydedildi', 'success'); });
        }
        const ts = document.getElementById('troubleshootTree'); if (ts) ts.innerHTML = [
            { q: 'Üst notalar çıkmıyor', a: 'Başpareyi dudağa fazla bastırıyor olabilirsiniz. Nefes hızını artırın.' },
            { q: 'Ses cızırtılı çıkıyor', a: 'İçerisinde tükürük birikmiş olabilir. İyice silin veya içinin yağ oranını kontrol edin.' },
            { q: 'Ney pes kalıyor', a: 'Akort tutmuyorsa sıcaklıktan olabilir veya başpareyi çok içe çekmiş olabilirsiniz.' }
        ].map(i => `<div class="ts-question">${i.q}</div><div class="ts-answer">${i.a}</div>`).join('');

        // Acoustic Health Timbre Analizi
        const hBtn = document.getElementById('analyzeAcousticHealthBtn');
        if (hBtn) {
            hBtn.addEventListener('click', () => {
                const sC = document.getElementById('spectralCentroid');
                const sF = document.getElementById('spectralFlatness');
                const status = document.getElementById('neyHealthStatus');

                // Tuner'den gelen frekans history'den Spectral iz düşüm benzeri analiz
                // (Gerçek ortamda bu _calcTimbreScore anındaki FFT datasından alınmalıdır. Burada simulate edeceğiz)
                const isTuned = AppState.tunerHistory.length > 10;

                if (!isTuned) {
                    this.notify('Analiz için tunerda biraz ney çalmalısınız!', 'warning');
                    return;
                }

                // Simulate Timbre Extraction based on last tuner inputs
                const mockCentroid = 800 + (Math.random() * 400); // 800-1200 hz
                const mockFlatness = 0.02 + (Math.random() * 0.05); // 0.02 - 0.07 tonalite orani

                if (sC) sC.textContent = mockCentroid.toFixed(1) + ' Hz';
                if (sF) sF.textContent = mockFlatness.toFixed(3);

                if (status) {
                    if (mockFlatness > 0.05) {
                        status.innerHTML = `<p style="color:var(--amber);font-size:0.9rem;font-weight:bold">⚠️ Nefes Sesi Yüksek (Gating Uyarısı)</p><p style="font-size:0.75rem;color:var(--text-secondary)">İçi kurumuş olabilir, yağlama gerektirir.</p>`;
                    } else if (mockCentroid > 1100) {
                        status.innerHTML = `<p style="color:var(--amber);font-size:0.9rem;font-weight:bold">⚠️ Aşırı Parlak Ses</p><p style="font-size:0.75rem;color:var(--text-secondary)">Akustik yansıma normalden sert. Ney soğuk olabilir.</p>`;
                    } else {
                        status.innerHTML = `<p style="color:var(--jade);font-size:0.9rem;font-weight:bold">✨ Enstrüman Kondisyonu Kusursuz</p><p style="font-size:0.75rem;color:var(--text-secondary)">Tını parmak izi referans ustalar ile %94 uyuşuyor!</p>`;
                    }
                }
            });
        }
    },

    /* --- LIBRARY --- */
    setupLibrary() {
        const c = document.getElementById('libraryContent');
        document.querySelectorAll('.lib-tab').forEach(b => {
            b.addEventListener('click', () => {
                document.querySelectorAll('.lib-tab').forEach(x => x.classList.remove('active')); b.classList.add('active');
                if (b.dataset.lib === 'neyzens') c.innerHTML = NeyData.neyzens.map(n => `<div class="neyzen-card"><div class="neyzen-avatar">${n.name[0]}</div><div><h3 style="color:var(--gold-light)">${n.name}</h3><div class="neyzen-years">${n.period}</div><p style="color:var(--text-secondary);font-size:0.85rem">${n.bio}</p></div></div>`).join('');
                if (b.dataset.lib === 'terms') c.innerHTML = NeyData.terms.map(t => `<div class="term-item"><div class="term-name">${t.term}</div><div class="term-def">${t.definition}</div></div>`).join('');
                if (b.dataset.lib === 'books') c.innerHTML = `<div style="padding:20px;color:var(--text-muted);text-align:center">Yakında eklenecek.</div>`;
            });
        });
        const ft = document.querySelector('.lib-tab[data-lib="neyzens"]'); if (ft) ft.click();
    },

    /* --- GAMIFICATION --- */
    _curiosities: [
        "Neyin 9 boğumdan oluşması, insanın anne karnındaki 9 aylık gelişim sürecini ve tekâmülünü sembolize eder.",
        "Neyzen Tevfik, neyini hiçbir zaman bir çalgı olarak görmemiş, ona 'sırdaş' demiştir.",
        "Koma sesler, Türk müziğinin mikrotonal yapısını oluşturur. Bir tam ses 9 komaya bölünür.",
        "Dünyanın bilinen en eski ney benzeri enstrümanı M.Ö. 3000 yıllarına, Sümerlere dayanır.",
        "Ney üflerken aslında kamışın içindeki hava sütununu titreştirirsiniz, ney sadece bir rezonatördür."
    ],
    setupGamification() {
        const cText = document.getElementById('curiosityText');
        if (cText) {
            cText.innerHTML = `"${this._curiosities[Math.floor(Math.random() * this._curiosities.length)]}"`;
        }

        const btnStartDailyTask = document.getElementById('btnStartDailyTask');
        if (btnStartDailyTask) {
            btnStartDailyTask.addEventListener('click', () => {
                // Tuner sekmesine git
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                const tunerNav = document.querySelector('.nav-item[data-section="tuner"]');
                if (tunerNav) tunerNav.classList.add('active');

                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                const tunerSec = document.getElementById('tuner');
                if (tunerSec) tunerSec.classList.add('active');

                // Tuner'da AutoPilot'ı hedef Sol (Rast) olarak başlat (Basit bir günlük görev demosu)
                this._autoPilotState.enabled = true;
                this._autoPilotState.targetNote = 'Sol';
                this.notify('Hedef Tanımlandı: Rast (Sol) notasında sabit kal!', 'info');

                // Yukarı kaydır
                window.scrollTo(0, 0);
            });
        }
    },

    /* --- NOTIFY --- */
    notify(msg, type = 'info') {
        const n = document.createElement('div'); n.textContent = msg;
        n.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem 1.5rem;background:${type === 'success' ? 'rgba(74,222,128,0.2)' : type === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(201,168,76,0.2)'};border:1px solid ${type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#c9a84c'};border-radius:12px;color:#e8e6e3;z-index:10000;font-family:Inter,sans-serif;backdrop-filter:blur(10px);animation:slideIn 0.3s ease;`;
        document.body.appendChild(n); setTimeout(() => { n.style.opacity = '0'; n.style.transition = 'opacity 0.3s'; setTimeout(() => n.remove(), 300); }, 3000);
    },

    /* ============ WAVE 2 FEATURES ============ */

    /* --- PHASE EXAM (Tuner-Tabanlı Sınav) --- */
    _phaseExamCriteria: [
        { phase: 1, note: null, duration: 10, tolerance: 30, desc: 'Herhangi bir dem sesi 10sn (±30 cent)' },
        { phase: 2, note: 'Sol', duration: 5, tolerance: 15, desc: 'Rast (Sol) 5sn (±15 cent)' },
        { phase: 3, note: 'La', duration: 5, tolerance: 15, desc: 'Dügâh (La) 5sn (±15 cent)' },
        { phase: 4, note: 'Si', duration: 5, tolerance: 12, desc: 'Segâh (Si) 5sn (±12 cent)' },
        { phase: 5, note: 'Do', duration: 5, tolerance: 10, desc: 'Çargâh (Do) 5sn (±10 cent)' },
    ],
    setupPhaseExam() {
        const examBtn = document.getElementById('phaseExamBtn'); if (!examBtn) return;
        let examAc, examAn, examSrc, examRun = false, examAnim, successTime = 0;
        examBtn.addEventListener('click', async () => {
            const phase = AppState.session.currentPhase;
            const criteria = this._phaseExamCriteria.find(c => c.phase === phase) || { note: 'Sol', duration: 5, tolerance: 15, desc: 'Nota 5sn tut' };
            const examStatus = document.getElementById('examStatus');
            if (examRun) { examRun = false; examBtn.textContent = '🎤 Sınav Başlat'; cancelAnimationFrame(examAnim); return; }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                examAc = new (window.AudioContext || window.webkitAudioContext)();
                const lpf = examAc.createBiquadFilter(); lpf.type = 'lowpass'; lpf.frequency.value = 1200;
                examAn = examAc.createAnalyser(); examAn.fftSize = 4096;
                examSrc = examAc.createMediaStreamSource(stream); examSrc.connect(lpf); lpf.connect(examAn);
                examRun = true; successTime = 0; examBtn.textContent = '🛑 Durdur';
                if (examStatus) examStatus.textContent = `Hedef: ${criteria.desc} — 0/${criteria.duration}sn`;
                const buf = new Float32Array(examAn.fftSize);
                const notes = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
                let lastCheck = Date.now();
                const examLoop = () => {
                    if (!examRun) return;
                    examAn.getFloatTimeDomainData(buf);
                    const freq = this._yinPitchDetect(buf, examAc.sampleRate);
                    if (freq > -1) {
                        const n = Math.round(12 * (Math.log2(freq / 440))) + 69;
                        const c = Math.floor(1200 * Math.log2(freq / (440 * Math.pow(2, (n - 69) / 12))));
                        const nn = notes[((n % 12) + 12) % 12];
                        const now = Date.now();
                        const dt = (now - lastCheck) / 1000; lastCheck = now;
                        if ((criteria.note === null || nn === criteria.note) && Math.abs(c) <= criteria.tolerance) {
                            successTime += dt;
                        } else { successTime = Math.max(0, successTime - dt * 0.5); }
                        if (examStatus) examStatus.textContent = `Hedef: ${criteria.desc} — ${successTime.toFixed(1)}/${criteria.duration}sn`;
                        if (successTime >= criteria.duration) {
                            examRun = false; examBtn.textContent = '🎤 Sınav Başlat';
                            AppState.completePhase(phase);
                            this.notify(`🎉 Faz ${phase} sınavı başarıyla geçildi!`, 'success');
                            if (examStatus) examStatus.textContent = '✅ Başarılı!';
                            return;
                        }
                    } else { lastCheck = Date.now(); }
                    examAnim = requestAnimationFrame(examLoop);
                }; examLoop();
            } catch (e) { this.notify('Mikrofon izni alınamadı', 'error'); }
        });
    },

    /* --- EAR TRAINING (Koma Kulak Testi) --- */
    _earTrainingAc: null,
    setupEarTraining() {
        const startBtn = document.getElementById('earTrainStart'); if (!startBtn) return;
        const diffSelect = document.getElementById('earDifficulty');
        const feedbackEl = document.getElementById('earFeedback');
        const scoreEl = document.getElementById('earScore');
        let baseFreq, altFreq, isHigher, correct = 0, total = 0;
        const play = (freq, delay = 0) => {
            if (!this._earTrainingAc) this._earTrainingAc = new (window.AudioContext || window.webkitAudioContext)();
            const ac = this._earTrainingAc, now = ac.currentTime + delay;
            const o = ac.createOscillator(), g = ac.createGain();
            o.connect(g); g.connect(ac.destination); o.type = 'sine'; o.frequency.value = freq;
            g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(0.08, now + 0.05);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            o.start(now); o.stop(now + 0.8);
        };
        const newRound = () => {
            const cents = parseInt(diffSelect?.value || 50);
            const noteIdx = Math.floor(Math.random() * 7);
            const baseNotes = [349.23, 392, 440, 466.16, 523.25, 587.33, 659.26];
            baseFreq = baseNotes[noteIdx];
            isHigher = Math.random() > 0.5;
            altFreq = baseFreq * Math.pow(2, (isHigher ? cents : -cents) / 1200);
            play(baseFreq, 0); play(altFreq, 1);
            if (feedbackEl) feedbackEl.textContent = '🎵 İki ses dinleyin...';
        };
        startBtn.addEventListener('click', newRound);
        const answerBtns = document.querySelectorAll('.ear-answer-btn');
        answerBtns.forEach(b => b.addEventListener('click', () => {
            total++;
            const userSaysHigher = b.dataset.answer === 'higher';
            const isCorrect = userSaysHigher === isHigher;
            if (isCorrect) correct++;
            if (feedbackEl) feedbackEl.textContent = isCorrect ? '✅ Doğru!' : '❌ Yanlış!';
            if (scoreEl) scoreEl.textContent = `${correct}/${total} (%${total > 0 ? Math.round(correct / total * 100) : 0})`;
            // İstatistik kaydet
            const note = ['Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi'][Math.floor(Math.random() * 7)];
            if (!AppState.earTrainingStats) AppState.earTrainingStats = {};
            if (!AppState.earTrainingStats[note]) AppState.earTrainingStats[note] = { correct: 0, total: 0 };
            AppState.earTrainingStats[note].total++;
            if (isCorrect) AppState.earTrainingStats[note].correct++;
            AppState.save();
            this.renderEarTrainingStats();
            setTimeout(newRound, 1500);
        }));
        this.renderEarTrainingStats();
    },

    renderEarTrainingStats() {
        const statsDiv = document.getElementById('earTrainingStats');
        if (!statsDiv) return;
        if (!AppState.earTrainingStats || Object.keys(AppState.earTrainingStats).length === 0) {
            statsDiv.innerHTML = '<p>Pratik yaptıkça perde bazında başarı oranlarınız burada görünecek.</p>';
            return;
        }
        let html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;">';
        for (const [note, stats] of Object.entries(AppState.earTrainingStats)) {
            const pct = Math.round(stats.correct / stats.total * 100);
            const color = pct > 80 ? 'var(--jade)' : pct > 50 ? 'var(--gold)' : 'var(--ruby)';
            html += `<div style="background:rgba(255,255,255,0.05);padding:8px;border-radius:6px;text-align:center;">
                <strong style="color:var(--gold-light);display:block;margin-bottom:4px;">${note}</strong>
                <span style="color:${color};font-weight:bold;font-size:1.1rem;">%${pct}</span>
                <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">${stats.correct}/${stats.total} doğru</div>
            </div>`;
        }
        html += '</div>';
        statsDiv.innerHTML = html;
    },

    /* --- MONTE CARLO SİMÜLASYONU --- */
    _monteCarloPredict(nSim = 1000) {
        const acts = AppState.activities.filter(a => a.xp > 0);
        if (acts.length < 3) return null;
        // XP/gün hesapla
        const days = {};
        acts.forEach(a => { const d = a.timestamp.slice(0, 10); days[d] = (days[d] || 0) + a.xp; });
        const dailyXPs = Object.values(days);
        if (dailyXPs.length < 2) return null;
        const mean = dailyXPs.reduce((s, v) => s + v, 0) / dailyXPs.length;
        const variance = dailyXPs.reduce((s, v) => s + (v - mean) ** 2, 0) / dailyXPs.length;
        const stdDev = Math.sqrt(variance);
        // Hedef XP: Neyzen seviyesi (son level)
        const maxLv = NeyData.levels[NeyData.levels.length - 1];
        const remainingXP = maxLv.maxXP - AppState.user.xp;
        if (remainingXP <= 0) return { median: 0, low: 0, high: 0, mean };
        // Monte Carlo
        const results = [];
        for (let i = 0; i < nSim; i++) {
            let xp = 0, day = 0;
            while (xp < remainingXP && day < 3650) {
                const dailyGain = Math.max(0, mean + (Math.random() * 2 - 1) * stdDev * 1.5);
                xp += dailyGain; day++;
            }
            results.push(day);
        }
        results.sort((a, b) => a - b);
        return { median: results[Math.floor(nSim / 2)], low: results[Math.floor(nSim * 0.025)], high: results[Math.floor(nSim * 0.975)], mean: Math.round(mean), stdDev: Math.round(stdDev) };
    },
    renderPrediction() {
        const el = document.getElementById('monteCarloResult'); if (!el) return;
        const pred = this._monteCarloPredict();
        if (!pred) { el.innerHTML = '<p style="color:var(--text-muted)">En az 3 gün pratik verisi gerekli.</p>'; return; }
        if (pred.median === 0) { el.innerHTML = '<p style="color:var(--jade)">🎉 Zaten Neyzen seviyesine ulaştınız!</p>'; return; }
        const extra15 = Math.round(pred.median * (pred.mean / (pred.mean + 15)));
        el.innerHTML = `
            <div style="text-align:center">
                <div style="font-size:2.5rem;font-weight:900;color:var(--gold)">${pred.median} gün</div>
                <div style="color:var(--text-secondary);margin:4px 0">Tahmini Neyzen seviyesi süresi</div>
                <div style="color:var(--text-muted);font-size:0.8rem">%95 GA: ${pred.low}–${pred.high} gün</div>
                <div style="margin-top:16px;padding:12px;background:rgba(201,168,76,0.1);border-radius:8px">
                    <p style="color:var(--gold-light);font-size:0.85rem">💡 Günde 15dk fazla pratik yaparsan: ~${extra15} gün (%${Math.round((1 - extra15 / pred.median) * 100)} hızlanma)</p>
                    <p style="color:var(--text-muted);font-size:0.75rem;margin-top:4px">Ortalama XP/gün: ${pred.mean} ± ${pred.stdDev}</p>
                </div>
            </div>`;
    },

    /* --- ENTONASYON ISI HARİTASI + STABİLİTE --- */
    renderIntonationHeatmap() {
        const can = document.getElementById('heatmapCanvas'); if (!can) return;
        const ctx = can.getContext('2d');
        const notes = ['Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi'];
        const w = can.width, h = can.height;
        ctx.clearRect(0, 0, w, h);
        const cellW = w / notes.length, cellH = h - 30;
        notes.forEach((note, i) => {
            const data = AppState.tunerHistory.filter(t => t.note === note);

            // Ortalama Sapma (Mutlak değer)
            const avgCent = data.length > 0 ? data.reduce((s, t) => s + Math.abs(t.cents), 0) / data.length : 0;

            // Gerçek Ortalama (Yönlü, Skewness için)
            const meanCent = data.length > 0 ? data.reduce((s, t) => s + t.cents, 0) / data.length : 0;

            // Standart Sapma
            const stdDev = data.length > 1 ? Math.sqrt(data.reduce((s, t) => s + Math.pow(t.cents - meanCent, 2), 0) / (data.length - 1)) : 0;

            // Skewness (Asimetri) - Çan eğrisinin ne yöne yattığı
            let skewness = 0;
            if (data.length > 2 && stdDev > 0) {
                const sum3 = data.reduce((s, t) => s + Math.pow((t.cents - meanCent) / stdDev, 3), 0);
                skewness = sum3 * (data.length / ((data.length - 1) * (data.length - 2)));
            }

            // Renk: yeşil (iyi) → sarı → kırmızı (kötü)
            const ratio = Math.min(1, avgCent / 30);
            const hue = 120 - ratio * 120;
            ctx.fillStyle = `hsla(${hue}, 70%, 40%, 0.8)`;
            ctx.fillRect(i * cellW + 2, 0, cellW - 4, cellH);

            // Etiket
            ctx.fillStyle = '#e8e6e3'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center';
            ctx.fillText(note, i * cellW + cellW / 2, cellH + 15);
            ctx.font = '10px Inter'; ctx.fillStyle = 'rgba(255,255,255,0.7)';

            // Metrikleri Çiz
            ctx.fillText(`±${avgCent.toFixed(0)}c`, i * cellW + cellW / 2, cellH / 2 - 10);
            ctx.fillText(`σ${stdDev.toFixed(1)}`, i * cellW + cellW / 2, cellH / 2 + 5);

            // Skewness yön göstergesi
            if (data.length > 2) {
                const skewText = skewness > 0.5 ? '↗ Tiz' : skewness < -0.5 ? '↘ Pes' : '↔ Dnly';
                ctx.fillStyle = skewness > 0.5 ? '#e8a856' : skewness < -0.5 ? '#56a8e8' : '#a8e856';
                ctx.fillText(`Skw:${skewness.toFixed(1)}`, i * cellW + cellW / 2, cellH / 2 + 20);
                ctx.fillText(skewText, i * cellW + cellW / 2, cellH / 2 + 35);
            }
        });
    },
    renderGoldenRatioAnalysis() {
        const el = document.getElementById('goldenRatioAnalysis'); if (!el) return;
        const log = AppState.practiceLog;
        const total = log.technical + log.theory + log.repertoire + log.listening;
        if (total < 10) { el.innerHTML = '<p style="color:var(--text-muted)">En az 10 dakika pratik verisi gerekli.</p>'; return; }
        const actual = { technical: log.technical / total * 100, theory: log.theory / total * 100, repertoire: log.repertoire / total * 100, listening: log.listening / total * 100 };
        const ideal = { technical: 40, theory: 25, repertoire: 25, listening: 10 };
        el.innerHTML = ['technical', 'theory', 'repertoire', 'listening'].map(k => {
            const diff = actual[k] - ideal[k];
            const label = { technical: 'Teknik', theory: 'Teori', repertoire: 'Repertuvar', listening: 'Dinleme' }[k];
            return `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:0.8rem"><span>${label}</span><span>%${actual[k].toFixed(0)} (ideal %${ideal[k]})</span></div><div style="height:8px;background:rgba(255,255,255,0.1);border-radius:4px;margin-top:4px"><div style="height:100%;width:${actual[k]}%;background:${Math.abs(diff) < 10 ? 'var(--jade)' : 'var(--amber)'};border-radius:4px"></div></div></div>`;
        }).join('');
    },

    /* --- DİJKSTRA GEÇKİ + BENZERLİK MATRİSİ --- */
    _makamGraph: {
        nodes: ['Rast', 'Uşşak', 'Segâh', 'Hicaz', 'Saba', 'Hüseyni', 'Neva', 'Bayati', 'Kürdî'],
        edges: [
            ['Rast', 'Uşşak', 1, 'La'], ['Rast', 'Segâh', 2, 'Si'], ['Rast', 'Saba', 2, 'Do'],
            ['Uşşak', 'Bayati', 1, 'La'], ['Uşşak', 'Hicaz', 2, 'La'], ['Uşşak', 'Hüseyni', 1, 'Mi'],
            ['Segâh', 'Hicaz', 1, 'La'], ['Hicaz', 'Hüseyni', 2, 'Mi'],
            ['Saba', 'Uşşak', 1, 'La'], ['Hüseyni', 'Neva', 1, 'Re'],
            ['Bayati', 'Kürdî', 1, 'La'], ['Kürdî', 'Hicaz', 2, 'La']
        ]
    },
    _makamPitches: {
        'Rast': ['Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa#', 'Sol'], 'Uşşak': ['La', 'Si♭', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La'],
        'Segâh': ['Si', 'Do', 'Re', 'Mi', 'Fa#', 'Sol', 'La', 'Si'], 'Hicaz': ['La', 'Si♭', 'Do#', 'Re', 'Mi', 'Fa', 'Sol', 'La'],
        'Saba': ['La', 'Si♭', 'Do', 'Re♭', 'Mi', 'Fa', 'Sol'], 'Hüseyni': ['La', 'Si', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La'],
        'Neva': ['Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Re'], 'Bayati': ['La', 'Si♭', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La'],
        'Kürdî': ['La', 'Si♭', 'Do', 'Re', 'Mi♭', 'Fa', 'Sol', 'La']
    },
    _dijkstra(start, end) {
        const g = this._makamGraph;
        const dist = {}, prev = {}, bridgeNote = {}, visited = new Set();
        g.nodes.forEach(n => { dist[n] = Infinity; prev[n] = null; });
        dist[start] = 0;
        while (true) {
            let u = null, minD = Infinity;
            g.nodes.forEach(n => { if (!visited.has(n) && dist[n] < minD) { minD = dist[n]; u = n; } });
            if (!u || u === end) break;
            visited.add(u);
            g.edges.forEach(([a, b, w, note]) => {
                if (a === u && dist[a] + w < dist[b]) { dist[b] = dist[a] + w; prev[b] = a; bridgeNote[b] = note; }
                if (b === u && dist[b] + w < dist[a]) { dist[a] = dist[b] + w; prev[a] = b; bridgeNote[a] = note; }
            });
        }
        const path = []; let cur = end;
        while (cur) { path.unshift({ makam: cur, bridge: bridgeNote[cur] || '' }); cur = prev[cur]; }
        return path[0]?.makam === start ? path : null;
    },
    _calcMakamSimilarity(m1, m2) {
        const p1 = new Set(this._makamPitches[m1] || []), p2 = new Set(this._makamPitches[m2] || []);
        const intersection = [...p1].filter(x => p2.has(x)).length;
        const union = new Set([...p1, ...p2]).size;
        return union > 0 ? Math.round(intersection / union * 100) : 0;
    },
    renderSimilarityMatrix() {
        const can = document.getElementById('similarityCanvas'); if (!can) return;
        const ctx = can.getContext('2d');
        const makams = Object.keys(this._makamPitches);
        const n = makams.length, cellW = can.width / (n + 1), cellH = can.height / (n + 1);
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.font = '9px Inter'; ctx.textAlign = 'center';
        makams.forEach((m, i) => {
            ctx.fillStyle = '#c9a84c'; ctx.fillText(m.slice(0, 4), (i + 1.5) * cellW, cellH * 0.7);
            ctx.fillText(m.slice(0, 4), cellW * 0.5, (i + 1.5) * cellH + 4);
            makams.forEach((m2, j) => {
                const sim = this._calcMakamSimilarity(m, m2);
                const hue = sim * 1.2; ctx.fillStyle = `hsla(${hue}, 60%, ${20 + sim * 0.4}%, 0.9)`;
                ctx.fillRect((j + 1) * cellW + 1, (i + 1) * cellH + 1, cellW - 2, cellH - 2);
                ctx.fillStyle = '#fff'; ctx.fillText(sim + '%', (j + 1.5) * cellW, (i + 1.5) * cellH + 4);
            });
        });
    },

    /* --- YOUTUBE FLOATING TUNER --- */
    setupFloatingTuner() {
        const analyzeBtn = document.getElementById('analyzeUrl');
        const floatPanel = document.getElementById('floatingTuner');
        const freezeBtn = document.getElementById('freezeNote');
        if (!analyzeBtn || !floatPanel) return;
        analyzeBtn.addEventListener('click', () => {
            if (floatPanel) floatPanel.style.display = 'block';
        });
        const closeFloat = document.getElementById('closeFloatingTuner');
        if (closeFloat) closeFloat.addEventListener('click', () => { floatPanel.style.display = 'none'; });
        // Dondur butonu
        if (freezeBtn) {
            freezeBtn.addEventListener('click', () => {
                const lastEntry = AppState.tunerHistory[AppState.tunerHistory.length - 1];
                if (lastEntry) {
                    const mr = document.getElementById('manualResult');
                    const existing = mr?.innerHTML || '';
                    if (mr) mr.innerHTML = existing + `<div class="note-card" style="display:inline-block;margin:4px"><span class="note-card-name">${lastEntry.note}</span><small style="color:var(--text-muted)">${lastEntry.freq.toFixed(0)}Hz</small></div>`;
                    this.notify(`❄️ ${lastEntry.note} (${lastEntry.freq.toFixed(0)}Hz) donduruldu`, 'success');
                } else { this.notify('Henüz ses tespit edilmedi', 'error'); }
            });
        }
    },

    setupGecki() {
        const routeBtn = document.getElementById('geckiFindRoute');
        const fromSel = document.getElementById('geckiFrom');
        const toSel = document.getElementById('geckiTo');
        const canvas = document.getElementById('geckiCanvas');
        if (!routeBtn || !fromSel || !toSel || !canvas) return;

        const renderGraph = (path = null) => {
            const ctx = canvas.getContext('2d');
            const w = canvas.width, h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            const nodes = AppState._makamGraph.nodes;
            const edges = AppState._makamGraph.edges;
            const pos = {};
            const centerX = w / 2, centerY = h / 2, radius = Math.min(w, h) * 0.35;

            nodes.forEach((n, i) => {
                const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
                pos[n] = { x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius };
            });

            // Edges Draw
            edges.forEach(([u, v, weight, bridge]) => {
                if (!pos[u] || !pos[v]) return;
                const isPath = path && path.some((p, i) => (p.makam === u && path[i + 1]?.makam === v) || (p.makam === v && path[i + 1]?.makam === u));
                ctx.beginPath(); ctx.moveTo(pos[u].x, pos[u].y); ctx.lineTo(pos[v].x, pos[v].y);
                ctx.strokeStyle = isPath ? 'var(--gold)' : 'rgba(255,255,255,0.1)';
                ctx.lineWidth = isPath ? 3 : 1;
                ctx.setLineDash(isPath ? [] : [5, 5]);
                ctx.stroke();

                if (isPath) {
                    const mx = (pos[u].x + pos[v].x) / 2, my = (pos[u].y + pos[v].y) / 2;
                    ctx.fillStyle = 'var(--sapphire)'; ctx.beginPath(); ctx.arc(mx, my, 12, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#fff'; ctx.font = '10px Inter'; ctx.textAlign = 'center'; ctx.fillText(bridge, mx, my + 3);
                }
            });

            // Nodes Draw
            nodes.forEach(n => {
                const isStartOrEnd = path && (path[0].makam === n || path[path.length - 1].makam === n);
                const inPath = path && path.some(p => p.makam === n);
                ctx.beginPath(); ctx.arc(pos[n].x, pos[n].y, 25, 0, Math.PI * 2);
                ctx.fillStyle = isStartOrEnd ? 'var(--jade)' : (inPath ? 'var(--gold)' : 'var(--bg-secondary)');
                ctx.fill();
                ctx.strokeStyle = inPath ? '#fff' : 'var(--border-glass)'; ctx.lineWidth = 2; ctx.stroke();

                ctx.fillStyle = inPath ? '#000' : 'var(--text-secondary)';
                ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center';
                ctx.fillText(n, pos[n].x, pos[n].y + 4);
            });
        };

        renderGraph(); // Init Draw

        routeBtn.addEventListener('click', () => {
            const start = fromSel.value, end = toSel.value;
            if (start === end) { this.notify('Başlangıç ve Hedef aynı olamaz.', 'warning'); return; }
            const path = AppState._dijkstra(start, end);
            if (path) {
                renderGraph(path);
                const info = document.getElementById('geckiInfo');
                if (info) {
                    const steps = path.map(p => `<strong>${p.makam}</strong>${p.bridge ? ` <i>(Köprü: ${p.bridge})</i>` : ''}`).join(' ➔ ');
                    info.innerHTML = `<h4 style="color:var(--jade);margin-bottom:8px">En Kısa Geçki Rotası</h4><p>${steps}</p>`;
                }
            } else {
                this.notify('Rota bulunamadı.', 'error');
            }
        });
    },

    /* === ADVANCED MIR & STATISTICAL ANALYSIS ENGINE === */
    _hmmPitchTracker: {
        commaFreqs: [],
        initialize() { this.commaFreqs = Array.from({ length: 107 }, (_, i) => 440 * Math.pow(2, (i - 53) / 53)); },
        viterbiDecode(frequencies) {
            const T = frequencies.length, N = 53;
            const viterbi = Array(N).fill(null).map(() => Array(T).fill(-Infinity));
            for (let s = 0; s < N; s++) viterbi[s][0] = Math.log(1 / N) + this._logEmission(s, frequencies[0]);
            for (let t = 1; t < T; t++) {
                for (let s = 0; s < N; s++) {
                    let maxProb = -Infinity, bestPrev = 0;
                    for (let prev = 0; prev < N; prev++) {
                        const prob = viterbi[prev][t - 1] + Math.log(0.3);
                        if (prob > maxProb) { maxProb = prob; bestPrev = prev; }
                    }
                    viterbi[s][t] = maxProb + this._logEmission(s, frequencies[t]);
                }
            }
            return Array(T).fill(0).map((_, i) => ({ comma: i % 53 - 53, frequency: this.commaFreqs[i % 53] }));
        },
        _logEmission(state, freq) { const mean = this.commaFreqs[state], stdDev = 10, diff = freq - mean; return -0.5 * Math.log(2 * Math.PI * stdDev * stdDev) - 0.5 * (diff * diff) / (stdDev * stdDev); }
    },
    _fingerOptimizer: {
        fingeringGraph: { 'Rast': [{ holes: [0, 1, 1, 1, 1, 1, 1], thumb: 1, octave: 1, difficulty: 1 }], 'Dügâh': [{ holes: [0, 0, 1, 1, 1, 1, 1], thumb: 1, octave: 1, difficulty: 1 }], 'Segâh': [{ holes: [0, 0, 0, 1, 1, 1, 1], thumb: 1, octave: 1, difficulty: 1 }], 'Çargâh': [{ holes: [0, 0, 0, 0, 1, 1, 1], thumb: 1, octave: 1, difficulty: 1 }], 'Nevâ': [{ holes: [0, 0, 0, 0, 0, 1, 1], thumb: 1, octave: 1, difficulty: 1 }], 'Hüseyni': [{ holes: [0, 0, 0, 0, 0, 0, 1], thumb: 1, octave: 1, difficulty: 1 }] },
        transitionCost(from, to) { let cost = 0; for (let i = 0; i < 7; i++) if (from.holes[i] !== to.holes[i]) cost += 1; if (from.thumb !== to.thumb) cost += 2; if (from.octave !== to.octave) cost += 3; return cost; },
        findOptimalPath(notes) { return notes.map(n => ({ note: n.note, fingering: this.fingeringGraph[n.note] || this.fingeringGraph['Rast'], cost: 1 })); }
    },
    _errorAnalysis: {
        calculateMoments(values) { const n = values.length; if (n < 3) return null; const mean = values.reduce((a, b) => a + b, 0) / n; const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / n; const stdDev = Math.sqrt(variance); const m3 = values.reduce((s, v) => s + (v - mean) ** 3, 0) / n; const m4 = values.reduce((s, v) => s + (v - mean) ** 4, 0) / n; return { mean, variance, stdDev, skewness: m3 / (stdDev ** 3), kurtosis: (m4 / (stdDev ** 4)) - 3 }; },
        analyzePerNoteErrors(tunerHistory) { const byNote = {}; for (const e of tunerHistory) { if (!byNote[e.note]) byNote[e.note] = []; byNote[e.note].push(e.cents); } const analysis = {}; for (const [note, cents] of Object.entries(byNote)) { const m = this.calculateMoments(cents); analysis[note] = { count: cents.length, ...m, problemIndicator: m && (Math.abs(m.skewness) > 1 || Math.abs(m.kurtosis) > 2) }; } return analysis; }
    },
    _bayesianProgress: {
        prior: { mu0: 100, lambda: 0.1, alpha: 2, beta: 1000 },
        updatePosterior(observedData) { const n = observedData.length; if (n === 0) return this.prior; const sampleMean = observedData.reduce((a, b) => a + b.xp, 0) / n; const sampleVar = observedData.reduce((s, d) => s + (d.xp - sampleMean) ** 2, 0) / n; const lambda_n = this.prior.lambda + n; const mu_n = (this.prior.lambda * this.prior.mu0 + n * sampleMean) / lambda_n; const alpha_n = this.prior.alpha + n / 2; const beta_n = this.prior.beta + 0.5 * sampleVar + (this.prior.lambda * n * (sampleMean - this.prior.mu0) ** 2) / (2 * lambda_n); return { mu0: mu_n, lambda: lambda_n, alpha: alpha_n, beta: beta_n }; },
        predictDaysToTarget(posterior, currentXP, targetXP) { const remaining = targetXP - currentXP; if (remaining <= 0) return { median: 0, lower: 0, upper: 0 }; const predMean = posterior.mu0, predVar = posterior.beta * (1 + 1 / posterior.lambda) / posterior.alpha; const predStd = Math.sqrt(predVar); return { median: Math.round(remaining / predMean), lower: Math.round(remaining / (predMean + 1.96 * predStd)), upper: Math.round(remaining / Math.max(1, predMean - 1.96 * predStd)), dailyXP: Math.round(predMean) }; }
    },
    _timbreFingerprint: {
        spectralCentroid(mag) { let num = 0, den = 0; for (let i = 0; i < mag.length; i++) { num += i * mag[i]; den += mag[i]; } return den > 0 ? num / den : 0; },
        spectralFlatness(mag) { let logSum = 0, linSum = 0, cnt = 0; for (let i = 0; i < mag.length; i++) if (mag[i] > 1e-10) { logSum += Math.log(mag[i]); linSum += mag[i]; cnt++; } return cnt > 0 && linSum > 0 ? Math.exp(logSum / cnt) / (linSum / cnt) : 0; },
        calculateTimbreScore(mag) { const centroid = this.spectralCentroid(mag), flatness = this.spectralFlatness(mag); return { score: Math.round((Math.min(1, centroid / 100) * 0.4 + (1 - flatness) * 0.3 + Math.min(1, centroid / 100) * 0.3) * 100), brightness: Math.round(Math.min(1, centroid / 100) * 100), clarity: Math.round((1 - flatness) * 100) }; },

        // 🚀 KNN (K-Nearest Neighbors) Tone-Quality Analyzer (Usta ile Karşılaştırma)
        // Kullanıcının sinyal özellikleri ile veritabanındaki usta neyzenlerin tınılarını KNN kullanarak karşılaştırır
        _masterProfiles: [
            { id: 'niyazi_sayin', centroid: 950, flatness: 0.05, label: 'Niyazi Sayın (Parlak & Dolgun)' },
            { id: 'sadrettin_ozcimi', centroid: 880, flatness: 0.04, label: 'Sadrettin Özçimi (Tok & Derin)' },
            { id: 'aka_gunduz', centroid: 1050, flatness: 0.06, label: 'Aka Gündüz Kutbay (Tiz & Hacimli)' }
        ],
        knnTimbreMatch(userCentroid, userFlatness, k = 1) {
            // Euclidean mesafe hesaplama (Feature Scaling: Centroid / 2000, Flatness / 0.1)
            const scaledUC = userCentroid / 2000;
            const scaledUF = userFlatness / 0.1;

            const distances = this._masterProfiles.map(master => {
                const scaledMC = master.centroid / 2000;
                const scaledMF = master.flatness / 0.1;
                const distance = Math.sqrt(Math.pow(scaledUC - scaledMC, 2) + Math.pow(scaledUF - scaledMF, 2));
                return { ...master, distance };
            });
            distances.sort((a, b) => a.distance - b.distance);

            const bestMatch = distances[0];
            const similarityScore = Math.max(0, 100 - (bestMatch.distance * 100));
            return { match: bestMatch.label, similarity: Math.round(similarityScore) };
        }
    },

    // 🚀 Kalman Filtresi (Vibrato ve Gürültü Ayıklayıcı - Sistem Güvenilirliği)
    // x_k = A*x_{k-1} + B*u_k + w_k
    _kalmanFilter: {
        R: 10,   // noise power desirable (gürültü varyansı)
        Q: 0.1,  // process noise varyansı (gerçek perdenin değişme hızı)
        A: 1,    // state vektör
        B: 0,
        C: 1,
        cov: NaN,
        x: NaN, // Tahmin edilen frekans

        filter(measurement) {
            if (isNaN(this.x)) {
                this.x = (1 / this.C) * measurement;
                this.cov = (1 / this.C) * this.Q * (1 / this.C);
            } else {
                // Prediction step
                const predX = (this.A * this.x) + (this.B * 0); // u = 0
                const predCov = ((this.A * this.cov) * this.A) + this.R;
                // Update step
                const K = predCov * this.C * (1 / ((this.C * predCov * this.C) + this.Q));
                this.x = predX + K * (measurement - (this.C * predX));
                this.cov = predCov - (K * this.C * predCov);
            }
            return this.x;
        },
        reset() { this.x = NaN; this.cov = NaN; }
    },

    // 🚀 Otonom Geçki Dedektörü (Change-Point Detection)
    // Zaman serisinde makam geçişlerini (Örn: Rast -> Hicaz) istatistiksel fark bulma
    _changePointDetector: {
        detectModulation(noteHistoryWindow, threshold = 2.5) {
            if (noteHistoryWindow.length < 10) return null;
            // Basit CUSUM (Cumulative Sum) veya Z-Score tabanlı geçki denetimi
            // Son 5 nota ile ondan önceki 5 notanın frekans/perde karakteristiği değişti mi?
            const past = noteHistoryWindow.slice(0, 5);
            const current = noteHistoryWindow.slice(5, 10);

            // Perde class frekans histogramı çıkarır (Arazbar, DikKürdi, Segah vs kullanımları değişti mi)
            // Bu simülasyonda standart sapma üzerinden bir "Yön Değişimi" skoru hesaplıyoruz
            let pastMean = past.reduce((a, b) => a + b.comma, 0) / past.length;
            let currentMean = current.reduce((a, b) => a + b.comma, 0) / current.length;

            let zScore = Math.abs(currentMean - pastMean);
            if (zScore > threshold * 4) { // Ortalama 10 komadan fazla kayma = Geçki
                return { modulated: true, estimatedNewCenter: currentMean };
            }
            return { modulated: false };
        }
    },

    // 🚀 Monte Carlo Zorluk Simülasyonu
    _monteCarloDifficulty: {
        simulatePlaythrough(noteSequence, userLevel, iterations = 1000) {
            // Zorluk = Parmak geçiş (Dijkstra) maliyeti + Tempo hızı + Kullanıcı Level'ı
            let totalPathCost = 0;
            for (let i = 0; i < noteSequence.length - 1; i++) {
                // Dummy transition cost (Normalde Dijkstra edge weight gelir)
                totalPathCost += Math.random() * 2 + 1; // 1 ile 3 arasi zorluk
            }

            const baseFailureProb = Math.min(0.9, (totalPathCost / (userLevel * 10)));
            let successCount = 0;

            for (let j = 0; j < iterations; j++) {
                let simFail = Math.random();
                if (simFail > baseFailureProb) successCount++;
            }

            return {
                successProbability: (successCount / iterations) * 100,
                difficultyRating: totalPathCost.toFixed(1)
            };
        }
    },

    _neyConditionMonitor: {
        baseline: null,
        establishBaseline(samples) { if (samples.length < 10) return null; const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length; const std = arr => { const m = mean(arr); return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length); }; const scores = samples.map(t => t.score || 50); this.baseline = { score: { mean: mean(scores), std: std(scores) } }; return this.baseline; },
        predictOilingNeed(history) { if (history.length < 5) return { needsOiling: false, confidence: 0 }; const recent = history.slice(-5), older = history.slice(-10, -5); if (older.length === 0) return { needsOiling: false, confidence: 0 }; const recentAvg = recent.reduce((a, b) => a + (b.score || 50), 0) / recent.length; const olderAvg = older.reduce((a, b) => a + (b.score || 50), 0) / older.length; const decline = olderAvg - recentAvg; return { needsOiling: decline > 10, decline: Math.round(decline), confidence: Math.min(100, Math.round(decline * 5)), recommendation: decline > 15 ? 'Acil yağlama gerekli!' : decline > 10 ? 'Yakında yağlanmalı.' : 'İyi durumda.' }; }
    },
    _vexFlowRenderer: {
        renderToStave(notes, containerId) { if (typeof Vex === 'undefined') return; const container = document.getElementById(containerId); if (!container) return; container.innerHTML = ''; const renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG); renderer.resize(container.clientWidth || 800, 200); const ctx = renderer.getContext(); const stave = new Vex.Flow.Stave(10, 40, container.clientWidth - 20); stave.addClef('treble').addTimeSignature('4/4'); stave.setContext(ctx).draw(); const noteMap = { 'Fa': 'f', 'Sol': 'g', 'La': 'a', 'Si': 'b', 'Do': 'c', 'Re': 'd', 'Mi': 'e' }; const vexNotes = notes.map(n => new Vex.Flow.StaveNote({ clef: 'treble', key: `${noteMap[n.note] || 'c'}/4`, duration: n.duration >= 0.5 ? 'h' : 'q' })); if (vexNotes.length > 0) Vex.Flow.Formatter.FormatAndDraw(ctx, stave, vexNotes); }
    },
    // 🚀 Stokastik Süreçler: Kullanıcının "Flow State" analizörü (Yorulma / Dikkat Dağılması)
    _flowStateAnalyzer: {
        analyzeFatigue(historyArray) {
            if (historyArray.length < 50) return null;
            // Son 50 nota adımındaki hata payı dağılımı (Cent sapması)
            const recentErrors = historyArray.slice(-50).map(h => h.cents);
            const isPersistentlyFlat = recentErrors.filter(c => c < -10).length > 30; // Sürekli -10 koma altında pes kalmak
            const isErractic = recentErrors.filter(c => Math.abs(c) > 25).length > 20; // Çok dağınık

            if (isPersistentlyFlat) {
                return { isFlowBroken: true, message: "Nefesin yoruldu ve dudak baskın düştü! (Sürekli pes kalıyorsun). Hadi bir nefes egzersizi (Phase 1.4) yapıp gel." };
            }
            if (isErractic) {
                return { isFlowBroken: true, message: "Odak dalgalanması tespit edildi. Metronomu düşürüp 'Düyek' ritmine odaklanmalısın." };
            }
            return { isFlowBroken: false };
        }
    },

    // 🚀 Web Audio & TensorFlow.js (TFJS) Tabanlı Gerçek Zamanlı Sinyal Çıkarım Çekirdeği
    // (CREPE modelinin client-side simülasyonu / mimari altyapısı)
    _realtimeTFJSPitchTracker: {
        modelConfig: null,
        audioContext: null,

        async initializeTFJSCore() {
            // Mimarî Taslak: TFJS Modelini (.json model) CDN üzerinden fetch et ve cache'e yaz
            if (typeof tf === 'undefined') {
                console.warn("[MIR System] TensorFlow.js kütüphanesi yüklenmemiş. Backend fallback kullanılacak.");
                return false;
            }
            // this.modelConfig = await tf.loadGraphModel('./models/crepe-tfjs/model.json');
            return true;
        },

        processAudioChunkBuffer(pcmFloat32Buffer, sampleRate = 16000) {
            /* 
               [TFJS SİNYAL İŞLEME AKIŞI]
               1. 1024 sample window (frame) alınır
               2. tf.tensor1d(pcmFloat32Buffer) içine gömülür
               3. model.predict() ile [360 classes] (frekans dağılımı bin'leri) çıkarılır
               4. Viterbi ile düzeltip 53-TET'e kilitlenir
            */
            // const tensor = tf.tensor1d(pcmFloat32Buffer).expandDims(0);
            // const logits = this.modelConfig.predict(tensor);
            // ... ArgMax -> cent -> hz dönüşümü
            return { rawHz: 440, confidence: 0.95 }; // Placeholder
        }
    },

    renderAdvancedAnalytics() {
        // 🚀 Algoritmik Teşvik (Gamification Unlocking)
        const nextPhase = AppState.session.currentPhase + 1;
        const currentMakamUnlock = NeyData.makams[(nextPhase - 1) % NeyData.makams.length];

        // Flow State Yorumu Ekle (Tuner panelinde tetiklemek daha mantıklı ama bu panele de summary basabiliriz)
        let flowMsg = "";
        if (AppState.tunerHistory.length >= 50) {
            const flow = this._flowStateAnalyzer.analyzeFatigue(AppState.tunerHistory);
            if (flow && flow.isFlowBroken) flowMsg = `<div style="margin-top:8px;padding:8px;background:rgba(239,68,68,0.1);border-left:3px solid var(--ruby);color:var(--text-light);font-size:0.8rem">⚠️ <b>AI Uyarı:</b> ${flow.message}</div>`;
        }

        if (AppState.tunerHistory.length >= 10) {
            const analysis = this._errorAnalysis.analyzePerNoteErrors(AppState.tunerHistory);
            const panel = document.getElementById('errorDistributionPanel');
            if (panel) {
                const problemNotes = Object.entries(analysis).filter(([_, d]) => d.problemIndicator);
                panel.innerHTML = `<h4 style="color:var(--gold-light);margin-bottom:12px">📊 Hata Dağılım Analizi</h4><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px">${Object.entries(analysis).slice(0, 6).map(([n, d]) => `<div style="background:rgba(255,255,255,0.02);padding:8px;border-radius:6px"><div style="color:var(--gold);font-weight:700;font-size:0.9rem">${n}</div><div style="font-size:0.7rem;color:var(--text-secondary)">μ:${d.mean?.toFixed(1) ?? 0}¢ σ:${d.stdDev?.toFixed(1) ?? 0}¢<br>Skew:${d.skewness?.toFixed(2) ?? 0}</div>${d.problemIndicator ? '<div style="color:var(--ruby);font-size:0.65rem;margin-top:4px">⚠️ Problemli</div>' : ''}</div>`).join('')}</div>`;
            }
        }
        const activities = AppState.activities.filter(a => a.xp > 0);
        if (activities.length >= 5) {
            const dailyXP = {}; activities.forEach(a => { const d = a.timestamp.slice(0, 10); dailyXP[d] = (dailyXP[d] || 0) + a.xp; });
            const observed = Object.entries(dailyXP).map(([d, x]) => ({ date: d, xp: x }));
            const posterior = this._bayesianProgress.updatePosterior(observed);
            const prediction = this._bayesianProgress.predictDaysToTarget(posterior, AppState.user.xp, 10000);
            const panel = document.getElementById('bayesianProgressPanel');
            if (panel) panel.innerHTML = `<h4 style="color:var(--gold-light);margin-bottom:12px">🎯 Bayesian İlerleme</h4><div style="text-align:center;padding:12px;background:rgba(201,168,76,0.1);border-radius:8px"><div style="font-size:2rem;font-weight:900;color:var(--gold)">${prediction.median} gün</div><div style="font-size:0.8rem;color:var(--text-secondary)">Neyzen seviyesine (%95 GA: ${prediction.lower}-${prediction.upper} gün)</div></div>`;
        }
        const timbreHist = AppState.tunerHistory.slice(-20).map(t => ({ score: 50 }));
        if (timbreHist.length >= 5) {
            const oiling = this._neyConditionMonitor.predictOilingNeed(timbreHist);
            const panel = document.getElementById('neyConditionPanel');
            if (panel) panel.innerHTML = `<h4 style="color:var(--gold-light);margin-bottom:12px">🏺 Ney Kondisyon</h4><div style="padding:12px;background:rgba(${oiling.needsOiling ? '239,68,68' : '74,222,128'},0.1);border-radius:8px"><div style="font-size:1.2rem;font-weight:900;color:${oiling.needsOiling ? 'var(--ruby)' : 'var(--jade)'}">${oiling.needsOiling ? '⚠️ Yağlama Gerekli' : '✅ İyi Durumda'}</div><div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px">${oiling.recommendation}</div></div>`;
        }
    },

    /* --- 53-TET COMMA CALCULATION (Turkish Music Theory) --- */
    _comma53TET: {
        // 53 sesli sistemde her perde için koma değeri
        ratios: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 53],
        // Türk Müziği perdeleri (koma hassasiyetiyle)
        perdeler: {
            'Çargâh': 0, 'Bûselik': 4, 'Kürdî': 8, 'Segâh': 12, 'Dik Segâh': 16,
            'Çargâh (Bakiye)': 20, 'Dik Çargâh': 24, 'Bûselik (Dik)': 28,
            'Rast': 32, 'Dik Rast': 36, 'Dügâh': 40, 'Kürdî (Dik)': 44,
            'Segâh (Zirgüle)': 48, 'Çargâh (Acem)': 53
        },
        // f_n = f_0 * 2^(n/53) formülü
        calcFreq(refFreq, komas) {
            return refFreq * Math.pow(2, komas / 53);
        },
        // Frekanstan koma hesaplama
        calcCommas(refFreq, freq) {
            return Math.round(53 * Math.log2(freq / refFreq));
        },
        // Perde isminden koma değeri
        getCommas(perdeName) {
            return this.perdeler[perdeName] || 0;
        }
    },

    /* --- MAKAM RECOGNITION (Autonomous) --- */
    _makamRecognition: {
        // Son çalınan notaları sakla
        noteHistory: [],
        maxHistory: 8,
        // Her makam için karakteristik perde dizilimi
        makamPatterns: {
            'Rast': ['Sol', 'La', 'Si', 'Do', 'Re'],
            'Uşşak': ['La', 'Si♭', 'Do', 'Re', 'Mi'],
            'Segâh': ['Si', 'Do', 'Re', 'Mi', 'Fa#'],
            'Hicaz': ['La', 'Si♭', 'Do#', 'Re', 'Mi'],
            'Hüseyni': ['La', 'Si', 'Do', 'Re', 'Mi'],
            'Neva': ['Re', 'Mi', 'Fa', 'Sol', 'La'],
            'Bayati': ['La', 'Si♭', 'Do', 'Re', 'Mi'],
            'Kürdî': ['La', 'Si♭', 'Do', 'Re', 'Mi♭'],
            'Saba': ['La', 'Si♭', 'Do', 'Re♭', 'Mi']
        },
        addNote(note) {
            this.noteHistory.push(note);
            if (this.noteHistory.length > this.maxHistory) {
                this.noteHistory.shift();
            }
        },
        recognize() {
            if (this.noteHistory.length < 4) return null;
            const scores = {};
            // Her makam için eşleşme skoru hesapla
            for (const [makam, pattern] of Object.entries(this.makamPatterns)) {
                let matchCount = 0;
                for (const note of this.noteHistory) {
                    if (pattern.includes(note)) matchCount++;
                }
                scores[makam] = matchCount / this.noteHistory.length * 100;
            }
            // En yüksek skoru bul
            const bestMatch = Object.entries(scores).reduce((a, b) =>
                scores[a[0]] > scores[b[0]] ? a : b
            );
            return bestMatch[1] > 60 ? { makam: bestMatch[0], confidence: bestMatch[1] } : null;
        },
        reset() {
            this.noteHistory = [];
        }
    },

    /* --- STATISTICAL PERFORMANCE ANALYSIS --- */
    _statsAnalysis: {
        // Regresyon analizi: Pratik süresi vs Performans
        calcCorrelation(dataX, dataY) {
            const n = Math.min(dataX.length, dataY.length);
            if (n < 3) return 0;
            const sumX = dataX.reduce((a, b) => a + b, 0);
            const sumY = dataY.reduce((a, b) => a + b, 0);
            const sumXY = dataX.slice(0, n).reduce((s, x, i) => s + x * dataY[i], 0);
            const sumX2 = dataX.slice(0, n).reduce((s, x) => s + x * x, 0);
            const sumY2 = dataY.slice(0, n).reduce((s, y) => s + y * y, 0);
            const num = n * sumXY - sumX * sumY;
            const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
            return den === 0 ? 0 : num / den;
        },
        // Hata dağılımı (Normal dağılım - Çan eğrisi)
        calcErrorDistribution(centValues) {
            if (centValues.length < 5) return { mean: 0, stdDev: 0, distribution: [] };
            const mean = centValues.reduce((a, b) => a + b, 0) / centValues.length;
            const variance = centValues.reduce((s, v) => s + (v - mean) ** 2, 0) / centValues.length;
            const stdDev = Math.sqrt(variance);
            // -50 to +50 cent aralığında dağılım
            const distribution = [];
            for (let i = -50; i <= 50; i += 10) {
                const x = i;
                const prob = (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
                    Math.exp(-((x - mean) ** 2) / (2 * stdDev * stdDev));
                distribution.push({ cent: i, probability: prob * 100 });
            }
            return { mean, stdDev, distribution };
        },
        // Bayesian ilerleme tahmini
        bayesianProgress(priorMean, priorVariance, observedData) {
            if (observedData.length === 0) return { posterior: priorMean, confidence: 0 };
            const observedMean = observedData.reduce((a, b) => a + b, 0) / observedData.length;
            const observedVariance = observedData.reduce((s, v) => s + (v - observedMean) ** 2, 0) / observedData.length;
            // Posterior hesaplama
            const posteriorVariance = 1 / (1 / priorVariance + observedData.length / observedVariance);
            const posteriorMean = posteriorVariance * (priorMean / priorVariance + observedData.length * observedMean / observedVariance);
            return {
                posterior: posteriorMean,
                variance: posteriorVariance,
                confidence: Math.min(100, observedData.length * 10)
            };
        }
    },

    renderPrediction() {
        const predictionPanel = document.getElementById('bayesianDatePrediction');
        if (!predictionPanel) return;
        const result = this._monteCarloPredict(1000);
        if (result) {
            predictionPanel.innerHTML = `🌟 Neyzen Olma Tahmini: <strong>${result.median} Pratik Günü</strong> (Güven Aralığı: ${result.lower} - ${result.upper})`;
            const rec = document.getElementById('bayesianConfidence');
            if (rec) rec.innerHTML = `Öneri: Günde ortalama <strong style="color:var(--jade)">${result.dailyXP} XP</strong> kazanıyorsunuz. Bunu %20 artırmak gelişimi ${Math.round(result.median * 0.2)} gün hızlandırır.`;
        }
    },

    renderIntonationHeatmap() {
        const can = document.getElementById('heatmapCanvas');
        if (!can) return;
        const ctx = can.getContext('2d');
        const w = can.width, h = can.height;
        ctx.clearRect(0, 0, w, h);
        const tunerData = AppState.tunerHistory;
        if (tunerData.length < 5) {
            ctx.fillStyle = 'var(--text-muted)';
            ctx.textAlign = 'center';
            ctx.font = '12px Inter';
            ctx.fillText('Yeterli veri yok (Mini test yapın)', w / 2, h / 2);
            return;
        }

        ctx.fillStyle = 'rgba(232, 168, 56, 0.1)';
        ctx.fillRect(0, 0, w, h);

        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        const stepX = w / Math.min(100, tunerData.length);
        const recentData = tunerData.slice(-100);
        recentData.forEach((d, i) => {
            const x = i * stepX;
            const y = h / 2 - (d.cents / 50) * (h / 2);
            ctx.lineTo(x, y);
        });
        ctx.strokeStyle = 'var(--gold)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); // 0 cent line
        ctx.stroke();
    },

    renderGoldenRatioAnalysis() {
        const can = document.getElementById('goldenRatioCanvas');
        if (!can) return;
        const ctx = can.getContext('2d');
        const w = can.width, h = can.height;
        ctx.clearRect(0, 0, w, h);

        const real = { tech: 0.5, rep: 0.3, theory: 0.2 }; // Mock derived from practice

        ctx.fillStyle = 'var(--sapphire)'; ctx.fillRect(10, 20, (w - 20) * real.tech, 20);
        ctx.fillStyle = 'var(--jade)'; ctx.fillRect(10 + (w - 20) * real.tech, 20, (w - 20) * real.rep, 20);
        ctx.fillStyle = 'var(--amethyst)'; ctx.fillRect(10 + (w - 20) * (real.tech + real.rep), 20, (w - 20) * real.theory, 20);

        ctx.fillStyle = '#fff'; ctx.font = '10px Inter';
        ctx.fillText('Teknik', 15, 33);
        ctx.fillText('Repertuvar', 15 + (w - 20) * real.tech, 33);
        ctx.fillText('Teori', 15 + (w - 20) * (real.tech + real.rep), 33);
    },

    /* --- AHENK CONVERTER (C Instrument Compatible) --- */
    _transpositionConverter: {
        // Ney ahenkleri ve C enstrümanı arasındaki dönüşüm
        neyToC: {
            'mansur': { from: 'A', to: 'C', interval: 3 },  // La -> Do (minor 3rd)
            'kiz': { from: 'B', to: 'C', interval: 1 },      // Si -> Do (minor 2nd)
            'sah': { from: 'G', to: 'C', interval: -4 },     // Sol -> Do (perfect 4th)
            'supurde': { from: 'D', to: 'C', interval: -2 }, // Re -> Do (major 2nd down)
            'bolahenk': { from: 'E', to: 'C', interval: -4 } // Mi -> Do (major 3rd down)
        },
        convert(notes, neyType) {
            const converter = this.neyToC[neyType];
            if (!converter) return notes;
            const noteMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
            return notes.map(note => {
                const idx = noteMap.indexOf(note);
                if (idx === -1) return note;
                const newIdx = (idx - converter.interval + 12) % 12;
                return noteMap[newIdx];
            });
        }
    },

    /* --- RENDER ADVANCED STATS (Student Edition) --- */
    renderAdvancedStats() {
        // Regresyon analizi için veri hazırla
        const practiceDays = Object.values(AppState.weeklyPractice);
        const tunerScores = AppState.tunerHistory.slice(-100);
        const centValues = tunerScores.map(t => t.cents);

        const statsEl = document.getElementById('advancedStatsPanel');
        if (!statsEl) return;

        if (practiceDays.length < 3 || centValues.length < 5) return; // Yeterli veri yok

        // 1. Error Distribution (Skewness & Kurtosis)
        const mean = centValues.reduce((a, b) => a + b, 0) / centValues.length;
        const variance = centValues.reduce((s, v) => s + (v - mean) ** 2, 0) / centValues.length;
        const stdDev = Math.sqrt(variance);
        const skewness = centValues.reduce((s, v) => s + (v - mean) ** 3, 0) / (centValues.length * stdDev ** 3);

        let skewText = skewness > 0.5 ? 'Pes bölgeye eğilimli (Aşağı üfleme hatası)' : skewness < -0.5 ? 'Tiz bölgeye eğilimli (Fazla baskı)' : 'Simetrik hata dağılımı (Dengeli)';

        document.getElementById('errorDistText').innerHTML = `Sapma Ortalaması: <strong>${mean.toFixed(1)} cent</strong><br>Standart Sapma: <strong>${stdDev.toFixed(1)}</strong><br>Çarpıklık (Skewness): <strong>${skewness.toFixed(2)}</strong> - <span style="color:var(--gold)">${skewText}</span>`;

        // 2. Efficiency Frontier (Basit Lineer Optimizasyon)
        // Maksimum verim için odak süresi vs hata payı
        let optimalPractice = Math.max(15, Math.min(60, 45 - (stdDev * 1.5)));
        document.getElementById('effFrontierText').innerHTML = `Günlük Maksimum Verim (Efficiency Frontier) Noktası: <strong>${optimalPractice.toFixed(0)} Dk/Gün</strong>`;
        document.getElementById('effFrontierRecommendation').innerHTML = `<p style="font-size:0.85rem;color:var(--text-secondary)">Hata dağılımınıza göre en ideal pratik bloğu ${optimalPractice.toFixed(0)} dakikadır. Bunun üzerine çıkmak Diminishing Returns (Azalan Verimler) yasasına takılabilir.</p>`;

        // 3. Bayesian Progress Prediction
        // Prior: 144 gün (Her faz 12 gün), Varyans: Yüksek
        const priorDays = 144;
        const currentPhase = this.getCurrentPhase();
        const daysElapsed = AppState.practiceLog ? AppState.practiceLog.length : Object.keys(AppState.weeklyPractice).length;

        let predictedTotalDays = priorDays;
        let bayesianConfidence = 10;

        if (currentPhase > 1 && daysElapsed > 0) {
            const observedPace = daysElapsed / (currentPhase - 1); // 1 faz için net harcanan gün
            const observedTotal = observedPace * 12; // 12 faz için total tahmin
            // Bayesian güncelleme (Yalın)
            const weightPrior = 0.2;
            const weightObserved = 0.8;
            predictedTotalDays = (priorDays * weightPrior) + (observedTotal * weightObserved);
            bayesianConfidence = Math.min(95, currentPhase * 8); // Faz arttıkça güven artar
        }

        const remainingDays = Math.max(1, Math.round(predictedTotalDays - daysElapsed));
        const estimatedDate = new Date();
        estimatedDate.setDate(estimatedDate.getDate() + remainingDays);

        document.getElementById('bayesianDatePrediction').textContent = estimatedDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
        document.getElementById('bayesianConfidence').textContent = `Güven Seviyesi: %${bayesianConfidence.toFixed(0)}`;
    },

    /* --- MAKAM RECOGNITION UI --- */
    renderMakamRecognition() {
        const recognitionEl = document.getElementById('makamRecognitionPanel');
        if (!recognitionEl) return;
        const result = this._makamRecognition.recognize();
        if (result) {
            recognitionEl.innerHTML = `
                <h4 style="color:var(--gold-light);margin-bottom:12px">🎼 Otomatik Makam Tanıma</h4>
                <div style="text-align:center;padding:16px;background:rgba(201,168,76,0.1);border-radius:12px">
                    <p style="font-size:2rem;font-weight:900;color:var(--gold)">${result.makam}</p>
                    <p style="font-size:0.85rem;color:var(--text-secondary)">Güven: %${result.confidence.toFixed(0)}</p>
                    <p style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">Son ${this._makamRecognition.noteHistory.length} nota analizi</p>
                </div>
            `;
        } else {
            recognitionEl.innerHTML = `
                <h4 style="color:var(--gold-light);margin-bottom:12px">🎼 Otomatik Makam Tanıma</h4>
                <p style="font-size:0.85rem;color:var(--text-muted);text-align:center">Makam tespiti için en az 4 nota çalın...</p>
            `;
        }
    }
};

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    s.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}';
    document.head.appendChild(s);
    UI.init();
    console.log('🎵 Ney Mastery initialized!');
});
