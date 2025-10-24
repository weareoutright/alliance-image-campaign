// ==========================================================================
// Alliance Image Campaign - JavaScript
// ==========================================================================

(function() {
  'use strict';

  // State
  let currentSlide = 0;
  const totalSlides = 6;

  // DOM Elements
  const carousel = {
    track: null,
    prevBtn: null,
    nextBtn: null,
    cards: []
  };

  const videoModal = {
    element: null,
    overlay: null,
    closeBtn: null,
    video: null
  };

  const faqModal = {
    element: null,
    overlay: null,
    content: null
  };

  // Initialize
  function init() {
    initCarousel();
    initVideoModal();
    initFAQModal();
    initSmoothScroll();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
  }

  // ==========================================================================
  // Carousel
  // ==========================================================================

  function initCarousel() {
    carousel.track = document.querySelector('.testimonials__track');
    carousel.prevBtn = document.querySelector('.testimonials__control--prev');
    carousel.nextBtn = document.querySelector('.testimonials__control--next');
    carousel.cards = document.querySelectorAll('.testimonial-card');

    if (!carousel.track || !carousel.prevBtn || !carousel.nextBtn) return;

    carousel.prevBtn.addEventListener('click', handlePrevSlide);
    carousel.nextBtn.addEventListener('click', handleNextSlide);

    // Add touch/swipe functionality
    initCarouselSwipe();

    updateCarouselButtons();
  }

  function initCarouselSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    carousel.track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isDragging = true;
    }, { passive: true });

    carousel.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchEndX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.track.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50; // Minimum swipe distance in pixels
      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          // Swiped left - go to next slide
          handleNextSlide();
        } else {
          // Swiped right - go to previous slide
          handlePrevSlide();
        }
      }

      // Reset values
      touchStartX = 0;
      touchEndX = 0;
    }
  }

  function handlePrevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  }

  function handleNextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  }

  function updateCarousel() {
    const cardWidth = 430; // Card width in pixels
    const gap = 32; // Gap between cards in pixels
    const offset = currentSlide * (cardWidth + gap);

    carousel.track.style.transform = `translateX(-${offset}px)`;
    updateCarouselButtons();
  }

  function updateCarouselButtons() {
    // Disable prev button on first slide
    carousel.prevBtn.disabled = currentSlide === 0;

    // Disable next button on last slide
    carousel.nextBtn.disabled = currentSlide === totalSlides - 1;
  }

  // ==========================================================================
  // Video Modal
  // ==========================================================================

  function initVideoModal() {
    videoModal.element = document.getElementById('video-modal');
    videoModal.overlay = videoModal.element?.querySelector('.modal__overlay');
    videoModal.closeBtn = videoModal.element?.querySelector('.modal__close');
    videoModal.video = videoModal.element?.querySelector('.modal__video');

    if (!videoModal.element) return;

    // Add click handlers to all play buttons
    const playButtons = document.querySelectorAll('[data-video]');

    playButtons.forEach((button) => {
      button.addEventListener('click', handleVideoOpen);
    });

    // Close modal handlers
    videoModal.overlay?.addEventListener('click', handleVideoClose);
    videoModal.closeBtn?.addEventListener('click', handleVideoClose);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.element.getAttribute('aria-hidden') === 'false') {
        handleVideoClose();
      }
    });
  }

  function handleVideoOpen(e) {
    e.preventDefault();
    e.stopPropagation();

    const videoId = e.currentTarget.getAttribute('data-video');
    const videoSrc = `assets/videos/${videoId}.mp4`;

    if (videoModal.video && videoModal.element) {
      videoModal.video.src = videoSrc;
      videoModal.element.style.display = 'flex';
      videoModal.element.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Only play if video source exists (won't error if video file missing)
      videoModal.video.play().catch(() => {
        // Video playback failed (expected if no video file)
      });
    }
  }

  function handleVideoClose() {
    if (videoModal.video) {
      videoModal.video.pause();
      videoModal.video.currentTime = 0;
      videoModal.video.src = '';
    }
    if (videoModal.element) {
      videoModal.element.style.display = 'none';
      videoModal.element.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // FAQ Modal
  // ==========================================================================

  function initFAQModal() {
    // Add click handlers to all FAQ buttons
    const faqButtons = document.querySelectorAll('[data-faq]');
    faqButtons.forEach(button => {
      button.addEventListener('click', handleFAQToggle);
    });
  }

  function handleFAQToggle(e) {
    const button = e.currentTarget;
    const faqType = button.getAttribute('data-faq');
    const card = button.closest('.info-card');

    if (!card) return;

    // Check if FAQ is already open
    const existingFAQ = card.querySelector('.info-card__faq');

    if (existingFAQ && existingFAQ.classList.contains('info-card__faq--open')) {
      // Close the FAQ
      existingFAQ.classList.remove('info-card__faq--open');
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('.info-card__cta-icon').textContent = '+';
    } else if (existingFAQ) {
      // FAQ exists but is closed, open it
      existingFAQ.classList.add('info-card__faq--open');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('.info-card__cta-icon').textContent = '−';
    } else {
      // Create and open the FAQ
      const faqContent = getFAQContent(faqType);
      const faqElement = document.createElement('div');
      faqElement.className = 'info-card__faq';
      faqElement.innerHTML = faqContent;

      // Insert after the content div
      const contentDiv = card.querySelector('.info-card__content');
      contentDiv.appendChild(faqElement);

      // Trigger animation by adding class after a small delay
      setTimeout(() => {
        faqElement.classList.add('info-card__faq--open');
      }, 10);

      button.setAttribute('aria-expanded', 'true');
      button.querySelector('.info-card__cta-icon').textContent = '−';
    }
  }

  function getFAQContent(type) {
    const faqData = {
      'dynamic-work': {
        title: 'Dynamic & Fulfilling Work',
        description: 'Deliver essential care in the setting where patients most want to receive it — at home. Apply your skills with greater autonomy and the chance to learn.',
        faqs: [
          {
            question: 'What types of care can I provide at home?',
            answer: 'Home care encompasses a wide range of services including skilled nursing, physical therapy, occupational therapy, speech therapy, medical social services, and personal care assistance.'
          },
          {
            question: 'How is home care different from hospital care?',
            answer: 'Home care allows for more personalized, one-on-one patient interaction in a familiar environment, often leading to better patient outcomes and satisfaction.'
          }
        ]
      },
      'patient-impact': {
        title: 'Real Patient Impact',
        description: 'Develop meaningful relationships and stronger bonds with the people you serve, while witnessing firsthand the impact of your work over time.',
        faqs: [
          {
            question: 'How do I build relationships with patients?',
            answer: 'Through consistent visits and personalized care plans, you develop deep understanding of patient needs and preferences, creating lasting bonds.'
          },
          {
            question: 'What outcomes can I expect to see?',
            answer: 'You will witness tangible improvements in patient health, independence, and quality of life as you provide ongoing support in their home environment.'
          }
        ]
      },
      'collaborative-care': {
        title: 'Collaborative Care Culture',
        description: 'Work with colleagues who share your passion and purpose, and lean on an integrated team of healthcare professionals who empower patient care.',
        faqs: [
          {
            question: 'Who will I work with?',
            answer: 'You will collaborate with physicians, nurses, therapists, social workers, and other healthcare professionals as part of an integrated care team.'
          },
          {
            question: 'How does team collaboration work?',
            answer: 'Regular communication, care coordination meetings, and shared care plans ensure everyone is aligned on patient goals and treatment approaches.'
          }
        ]
      }
    };

    const data = faqData[type];
    if (!data) return '<p>FAQ content not found.</p>';

    let html = '';

    data.faqs.forEach(faq => {
      html += `
        <div class="info-card__faq-item">
          <h4 class="info-card__faq-question">${faq.question}</h4>
          <p class="info-card__faq-answer">${faq.answer}</p>
        </div>
      `;
    });

    return html;
  }

  // ==========================================================================
  // Smooth Scroll Navigation
  // ==========================================================================

  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav__link');
    let lastActivatedSection = null;

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const navHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Store the last activated section for tab navigation
          lastActivatedSection = targetSection;
        }
      });

      // Handle tab navigation after clicking a nav link
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey && lastActivatedSection) {
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);

          if (targetSection === lastActivatedSection) {
            // Find first focusable element in the section
            const focusableElements = targetSection.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length > 0) {
              e.preventDefault();
              focusableElements[0].focus();
              lastActivatedSection = null; // Reset after use
            }
          }
        }
      });
    });
  }

  // ==========================================================================
  // Navigation Highlighting
  // ==========================================================================

  function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function highlightNavigation() {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    }

    // Keyboard navigation for nav links
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        let newIndex = index;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIndex = (index + 1) % navLinks.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIndex = (index - 1 + navLinks.length) % navLinks.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIndex = navLinks.length - 1;
        } else {
          return;
        }

        navLinks[newIndex].focus();
      });
    });

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial call
  }

  // ==========================================================================
  // Mobile Menu Toggle
  // ==========================================================================

  function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navList = document.querySelector('.nav__list');

    if (!mobileMenuToggle || !navList) return;

    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = navList.classList.contains('nav__list--open');

      if (isOpen) {
        navList.classList.remove('nav__list--open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      } else {
        navList.classList.add('nav__list--open');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when a link is clicked
    const navLinks = navList.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('nav__list--open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // Scroll Animations
  // ==========================================================================

  function initScrollAnimations() {
    const infoCards = document.querySelectorAll('.info-card');
    const testimonialCarousel = document.querySelector('.testimonials__carousel');
    const testimonialsSection = document.querySelector('.testimonials');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // Also add animate-carousel class to testimonials section for button pulse
          if (entry.target.classList.contains('testimonials__carousel')) {
            testimonialsSection?.classList.add('animate-carousel');
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe info cards
    infoCards.forEach(card => {
      observer.observe(card);
    });

    // Observe testimonials carousel
    if (testimonialCarousel) {
      observer.observe(testimonialCarousel);
    }
  }

  // ==========================================================================
  // Keyboard Navigation for Carousel
  // ==========================================================================

  document.addEventListener('keydown', (e) => {
    // Only handle keyboard navigation when not in a modal
    if (videoModal.element?.getAttribute('aria-hidden') === 'false' ||
        faqModal.element?.getAttribute('aria-hidden') === 'false') {
      return;
    }

    if (e.key === 'ArrowLeft') {
      handlePrevSlide();
    } else if (e.key === 'ArrowRight') {
      handleNextSlide();
    }
  });

  // ==========================================================================
  // Initialize on DOM Ready
  // ==========================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
