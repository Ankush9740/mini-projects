/**
 * GHIBLI WORLDS — Main JavaScript Controller
 * Navigation Readability, Robust Content Visibility System,
 * Peaceful Countryside Ambient Audio Engine, and Particle System.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. NAVIGATION CONTROLLER (Sticky Navbar, Mobile Menu, Active Links)
  // =========================================================================
  const nav = document.querySelector('.ghibli-nav');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.querySelector('.back-to-top-btn');

  // Sticky navbar with blur on scroll
  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile menu toggle
  function toggleMobileMenu(open) {
    if (!mobileDrawer) return;
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.add('open');
      if (mobileToggle) mobileToggle.classList.add('active');
      if (mobileOverlay) {
        mobileOverlay.style.display = 'block';
        requestAnimationFrame(() => {
          mobileOverlay.style.opacity = '1';
        });
      }
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      if (mobileToggle) mobileToggle.classList.remove('active');
      if (mobileOverlay) {
        mobileOverlay.style.opacity = '0';
        setTimeout(() => {
          mobileOverlay.style.display = 'none';
        }, 300);
      }
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  // Highlight active link
  function updateActiveNavLinks(customPath) {
    const currentPath = (customPath || window.location.pathname).split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-link');
    allLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.split('#')[0].split('/').pop() || 'index.html';
      if (linkPath === currentPath || (currentPath === 'index.html' && (linkPath === '' || linkPath === 'index.html'))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }
  updateActiveNavLinks();

  // Back to top (delegated)
  document.addEventListener('click', (e) => {
    const backBtn = e.target.closest('.back-to-top-btn');
    if (backBtn) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // =========================================================================
  // 2. "ALWAYS WITH ME" FLUTE THEME ENGINE (SPIRITED AWAY)
  // Beautiful flute arrangement of "Always with Me" (Itsumo Nando Demo).
  // Plays by default on visit. Persists across pages seamlessly.
  // Audio volume is controlled directly by the user's PC master volume.
  // Smooth volume fade-in on play, smooth fade-out on pause, seamless loop.
  // =========================================================================
  class AlwaysWithMeFluteEngine {
    constructor() {
      this.audio = null;
      this.isPlaying = false;
      this.isAwaitingGesture = false;
      this.fadeInterval = null;
      this.audioSrc = 'assets/audio/always-with-me-flute.mp3';
      this.unlockListenersAttached = false;
      this.initAudioElement();
      this.initUI();
      this.checkAutoPlay();
    }

    initAudioElement() {
      if (!this.audio) {
        this.audio = new Audio();
        this.audio.src = this.audioSrc;
        this.audio.loop = true;
        this.audio.volume = 0; // Starts at 0 for smooth fade-in
        this.audio.preload = 'auto';

        // Continuous state tracking to localStorage so music NEVER resets
        this.audio.addEventListener('timeupdate', () => {
          if (this.isPlaying && this.audio.currentTime > 0) {
            try {
              localStorage.setItem('ghibli_music_time', this.audio.currentTime.toString());
              localStorage.setItem('ghibli_music_timestamp', Date.now().toString());
            } catch (e) {}
          }
        });

        this.audio.addEventListener('error', (e) => {
          console.warn('Flute audio load error:', e);
        });

        // Restore playback position seamlessly across page navigations / reloads
        this.restorePosition();
      }
    }

    restorePosition() {
      try {
        const savedTime = parseFloat(localStorage.getItem('ghibli_music_time') || '0');
        const lastTimestamp = parseInt(localStorage.getItem('ghibli_music_timestamp') || '0', 10);
        if (savedTime && !isNaN(savedTime) && isFinite(savedTime)) {
          let targetTime = savedTime;
          // If navigated within the last 15 seconds, compute elapsed time to maintain live continuity
          if (lastTimestamp && Date.now() - lastTimestamp < 15000) {
            const elapsed = (Date.now() - lastTimestamp) / 1000;
            targetTime = savedTime + elapsed;
          }
          const applyTime = () => {
            if (this.audio) {
              if (this.audio.duration) {
                this.audio.currentTime = targetTime % this.audio.duration;
              } else {
                this.audio.currentTime = targetTime;
              }
            }
          };
          if (this.audio.readyState >= 1) {
            applyTime();
          } else {
            this.audio.addEventListener('loadedmetadata', applyTime, { once: true });
          }
        }
      } catch (e) {}
    }

    checkAutoPlay() {
      // Check if user explicitly clicked pause during the current session
      const sessionPaused = sessionStorage.getItem('ghibli_user_paused');
      if (sessionPaused === 'true') {
        this.isPlaying = false;
        this.updateUI(false);
        return;
      }

      // Always play by default when running!
      this.startDefaultPlayback();
    }

    startDefaultPlayback() {
      this.initAudioElement();

      // Ensure full volume and unmuted
      this.audio.volume = 1.0;
      this.audio.muted = false;
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Direct autoplay succeeded!
            this.isPlaying = true;
            this.isAwaitingGesture = false;
            this.updateUI(true);
            this.hideAutoplayPrompt();
          })
          .catch((err) => {
            console.log('Autoplay deferred by browser policy. Priming audio and awaiting first user interaction.', err);
            // Prime audio in muted mode so timeline stays active
            this.audio.muted = true;
            this.audio.play().catch(() => {});

            this.isPlaying = false;
            this.isAwaitingGesture = true;
            this.updateUI(false, true);
            this.showAutoplayPrompt();
            this.attachUnlockListeners();
          });
      }
    }

    showAutoplayPrompt() {
      if (document.getElementById('audio-autoplay-prompt')) return;
      const prompt = document.createElement('div');
      prompt.id = 'audio-autoplay-prompt';
      prompt.className = 'audio-autoplay-prompt';
      prompt.setAttribute('role', 'button');
      prompt.setAttribute('aria-label', 'Click anywhere to play Always with Me background melody');
      prompt.innerHTML = `
        <div class="prompt-icon-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </div>
        <span>Click anywhere to play <em>"Always with Me"</em></span>
      `;
      document.body.appendChild(prompt);
    }

    hideAutoplayPrompt() {
      const prompt = document.getElementById('audio-autoplay-prompt');
      if (prompt) {
        prompt.classList.add('hidden');
        setTimeout(() => {
          if (prompt.parentNode) prompt.parentNode.removeChild(prompt);
        }, 350);
      }
    }

    attachUnlockListeners() {
      if (this.unlockListenersAttached) return;
      this.unlockListenersAttached = true;

      const unlockHandler = () => {
        if (sessionStorage.getItem('ghibli_user_paused') === 'true') {
          removeListeners();
          this.hideAutoplayPrompt();
          return;
        }

        if (this.audio) {
          this.audio.muted = false;
          this.audio.volume = 1.0;
          this.audio.play()
            .then(() => {
              this.isPlaying = true;
              this.isAwaitingGesture = false;
              this.updateUI(true);
            })
            .catch(() => {});
        }

        this.hideAutoplayPrompt();
        removeListeners();
      };

      // Any gesture anywhere (click, touch, key, pointer, scroll, wheel)
      const events = ['click', 'pointerdown', 'mousedown', 'keydown', 'touchstart', 'wheel'];
      const removeListeners = () => {
        events.forEach(evt => window.removeEventListener(evt, unlockHandler, { capture: true }));
        this.unlockListenersAttached = false;
      };

      events.forEach(evt => window.addEventListener(evt, unlockHandler, { capture: true, once: true }));
    }

    fadeIn(targetVolume = 1.0, duration = 1000) {
      if (this.fadeInterval) clearInterval(this.fadeInterval);
      const startTime = performance.now();
      const startVol = this.audio ? this.audio.volume : 0;

      this.fadeInterval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVol = startVol + (targetVolume - startVol) * progress;

        if (this.audio) {
          this.audio.volume = Math.max(0, Math.min(1, currentVol));
        }

        if (progress >= 1) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
          if (this.audio) this.audio.volume = targetVolume;
        }
      }, 40);
    }

    fadeOut(duration = 700, onComplete) {
      if (this.fadeInterval) clearInterval(this.fadeInterval);
      const startVolume = this.audio ? this.audio.volume : 1.0;
      const startTime = performance.now();

      this.fadeInterval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVol = startVolume * (1 - progress);

        if (this.audio) {
          this.audio.volume = Math.max(0, Math.min(1, currentVol));
        }

        if (progress >= 1) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
          if (this.audio) {
            this.audio.pause();
          }
          if (onComplete) onComplete();
        }
      }, 40);
    }

    start() {
      this.initAudioElement();
      this.audio.muted = false;
      this.audio.volume = 1.0;
      this.isPlaying = true;
      this.isAwaitingGesture = false;
      this.hideAutoplayPrompt();
      sessionStorage.removeItem('ghibli_user_paused');
      this.updateUI(true);

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error:', err);
          this.attachUnlockListeners();
        });
      }
    }

    stop() {
      if (!this.isPlaying && !this.isAwaitingGesture) return;
      this.isPlaying = false;
      this.isAwaitingGesture = false;
      this.hideAutoplayPrompt();
      sessionStorage.setItem('ghibli_user_paused', 'true');
      this.updateUI(false);
      this.fadeOut(700);
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.start();
      }
    }

    playChime() {
      // Gentle confirmation when interacting with world points of interest
      if (!this.isPlaying) {
        this.start();
      }
    }

    updateUI(playing, awaitingGesture = false) {
      const btns = document.querySelectorAll('.audio-toggle-btn');
      btns.forEach((btn) => {
        btn.classList.remove('playing', 'awaiting-play');
        const label = btn.querySelector('.audio-label');

        if (playing) {
          btn.classList.add('playing');
          btn.setAttribute('aria-pressed', 'true');
          if (label) label.textContent = 'Always with Me (Playing)';
        } else if (awaitingGesture) {
          btn.classList.add('awaiting-play');
          btn.setAttribute('aria-pressed', 'false');
          if (label) label.textContent = 'Always with Me (Click to Play)';
        } else {
          btn.setAttribute('aria-pressed', 'false');
          if (label) label.textContent = 'Always with Me (Flute)';
        }
      });
    }

    initUI() {
      // Delegated click on document for audio toggle button
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.audio-toggle-btn');
        if (btn) {
          e.preventDefault();
          this.toggle();
        }
      });

      // Save position before unload
      window.addEventListener('beforeunload', () => {
        if (this.audio && this.audio.currentTime > 0) {
          try {
            localStorage.setItem('ghibli_music_time', this.audio.currentTime.toString());
            localStorage.setItem('ghibli_music_timestamp', Date.now().toString());
          } catch (e) {}
        }
      });
    }
  }

  const soundEngine = new AlwaysWithMeFluteEngine();
  window.ghibliSoundscape = soundEngine;

  // =========================================================================
  // 3. ROBUST SCROLL REVEAL & CONTENT VISIBILITY SYSTEM
  // Identifies and fixes the root cause of blank content:
  // - Dynamic elements inserted after initial load are immediately observed
  // - In-viewport elements are revealed immediately without delay
  // - MutationObserver monitors future DOM injections
  // - Fail-safe timer guarantees no content remains hidden
  // =========================================================================
  let revealObserver = null;

  function initScrollReveals() {
    const unrevealed = document.querySelectorAll('.reveal-on-scroll:not(.in-view)');

    // 1. Immediately reveal elements that are already within or near the viewport
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    unrevealed.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Generous boundary: within 120px above or below viewport
      if (rect.top < viewHeight + 120 && rect.bottom > -120) {
        el.classList.add('in-view');
      }
    });

    // 2. Observe any remaining elements with IntersectionObserver
    if ('IntersectionObserver' in window) {
      if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              revealObserver.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '120px 0px 60px 0px', // Pre-reveals smoothly before hitting edge
          threshold: 0.01 // Ultra-reliable trigger
        });
      }

      document.querySelectorAll('.reveal-on-scroll:not(.in-view)').forEach((el) => {
        revealObserver.observe(el);
      });
    } else {
      // Direct fallback if IntersectionObserver is unsupported
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('in-view');
      });
    }
  }

  // Make available globally for movies.js and characters.js
  window.initScrollReveals = initScrollReveals;

  // Initial runs at various lifecycle stages
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveals);
  } else {
    initScrollReveals();
  }

  // Safety fallback timers (Ensure no content remains hidden)
  setTimeout(initScrollReveals, 200);
  setTimeout(initScrollReveals, 600);
  setTimeout(() => {
    // Secondary safety net: mark body as content-revealed and force reveal
    document.body.classList.add('content-revealed');
    document.querySelectorAll('.reveal-on-scroll:not(.in-view)').forEach((el) => {
      el.classList.add('in-view');
    });
  }, 1200);

  // MutationObserver: automatically detects any dynamically inserted cards
  if ('MutationObserver' in window && document.body) {
    const domObserver = new MutationObserver((mutations) => {
      let hasAddedNodes = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasAddedNodes = true;
          break;
        }
      }
      if (hasAddedNodes) {
        initScrollReveals();
      }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });
  }

  // =========================================================================
  // 4. MAGIC CANVAS (FIREFLIES, FALLING LEAVES & CURSOR SPARKLES)
  // Kept behind content (z-index: 1) with pointer-events: none.
  // =========================================================================
  const canvas = document.getElementById('magic-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Firefly Class
      class Firefly {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.radius = 1.2 + Math.random() * 2.2;
          this.baseAlpha = 0.25 + Math.random() * 0.6;
          this.alpha = this.baseAlpha;
          this.alphaPhase = Math.random() * Math.PI * 2;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.4 - 0.12;
          this.color = Math.random() > 0.3 ? '234, 248, 195' : '232, 168, 80';
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.alphaPhase += 0.03;
          this.alpha = this.baseAlpha + Math.sin(this.alphaPhase) * 0.35;
          if (this.alpha < 0) this.alpha = 0;

          if (this.x < -20 || this.x > width + 20 || this.y < -20 || this.y > height + 20) {
            this.reset();
            this.y = height + 10;
          }
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${this.color}, 0.8)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Drifting Petal Class
      class DriftingPetal {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * width;
          this.y = -20 - Math.random() * 50;
          this.size = 5 + Math.random() * 7;
          this.vx = 0.4 + Math.random() * 1.0;
          this.vy = 0.7 + Math.random() * 1.0;
          this.angle = Math.random() * Math.PI * 2;
          this.vAngle = 0.02 + Math.random() * 0.03;
          this.oscillation = Math.random() * Math.PI;
          const palette = ['167, 185, 154', '217, 155, 105', '245, 238, 220', '180, 205, 170'];
          this.color = palette[Math.floor(Math.random() * palette.length)];
          this.alpha = 0.35 + Math.random() * 0.35;
        }
        update() {
          this.oscillation += 0.02;
          this.x += this.vx + Math.sin(this.oscillation) * 0.7;
          this.y += this.vy;
          this.angle += this.vAngle;

          if (this.y > height + 20 || this.x > width + 20) {
            this.reset();
          }
        }
        draw() {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.45, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
          ctx.fill();
          ctx.restore();
        }
      }

      // Cursor Sparkles
      const sparkles = [];
      window.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.25) {
          sparkles.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 - 0.4,
            size: 1.5 + Math.random() * 2.2,
            alpha: 1,
            color: Math.random() > 0.5 ? '232, 168, 80' : '245, 238, 220'
          });
        }
      }, { passive: true });

      const fireflies = Array.from({ length: 20 }, () => new Firefly());
      const petals = Array.from({ length: 14 }, () => new DriftingPetal());

      let isVisible = true;
      document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
      });

      function animate() {
        if (isVisible) {
          ctx.clearRect(0, 0, width, height);

          petals.forEach((p) => {
            p.update();
            p.draw();
          });

          fireflies.forEach((f) => {
            f.update();
            f.draw();
          });

          for (let i = sparkles.length - 1; i >= 0; i--) {
            const s = sparkles[i];
            s.x += s.vx;
            s.y += s.vy;
            s.alpha -= 0.025;
            if (s.alpha <= 0) {
              sparkles.splice(i, 1);
            } else {
              ctx.beginPath();
              ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
              ctx.shadowBlur = 6;
              ctx.shadowColor = `rgba(${s.color}, 0.8)`;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
        requestAnimationFrame(animate);
      }
      animate();
    }
  }

  // =========================================================================
  // 5. SEAMLESS CLIENT-SIDE NAVIGATION (PJAX ROUTER)
  // Keeps "Always with Me" background music playing without interruption
  // while transitioning smoothly between pages.
  // =========================================================================
  function initPjaxRouter() {
    const pageCache = new Map();

    async function loadPage(url, push = true) {
      let target;
      try {
        target = new URL(url, window.location.href);
      } catch (e) {
        window.location.href = url;
        return;
      }

      const targetPath = target.pathname.split('/').pop() || 'index.html';
      const targetHash = target.hash;

      const mainEl = document.querySelector('main');
      if (!mainEl) {
        window.location.href = url;
        return;
      }

      // Smooth fade transition
      mainEl.classList.add('page-transitioning');

      try {
        let htmlText;
        if (pageCache.has(target.pathname)) {
          htmlText = pageCache.get(target.pathname);
        } else {
          const res = await fetch(target.href);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          htmlText = await res.text();
          pageCache.set(target.pathname, htmlText);
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const newMain = doc.querySelector('main');

        if (!newMain) {
          window.location.href = url;
          return;
        }

        // Brief delay for crossfade
        await new Promise(r => setTimeout(r, 100));

        // Update document title
        if (doc.title) {
          document.title = doc.title;
        }

        // Swap <main> content
        mainEl.innerHTML = newMain.innerHTML;
        mainEl.className = newMain.className;

        // Push history state if not file://
        if (push && window.location.protocol !== 'file:') {
          window.history.pushState({ path: target.href }, doc.title, target.href);
        }

        // Update active navigation links
        updateActiveNavLinks(targetPath);

        // Close mobile drawer if open
        toggleMobileMenu(false);

        // Scroll to anchor or top safely
        if (targetHash && targetHash.length > 1) {
          const cleanId = targetHash.replace(/^#/, '');
          const targetEl = document.getElementById(cleanId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Ensure Sound Engine UI remains in sync
        if (window.ghibliSoundscape) {
          window.ghibliSoundscape.updateUI(window.ghibliSoundscape.isPlaying, window.ghibliSoundscape.isAwaitingGesture);
        }

        // Safely re-initialize page modules
        try { if (window.initMoviesPage) window.initMoviesPage(); } catch (e) { console.error('initMoviesPage error:', e); }
        try { if (window.initCharactersPage) window.initCharactersPage(); } catch (e) { console.error('initCharactersPage error:', e); }
        try { if (window.initInteractions) window.initInteractions(); } catch (e) { console.error('initInteractions error:', e); }
        try { if (window.initScrollReveals) window.initScrollReveals(); } catch (e) { console.error('initScrollReveals error:', e); }

        // Fade in
        requestAnimationFrame(() => {
          mainEl.classList.remove('page-transitioning');
        });

      } catch (err) {
        console.warn('Seamless navigation fallback:', err);
        if (window.ghibliSoundscape && window.ghibliSoundscape.audio) {
          try {
            localStorage.setItem('ghibli_music_time', window.ghibliSoundscape.audio.currentTime.toString());
            localStorage.setItem('ghibli_music_timestamp', Date.now().toString());
          } catch (e) {}
        }
        window.location.href = url;
      }
    }

    // Intercept clicks on internal links
    document.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = e.target.closest('a[href]');
      if (!link) return;

      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      if (/^(mailto|tel|javascript):/i.test(rawHref)) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;

      // Pure in-page anchor link
      if (rawHref.startsWith('#')) {
        if (rawHref.length > 1) {
          const targetEl = document.getElementById(rawHref.slice(1));
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
            if (window.location.protocol !== 'file:') {
              history.pushState(null, '', rawHref);
            }
          }
        }
        return;
      }

      let targetUrl;
      try {
        targetUrl = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }

      // Check origin if on http/https
      if (window.location.protocol !== 'file:' && targetUrl.origin !== window.location.origin) {
        return;
      }

      // Same page with hash
      if (targetUrl.pathname === window.location.pathname && targetUrl.hash) {
        const cleanId = targetUrl.hash.replace(/^#/, '');
        const targetEl = document.getElementById(cleanId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (window.location.protocol !== 'file:') {
            history.pushState(null, '', targetUrl.hash);
          }
        }
        return;
      }

      // If file:// protocol: save currentTime before browser navigation
      if (window.location.protocol === 'file:') {
        if (window.ghibliSoundscape && window.ghibliSoundscape.audio) {
          try {
            localStorage.setItem('ghibli_music_time', window.ghibliSoundscape.audio.currentTime.toString());
            localStorage.setItem('ghibli_music_timestamp', Date.now().toString());
          } catch (e) {}
        }
        return; // Standard browser navigation proceeds, restorePosition() picks up seamlessly!
      }

      // Check if target is an HTML page or directory
      const file = targetUrl.pathname.split('/').pop();
      const isHtml = !file || file.endsWith('.html');
      if (!isHtml) return;

      e.preventDefault();
      loadPage(targetUrl.href, true);
    });

    // Handle Back / Forward buttons
    window.addEventListener('popstate', () => {
      loadPage(window.location.href, false);
    });
  }

  initPjaxRouter();
})();
