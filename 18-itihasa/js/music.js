/**
 * ITIHASA — AMBIENT MUSIC & SOUND ENGINE
 * js/music.js
 * Provides authentic, high-quality Indian classical ambience with crossfade,
 * Web Audio synth fallback, theme switching, and persistent state across pages.
 */

(function () {
  'use strict';

  const MusicEngine = {
    audioContext: null,
    currentTheme: 'ramayana', // 'ramayana' or 'mahabharata'
    isPlaying: false,
    isMuted: false,
    volume: 0.65,
    audioElements: {},
    synthNodes: null,
    isUsingSynth: false,

    tracks: {
      ramayana: 'assets/audio/ramayana/ramayana-theme.wav',
      mahabharata: 'assets/audio/mahabharata/mahabharata-theme.wav',
      bell: 'assets/audio/temple-bell.wav'
    },

    init() {
      // Restore persisted preferences from localStorage
      const savedTheme = localStorage.getItem('itihasa_music_theme');
      const savedVol = localStorage.getItem('itihasa_music_vol');
      const savedPlaying = localStorage.getItem('itihasa_music_playing');

      if (savedTheme && (savedTheme === 'ramayana' || savedTheme === 'mahabharata')) {
        this.currentTheme = savedTheme;
      } else {
        // Auto-detect theme from current page
        if (window.location.pathname.includes('mahabharata')) {
          this.currentTheme = 'mahabharata';
        } else {
          this.currentTheme = 'ramayana';
        }
      }

      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
      }

      this.createAudioElements();
      this.bindUI();
      this.updateUI();

      // If user had music enabled previously, start playing on user's first interaction
      if (savedPlaying === 'true') {
        const autoResume = () => {
          this.play();
          window.removeEventListener('click', autoResume);
          window.removeEventListener('keydown', autoResume);
        };
        window.addEventListener('click', autoResume, { once: true });
        window.addEventListener('keydown', autoResume, { once: true });
      }
    },

    createAudioElements() {
      // Primary HTML5 Audio elements
      this.audioElements.ramayana = new Audio(this.tracks.ramayana);
      this.audioElements.ramayana.loop = true;
      this.audioElements.ramayana.volume = this.currentTheme === 'ramayana' ? this.volume : 0;

      this.audioElements.mahabharata = new Audio(this.tracks.mahabharata);
      this.audioElements.mahabharata.loop = true;
      this.audioElements.mahabharata.volume = this.currentTheme === 'mahabharata' ? this.volume : 0;

      this.audioElements.bell = new Audio(this.tracks.bell);
      this.audioElements.bell.volume = this.volume;

      // Handle playback errors by gracefully switching to Web Audio synth
      const handleError = () => {
        console.warn('Audio element error/blocked; switching to Web Audio synthesiser');
        this.isUsingSynth = true;
      };

      this.audioElements.ramayana.addEventListener('error', handleError);
      this.audioElements.mahabharata.addEventListener('error', handleError);
    },

    initWebAudioSynth() {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
        }
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    },

    playTempleBell() {
      try {
        if (this.audioElements.bell) {
          this.audioElements.bell.currentTime = 0;
          this.audioElements.bell.play().catch(() => {});
        }
      } catch (e) {}
    },

    play() {
      this.initWebAudioSynth();
      this.isPlaying = true;
      localStorage.setItem('itihasa_music_playing', 'true');

      if (this.isUsingSynth || !this.audioElements.ramayana) {
        this.startSynthAmbience();
      } else {
        const targetAudio = this.audioElements[this.currentTheme];
        if (targetAudio) {
          targetAudio.volume = this.isMuted ? 0 : this.volume;
          targetAudio.play().catch(err => {
            console.warn('HTML5 Audio play rejected, falling back to Web Audio Synth', err);
            this.isUsingSynth = true;
            this.startSynthAmbience();
          });
        }
      }
      this.updateUI();
    },

    pause() {
      this.isPlaying = false;
      localStorage.setItem('itihasa_music_playing', 'false');

      if (this.audioElements.ramayana) this.audioElements.ramayana.pause();
      if (this.audioElements.mahabharata) this.audioElements.mahabharata.pause();
      if (this.synthNodes) {
        this.stopSynthAmbience();
      }
      this.updateUI();
    },

    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    switchTheme(themeName) {
      if (themeName !== 'ramayana' && themeName !== 'mahabharata') return;
      if (this.currentTheme === themeName) return;

      const oldTheme = this.currentTheme;
      this.currentTheme = themeName;
      localStorage.setItem('itihasa_music_theme', themeName);

      if (this.isPlaying) {
        if (!this.isUsingSynth) {
          // Smooth crossfade between audio elements
          const oldAudio = this.audioElements[oldTheme];
          const newAudio = this.audioElements[themeName];

          if (oldAudio && newAudio) {
            newAudio.currentTime = 0;
            newAudio.volume = 0;
            newAudio.play().catch(() => {});

            const steps = 20;
            let step = 0;
            const targetVol = this.isMuted ? 0 : this.volume;

            const fadeInterval = setInterval(() => {
              step++;
              const progress = step / steps;
              oldAudio.volume = Math.max(0, targetVol * (1 - progress));
              newAudio.volume = Math.min(targetVol, targetVol * progress);

              if (step >= steps) {
                clearInterval(fadeInterval);
                oldAudio.pause();
                newAudio.volume = targetVol;
              }
            }, 50);
          }
        } else {
          // Switch synth scale
          this.stopSynthAmbience();
          this.startSynthAmbience();
        }
      }

      this.playTempleBell();
      this.updateUI();
    },

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, parseFloat(val)));
      localStorage.setItem('itihasa_music_vol', this.volume.toString());

      const effectiveVol = this.isMuted ? 0 : this.volume;
      if (this.audioElements.ramayana) {
        if (this.currentTheme === 'ramayana') this.audioElements.ramayana.volume = effectiveVol;
      }
      if (this.audioElements.mahabharata) {
        if (this.currentTheme === 'mahabharata') this.audioElements.mahabharata.volume = effectiveVol;
      }
      if (this.synthMasterGain) {
        this.synthMasterGain.gain.setValueAtTime(effectiveVol * 0.25, this.audioContext.currentTime);
      }
      this.updateUI();
    },

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.setVolume(this.volume);
      this.updateUI();
    },

    /* Web Audio Procedural Tanpura & Flute Drone Fallback */
    startSynthAmbience() {
      if (!this.audioContext) return;
      this.stopSynthAmbience();

      const ctx = this.audioContext;
      const master = ctx.createGain();
      master.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.25, ctx.currentTime);
      master.connect(ctx.destination);
      this.synthMasterGain = master;

      const freqs = this.currentTheme === 'ramayana'
        ? [146.83, 220.0, 293.66, 440.0, 587.33] // D major / Bhoopali
        : [130.81, 196.0, 261.63, 277.18, 392.0]; // C minor / Darbari Kanada

      this.synthNodes = [];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle detune chorus
        osc.detune.setValueAtTime((idx - 2) * 4, ctx.currentTime);
        gain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);

        osc.connect(gain);
        gain.connect(master);
        osc.start();
        this.synthNodes.push(osc);
      });
    },

    stopSynthAmbience() {
      if (this.synthNodes) {
        this.synthNodes.forEach(node => {
          try { node.stop(); node.disconnect(); } catch (e) {}
        });
        this.synthNodes = null;
      }
    },

    bindUI() {
      // Header toggle button
      const headerBtn = document.getElementById('header-music-btn');
      if (headerBtn) {
        headerBtn.addEventListener('click', () => this.togglePlay());
      }

      // Floating player elements
      const playBtn = document.getElementById('player-play-btn');
      if (playBtn) {
        playBtn.addEventListener('click', () => this.togglePlay());
      }

      const muteBtn = document.getElementById('player-mute-btn');
      if (muteBtn) {
        muteBtn.addEventListener('click', () => this.toggleMute());
      }

      const volSlider = document.getElementById('player-volume');
      if (volSlider) {
        volSlider.value = this.volume;
        volSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
      }

      const ramayanaPill = document.getElementById('pill-theme-ramayana');
      if (ramayanaPill) {
        ramayanaPill.addEventListener('click', () => this.switchTheme('ramayana'));
      }

      const mahabharataPill = document.getElementById('pill-theme-mahabharata');
      if (mahabharataPill) {
        mahabharataPill.addEventListener('click', () => this.switchTheme('mahabharata'));
      }
    },

    updateUI() {
      // Header button state
      const headerBtn = document.getElementById('header-music-btn');
      if (headerBtn) {
        if (this.isPlaying) {
          headerBtn.classList.add('playing');
          const txt = headerBtn.querySelector('.music-text');
          if (txt) txt.textContent = this.currentTheme === 'ramayana' ? 'Ramayana Music' : 'Mahabharata Music';
        } else {
          headerBtn.classList.remove('playing');
          const txt = headerBtn.querySelector('.music-text');
          if (txt) txt.textContent = 'Ambient Music';
        }
      }

      // Floating player state
      const playBtn = document.getElementById('player-play-btn');
      if (playBtn) {
        playBtn.innerHTML = this.isPlaying
          ? '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
          : '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>';
      }

      const titleEl = document.getElementById('player-theme-title');
      if (titleEl) {
        titleEl.textContent = this.currentTheme === 'ramayana' ? 'Ramayana Ambience' : 'Mahabharata Ambience';
      }

      const trackEl = document.getElementById('player-track-name');
      if (trackEl) {
        trackEl.textContent = this.currentTheme === 'ramayana'
          ? 'Raag Bhoopali • Flute & Tanpura'
          : 'Raag Darbari • Veena & Mridangam';
      }

      const ramayanaPill = document.getElementById('pill-theme-ramayana');
      const mahabharataPill = document.getElementById('pill-theme-mahabharata');
      if (ramayanaPill && mahabharataPill) {
        if (this.currentTheme === 'ramayana') {
          ramayanaPill.classList.add('active');
          mahabharataPill.classList.remove('active');
        } else {
          ramayanaPill.classList.remove('active');
          mahabharataPill.classList.add('active');
        }
      }
    }
  };

  window.ItihasaMusic = MusicEngine;
  document.addEventListener('DOMContentLoaded', () => MusicEngine.init());
})();
