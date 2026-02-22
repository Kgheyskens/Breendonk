/* ===================================================
   Fort Breendonk – Single-Page JavaScript
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile nav toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded',
        toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Active nav highlight on scroll --- */
  const sections = document.querySelectorAll('.section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  /* --- Header shadow on scroll --- */
  const header = document.querySelector('.site-header');
  function headerShadow() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }

  /* --- Back-to-top button --- */
  const btt = document.querySelector('.back-to-top');
  function toggleBTT() {
    if (btt) btt.classList.toggle('visible', window.scrollY > 600);
  }
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Combined scroll listener --- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        highlightNav();
        headerShadow();
        toggleBTT();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  highlightNav();
  headerShadow();
  toggleBTT();

  /* --- Timeline accordion --- */
  document.querySelectorAll('.tl-heading').forEach(heading => {
    heading.addEventListener('click', () => {
      const item = heading.closest('.tl-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.tl-item.open').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
    // Keyboard support
    heading.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        heading.click();
      }
    });
  });

  /* --- Scroll fade-in (IntersectionObserver) --- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => obs.observe(el));
  } else {
    // Fallback: show everything
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', anchor.getAttribute('href'));
      }
    });
  });

});
