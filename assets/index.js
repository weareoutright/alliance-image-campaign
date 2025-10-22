// ==========================================================================
// Alliance Image Campaign - JavaScript
// ==========================================================================

(function() {
  'use strict';

  console.log('Alliance Image Campaign - JavaScript loaded');

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
    console.log('Initializing all modules...');
    initCarousel();
    initVideoModal();
    initFAQModal();
    initSmoothScroll();
    initNavigation();
    initMobileMenu();
    console.log('All modules initialized');
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

    updateCarouselButtons();
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

    console.log('Video modal initialized:', {
      element: !!videoModal.element,
      overlay: !!videoModal.overlay,
      closeBtn: !!videoModal.closeBtn,
      video: !!videoModal.video
    });

    if (!videoModal.element) {
      console.error('Video modal element not found');
      return;
    }

    // Add click handlers to all play buttons
    const playButtons = document.querySelectorAll('[data-video]');
    console.log('Found', playButtons.length, 'play buttons');

    playButtons.forEach((button, index) => {
      console.log(`Attaching handler to button ${index + 1}:`, button.getAttribute('data-video'));
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
    console.log('!!! HANDLE VIDEO OPEN CALLED !!!');
    e.preventDefault();
    e.stopPropagation();

    const videoId = e.currentTarget.getAttribute('data-video');
    const videoSrc = `assets/videos/${videoId}.mp4`;

    console.log('handleVideoOpen called for:', videoId);
    console.log('videoModal.element:', videoModal.element);
    console.log('videoModal.video:', videoModal.video);

    // Re-query the modal in case it wasn't found during init
    const modalElement = document.getElementById('video-modal');
    const videoElement = modalElement?.querySelector('.modal__video');

    console.log('Re-queried modalElement:', modalElement);
    console.log('Current display style:', modalElement?.style.display);

    if (videoElement && modalElement) {
      videoElement.src = videoSrc;
      modalElement.style.display = 'flex';
      modalElement.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      console.log('Modal should now be visible. New display style:', modalElement.style.display);

      // Only play if video source exists (won't error if video file missing)
      videoElement.play().catch(err => {
        console.log('Video playback failed (expected if no video file):', err.message);
      });
    } else {
      console.error('Video modal elements not found:', {
        videoElement: !!videoElement,
        modalElement: !!modalElement
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
              console.log('Active section:', sectionId, 'Added class to:', link.textContent);
            }
          });
        }
      });
    }

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
