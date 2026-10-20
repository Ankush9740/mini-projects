document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Mouse Glow / Spotlight Effect
    // ==========================================================================
    const mouseGlow = document.getElementById('mouseGlow');
    const cards = document.querySelectorAll('.skills-card');
    
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    
    // Track cursor for global glow background
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show mouse glow after movement starts
        if (mouseGlow.style.opacity === '0' || mouseGlow.style.opacity === '') {
            mouseGlow.style.opacity = '1';
        }
    });

    // Make spotlight overlay slide smoothly behind the cursor (Lerp)
    function animateGlow() {
        const ease = 0.08; // Smoothing factor
        glowX += (mouseX - glowX) * ease;
        glowY += (mouseY - glowY) * ease;
        
        mouseGlow.style.left = `${glowX}px`;
        mouseGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Spotlight effect inside individual skill cards
    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Fade out glow when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });

    // ==========================================================================
    // Scroll reveals (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop tracking once revealed
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================================================
    // Active Navigation Highlighting (Scrollspy) & Header Styling
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        // Sticky Header scroll styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Navigation highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset for nav header height
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // Mobile Responsive Menu
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ==========================================================================
    // Contact Form submission (Interactive/Mock)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitBtnText = submitBtn.querySelector('span');
        const originalText = submitBtnText.textContent;
        
        const userName = document.getElementById('name').value.trim();
        const userEmail = document.getElementById('email').value.trim();
        const userMessage = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!userName || !userEmail || !userMessage) {
            showFeedback('Please fill out all fields.', 'error');
            return;
        }
        
        // Visual sending state
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending message...';
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
        
        // Simulating submission delay (1.5 seconds)
        setTimeout(() => {
            // Success Feedback
            showFeedback(`Thank you, ${userName}! Your message has been sent successfully.`, 'success');
            
            // Format mailto body just in case they want a backup action
            const mailtoUri = `mailto:ankushsuvarna3@gmail.com?subject=Contact from ${encodeURIComponent(userName)}&body=${encodeURIComponent(userMessage)}%0A%0AFrom: ${encodeURIComponent(userName)} (${encodeURIComponent(userEmail)})`;
            
            // Log submission internally
            console.log('Form Submitted!', { userName, userEmail, userMessage });
            
            // Reset form inputs
            contactForm.reset();
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtnText.textContent = originalText;
            
            // Trigger mailto client check after brief pause so they can see the confirmation
            setTimeout(() => {
                window.location.href = mailtoUri;
            }, 1000);
            
        }, 1500);
    });
    
    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        
        // Auto clear error after 5s
        if (type === 'error') {
            setTimeout(() => {
                if (formFeedback.textContent === message) {
                    formFeedback.textContent = '';
                }
            }, 5000);
        }
    }
});
