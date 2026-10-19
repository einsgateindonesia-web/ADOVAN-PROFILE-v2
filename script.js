/**
 * ADOVAN · PERSONAL CV & PORTFOLIO
 * Inspired by Minh Pham Design (https://minhpham.design/)
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State & Theme Setup
  initTheme();
  
  // 2. Preloader & Counter Animation
  initPreloader();
  
  // 3. Custom Cursor Follower
  initCustomCursor();
  
  // 4. Scroll Progress Bar & Parallax
  initScrollEffects();
  
  // 5. 3D Tilt on Profile Photo
  initPhotoTilt();
  
  // 6. Scroll Reveal Observer (Cards & Skill Bars)
  initScrollReveal();
  
  // 7. Testimonials Auto-play Slider
  initTestimonialSlider();
  
  // 8. Contact & Copy Email Functionality
  initContactActions();
  
  // 9. CV Modal Viewer
  initCVModal();
  
  // 10. Smooth Scroll for Anchor Links
  initSmoothScroll();
});

/* ==========================================================================
   Theme Toggle (Dark/Light with prefers-color-scheme & localStorage)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('adovan-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('adovan-theme', isDark ? 'dark' : 'light');
    });
  }

  // Listen to OS system color-scheme changes if no explicit user preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('adovan-theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}

/* ==========================================================================
   Preloader & Counter Animation
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const counterElement = document.getElementById('preloader-counter');
  
  if (!preloader || !counterElement) {
    revealHeroText();
    return;
  }

  let count = 0;
  const duration = 1200; // ms
  const intervalTime = 16;
  const step = 100 / (duration / intervalTime);

  const counterTimer = setInterval(() => {
    count += step;
    if (count >= 100) {
      count = 100;
      clearInterval(counterTimer);
      counterElement.textContent = '100%';
      
      // Complete preloader and slide up
      setTimeout(() => {
        preloader.classList.add('loaded');
        // Trigger Hero text reveal
        setTimeout(revealHeroText, 300);
      }, 250);
    } else {
      counterElement.textContent = `${Math.floor(count).toString().padStart(2, '0')}%`;
    }
  }, intervalTime);
}

/* ==========================================================================
   Hero Line-by-Line Reveal Animation (Minh Pham style)
   ========================================================================== */
function revealHeroText() {
  const heroLines = document.querySelectorAll('.hero-line-inner');
  heroLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('revealed');
    }, index * 180);
  });
}

/* ==========================================================================
   Custom Cursor (Dot + Smooth Circle Follower)
   ========================================================================== */
function initCustomCursor() {
  // Disable on mobile/touch screens
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');
  
  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate dot positioning
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Lerp smoothing loop for follower circle
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
  }
  requestAnimationFrame(animateFollower);

  // Hover states on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .service-card, .achievement-card, .experience-card, .photo-tilt-wrap, input, textarea, .slider-dot'
  );

  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    target.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* ==========================================================================
   Scroll Effects: Progress Bar & Hero Parallax
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const heroPhoto = document.querySelector('.photo-column');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // 1. Progress Bar
    if (progressBar && scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // 2. Subtle Hero Parallax
    if (scrollTop < window.innerHeight && heroPhoto && heroContent) {
      heroPhoto.style.transform = `translateY(${scrollTop * 0.12}px)`;
      heroContent.style.transform = `translateY(${scrollTop * 0.05}px)`;
    }
  }, { passive: true });
}

/* ==========================================================================
   3D Tilt on Profile Photo
   ========================================================================== */
function initPhotoTilt() {
  const tiltCard = document.querySelector('.photo-tilt-wrap');
  if (!tiltCard) return;

  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    // Max rotation 12 degrees
    const rotateX = -deltaY * 12;
    const rotateY = deltaX * 12;

    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

/* ==========================================================================
   Scroll Reveal Observer (Section Elements & Animated Skill Bars)
   ========================================================================== */
function initScrollReveal() {
  // Elements to reveal
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Skill Bar Progress Animation
  const skillBars = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fillTarget = entry.target;
        const targetPercent = fillTarget.getAttribute('data-percent') || '90';
        fillTarget.style.width = `${targetPercent}%`;
        observer.unobserve(fillTarget);
      }
    });
  }, {
    threshold: 0.25
  });

  skillBars.forEach((bar) => skillObserver.observe(bar));
}

/* ==========================================================================
   Testimonial Slider (Auto-play 5s + Dots + Next/Prev)
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // Dots click
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index') || '0', 10);
      goToSlide(targetIndex);
      startAutoplay();
    });
  });

  // Next / Prev buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoplay();
    });
  }

  // Pause on hover
  const container = document.querySelector('.testimonials-slider-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  // Start initial autoplay
  startAutoplay();
}

/* ==========================================================================
   Contact Actions: One-click Email Copy & Direct Feedback
   ========================================================================== */
function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailVal = 'einsgateindonesia@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(emailVal).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = 'var(--accent)';
        copyBtn.style.color = '#ffffff';

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.backgroundColor = '';
          copyBtn.style.color = '';
        }, 2000);
      }).catch(() => {
        // Fallback prompt
        window.location.href = `mailto:${emailVal}`;
      });
    });
  }

  // Direct Message Form handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const messageInput = document.getElementById('sender-message');

      if (!nameInput.value.trim() || !messageInput.value.trim()) {
        return;
      }

      if (submitBtn) {
        const originalLabel = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Message...';

        setTimeout(() => {
          submitBtn.innerHTML = 'Message Sent Successfully ✓';
          submitBtn.style.backgroundColor = '#10b981';
          submitBtn.style.color = '#ffffff';

          contactForm.reset();

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalLabel;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
          }, 3500);
        }, 1000);
      }
    });
  }
}

/* ==========================================================================
   CV Modal Viewer (Preview & Print / Download)
   ========================================================================== */
function initCVModal() {
  const modalBackdrop = document.getElementById('cv-modal');
  const openButtons = document.querySelectorAll('.open-cv-btn');
  const closeButton = document.getElementById('close-cv-modal');
  const printButton = document.getElementById('print-cv-btn');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  const closeButton2 = document.getElementById('close-cv-modal-2');
  if (closeButton2) {
    closeButton2.addEventListener('click', closeModal);
  }

  // Close when clicking outside modal window
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Print / Save to PDF
  if (printButton) {
    printButton.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   Smooth Scrolling for Anchors & Back to Top
   ========================================================================== */
function initSmoothScroll() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
