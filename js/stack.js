// ===== stack.js : bande de technologies avec logos (deux lignes qui défilent) =====
(function () {
  const ICONS = window.BRAND_ICONS || {};
  // Icônes dessinées à la main (trait) pour les technologies sans logo officiel libre
  const G = {
    db: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    bars: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
    trend: '<path d="M3 17l5-6 4 3 8-9"/><path d="M3 21h18"/>',
    tree: '<circle cx="12" cy="5" r="2"/><circle cx="12" cy="13" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M12 7v4M11 14.5l-4 3.5M13 14.5l4 3.5"/>',
    window: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>',
    office: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    nodes: '<circle cx="6" cy="7" r="2"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="12" r="2"/><path d="M8 7l8 5M8 17l8-5"/>',
    sigma: '<path d="M18 5H7l6 7-6 7h11"/>',
    uml: '<rect x="3" y="3" width="8" height="6" rx="1"/><rect x="13" y="15" width="8" height="6" rx="1"/><path d="M7 9v6h6"/>',
    mining: '<circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>'
  };

  // n = nom, i = logo (clé de ICONS) ou g = icône tracée (clé de G), note = mention
  const rows = {
    dev: [
      { n: 'Python', i: 'python' }, { n: 'Java', i: 'java' }, { n: 'JavaScript', i: 'javascript' },
      { n: 'HTML', i: 'html5' }, { n: 'CSS', i: 'css' }, { n: 'SQL', g: 'db' },
      { n: 'Django', i: 'django' }, { n: 'Django REST', g: 'code' }, { n: 'FastAPI', i: 'fastapi' },
      { n: 'React', i: 'react' }, { n: 'Tkinter', g: 'window' }, { n: 'SQLAlchemy', i: 'sqlalchemy' },
      { n: 'JWT', i: 'jwt' }, { n: 'Leaflet', i: 'leaflet' }
    ],
    data: [
      { n: 'PostgreSQL', i: 'postgresql' }, { n: 'SQL Server', g: 'db' }, { n: 'SQLite', i: 'sqlite' },
      { n: 'pandas', i: 'pandas' }, { n: 'scikit-learn', i: 'scikitlearn' },
      { n: 'Prophet', g: 'trend' },
      { n: 'XGBoost', g: 'tree' }, { n: 'Apprentissage automatique', g: 'nodes' }, { n: 'Fouille de données', g: 'mining' },
      { n: 'Statistiques', g: 'sigma' }, { n: 'Merise / UML', g: 'uml' }, { n: 'Docker', i: 'docker' },
      { n: 'Git', i: 'git' }, { n: 'GitHub', i: 'github' },
      { n: 'Power BI', g: 'bars', note: 'notions' }, { n: 'KNIME', i: 'knime', note: 'notions' },
      { n: 'Word · Excel · PowerPoint', g: 'office' }
    ]
  };

  const NS = 'http://www.w3.org/2000/svg';
  function luminance(hex) {
    const v = [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16) / 255);
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function creer(t) {
    const d = document.createElement('div');
    d.className = 'tech';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    if (t.i && ICONS[t.i]) {
      svg.innerHTML = '<path d="' + ICONS[t.i].p + '"/>';
      d.style.setProperty('--c', luminance(ICONS[t.i].h) < 0.22 ? '#e8edf3' : ICONS[t.i].h);
    } else {
      svg.setAttribute('class', 'glyph');
      svg.innerHTML = G[t.g] || G.code;
    }
    const nom = document.createElement('span');
    nom.textContent = t.n;
    d.append(svg, nom);
    if (t.note) { const n = document.createElement('em'); n.textContent = t.note; d.appendChild(n); }
    return d;
  }

  document.querySelectorAll('.marquee').forEach((m) => {
    const track = m.querySelector('.marquee-track');
    const liste = rows[m.dataset.row] || [];
    liste.forEach((t) => track.appendChild(creer(t)));
    // Deuxième exemplaire, masqué aux lecteurs d'écran, pour que la boucle soit continue
    const copie = document.createElement('div');
    copie.className = 'marquee-copy';
    copie.setAttribute('aria-hidden', 'true');
    liste.forEach((t) => { const e = creer(t); copie.appendChild(e); });
    track.appendChild(copie);
    const durée = Math.max(30, liste.length * 3.2);
    m.style.setProperty('--dur', durée + 's');
  });
})();
