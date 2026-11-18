/**
 * ITIHASA — MAIN SCRIPT & SHARED INTERACTIONS
 * js/main.js
 */

(function () {
  'use strict';

  // 1. Sticky Navigation on Scroll
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Drawer Navigation
  function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileClose = document.querySelector('.mobile-close-btn');
    const overlay = document.querySelector('.mobile-overlay');

    if (!mobileToggle || !mobileDrawer) return;

    function openMenu() {
      mobileDrawer.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileDrawer.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    const navLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // 3. Floating Lotus Petals & Celestial Particles Canvas
  function initParticleCanvas() {
    const canvas = document.getElementById('canvas-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 20 : 45;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1.5,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.5 + 0.2,
        isPetal: Math.random() > 0.65,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isPetal) {
          // Draw subtle golden/pink lotus petal
          ctx.beginPath();
          ctx.fillStyle = `rgba(230, 199, 122, ${p.opacity * 0.6})`;
          ctx.ellipse(0, 0, p.size * 2, p.size * 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Celestial gold dust particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 231, 208, ${p.opacity * 0.75})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#E6C77A';
          ctx.fill();
        }
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // 4. Guaranteed Scroll Reveal with IntersectionObserver & FailSafe
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach(el => observer.observe(el));
    } else {
      // Immediate fallback if no IntersectionObserver
      reveals.forEach(el => el.classList.add('revealed'));
    }

    // Safety fallback: Ensure all content is revealed within 2.5 seconds regardless
    setTimeout(() => {
      reveals.forEach(el => el.classList.add('revealed'));
    }, 2500);
  }

  // 5. Global Modal System (for Characters & Events)
  const Modal = {
    overlay: null,
    init() {
      this.overlay = document.getElementById('global-modal');
      if (!this.overlay) return;

      const closeBtn = this.overlay.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.overlay.classList.contains('open')) {
          this.close();
        }
      });
    },

    open(data) {
      if (!this.overlay) return;

      const tagEl = this.overlay.querySelector('.modal-epic-tag');
      const titleEl = this.overlay.querySelector('.modal-title');
      const subEl = this.overlay.querySelector('.modal-subtitle');
      const imgEl = this.overlay.querySelector('.modal-img-col img');
      const descEl = this.overlay.querySelector('.modal-desc');
      const traitsEl = this.overlay.querySelector('.modal-traits-list');
      const eventEl = this.overlay.querySelector('.modal-associated-events');

      if (tagEl) tagEl.textContent = data.epic || 'Itihasa';
      if (titleEl) titleEl.textContent = data.name || data.title;
      if (subEl) subEl.textContent = data.role || data.subtitle || '';
      if (imgEl && data.image) {
        imgEl.src = data.image;
        imgEl.alt = data.name || data.title;
      }
      if (descEl) descEl.textContent = data.desc || data.description || '';

      if (traitsEl) {
        traitsEl.innerHTML = '';
        if (data.qualities && Array.isArray(data.qualities)) {
          data.qualities.forEach(q => {
            const span = document.createElement('span');
            span.className = 'trait-tag';
            span.textContent = q;
            traitsEl.appendChild(span);
          });
        }
      }

      if (eventEl) {
        eventEl.textContent = data.events || data.associated || '';
      }

      this.overlay.classList.add('open');
      document.body.style.overflow = 'hidden';

      if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
        window.ItihasaMusic.playTempleBell();
      }
    },

    close() {
      if (!this.overlay) return;
      this.overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.ItihasaModal = Modal;

  // DOM Content Loaded Handler
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initParticleCanvas();
    initScrollReveals();
    Modal.init();
  });
})();
