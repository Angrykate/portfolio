// ===== counters.js : compteurs animés =====
(function () {
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compteurs = document.querySelectorAll('.stat-number');

  function animer(el) {
    const cible = Number(el.dataset.target) || 0;
    if (reduit) { el.textContent = cible; return; }
    const duree = 1200, debut = performance.now();
    function tick(t) {
      const p = Math.min((t - debut) / duree, 1);
      el.textContent = Math.round(cible * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) { compteurs.forEach((c) => { c.textContent = c.dataset.target; }); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animer(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  compteurs.forEach((c) => obs.observe(c));
})();
