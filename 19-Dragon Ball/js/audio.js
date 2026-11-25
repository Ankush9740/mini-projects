(function (DB) {
  "use strict";

  class AudioManager {
    constructor() {
      this.ctx = null;
      this.sfxEnabled = true;
      this.bgmEnabled = true;
      this.volume = 0.75;
      this.unlocked = false;
      this._bgmTimer = null;
      this._bgmStep = 0;
      this._bgmPlaying = false;
    }

    unlock() {
      if (this.unlocked && this.ctx) {
        if (this.ctx.state === "suspended") {
          this.ctx.resume().catch(() => {});
        }
        return;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      this.unlocked = true;
    }

    setVolume(v) {
      this.volume = Math.max(0, Math.min(1, v));
    }

    setSfxEnabled(flag) {
      this.sfxEnabled = !!flag;
    }

    setBgmEnabled(flag) {
      this.bgmEnabled = !!flag;
      if (!this.bgmEnabled) {
        this.stopBgm();
      } else if (this.unlocked) {
        this.startBgm();
      }
    }

    _gain(scale = 1) {
      return Math.max(0.001, this.volume * scale);
    }

    _tone(type, startFreq, endFreq, dur, gainScale = 0.25, delay = 0) {
      if (!this.sfxEnabled || !this.ctx || !this.unlocked) return;
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(Math.max(30, startFreq), now);
      if (endFreq !== startFreq) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), now + dur);
      }
      gain.gain.setValueAtTime(this._gain(gainScale), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.01);
    }

    _noise(dur, gainScale = 0.2, delay = 0, filterFreq = 1200) {
      if (!this.sfxEnabled || !this.ctx || !this.unlocked) return;
      const sr = this.ctx.sampleRate;
      const len = Math.max(1, Math.floor(sr * dur));
      const buf = this.ctx.createBuffer(1, len, sr);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const src = this.ctx.createBufferSource();
      src.buffer = buf;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = filterFreq;

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + delay;
      gain.gain.setValueAtTime(this._gain(gainScale), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start(now);
      src.stop(now + dur + 0.01);
    }

    play(name) {
      if (!this.sfxEnabled || !this.ctx || !this.unlocked) return;
      switch (name) {
        case "punch":
          this._tone("triangle", 220, 75, 0.09, 0.28);
          this._noise(0.07, 0.22, 0, 1400);
          break;
        case "kick":
          this._tone("square", 280, 65, 0.13, 0.22);
          this._noise(0.11, 0.26, 0, 1100);
          break;
        case "jump":
          this._tone("square", 210, 520, 0.14, 0.15);
          break;
        case "ki":
          this._tone("sawtooth", 760, 210, 0.16, 0.18);
          this._tone("sine", 1120, 380, 0.12, 0.14);
          break;
        case "kame_charge":
          this._tone("sine", 180, 560, 0.42, 0.22);
          this._tone("triangle", 240, 720, 0.42, 0.14);
          break;
        case "kame_fire":
          this._tone("sawtooth", 420, 140, 0.55, 0.25);
          this._noise(0.55, 0.32, 0, 2200);
          break;
        case "hit":
          this._tone("square", 150, 55, 0.09, 0.22);
          this._noise(0.08, 0.25, 0, 950);
          break;
        case "player_hit":
          this._tone("sawtooth", 190, 60, 0.16, 0.26);
          this._noise(0.12, 0.24, 0, 800);
          break;
        case "transform":
          this._tone("sawtooth", 220, 880, 0.55, 0.25);
          this._tone("square", 330, 1100, 0.55, 0.18, 0.06);
          this._noise(0.5, 0.24, 0.04, 2400);
          break;
        case "pickup":
          this._tone("square", 587, 880, 0.08, 0.14);
          this._tone("square", 880, 1174, 0.1, 0.14, 0.06);
          break;
        case "level_clear":
          this._tone("square", 523.25, 523.25, 0.1, 0.18, 0);
          this._tone("square", 659.25, 659.25, 0.1, 0.18, 0.11);
          this._tone("square", 783.99, 783.99, 0.1, 0.18, 0.22);
          this._tone("square", 1046.5, 1046.5, 0.28, 0.22, 0.33);
          break;
        case "boss_warn":
          this._tone("sawtooth", 180, 130, 0.22, 0.24, 0);
          this._tone("sawtooth", 180, 130, 0.22, 0.24, 0.28);
          break;
        case "menu":
          this._tone("square", 440, 660, 0.06, 0.12);
          break;
      }
    }

    startBgm() {
      if (!this.bgmEnabled || !this.unlocked || this._bgmPlaying) return;
      this._bgmPlaying = true;
      // Driving 16-bit arcade bass + lead pattern (D minor / heroic anime cadence)
      const bass = [146.83, 146.83, 174.61, 146.83, 130.81, 130.81, 164.81, 196.0];
      const lead = [293.66, 0, 349.23, 392.0, 440.0, 0, 392.0, 349.23,
                    293.66, 329.63, 349.23, 0, 523.25, 440.0, 392.0, 329.63];
      this._bgmTimer = window.setInterval(() => {
        if (!this.bgmEnabled || !this.ctx || this.ctx.state !== "running") return;
        const step = this._bgmStep++;
        const bFreq = bass[step % bass.length];
        const lFreq = lead[step % lead.length];
        const now = this.ctx.currentTime;

        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = "triangle";
        bOsc.frequency.setValueAtTime(bFreq, now);
        bGain.gain.setValueAtTime(this._gain(0.08), now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        bOsc.connect(bGain);
        bGain.connect(this.ctx.destination);
        bOsc.start(now);
        bOsc.stop(now + 0.17);

        if (lFreq > 0) {
          const lOsc = this.ctx.createOscillator();
          const lGain = this.ctx.createGain();
          lOsc.type = "square";
          lOsc.frequency.setValueAtTime(lFreq, now);
          lGain.gain.setValueAtTime(this._gain(0.045), now);
          lGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          lOsc.connect(lGain);
          lGain.connect(this.ctx.destination);
          lOsc.start(now);
          lOsc.stop(now + 0.16);
        }
      }, 190);
    }

    stopBgm() {
      this._bgmPlaying = false;
      if (this._bgmTimer !== null) {
        clearInterval(this._bgmTimer);
        this._bgmTimer = null;
      }
    }
  }

  DB.Audio = new AudioManager();
})(window.DB = window.DB || {});
