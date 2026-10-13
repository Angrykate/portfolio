// ===== projects.js : données des 5 projets, cartes, filtres et fenêtre de détail =====
// Textes basés uniquement sur des faits vérifiés (cahier des charges, chapitre 3).
// cats : 'ia' (IA & données), 'bdd' (bases de données), 'app' (applications)
const P = 'images/projets/';
const projects = [
  {
    id: 'petrostock', titre: 'PetroStock SA', cats: ['ia', 'app'], equipe: 'Équipe',
    court: "Application de gestion intelligente des stocks d'une entreprise pétrolière, sur données simulées.",
    long: "Projet d'équipe : une API FastAPI, une interface React et quatre modèles d'IA (prévision de la demande avec Prophet, prévision des ruptures avec XGBoost, détection d'anomalies, classification d'incidents). Sur deux années de test, Prophet atteint une erreur moyenne de 15,44 % (MAPE) contre 68,90 % pour un modèle ARIMA de référence ; pour les ruptures, XGBoost obtient une erreur moyenne de 0,66 jour. La détection d'anomalies est présentée comme une comparaison de méthodes (Isolation Forest et Z-score), dont les scores restent faibles.",
    role: "Conception et entraînement de quatre modèles d'IA (prévision de la demande, prévision des ruptures, détection d'anomalies, classification d'incidents) et intégration à l'application (API et interface).",
    appris: "Relier un modèle entraîné à une application utilisable, et interpréter honnêtement des résultats faibles.",
    techs: ['FastAPI', 'React', 'SQLAlchemy', 'PostgreSQL', 'Prophet', 'XGBoost'],
    liens: [
      { label: 'Démonstration en ligne', url: 'https://petrostock-sa.vercel.app/' },
      { label: 'Dépôt GitHub', url: 'https://github.com/Angrykate/petrostock-sa' }
    ],
    note: 'Les données de ce projet sont simulées.',
    images: [
      { src: P + 'petrostock/petrostock-dashboard.webp', alt: 'Tableau de bord de PetroStock : stock total, alertes, évolution des stocks sur 30 jours', cap: 'Tableau de bord (données simulées).' },
      { src: P + 'petrostock/petrostock-comparaison.webp', alt: 'Courbes comparant les prévisions Prophet et ARIMA aux sorties réelles', cap: 'Prophet et ARIMA face aux sorties réelles, sur 90 jours de test.' }
    ]
  },
  {
    id: 'togomoney', titre: 'TogoMoney', cats: ['bdd'], equipe: 'Binôme',
    court: "Base de données d'un service de monnaie mobile, pensée pour la sécurité et l'audit.",
    long: "Conception en binôme d'une base SQL Server en troisième forme normale (11 tables), avec contrôle d'accès par rôles (5 rôles), 13 vues sécurisées, 10 déclencheurs, 9 procédures stockées transactionnelles (ACID, gestion d'erreurs et annulation) et un journal d'audit non modifiable. Un tableau de bord de supervision et des graphiques Power BI complètent le système, décrit dans un rapport de 23 pages.",
    role: "Conception et réalisation en binôme.",
    appris: "La rigueur transactionnelle (ACID) et la sécurité au niveau de la base de données.",
    techs: ['SQL Server', 'Power BI', 'Docker'],
    liens: [], note: '',
    images: [
      { src: P + 'togomoney/togomoney-dashboard.webp', alt: 'Tableau de bord de supervision de TogoMoney', cap: 'Tableau de bord de supervision.' },
      { src: P + 'togomoney/togomoney-audit.webp', alt: "Journal d'audit de TogoMoney", cap: "Journal d'audit, consultable en lecture seule." },
      { src: P + 'togomoney/togomoney-schema.webp', alt: 'Schéma de la base de données de TogoMoney', cap: 'Modèle de données.' },
      { src: P + 'togomoney/togomoney-powerbi.webp', alt: "Répartition des transactions par type d'opération (Power BI)", cap: "Répartition des transactions par type d'opération (Power BI)." },
      { src: P + 'togomoney/togomoney-docker.webp', alt: "Conteneurs Docker de l'architecture en trois tiers", cap: "Conteneurs Docker de l'architecture en trois tiers." }
    ]
  },
  {
    id: 'textmining', titre: 'TextMining — lexique Sara', cats: ['ia'], equipe: 'Seul',
    court: "Extraction et analyse d'un lexique de langues sara à partir d'un PDF.",
    long: "Projet individuel en Python : extraction du texte d'un PDF dont l'encodage de police était corrompu (correspondance manuelle de 35 caractères), structuration de 2 037 termes (1 023 en français, 1 014 en anglais) et de 22 241 paires de traduction sur 14 dialectes, puis mesure de la couverture de la traduction dialecte par dialecte. Un mot sara fait en moyenne environ 4 caractères contre environ 10 en français. Des classifieurs ont aussi été comparés sur un corpus d'articles de presse BBC (régression logistique : 98,2 %) ; ce score ne concerne pas le lexique Sara.",
    role: "Projet réalisé seul, de l'extraction des données à l'analyse.",
    appris: "Le nettoyage de données difficiles et la comparaison rigoureuse de modèles.",
    techs: ['Python', 'pdfplumber', 'pandas', 'scikit-learn', 'nltk', 'matplotlib'],
    liens: [],
    note: 'Dépôt privé. Lexique source : Keegan / SIL (2014), non redistribuable ; ni le code ni les données ne sont diffusés.',
    images: [
      { src: P + 'textmining/textmining-couverture.webp', alt: 'Diagramme en barres de la couverture par dialecte, en français et en anglais', cap: 'Couverture de la traduction par dialecte (français et anglais).' },
      { src: P + 'textmining/textmining-heatmap.webp', alt: 'Carte de chaleur de la couverture de 80 termes français selon les dialectes', cap: 'Couverture terme par terme sur 80 termes français.' }
    ]
  },
  {
    id: 'halieutique', titre: 'Plateforme halieutique', cats: ['ia', 'app'], equipe: 'Équipe',
    court: "Plateforme de gestion de la chaîne d'approvisionnement des produits de la mer.",
    long: "Application Django et Django REST Framework (démonstration « Ferme Mokpokpo ») avec quatre rôles (administrateur, gestionnaire, logistique, ventes), 27 produits, 3 entrepôts (Lomé Port, Kara, Sokodé), suivi GPS sur carte, alertes de stock et d'IA, et prévisions à 30 jours avec Prophet. Une interface en JavaScript natif (25 pages) propose aussi un mode démonstration hors ligne.",
    role: "Développement de la partie IA (prévisions Prophet), intégration de l'ensemble de la plateforme et mise au point.",
    appris: "Intégrer une partie IA dans une plateforme complète.",
    techs: ['Django', 'DRF', 'JWT', 'Prophet', 'Leaflet', 'JavaScript'],
    liens: [{ label: 'Dépôt GitHub', url: 'https://github.com/Angrykate/plateforme-gestion-halieutique' }],
    note: '',
    images: [
      { src: P + 'halieutique/halieutique-dashboard.webp', alt: 'Tableau de bord de la plateforme halieutique', cap: 'Tableau de bord (mode démonstration).' },
      { src: P + 'halieutique/halieutique-catalogue.webp', alt: 'Catalogue de produits de la mer avec état de fraîcheur et de stock', cap: 'Catalogue des produits avec état de fraîcheur et de stock.' },
      { src: P + 'halieutique/halieutique-previsions.webp', alt: "Fiche de prévision d'un produit : score de priorité, rupture estimée, prévisions à 7 jours", cap: 'Prévisions IA : score de priorité, rupture estimée, prévisions à 7 jours.' },
      { src: P + 'halieutique/halieutique-connexion.webp', alt: 'Écran de connexion avec mode démonstration et accès rapide par rôle', cap: 'Connexion, mode démonstration et accès rapide par rôle.' }
    ]
  },
  {
    id: 'gestion-magasin', titre: 'Gestion de magasin', cats: ['bdd', 'app'], equipe: 'Équipe',
    court: "Application de bureau de gestion des ventes, des stocks et des achats.",
    long: "Projet d'équipe en Python (Tkinter) et PostgreSQL : 12 écrans (connexion, tableau de bord, produits, ventes, commandes, stock, fournisseurs, rapports, reçus…), 4 rôles (administrateur, caissier, gestionnaire de stock, responsable des achats), une base de 11 tables, 6 déclencheurs et 17 vues SQL. Une documentation d'utilisation de 6 pages accompagne l'application.",
    role: "Conception en équipe ; développement de l'application Tkinter et mise en place de la base PostgreSQL à partir des scripts SQL de l'équipe, vérifiés et adaptés.",
    appris: "Brancher une interface à une base relationnelle et vérifier des scripts SQL.",
    techs: ['Python', 'Tkinter', 'PostgreSQL', 'pgAdmin', 'Git'],
    liens: [
      { label: 'Dépôt GitHub', url: 'https://github.com/Angrykate/gestion-magasin' },
      { label: 'Documentation (PDF)', url: 'assets/Documentation_Gestion_Magasin.pdf' }
    ],
    note: '',
    images: [
      { src: P + 'gestion-magasin/magasin-dashboard.webp', alt: "Tableau de bord administrateur de l'application de gestion de magasin", cap: 'Tableau de bord administrateur.' },
      { src: P + 'gestion-magasin/magasin-ventes.webp', alt: 'Écran de vente avec panier et récapitulatif', cap: 'Écran de vente : panier et récapitulatif.' },
      { src: P + 'gestion-magasin/magasin-stock.webp', alt: "État du stock avec alertes et historique des mouvements", cap: 'État du stock, alertes et historique des mouvements.' },
      { src: P + 'gestion-magasin/magasin-commande.webp', alt: "Création d'une commande d'achat auprès d'un fournisseur", cap: "Création d'une commande d'achat." },
      { src: P + 'gestion-magasin/magasin-recus.webp', alt: 'Liste et détail des reçus de vente', cap: 'Reçus de vente.' }
    ]
  }
];

(function () {
  const grille = document.getElementById('projects-grid');
  const modal = document.getElementById('modal');
  const contenu = document.getElementById('modal-content');
  let declencheur = null;

  function el(tag, classe, texte) {
    const n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texte) n.textContent = texte;
    return n;
  }

  // --- Cartes ---
  projects.forEach((p, i) => {
    const carte = el('button', 'carte-projet reveal');
    carte.type = 'button';
    carte.dataset.cats = p.cats.join(' ');
    carte.setAttribute('aria-label', 'Voir le projet ' + p.titre);

    const visuel = el('div', 'carte-visuel');
    if (p.images.length) {
      const img = document.createElement('img');
      img.src = p.images[0].src; img.alt = ''; img.loading = 'lazy';
      visuel.appendChild(img);
    } else { visuel.textContent = p.titre; }
    visuel.appendChild(el('span', 'carte-num', String(i + 1).padStart(2, '0')));

    const corps = el('div', 'carte-corps');
    corps.append(el('span', 'badge-equipe', p.equipe), el('h3', '', p.titre), el('p', '', p.court));
    const tags = el('ul', 'tags');
    p.techs.slice(0, 4).forEach((t) => tags.appendChild(el('li', '', t)));
    corps.appendChild(tags);
    corps.appendChild(el('span', 'carte-plus', 'Voir le détail →'));

    carte.append(visuel, corps);
    carte.addEventListener('click', () => ouvrir(p, carte));
    // Effet de lumière qui suit la souris
    carte.addEventListener('pointermove', (e) => {
      const r = carte.getBoundingClientRect();
      carte.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      carte.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    grille.appendChild(carte);
    if (window.observeReveal) window.observeReveal(carte);
  });

  // --- Filtres ---
  document.querySelectorAll('.filters .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filters .chip').forEach((c) => c.classList.toggle('actif', c === chip));
      const f = chip.dataset.filter;
      grille.querySelectorAll('.carte-projet').forEach((c) => {
        c.hidden = !(f === 'all' || c.dataset.cats.split(' ').includes(f));
      });
    });
  });

  // --- Modale ---
  function ouvrir(p, source) {
    declencheur = source;
    contenu.textContent = '';
    const titre = el('h3', '', p.titre); titre.id = 'modal-title';
    contenu.append(titre, el('span', 'badge-equipe', p.equipe));

    const bloc = (h, t) => { contenu.append(el('h4', '', h), el('p', '', t)); };
    bloc('Présentation', p.long);
    bloc('Mon rôle', p.role);
    bloc("Ce que j'ai appris", p.appris);

    contenu.appendChild(el('h4', '', 'Technologies'));
    const tags = el('ul', 'tags');
    p.techs.forEach((t) => tags.appendChild(el('li', '', t)));
    contenu.appendChild(tags);

    if (p.note) contenu.appendChild(el('p', 'note', p.note));

    if (p.images.length) {
      contenu.appendChild(el('h4', '', 'Aperçus'));
      const g = el('div', 'gallery');
      p.images.forEach((im) => {
        const fig = el('figure');
        const img = document.createElement('img');
        img.src = im.src; img.alt = im.alt; img.loading = 'lazy';
        img.dataset.cap = im.cap || '';
        fig.append(img, el('figcaption', '', im.cap || ''));
        g.appendChild(fig);
      });
      contenu.appendChild(g);
    }

    if (p.liens.length) {
      const l = el('div', 'liens');
      p.liens.forEach((x, k) => {
        const a = el('a', k === 0 ? 'btn' : 'btn btn-outline', x.label);
        a.href = x.url;
        if (/^https?:/.test(x.url)) { a.target = '_blank'; a.rel = 'noopener'; }
        l.appendChild(a);
      });
      contenu.appendChild(l);
    }

    modal.hidden = false;
    modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  }

  function fermer() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (declencheur) declencheur.focus();
  }

  modal.querySelector('.modal-close').addEventListener('click', fermer);
  modal.addEventListener('click', (e) => { if (e.target === modal) fermer(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden && document.getElementById('lightbox').hidden) fermer();
  });
})();
