// Singleton Cinematic Ambient Audio Manager
// Provides smooth looping, volume fade-in/fade-out, Web Audio fallback, and autoplay handling.

class AudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.targetVolume = 0.28; // Subtle background level
    this.fadeInterval = null;
    this.listeners = new Set();
    this.hasUserInteracted = false;
    this.isSynthesizing = false;
    this.audioCtx = null;
    this.synthGain = null;

    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    try {
      this.audio = new Audio('/audio/worth_it.mp3.mpeg');
      this.audio.loop = false;
      this.audio.volume = 0;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        if (this.audio.loop) {
          this.audio.play().catch(() => {});
        } else {
          this.isPlaying = false;
          this.notify();
        }
      });

      this.audio.addEventListener('error', (err) => {
        console.warn('Audio element error, will use Web Audio synth fallback if needed:', err);
      });
    } catch (e) {
      console.warn('Could not initialize HTML5 audio, falling back to Web Audio:', e);
    }

    // Prepare autoplay resume upon first user interaction
    const onFirstUserInteraction = () => {
      this.hasUserInteracted = true;
      window.removeEventListener('click', onFirstUserInteraction);
      window.removeEventListener('keydown', onFirstUserInteraction);
      window.removeEventListener('touchstart', onFirstUserInteraction);
    };

    window.addEventListener('click', onFirstUserInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onFirstUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onFirstUserInteraction, { once: true, passive: true });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Send initial state immediately
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (e) {
        console.error(e);
      }
    });
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      volume: this.audio ? this.audio.volume : 0,
      targetVolume: this.targetVolume,
    };
  }

  fadeIn(durationMs = 900) {
    if (!this.audio) return;
    clearInterval(this.fadeInterval);
    const steps = 30;
    const stepTime = durationMs / steps;
    const volStep = this.targetVolume / steps;

    this.fadeInterval = setInterval(() => {
      if (!this.audio) {
        clearInterval(this.fadeInterval);
        return;
      }
      if (this.audio.volume + volStep >= this.targetVolume) {
        this.audio.volume = this.targetVolume;
        clearInterval(this.fadeInterval);
      } else {
        this.audio.volume = Math.min(this.targetVolume, this.audio.volume + volStep);
      }
    }, stepTime);
  }

  fadeOut(durationMs = 600, callback) {
    if (!this.audio) {
      if (callback) callback();
      return;
    }
    clearInterval(this.fadeInterval);
    const steps = 25;
    const stepTime = durationMs / steps;
    const currentVol = this.audio.volume;
    const volStep = currentVol / steps;

    this.fadeInterval = setInterval(() => {
      if (!this.audio) {
        clearInterval(this.fadeInterval);
        if (callback) callback();
        return;
      }
      if (this.audio.volume - volStep <= 0.01) {
        this.audio.volume = 0;
        clearInterval(this.fadeInterval);
        if (callback) callback();
      } else {
        this.audio.volume = Math.max(0, this.audio.volume - volStep);
      }
    }, stepTime);
  }

  // Fallback: Web Audio API atmospheric synth drone
  startSynth() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.synthGain = this.audioCtx.createGain();
      this.synthGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.synthGain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 1.2);
      this.synthGain.connect(this.audioCtx.destination);

      // Warm cinematic harmonic frequencies (D minor chord drone)
      const freqs = [73.42, 110.0, 146.83, 220.0];
      this.oscillators = freqs.map((f) => {
        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.audioCtx.currentTime);
        osc.connect(this.synthGain);
        osc.start();
        return osc;
      });

      this.isSynthesizing = true;
      this.isPlaying = true;
      this.notify();
    } catch (e) {
      console.warn('Web Audio synth could not start:', e);
    }
  }

  stopSynth() {
    if (this.synthGain && this.audioCtx) {
      try {
        this.synthGain.gain.setValueAtTime(this.synthGain.gain.value, this.audioCtx.currentTime);
        this.synthGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.6);
        setTimeout(() => {
          if (this.oscillators) {
            this.oscillators.forEach((osc) => {
              try {
                osc.stop();
                osc.disconnect();
              } catch (e) {}
            });
            this.oscillators = null;
          }
          this.isSynthesizing = false;
        }, 650);
      } catch (e) {}
    }
    this.isPlaying = false;
    this.notify();
  }

  async play() {
    if (this.audio) {
      try {
        await this.audio.play();
        this.fadeIn(900);
        this.isPlaying = true;
        this.notify();
        return;
      } catch (err) {
        console.warn('HTML5 audio play blocked or failed, attempting synth fallback:', err);
      }
    }
    this.startSynth();
  }

  pause() {
    if (this.isSynthesizing) {
      this.stopSynth();
      return;
    }
    if (this.audio) {
      this.fadeOut(500, () => {
        if (this.audio) {
          this.audio.pause();
        }
        this.isPlaying = false;
        this.notify();
      });
    } else {
      this.isPlaying = false;
      this.notify();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

export const audioManager = new AudioManager();
export default audioManager;
