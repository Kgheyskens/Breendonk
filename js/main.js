/* ===================================================
   Fort Breendonk – Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Navigation Toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }

  /* --- Active nav link highlight --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* --- Timeline Accordion --- */
  document.querySelectorAll('.timeline-title').forEach(title => {
    title.addEventListener('click', () => {
      const item = title.closest('.timeline-item');
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.timeline-item').forEach(i => {
        i.classList.remove('active');
      });

      // Open clicked item if it wasn't already open
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* --- Scroll Fade-In --- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
