// ===== cursor.js : rond qui suit la souris (ordinateur seulement) =====
(function () {
  const fin = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fin || reduit) return;                       // téléphone, tablette ou animations réduites : rien

  const racine = document.documentElement;
  const point = document.createElement('div'); point.className = 'cursor-dot';
  const anneau = document.createElement('div'); anneau.className = 'cursor-ring';
  const rond = document.createElement('i'); anneau.appendChild(rond);
  document.body.append(point, anneau);
  racine.classList.add('has-cursor');

  let x = -100, y = -100, ax = -100, ay = -100;
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    racine.classList.add('cursor-on');
    point.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  }, { passive: true });
  document.addEventListener('mouseleave', () => racine.classList.remove('cursor-on'));
  document.addEventListener('mouseenter', () => racine.classList.add('cursor-on'));
  window.addEventListener('pointerdown', () => racine.classList.add('cursor-down'));
  window.addEventListener('pointerup', () => { if (!document.querySelector('.projects-grid.dragging')) racine.classList.remove('cursor-down'); });

  // L'anneau rattrape le point avec un léger retard
  (function boucle() {
    ax += (x - ax) * 0.38; ay += (y - ay) * 0.38;
    anneau.style.transform = 'translate3d(' + ax + 'px,' + ay + 'px,0)';
    requestAnimationFrame(boucle);
  })();

  // Réaction selon l'élément survolé
  const cibles = 'a, button, .carte-projet, .gallery img, .chip, .lightbox';
  document.addEventListener('mouseover', (e) => {
    const c = e.target.closest(cibles);
    racine.classList.toggle('cursor-hover', !!c);
    let texte = '';
    if (c) {
      if (c.classList.contains('carte-projet')) texte = 'Voir';
      else if (c.matches('.gallery img')) texte = 'Zoom';
    }
    rond.textContent = texte;
    racine.classList.toggle('cursor-label', !!texte);
  });
  // Pendant un glisser dans la bande de projets
  const bande = document.getElementById('projects-grid');
  if (bande) {
    new MutationObserver(() => {
      if (bande.classList.contains('dragging')) { rond.textContent = 'Glisser'; racine.classList.add('cursor-label'); }
    }).observe(bande, { attributes: true, attributeFilter: ['class'] });
  }
})();
