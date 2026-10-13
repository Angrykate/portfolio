// ===== strip.js : projets en bande horizontale (flèches, progression, glisser à la souris) =====
(function () {
  const strip = document.getElementById('projects-grid');
  if (!strip) return;
  const prev = document.querySelector('.strip-prev');
  const next = document.querySelector('.strip-next');
  const barre = document.querySelector('.strip-progress span');

  function maj() {
    const max = strip.scrollWidth - strip.clientWidth;
    const ratio = strip.clientWidth / Math.max(strip.scrollWidth, 1);
    const pos = max > 0 ? strip.scrollLeft / max : 0;
    if (barre) { barre.style.width = Math.max(ratio * 100, 12) + '%'; barre.style.marginLeft = (pos * (100 - Math.max(ratio * 100, 12))) + '%'; }
    prev.disabled = strip.scrollLeft < 8;
    next.disabled = strip.scrollLeft > max - 8;
  }
  function pas() {
    const carte = strip.querySelector('.carte-projet:not([hidden])');
    return carte ? carte.getBoundingClientRect().width + 24 : 400;
  }
  prev.addEventListener('click', () => strip.scrollBy({ left: -pas(), behavior: 'smooth' }));
  next.addEventListener('click', () => strip.scrollBy({ left: pas(), behavior: 'smooth' }));
  strip.addEventListener('scroll', maj, { passive: true });
  window.addEventListener('resize', maj);

  // Après un changement de filtre : retour au début
  document.querySelectorAll('.filters .chip').forEach((c) => c.addEventListener('click', () => {
    setTimeout(() => { strip.scrollTo({ left: 0 }); maj(); }, 30);
  }));

  // Glisser à la souris (le doigt, lui, utilise le défilement natif)
  let appuye = false, bouge = false, x0 = 0, s0 = 0;
  strip.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    appuye = true; bouge = false; x0 = e.clientX; s0 = strip.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!appuye) return;
    const dx = e.clientX - x0;
    if (!bouge && Math.abs(dx) > 6) { bouge = true; strip.classList.add('dragging'); document.documentElement.classList.add('cursor-down'); }
    if (bouge) strip.scrollLeft = s0 - dx;
  });
  function relacher() {
    if (!appuye) return;
    appuye = false;
    strip.classList.remove('dragging');
    document.documentElement.classList.remove('cursor-down');
  }
  window.addEventListener('pointerup', relacher);
  window.addEventListener('pointercancel', relacher);
  // Un glisser ne doit pas ouvrir la fiche du projet
  strip.addEventListener('click', (e) => { if (bouge) { e.stopPropagation(); e.preventDefault(); bouge = false; } }, true);

  maj();
})();
