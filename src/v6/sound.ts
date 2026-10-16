import type { SensoryKind } from './sensory.ts';
import type { Sound } from './types.ts';

// Small, local synthesis: no music, audio downloads, analytics or autoplay on load.
export const soundPatterns: Record<SensoryKind, readonly number[]> = {
  correct: [523, 659],
  elite: [523, 659, 784],
  incorrect: [392, 370],
  block: [440, 554, 659],
  mission: [523, 659, 784],
  unit: [440, 554, 659, 880],
  reviews: [659, 784],
  streak: [494, 622, 740],
  error: [392, 523, 659, 784],
  boss: [330, 440, 554, 659, 880],
  module: [392, 494, 587, 784, 988],
};

export class SensoryAudio {
  private context: AudioContext | null = null;
  private epoch = 0;
  private voices = new Set<OscillatorNode>();
  private lastAt = -Infinity;
  private lastImportance = 0;

  // Called only from trusted keyboard/pointer gestures or the explicit preview button.
  async unlock(): Promise<boolean> {
    const epoch = this.epoch;
    try {
      if (typeof window === 'undefined') return false;
      const Audio =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Audio) return false;
      if (!this.context || this.context.state === 'closed') this.context = new Audio();
      if (this.context.state === 'suspended') await this.context.resume();
      return epoch === this.epoch && this.context.state === 'running';
    } catch {
      return false;
    }
  }

  play(kind: SensoryKind, sound: Sound, importance: number, permitted: () => boolean) {
    const context = this.context;
    if (sound === 'off' || !context || context.state !== 'running' || !permitted()) return false;
    const now = performance.now();
    if (now - this.lastAt < 900 && importance <= this.lastImportance) return false;
    this.stop();
    this.lastAt = now;
    this.lastImportance = importance;
    const epoch = this.epoch;
    const notes = soundPatterns[kind];
    const step = kind === 'incorrect' ? 0.07 : 0.075;
    const volume = sound === 'soft' ? 0.022 : 0.045;
    try {
      for (let i = 0; i < notes.length; i++) {
        if (epoch !== this.epoch || !permitted()) {
          this.stop();
          return false;
        }
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = context.currentTime + i * step;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(notes[i], start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.13);
        oscillator.connect(gain);
        gain.connect(context.destination);
        this.voices.add(oscillator);
        oscillator.onended = () => {
          this.voices.delete(oscillator);
          oscillator.disconnect();
          gain.disconnect();
        };
        oscillator.start(start);
        oscillator.stop(start + 0.14);
      }
      return true;
    } catch {
      this.stop();
      return false;
    }
  }

  stop() {
    this.epoch++;
    for (const voice of this.voices) {
      try {
        voice.stop();
        voice.disconnect();
      } catch {
        // The browser may already have ended a very short tone.
      }
    }
    this.voices.clear();
  }

  dispose() {
    this.stop();
    try {
      void this.context?.close().catch(() => {});
    } catch {
      // Audio cleanup must not interfere with navigation or the learning state.
    }
    this.context = null;
  }

  pause() {
    this.stop();
    try {
      if (this.context?.state === 'running') void this.context.suspend().catch(() => {});
    } catch {
      // The visual feedback remains fully usable without a working audio device.
    }
  }
}
