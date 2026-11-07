/* ==========================================================
   CARROUSEL INFINI – technologies et outils du parcours
   À charger APRÈS main.js
   Pour ajouter une technologie : une ligne dans TECHNOLOGIES.
   ========================================================== */
(function () {
  const ICONS = 'images/icones/';

  const TECHNOLOGIES = [
    { name: 'HTML5',      icon: 'devicon-html5.svg' },
    { name: 'CSS3',       icon: 'devicon-css3.svg' },
    { name: 'JavaScript', icon: 'devicon-javascript.svg' },
    { name: 'Git',        icon: 'devicon-git.svg' },
    { name: 'GitHub',     icon: 'devicon-github.svg' },
    { name: 'Figma',      icon: 'devicon-figma.svg' },
    { name: 'Vercel',     icon: 'vercel.svg' }
    // Pour ajouter une technologie : une ligne ici (avec une virgule sur la ligne d'avant)
  ];

  // Le carrousel s'insère sur l'accueil, juste avant la section « Portfolio »
  const anchor = document.querySelector('#page-accueil .home-portfolio');
  if (!anchor) return;

  const item = (tech, hidden) =>
    `<li class="marquee__item"${hidden ? ' aria-hidden="true"' : ''}>` +
    `<img src="${ICONS}${tech.icon}" alt="" width="40" height="40"><span>${tech.name}</span></li>`;

  const real = TECHNOLOGIES.map((t) => item(t, false)).join('');
  const copies = TECHNOLOGIES.map((t) => item(t, true)).join('');

  const section = document.createElement('section');
  section.className = 'tech-marquee';
  section.setAttribute('aria-label', 'Technologies et outils présents dans le parcours');
  section.innerHTML =
    '<div class="container"><h2 class="tech-marquee__title">Technologies et outils présents dans mon parcours</h2></div>' +
    '<div class="marquee"><div class="marquee__track">' +
    // Chaque groupe répète la liste, et le 2e groupe est un clone : boucle sans coupure
    `<ul class="marquee__group">${real}${copies}</ul>` +
    `<ul class="marquee__group" aria-hidden="true">${real}${copies}</ul>` +
    '</div></div>';

  anchor.parentNode.insertBefore(section, anchor);
})();
