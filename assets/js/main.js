/**
 * ═════════════════════════════════════════════════════════════════════
 * MOD PATIO — LUXURY OUTDOOR FURNITURE
 * Creative Direction: "Golden Hour Living"
 * Front-end Scripts: Sticky bar, Carousel, Animations, Parallax, Counters
 * ═════════════════════════════════════════════════════════════════════
 */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. ANNOUNCEMENT BAR DISMISSAL ── */
  const announcementBar = document.getElementById('announcement-bar');
  const announcementClose = document.getElementById('announcement-close');
  if (announcementBar && announcementClose) {
    if (sessionStorage.getItem('modpatio_announcement_closed') === 'true') {
      announcementBar.classList.add('is-closed');
    }
    announcementClose.addEventListener('click', () => {
      announcementBar.classList.add('is-closed');
      sessionStorage.setItem('modpatio_announcement_closed', 'true');
    });
  }

  /* ── 2. STICKY FLOATING HEADER ── */
  const siteHeader = document.getElementById('site-header');
  const scrollThreshold = 80;

  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > scrollThreshold) {
      siteHeader.classList.add('is-sticky');
    } else {
      siteHeader.classList.remove('is-sticky');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ── 3. MOBILE NAVIGATION SHEET ── */
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileSheet = document.getElementById('mobile-nav-sheet');
  const mobileClose = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (!mobileSheet || !mobileBackdrop) return;
    mobileBackdrop.classList.add('is-open');
    mobileSheet.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileSheet || !mobileBackdrop) return;
    mobileBackdrop.classList.remove('is-open');
    mobileSheet.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ── 4. SEARCH MODAL ── */
  const searchToggle = document.getElementById('search-toggle-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input-field');

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 150);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeMobileNav();
    }
  });

  /* ── 5. H1 WORD-BY-WORD REVEAL ── */
  const heroHeading = document.querySelector('.hero-title-reveal');
  if (heroHeading && !prefersReducedMotion) {
    const rawHTML = heroHeading.innerHTML;
    // Split into words while preserving tags like <em>...</em>
    const words = rawHTML.trim().split(/\s+/);
    let newHTML = '';
    words.forEach((word, index) => {
      const delay = index * 60;
      newHTML += `<span class="word-reveal-wrap"><span class="word-reveal-char" style="animation-delay: ${delay}ms">${word}</span></span> `;
    });
    heroHeading.innerHTML = newHTML;
  }

  /* ── 6. MOUSE TRACKING PARALLAX (DESKTOP) ── */
  const heroVisual = document.querySelector('.hero-visual');
  const heroCutouts = document.querySelectorAll('.hero-visual .floating-cutout');
  const ctaCluster = document.querySelector('.curated-cluster');
  const ctaCutouts = document.querySelectorAll('.curated-cluster .cluster-item');

  if (!prefersReducedMotion && window.matchMedia('(min-width: 992px)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTracking = false;

    window.addEventListener('mousemove', (e) => {
      // Normalize -1 to 1 based on center of screen
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!isTracking) {
        isTracking = true;
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });

    function updateParallax() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      // Hero cutouts shift up to 12px opposite to cursor
      heroCutouts.forEach((el, i) => {
        const factor = (i % 2 === 0 ? 1 : 1.3) * -12;
        el.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
      });

      // Curated CTA cluster shift
      if (ctaCluster && ctaCutouts.length) {
        ctaCutouts.forEach((el, i) => {
          const factor = (i + 1) * -8;
          el.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
        });
      }

      if (Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
        requestAnimationFrame(updateParallax);
      } else {
        isTracking = false;
      }
    }
  }

  /* ── 7. SVG BLOB MORPHING (HERO BACKGROUND) ── */
  const blobPath = document.getElementById('hero-morph-path');
  if (blobPath && !prefersReducedMotion) {
    const morphPaths = [
      "M390.5,317.5Q347,385,268.5,413.5Q190,442,126,389Q62,336,65.5,257Q69,178,131,123.5Q193,69,271,78.5Q349,88,391.5,169Q434,250,390.5,317.5Z",
      "M412,314.5Q366,379,292,408Q218,437,144,402.5Q70,368,67.5,286.5Q65,205,123.5,142.5Q182,80,265,83.5Q348,87,403,168.5Q458,250,412,314.5Z",
      "M381.5,310.5Q341,371,269,401.5Q197,432,130,391Q63,350,68,268.5Q73,187,128.5,130.5Q184,74,264,83Q344,92,383,171Q422,250,381.5,310.5Z"
    ];
    let pathIndex = 0;
    setInterval(() => {
      pathIndex = (pathIndex + 1) % morphPaths.length;
      blobPath.setAttribute('d', morphPaths[pathIndex]);
    }, 4000);
  }

  /* ── 8. COLLECTIONS SWIPER CAROUSEL ── */
  if (typeof Swiper !== 'undefined') {
    const collectionSwiper = new Swiper('.swiper-collections', {
      slidesPerView: 1.15,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      speed: 600,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '#carousel-btn-next',
        prevEl: '#carousel-btn-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        576: {
          slidesPerView: 1.6,
          spaceBetween: 24
        },
        768: {
          slidesPerView: 2.3,
          spaceBetween: 24
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 28
        },
        1200: {
          slidesPerView: 3.5,
          spaceBetween: 32
        }
      }
    });
  }

  /* ── 9. FLIP BOXES ACCESSIBILITY & TOUCH ── */
  const flipBoxes = document.querySelectorAll('.flip-box');
  flipBoxes.forEach(box => {
    // Click or tap toggle for mobile
    box.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        box.classList.toggle('is-flipped');
      }
    });

    // Keyboard support (Enter or Space)
    box.setAttribute('tabindex', '0');
    box.setAttribute('role', 'region');
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        box.classList.toggle('is-flipped');
      }
    });
  });

  /* ── 10. ANIMATED COUNTERS (NUMBERS STRIP & HERO BADGE) ── */
  const counterElements = document.querySelectorAll('[data-counter-target]');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-counter-target'), 10);
      const duration = 2000; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(ease * target);
        el.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  const numbersBand = document.querySelector('.numbers-band');
  if (numbersBand) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterObserver.observe(numbersBand);
  }

  // Also animate hero badge counter if in view
  const heroBadge = document.querySelector('.hero-floating-badge [data-counter-target]');
  if (heroBadge && !countersAnimated) {
    setTimeout(() => {
      const target = parseInt(heroBadge.getAttribute('data-counter-target'), 10);
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          heroBadge.textContent = target;
          clearInterval(timer);
        } else {
          heroBadge.textContent = count;
        }
      }, 30);
    }, 600);
  }

  /* ── 11. ENTRANCE ANIMATIONS (REUSABLE INTERSECTION OBSERVER) ── */
  const revealElements = document.querySelectorAll('.reveal-init');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay') || '0';
          const duration = el.getAttribute('data-duration') || '800';

          el.style.animationDelay = `${delay}ms`;
          el.style.animationDuration = `${duration}ms`;
          el.classList.add('is-revealed');
          revealObserver.unobserve(el);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ── 12. BACK TO TOP BUTTON ── */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 13. NEWSLETTER FORM INTERACTION ── */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value.trim()) {
        newsletterForm.style.display = 'none';
        newsletterSuccess.classList.add('is-visible');
      }
    });
  }

  /* ── 14. HORIZONTAL CHIPS SCROLL ON DRAG / MOUSEWHEEL / BUTTONS ── */
  const chipsScroll = document.querySelector('.chips-scroll-container');
  const chipsPrev = document.getElementById('chips-scroll-prev');
  const chipsNext = document.getElementById('chips-scroll-next');

  if (chipsScroll) {
    // Update button states on scroll / resize
    function updateChipsNav() {
      if (chipsPrev) {
        if (chipsScroll.scrollLeft <= 5) {
          chipsPrev.classList.add('is-disabled');
        } else {
          chipsPrev.classList.remove('is-disabled');
        }
      }
      if (chipsNext) {
        const maxScroll = chipsScroll.scrollWidth - chipsScroll.clientWidth;
        if (chipsScroll.scrollLeft >= maxScroll - 5) {
          chipsNext.classList.add('is-disabled');
        } else {
          chipsNext.classList.remove('is-disabled');
        }
      }
    }

    chipsScroll.addEventListener('scroll', updateChipsNav, { passive: true });
    window.addEventListener('resize', updateChipsNav, { passive: true });
    // Initial call
    setTimeout(updateChipsNav, 100);

    // Left / Right Scroll Buttons (scroll by 280px)
    if (chipsPrev) {
      chipsPrev.addEventListener('click', () => {
        chipsScroll.scrollBy({ left: -280, behavior: 'smooth' });
      });
    }

    if (chipsNext) {
      chipsNext.addEventListener('click', () => {
        chipsScroll.scrollBy({ left: 280, behavior: 'smooth' });
      });
    }

    // Mouse wheel horizontal scroll on hover
    chipsScroll.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        chipsScroll.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // Drag to scroll
    let isDown = false;
    let startX, scrollLeft;

    chipsScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - chipsScroll.offsetLeft;
      scrollLeft = chipsScroll.scrollLeft;
    });
    chipsScroll.addEventListener('mouseleave', () => { isDown = false; });
    chipsScroll.addEventListener('mouseup', () => { isDown = false; });
    chipsScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - chipsScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      chipsScroll.scrollLeft = scrollLeft - walk;
    });
  }
});
