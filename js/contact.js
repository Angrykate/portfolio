// ===== contact.js : conversation WhatsApp animée =====
(function () {
  const NUM = '22892079376';
  const corps = document.getElementById('chat-body');
  const puces = document.getElementById('chat-chips');
  const lien = document.getElementById('wa-link');
  const chat = document.getElementById('chat');
  if (!corps || !puces || !lien) return;

  const wa = (window.BRAND_ICONS || {}).whatsapp;
  const pathWa = document.getElementById('wa-path');
  if (wa && pathWa) pathWa.setAttribute('d', wa.p);

  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sujets = [
    { k: 'Une opportunité', t: "Bonjour Illane, je vous contacte au sujet d'une opportunité (stage, projet ou collaboration)." },
    { k: "Parler d'un projet", t: "Bonjour Illane, j'ai vu votre portfolio et j'aimerais échanger sur l'un de vos projets." },
    { k: 'Une question', t: "Bonjour Illane, j'ai une question sur votre parcours." },
    { k: 'Dire bonjour', t: "Bonjour Illane, j'ai découvert votre portfolio." }
  ];

  function bulle(texte, sortant) {
    const b = document.createElement('div');
    b.className = 'bulle ' + (sortant ? 'sortant' : 'entrant');
    b.textContent = texte;
    corps.appendChild(b);
    corps.scrollTop = corps.scrollHeight;
    return b;
  }
  function frappe() {
    const b = document.createElement('div');
    b.className = 'bulle entrant frappe';
    b.setAttribute('aria-hidden', 'true');
    b.innerHTML = '<i></i><i></i><i></i>';
    corps.appendChild(b);
    return b;
  }
  function attendre(ms) { return new Promise((r) => setTimeout(r, reduit ? 0 : ms)); }

  let choix = null, dernier = null;
  function selectionner(s, bouton) {
    choix = s;
    puces.querySelectorAll('.chip').forEach((c) => c.classList.toggle('actif', c === bouton));
    if (dernier) dernier.remove();
    dernier = bulle(s.t, true);
    lien.href = 'https://wa.me/' + NUM + '?text=' + encodeURIComponent(s.t);
    lien.textContent = 'Envoyer sur WhatsApp';
    lien.classList.add('pret');
  }

  async function demarrer() {
    await attendre(300);
    const f = frappe(); await attendre(1000); f.remove();
    bulle('Bonjour 👋 Choisissez un sujet : le message sera prêt à être envoyé sur WhatsApp.', false);
    await attendre(400);
    sujets.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = s.k;
      b.style.setProperty('--i', i);
      b.addEventListener('click', () => selectionner(s, b));
      puces.appendChild(b);
    });
    puces.classList.add('visible');
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((e) => { if (e[0].isIntersecting) { obs.disconnect(); demarrer(); } }, { threshold: 0.4 });
    obs.observe(chat);
  } else { demarrer(); }
})();
