// ===== main.js : progression, parallaxe, texte tapé, menu, thème, section active =====
(function () {
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Barre de progression + parallaxe de l'accueil ---
  const barre = document.getElementById('progress');
  const fond = document.querySelector('.hero-bg');
  let attente = false;
  function maj() {
    attente = false;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    if (barre) barre.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    if (fond && !reduit && y < 900) fond.style.setProperty('--py', (y * 0.25) + 'px');
  }
  window.addEventListener('scroll', () => { if (!attente) { attente = true; requestAnimationFrame(maj); } }, { passive: true });
  maj();

  // --- Texte tapé (accueil) ---
  const cible = document.getElementById('typed');
  const phrases = ['bases de données', 'modèles de prévision', 'interfaces claires'];
  if (cible && !reduit) {
    let p = 0, c = 0, suppr = false;
    (function boucle() {
      const mot = phrases[p];
      c += suppr ? -1 : 1;
      cible.textContent = mot.slice(0, c);
      let delai = suppr ? 35 : 70;
      if (!suppr && c === mot.length) { suppr = true; delai = 1600; }
      else if (suppr && c === 0) { suppr = false; p = (p + 1) % phrases.length; delai = 350; }
      setTimeout(boucle, delai);
    })();
  }

  // --- Menu mobile ---
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const ouvert = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', ouvert);
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // --- Thème clair / sombre ---
  const btnTheme = document.querySelector('.theme-toggle');
  if (btnTheme) btnTheme.addEventListener('click', () => {
    const racine = document.documentElement;
    const suivant = racine.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    racine.setAttribute('data-theme', suivant);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = suivant === 'light' ? '#f6f7f9' : '#0a121c';
    try { localStorage.setItem('theme', suivant); } catch (e) { /* stockage indisponible : sans conséquence */ }
  });

  // --- Section active dans le menu ---
  const liens = document.querySelectorAll('.site-header nav a[href^="#"]');
  const sections = [...liens].map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) liens.forEach((l) => l.classList.toggle('actif', l.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => obs.observe(s));
  }

  // --- Photo de secours ---
  const photo = document.querySelector('.hero-photo img');
  if (photo) {
    const masquer = () => { photo.closest('.hero-photo').style.display = 'none'; };
    photo.addEventListener('error', masquer);
    if (photo.complete && photo.naturalWidth === 0) masquer();
  }
})();
