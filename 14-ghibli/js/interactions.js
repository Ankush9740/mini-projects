/**
 * GHIBLI WORLDS — Atmospheric Interactions & Storybook Effects
 * Quote Carousel, 3D Tilt Effect, Soundscape Modulation, World Explorations
 */

function initInteractions() {
  // =========================================================================
  // 1. INSPIRATIONAL QUOTE CAROUSEL
  // =========================================================================
  const quoteSection = document.querySelector('.quote-section');
  if (quoteSection) {
    const quotes = [
      {
        text: '“Always believe in yourself. Do this and no matter where you are, you will have nothing to fear.”',
        author: 'Baron Humbert von Gikkingen',
        source: 'The Cat Returns (2002)'
      },
      {
        text: '“Once you’ve met someone you never really forget them. It just takes a while for your memories to return.”',
        author: 'Zeniba',
        source: 'Spirited Away (2001)'
      },
      {
        text: '“They say that the best blaze burns brightest when circumstances are at their worst.”',
        author: 'Sophie Hatter',
        source: "Howl's Moving Castle (2004)"
      },
      {
        text: '“You cannot alter your destiny. However, you can rise to meet it.”',
        author: 'Hii-sama (Oracle Wise Woman)',
        source: 'Princess Mononoke (1997)'
      },
      {
        text: '“We each need to find our own inspiration, Kiki. Sometimes it’s not easy, but you’ll find it inside.”',
        author: 'Ursula',
        source: "Kiki's Delivery Service (1989)"
      },
      {
        text: '“The wind is rising! We must try to live.”',
        author: 'Paul Valéry / Jiro Horikoshi',
        source: 'The Wind Rises (2013)'
      }
    ];

    let currentIdx = 0;
    const quoteTextEl = document.getElementById('carousel-quote-text');
    const quoteAuthorEl = document.getElementById('carousel-quote-author');
    const quoteSourceEl = document.getElementById('carousel-quote-source');
    const dotsContainer = document.getElementById('quote-carousel-dots');

    if (quoteTextEl && quoteAuthorEl && quoteSourceEl && dotsContainer) {
      // Build dots
      dotsContainer.innerHTML = quotes
        .map((_, i) => `<button class="quote-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Go to quote ${i + 1}"></button>`)
        .join('');

      const dotBtns = dotsContainer.querySelectorAll('.quote-dot');

      function showQuote(idx) {
        currentIdx = idx;
        const q = quotes[currentIdx];

        // Gentle fade transition
        quoteTextEl.style.opacity = '0';
        quoteAuthorEl.style.opacity = '0';
        quoteSourceEl.style.opacity = '0';

        setTimeout(() => {
          quoteTextEl.textContent = q.text;
          quoteAuthorEl.textContent = q.author;
          quoteSourceEl.textContent = q.source;

          quoteTextEl.style.opacity = '1';
          quoteAuthorEl.style.opacity = '1';
          quoteSourceEl.style.opacity = '1';

          dotBtns.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIdx);
          });
        }, 300);
      }

      dotBtns.forEach((dot) => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.dataset.idx, 10);
          showQuote(idx);
        });
      });

      // Auto cycle every 7.5 seconds
      if (window._quoteInterval) {
        clearInterval(window._quoteInterval);
      }
      window._quoteInterval = setInterval(() => {
        const next = (currentIdx + 1) % quotes.length;
        showQuote(next);
      }, 7500);
    }
  }

  // =========================================================================
  // 2. 3D CARD HOVER TILT (DESKTOP)
  // Adds tactile storybook physical feel
  // =========================================================================
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isTouchDevice && !prefersReduced) {
    const tiltCards = document.querySelectorAll('.movie-card, .character-card, .portal-card, .pillar-box');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // =========================================================================
  // 3. MAGICAL WORLDS AUDIO MOOD TRIGGER
  // =========================================================================
  const worldSoundBtns = document.querySelectorAll('.world-sound-btn');
  worldSoundBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.ghibliSoundscape) {
        if (!window.ghibliSoundscape.isPlaying) {
          window.ghibliSoundscape.start();
        } else {
          // Play a pleasant immediate resonant chime for world activation
          window.ghibliSoundscape.playChime();
        }
        btn.textContent = '🌿 Ambient Echoing';
        setTimeout(() => {
          btn.textContent = 'Listen to Atmosphere';
        }, 3000);
      }
    });
  });
}

window.initInteractions = initInteractions;
document.addEventListener('DOMContentLoaded', initInteractions);

