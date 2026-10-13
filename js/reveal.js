// ===== reveal.js : apparition au défilement =====
(function () {
  const items = document.querySelectorAll('.reveal, .stagger');
  if (!('IntersectionObserver' in window)) return;      // vieux navigateur : tout reste visible
  document.documentElement.classList.add('anim');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);                         // une seule fois
      }
    });
  }, { threshold: 0.15 });

  // Délai d'apparition de chaque enfant d'un groupe .stagger
  document.querySelectorAll('.stagger').forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty('--i', i)));

  items.forEach((el) => obs.observe(el));
  // Les cartes projets sont ajoutées après coup par projects.js
  window.observeReveal = (el) => obs.observe(el);
})();
