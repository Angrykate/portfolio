// ===== fx.js : inclinaison des cartes, boutons aimantés, copier, logo GitHub, signature =====
(function () {
  const fin = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Logo GitHub
  const gh = document.getElementById('gh-path');
  if (gh && window.BRAND_ICONS && BRAND_ICONS.github) gh.setAttribute('d', BRAND_ICONS.github.p);

  // Bouton « Copier »
  document.querySelectorAll('.copy').forEach((b) => {
    b.addEventListener('click', async () => {
      const texte = b.dataset.copy;
      try { await navigator.clipboard.writeText(texte); }
      catch (e) {
        const t = document.createElement('textarea'); t.value = texte; document.body.appendChild(t);
        t.select(); try { document.execCommand('copy'); } catch (err) { /* rien */ } t.remove();
      }
      const avant = b.textContent;
      b.textContent = 'Copié ✓'; b.classList.add('ok');
      setTimeout(() => { b.textContent = avant; b.classList.remove('ok'); }, 1800);
    });
  });

  // Signature géante : une lettre à la fois
  const sig = document.querySelector('.signature');
  if (sig) {
    const mot = sig.textContent.trim();
    sig.textContent = '';
    [...mot].forEach((c, k) => { const s = document.createElement('span'); s.className = 'sig-l'; s.textContent = c; s.style.setProperty('--k', k); sig.appendChild(s); });
    if ('IntersectionObserver' in window && !reduit) {
      const o = new IntersectionObserver((e) => { if (e[0].isIntersecting) { sig.classList.add('in'); o.disconnect(); } }, { threshold: 0.3 });
      o.observe(sig);
    } else sig.classList.add('in');
  }

  if (!fin || reduit) return;

  // Inclinaison 3D + reflet
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('pointerenter', () => { el.style.transition = 'transform .15s ease-out, opacity .3s, border-color .3s'; el.style.transitionDelay = '0s'; });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = 'perspective(900px) rotateX(' + ((0.5 - y) * 7).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 9).toFixed(2) + 'deg) translateZ(0)';
      el.style.setProperty('--sx', (x * 100) + '%'); el.style.setProperty('--sy', (y * 100) + '%');
    });
    el.addEventListener('pointerleave', () => { el.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1), opacity .3s, border-color .3s'; el.style.transform = ''; });
  });

  // Boutons aimantés
  const aimants = [...document.querySelectorAll('[data-magnetic]')];
  let attente = false, sx = 0, sy = 0;
  aimants.forEach((a) => { a.style.willChange = 'transform'; });
  window.addEventListener('pointermove', (e) => {
    sx = e.clientX; sy = e.clientY;
    if (attente) return;
    attente = true;
    requestAnimationFrame(() => {
      attente = false;
      aimants.forEach((a) => {
        const r = a.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = sx - cx, dy = sy - cy;
        const proche = Math.abs(dx) < r.width / 2 + 24 && Math.abs(dy) < r.height / 2 + 24;
        a.style.transition = proche ? 'transform .25s ease-out' : 'transform .5s cubic-bezier(.2,.8,.2,1)';
        a.style.transitionDelay = '0s';
        a.style.transform = proche ? 'translate(' + Math.max(-7, Math.min(7, dx * 0.08)).toFixed(1) + 'px,' + Math.max(-5, Math.min(5, dy * 0.1)).toFixed(1) + 'px)' : '';
      });
    });
  }, { passive: true });
})();


// Courbe de prévision : le point parcourt la courbe pendant le scroll
(function () {
  const box = document.querySelector('.forecast'); if (!box) return;
  const hist = box.querySelector('.fc-hist'), pred = box.querySelector('#fc-pred'), dot = box.querySelector('#fc-dot'), band = box.querySelector('.fc-band');
  const L1 = hist.getTotalLength(), L2 = pred.getTotalLength();
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function maj() {
    const r = box.getBoundingClientRect(), vh = innerHeight;
    let p = reduit ? 1 : Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.6)));
    const a = Math.min(1, p / 0.6), b = Math.max(0, (p - 0.6) / 0.4);
    hist.style.strokeDasharray = L1; hist.style.strokeDashoffset = L1 * (1 - a);
    pred.style.strokeDasharray = L2; pred.style.strokeDashoffset = L2 * (1 - b);
    band.style.opacity = b > 0.95 ? 0.18 : 0;
    const pt = b > 0 ? pred.getPointAtLength(L2 * b) : hist.getPointAtLength(L1 * a);
    dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
  }
  addEventListener('scroll', maj, { passive: true }); addEventListener('resize', maj); maj();
})();
