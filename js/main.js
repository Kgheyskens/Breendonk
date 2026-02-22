/* ============================================================
   Fort Breendonk — Single-Page Memorial JavaScript
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile navigation ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---- Active nav highlight on scroll ---- */
  const sections = document.querySelectorAll('.section[id]');
  const navAs = document.querySelectorAll('.nav-links a[href^="#"]');

  function markActive() {
    const y = window.scrollY + 120;
    let cur = '';
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
    navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }

  /* ---- Header shadow ---- */
  const header = document.querySelector('.site-header');
  function shadow() { if (header) header.classList.toggle('scrolled', window.scrollY > 50); }

  /* ---- Back-to-top ---- */
  const btt = document.querySelector('.btt');
  function toggleBtt() { if (btt) btt.classList.toggle('visible', window.scrollY > 700); }
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Unified scroll handler ---- */
  let tick = false;
  window.addEventListener('scroll', () => {
    if (!tick) {
      requestAnimationFrame(() => { markActive(); shadow(); toggleBtt(); tick = false; });
      tick = true;
    }
  }, { passive: true });
  markActive(); shadow(); toggleBtt();

  /* ---- Timeline accordion ---- */
  document.querySelectorAll('.tl-title').forEach(title => {
    title.addEventListener('click', () => {
      const item = title.closest('.tl-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.tl-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
    title.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); title.click(); }
    });
  });

  /* ---- Scroll fade-in ---- */
  const fades = document.querySelectorAll('.fade-in');
  if (fades.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    fades.forEach(el => obs.observe(el));
  } else {
    fades.forEach(el => el.classList.add('visible'));
  }

  /* ---- Smooth anchor scrolling ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); history.pushState(null, '', a.getAttribute('href')); }
    });
  });

});
