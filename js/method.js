// ===== method.js : les trois réflexes (courbes, découpage, barres, chiffres qui montent) =====
(function () {
  const grille = document.querySelector('.reflex-grid');
  if (!grille) return;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nombres = grille.querySelectorAll('.num');

  function format(v, dec, suffixe) { return v.toFixed(dec).replace('.', ',') + (suffixe || ''); }
  function monter(el) {
    const cible = parseFloat(el.dataset.to), dec = Number(el.dataset.dec) || 0, suf = el.dataset.suffix || '';
    const debut = performance.now(), duree = 1600;
    (function tick(t) {
      const p = Math.min((t - debut) / duree, 1);
      el.textContent = format(cible * (1 - Math.pow(1 - p, 3)), dec, suf);
      if (p < 1) requestAnimationFrame(tick);
    })(debut);
  }

  if (reduit || !('IntersectionObserver' in window)) { grille.classList.add('go'); return; }
  nombres.forEach((n) => { n.textContent = format(0, Number(n.dataset.dec) || 0, n.dataset.suffix); });
  const obs = new IntersectionObserver((e) => {
    if (!e[0].isIntersecting) return;
    obs.disconnect();
    grille.classList.add('go');
    setTimeout(() => nombres.forEach(monter), 500);
  }, { threshold: 0.3 });
  obs.observe(grille);
})();
