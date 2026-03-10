/**
 * Ney Mastery - Metronome Web Worker
 * Runs metronome timing in a separate thread for accurate timing
 */

let timerID = null;
let nextNoteTime = 0;
let isPlaying = false;
let bpm = 80;

function nextNote() {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += secondsPerBeat;
}

function scheduler() {
    // Schedule notes up to 100ms in advance
    while (nextNoteTime < performance.now() / 1000 + 0.1) {
        postMessage({ type: 'tick', time: nextNoteTime });
        nextNote();
    }
    timerID = setTimeout(scheduler, 25);
}

self.onmessage = function (e) {
    if (e.data.type === 'start') {
        if (!isPlaying) {
            bpm = e.data.bpm || 80;
            isPlaying = true;
            nextNoteTime = performance.now() / 1000 + 0.05;
            scheduler();
        }
    } else if (e.data.type === 'stop') {
        isPlaying = false;
        clearTimeout(timerID);
    } else if (e.data.type === 'setBpm' || e.data.type === 'update') {
        bpm = e.data.bpm;
    }
};
