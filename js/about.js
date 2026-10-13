// ===== about.js : carte de code qui s'écrit toute seule =====
(function () {
  const carte = document.getElementById('code-card');
  const code = document.getElementById('code-text');
  if (!carte || !code) return;
  const source = code.textContent;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function colorer(texte) {
    const propre = texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return propre.replace(/("[^"]*")|(\bdef\b|\breturn\b)|(\b\d+\b)|(#.*)/g, (m, s, k, n, c) => {
      if (s) return '<span class="tk-s">' + s + '</span>';
      if (k) return '<span class="tk-k">' + k + '</span>';
      if (n) return '<span class="tk-n">' + n + '</span>';
      return '<span class="tk-c">' + c + '</span>';
    }).replace(/(<span class="tk-k">def<\/span> )(\w+)/, '$1<span class="tk-f">$2</span>');
  }
  code.innerHTML = colorer(source);
  if (reduit || !('IntersectionObserver' in window)) return;

  const pre = code.parentElement;
  pre.style.minHeight = pre.offsetHeight + 'px';     // la carte garde sa taille pendant l'écriture
  code.innerHTML = '<span class="caret-code"></span>';

  function ecrire() {
    let i = 0;
    const t = setInterval(() => {
      i = Math.min(i + 2, source.length);
      code.innerHTML = colorer(source.slice(0, i)) + '<span class="caret-code"></span>';
      if (i >= source.length) { clearInterval(t); setTimeout(() => { const c = code.querySelector('.caret-code'); if (c) c.remove(); }, 1800); }
    }, 22);
  }
  const obs = new IntersectionObserver((e) => { if (e[0].isIntersecting) { obs.disconnect(); setTimeout(ecrire, 500); } }, { threshold: 0.35 });
  obs.observe(carte);
})();
