// 5. TYPED ROLE TEXT
// ============================================================
const roles = ['Développeur Web en Formation', 'Intégrateur HTML/CSS', "Créateur d'interfaces modernes"];
let ri = 0, ci = 0, isDeleting = false;
const typed = document.getElementById('typedRole');

function typeEffect() {
  if (!typed) return;
  const current = roles[ri];
  if (isDeleting) {
    typed.textContent = current.substring(0, ci--);
  } else {
    typed.textContent = current.substring(0, ci++);
  }
  let delay = isDeleting ? 50 : 100;
  if (!isDeleting && ci === current.length + 1) {
    delay = 1800; isDeleting = true;
  } else if (isDeleting && ci === 0) {
    isDeleting = false; ri = (ri + 1) % roles.length; delay = 300;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

// ============================================================

/* ==========================================================
   CARROUSEL INFINI – technologies maîtrisées
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
  section.setAttribute('aria-label', 'Technologies que je maîtrise');
  section.innerHTML =
    '<div class="container"><h2 class="tech-marquee__title">Les technologies que je maîtrise</h2></div>' +
    '<div class="marquee"><div class="marquee__track">' +
    // Chaque groupe répète la liste, et le 2e groupe est un clone : boucle sans coupure
    `<ul class="marquee__group">${real}${copies}</ul>` +
    `<ul class="marquee__group" aria-hidden="true">${real}${copies}</ul>` +
    '</div></div>';

  anchor.parentNode.insertBefore(section, anchor);
})();
