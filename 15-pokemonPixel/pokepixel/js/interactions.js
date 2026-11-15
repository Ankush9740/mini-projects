/* ==========================================================================
   POKÉPIXEL - Audio Synthesizer, Persistent BGM Engine & Seamless Navigation
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. WEB AUDIO 8-BIT CHIPTUNE SYNTHESIZER ---
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('pokepixel_sound') !== 'muted';

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Chiptune Square Wave Sound Generators
  const SoundFX = {
    playTone(freq, type = 'square', duration = 0.08, startVol = 0.18) {
      if (!isSoundEnabled) return;
      initAudioContext();
      if (!audioCtx) return;

      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(startVol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    },

    // 1. Classic Button Click Blip
    click() {
      this.playTone(980, 'square', 0.05, 0.14);
    },

    // 2. Menu Navigation Two-Tone Bleep
    select() {
      if (!isSoundEnabled) return;
      initAudioContext();
      if (!audioCtx) return;

      try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.setValueAtTime(880, now + 0.04); // A5

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.11);
      } catch (e) {}
    },

    // 3. Pokédex / Modal Open Rising Chime
    modalOpen() {
      if (!isSoundEnabled) return;
      initAudioContext();
      if (!audioCtx) return;

      try {
        const now = audioCtx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const noteTime = now + (idx * 0.045);

          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.15, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.08);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 0.08);
        });
      } catch (e) {}
    },

    // 4. Starter Fanfare 4-note victory chime
    starterFanfare() {
      if (!isSoundEnabled) return;
      initAudioContext();
      if (!audioCtx) return;

      try {
        const now = audioCtx.currentTime;
        const notes = [
          { f: 523.25, d: 0.09 }, // C5
          { f: 659.25, d: 0.09 }, // E5
          { f: 783.99, d: 0.09 }, // G5
          { f: 1046.50, d: 0.28 } // C6
        ];
        let offset = 0;
        notes.forEach((note) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const t = now + offset;

          osc.type = 'square';
          osc.frequency.setValueAtTime(note.f, t);

          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + note.d);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(t);
          osc.stop(t + note.d);
          offset += note.d * 0.82;
        });
      } catch (e) {}
    },

    // 5. Retro Pokémon Cry Synthesis
    pokemonCry(baseFreq = 320) {
      if (!isSoundEnabled) return;
      initAudioContext();
      if (!audioCtx) return;

      try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.linearRampToValueAtTime(baseFreq * 1.6, now + 0.07);
        osc.frequency.linearRampToValueAtTime(baseFreq * 0.75, now + 0.22);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {}
    },

    // 6. Wall Bump / Error
    bump() {
      this.playTone(130, 'square', 0.1, 0.18);
    }
  };

  window.PokeSound = SoundFX;

  // --- 2. PERSISTENT BACKGROUND MUSIC ENGINE (littlewood.mp3) ---
  let bgmAudio = null;
  let isBgmPlaying = localStorage.getItem('pokepixel_bgm') === 'playing';

  function initBgmAudio() {
    if (!bgmAudio) {
      bgmAudio = new Audio('assets/audio/littlewood.mp3');
      bgmAudio.loop = true;
      bgmAudio.volume = 0.45;

      // Restore timestamp from session storage so song resumes seamlessly
      const savedTime = sessionStorage.getItem('pokepixel_bgm_time');
      if (savedTime && !isNaN(parseFloat(savedTime))) {
        bgmAudio.currentTime = parseFloat(savedTime);
      }

      // Continuously record audio playback position
      bgmAudio.addEventListener('timeupdate', () => {
        if (!bgmAudio.paused) {
          sessionStorage.setItem('pokepixel_bgm_time', bgmAudio.currentTime);
        }
      });

      bgmAudio.onerror = function () {
        console.warn('littlewood.mp3 fallback to littletown.mp3');
        bgmAudio.src = 'assets/audio/littletown.mp3';
        if (isBgmPlaying) {
          bgmAudio.play().catch(() => {});
        }
      };
    }
  }

  // Save exact timestamp before unloading
  window.addEventListener('beforeunload', () => {
    if (bgmAudio) {
      sessionStorage.setItem('pokepixel_bgm_time', bgmAudio.currentTime);
    }
  });

  function playBgm() {
    initAudioContext();
    initBgmAudio();
    if (bgmAudio) {
      const playPromise = bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isBgmPlaying = true;
          localStorage.setItem('pokepixel_bgm', 'playing');
          updateBgmUI();
        }).catch(err => {
          console.log('BGM playback waiting for user gesture:', err);
        });
      }
    }
  }

  function pauseBgm() {
    if (bgmAudio) {
      bgmAudio.pause();
    }
    isBgmPlaying = false;
    localStorage.setItem('pokepixel_bgm', 'paused');
    updateBgmUI();
  }

  function toggleBgm() {
    if (isBgmPlaying) {
      pauseBgm();
      SoundFX.click();
    } else {
      playBgm();
      SoundFX.select();
    }
  }

  function updateBgmUI() {
    const bgmBtns = document.querySelectorAll('.bgm-toggle-btn');
    bgmBtns.forEach(btn => {
      if (isBgmPlaying) {
        btn.classList.remove('paused');
        btn.classList.add('playing');
        btn.innerHTML = '<span class="bgm-icon">🎶</span> BGM: MUSIC [ON]';
        btn.setAttribute('aria-label', 'Background Music Playing (Click to Pause)');
      } else {
        btn.classList.remove('playing');
        btn.classList.add('paused');
        btn.innerHTML = '<span class="bgm-icon">🎵</span> BGM: MUSIC [OFF]';
        btn.setAttribute('aria-label', 'Background Music Paused (Click to Play)');
      }
    });
  }

  window.PokeMusic = {
    play: playBgm,
    pause: pauseBgm,
    toggle: toggleBgm,
    isPlaying: () => isBgmPlaying
  };

  // --- 3. SOUND TOGGLE BUTTON CONTROLLER ---
  function updateSoundUI() {
    const soundBtns = document.querySelectorAll('.sound-toggle-btn');
    soundBtns.forEach(btn => {
      if (isSoundEnabled) {
        btn.classList.remove('muted');
        btn.innerHTML = '<span class="sound-icon">🔊</span> SFX: ON';
        btn.setAttribute('aria-label', 'Sound Effects Enabled (Click to Mute)');
      } else {
        btn.classList.add('muted');
        btn.innerHTML = '<span class="sound-icon">🔇</span> SFX: OFF';
        btn.setAttribute('aria-label', 'Sound Effects Muted (Click to Enable)');
      }
    });
  }

  function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('pokepixel_sound', isSoundEnabled ? 'enabled' : 'muted');
    updateSoundUI();
    if (isSoundEnabled) {
      SoundFX.select();
    }
  }

  // --- 4. RETRO DIALOGUE TYPEWRITER ---
  window.typewriterDialogue = function (element, text, speed = 35, callback) {
    if (!element) return;
    element.innerHTML = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        if (i % 3 === 0 && isSoundEnabled) {
          SoundFX.playTone(600, 'square', 0.02, 0.03);
        }
        i++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
    return interval;
  };

  // --- 5. STARTUP BOOT SCREEN CONTROLLER ---
  function initBootScreen() {
    const bootScreen = document.getElementById('startupBootScreen');
    if (!bootScreen) return;

    const hasBooted = sessionStorage.getItem('pokepixel_booted');
    if (hasBooted) {
      bootScreen.remove();
      return;
    }

    const progressFill = bootScreen.querySelector('.boot-progress-fill');
    const skipBtn = bootScreen.querySelector('.boot-skip-btn');

    function dismissBoot() {
      bootScreen.classList.add('hidden');
      sessionStorage.setItem('pokepixel_booted', 'true');
      setTimeout(() => bootScreen.remove(), 600);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        dismissBoot();
        initAudioContext();
        if (isBgmPlaying) playBgm();
      });
    }

    setTimeout(() => {
      if (progressFill) progressFill.style.width = '100%';
    }, 100);

    setTimeout(() => {
      dismissBoot();
    }, 1800);
  }

  // --- 6. SEAMLESS RETRO SPA NAVIGATION (KEEPS AUDIO PLAYING CONTINUOUSLY) ---
  function reinitCurrentPage(targetUrl) {
    const page = targetUrl.split('?')[0].split('#')[0].split('/').pop() || 'index.html';
    
    if (page === 'index.html' || page === '') {
      if (window.initHomePage) window.initHomePage();
    } else if (page === 'games.html') {
      if (window.initGamesPage) window.initGamesPage();
    } else if (page === 'pokedex.html') {
      if (window.initPokedexPage) window.initPokedexPage();
    } else if (page === 'regions.html') {
      if (window.initRegionsPage) window.initRegionsPage();
    } else if (page === 'starters.html') {
      if (window.initStartersPage) window.initStartersPage();
    } else if (page === 'about.html') {
      if (window.initAboutPage) window.initAboutPage();
    }
  }

  async function navigateSeamlessly(url, push = true) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed');
      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // 1. Update Document Title
      const newTitle = doc.querySelector('title');
      if (newTitle) document.title = newTitle.textContent;

      // 2. Update Main Content Container
      const oldMain = document.querySelector('main');
      const newMain = doc.querySelector('main');
      if (oldMain && newMain) {
        oldMain.innerHTML = newMain.innerHTML;
        oldMain.className = newMain.className;
        if (newMain.getAttribute('style')) {
          oldMain.setAttribute('style', newMain.getAttribute('style'));
        } else {
          oldMain.removeAttribute('style');
        }
      }

      // 3. Update Page Hero Header (Subpages)
      const oldPageHero = document.querySelector('.page-hero');
      const newPageHero = doc.querySelector('.page-hero');
      if (oldPageHero && newPageHero) {
        oldPageHero.innerHTML = newPageHero.innerHTML;
      } else if (!oldPageHero && newPageHero) {
        const header = document.querySelector('.site-header');
        if (header) header.insertAdjacentElement('afterend', newPageHero);
      } else if (oldPageHero && !newPageHero) {
        oldPageHero.remove();
      }

      // 4. Update Modals if present (e.g. Pokédex modal overlay)
      const oldModal = document.getElementById('pokedexModalOverlay');
      const newModal = doc.getElementById('pokedexModalOverlay');
      if (newModal) {
        if (oldModal) {
          oldModal.replaceWith(newModal);
        } else {
          document.body.appendChild(newModal);
        }
      } else if (oldModal) {
        oldModal.remove();
      }

      // 5. Update Active Nav Link in header
      const currentPath = url.split('?')[0].split('#')[0].split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-link').forEach(navLink => {
        const navHref = navLink.getAttribute('href');
        if (navHref === currentPath || (currentPath === '' && navHref === 'index.html')) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      });

      // Close mobile menu if open
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu) navMenu.classList.remove('is-active');

      // 6. Scroll smoothly to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // 7. Push browser history
      if (push) {
        history.pushState({ url: url }, '', url);
      }

      // 8. Re-bind BGM & SFX buttons in case they were updated
      document.querySelectorAll('.bgm-toggle-btn').forEach(btn => {
        btn.onclick = toggleBgm;
      });
      document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
        btn.onclick = toggleSound;
      });
      updateBgmUI();
      updateSoundUI();

      // 9. Re-initialize page logic
      reinitCurrentPage(url);

      // 10. Re-observe scroll animations
      initScrollObservers();

    } catch (err) {
      console.warn('Seamless navigation falling back to standard link load:', err);
      window.location.href = url;
    }
  }

  function initSeamlessNavigation() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://')) {
        return;
      }

      const targetPage = href.split('?')[0].split('#')[0];
      if (!targetPage.endsWith('.html') && targetPage !== '') return;

      // If running on a local server (http: or https:), use PJAX so audio NEVER stops
      if (window.location.protocol.startsWith('http')) {
        e.preventDefault();
        SoundFX.click();
        navigateSeamlessly(href, true);
      }
    });

    window.addEventListener('popstate', (e) => {
      if (window.location.protocol.startsWith('http')) {
        navigateSeamlessly(window.location.href, false);
      }
    });
  }

  function initScrollObservers() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealEls.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealEls.forEach(el => observer.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  }

  // --- 7. INITIALIZE ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    initBgmAudio();
    updateSoundUI();
    updateBgmUI();
    initBootScreen();
    initSeamlessNavigation();
    initScrollObservers();

    // If BGM is enabled, immediately attempt playback
    if (isBgmPlaying) {
      playBgm();
    }

    // Wire BGM buttons
    document.querySelectorAll('.bgm-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleBgm);
    });

    // Wire SFX buttons
    document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleSound);
    });

    // Auto-resume BGM on first interaction if autoplay policy initially blocked it
    function handleFirstUserGesture() {
      initAudioContext();
      if (isBgmPlaying && (!bgmAudio || bgmAudio.paused)) {
        playBgm();
      }
      document.removeEventListener('click', handleFirstUserGesture);
      document.removeEventListener('keydown', handleFirstUserGesture);
    }
    document.addEventListener('click', handleFirstUserGesture);
    document.addEventListener('keydown', handleFirstUserGesture);

    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-toggle-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
        SoundFX.click();
      });
    }

    // Attach click sound to pixel buttons & links
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.btn-pixel, .nav-link, .interactive, .tab-btn, .pokemon-card');
      if (target && !target.classList.contains('sound-toggle-btn') && !target.classList.contains('bgm-toggle-btn')) {
        SoundFX.click();
      }
    });
  });

})();
