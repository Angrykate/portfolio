// ===== words.js : les titres h2 apparaissent mot par mot =====
(function () {
  if (!('IntersectionObserver' in window)) return;
  document.querySelectorAll('.section h2').forEach((h) => {
    const original = h.textContent.trim();
    let k = 0;
    const frag = document.createDocumentFragment();
    function mot(texte, classe) {
      const w = document.createElement('span'); w.className = 'w';
      const i = document.createElement('span');
      i.textContent = texte; if (classe) i.className = classe;
      i.style.setProperty('--k', k++);
      w.appendChild(i);
      return w;
    }
    function decouper(texte, classe) {
      texte.split(/(\s+)/).forEach((t) => {
        if (!t) return;
        if (/^\s+$/.test(t)) frag.appendChild(document.createTextNode(' '));
        else frag.appendChild(mot(t, classe));
      });
    }
    h.childNodes.forEach((n) => {
      if (n.nodeType === 3) decouper(n.textContent, '');
      else if (n.nodeName === 'EM') decouper(n.textContent, 'grad-text it');
    });
    h.textContent = '';
    h.appendChild(frag);
    h.classList.add('splitw');
    h.setAttribute('aria-label', original);
  });
})();
