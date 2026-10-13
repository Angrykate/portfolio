// ===== lightbox.js : agrandir une image, naviguer entre les images d'une galerie =====
(function () {
  const box = document.getElementById('lightbox');
  const img = box.querySelector('img');
  const cap = box.querySelector('figcaption');
  const prev = box.querySelector('.lb-prev');
  const next = box.querySelector('.lb-next');
  let liste = [], index = 0;

  function afficher(i) {
    index = (i + liste.length) % liste.length;
    const src = liste[index];
    img.src = src.currentSrc || src.src;
    img.alt = src.alt || '';
    cap.textContent = src.dataset.cap || src.alt || '';
    const seul = liste.length < 2;
    prev.hidden = seul; next.hidden = seul;
  }
  function ouvrir(el) {
    const galerie = el.closest('.gallery');
    liste = [...galerie.querySelectorAll('img')];
    box.hidden = false;
    afficher(liste.indexOf(el));
    box.querySelector('.lb-close').focus();
  }
  function fermer() { box.hidden = true; img.src = ''; }

  document.addEventListener('click', (e) => {
    const cible = e.target.closest('.gallery img');
    if (cible) ouvrir(cible);
  });
  prev.addEventListener('click', () => afficher(index - 1));
  next.addEventListener('click', () => afficher(index + 1));
  box.querySelector('.lb-close').addEventListener('click', fermer);
  box.addEventListener('click', (e) => { if (e.target === box) fermer(); });
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') { fermer(); e.stopPropagation(); }
    else if (e.key === 'ArrowLeft') afficher(index - 1);
    else if (e.key === 'ArrowRight') afficher(index + 1);
  });
})();
