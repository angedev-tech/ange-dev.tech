const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
let themeToggle = document.createElement('button');
const isHomePage = document.body.dataset.page === 'accueil';
const pagePrefix = isHomePage ? 'html/' : '';
const homeHref = isHomePage ? 'index.html' : '../index.html';
const logoHref = isHomePage ? 'images/logos/logo-angelo.jpg' : '../images/logos/logo-angelo.jpg';
const projectRequestHref = `${pagePrefix}demander-projet.html`;
const navigationItems = [
  { label: 'Accueil', href: homeHref, page: 'accueil', icon: 'fa-house' },
  { label: 'Produits', href: `${pagePrefix}portfolio.html`, page: 'portfolio', icon: 'fa-cube' },
  { label: 'Services', href: `${pagePrefix}services.html`, page: 'services', icon: 'fa-gear' },
  { label: 'À propos', href: `${pagePrefix}a-propos.html`, page: 'apropos', icon: 'fa-user' },
  { label: 'Galerie', href: `${pagePrefix}certification.html`, page: 'certification', icon: 'fa-image' },
  { label: 'Contact', href: `${pagePrefix}contact.html`, page: 'contact', icon: 'fa-envelope' }
];
const savedTheme = (() => {
  try {
    return localStorage.getItem('portfolio-theme');
  } catch (error) {
    console.warn('Impossible de lire la préférence de thème.', error);
    return null;
  }
})();

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Activer le thème clair' : 'Activer le thème sombre');
  themeToggle.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i><span>${isDark ? 'Mode clair' : 'Mode sombre'}</span>`;
}

setTheme(savedTheme === 'light' ? 'light' : 'dark');

if (navList) {
  const logo = document.querySelector('.nav__logo');
  if (logo) {
    logo.setAttribute('aria-label', 'Angedev.tech, accueil');
    logo.innerHTML = `<span class="brand-mark" aria-hidden="true"><img src="${logoHref}" alt=""></span><span class="brand-copy"><strong>Angedev.tech</strong><small>Développeur web front-end</small></span>`;
  }
  navList.innerHTML = navigationItems.map(({ label, href, page, icon }, index) =>
    `<li class="nav__item" style="--nav-order:${index}"><a href="${href}" class="nav__link" data-page="${page}"><i class="fa-solid ${icon}" aria-hidden="true"></i><span>${label}</span></a></li>`
  ).join('') +
    `<li class="nav__actions"><button type="button" class="theme-toggle"></button><a href="${isHomePage ? 'pdf/' : '../pdf/'}cv_koffi_angelo_edemnawo.pdf" class="nav__link nav__link--cv" target="_blank" rel="noopener"><i class="fa-solid fa-download" aria-hidden="true"></i><span>Télécharger mon CV</span></a></li>`;
  themeToggle = navList.querySelector('.theme-toggle');
  setTheme(document.documentElement.dataset.theme);
}

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('header--scrolled', window.scrollY > 60);
}, { passive: true });

if (header && window.scrollY > 60) header.classList.add('header--scrolled');

if (navToggle && navList) {
  navToggle.setAttribute('aria-controls', navList.id);
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('nav__list--open');
    navToggle.classList.toggle('nav__toggle--open');
    const isOpen = navList.classList.contains('nav__list--open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  navList.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    navList.classList.remove('nav__list--open');
    navToggle.classList.remove('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    navList.classList.remove('nav__list--open');
    navToggle.classList.remove('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
  });
}

document.querySelectorAll('.nav__link[data-page]').forEach((link) => {
  const isCurrentPage = link.dataset.page === document.body.dataset.page;
  link.classList.toggle('nav__link--active', isCurrentPage);
  if (isCurrentPage) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
});

if (navList && themeToggle) {
  themeToggle.type = 'button';
  themeToggle.className = 'theme-toggle';
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (error) {
      console.warn('Impossible d’enregistrer la préférence de thème.', error);
    }
  });
}

const footer = document.querySelector('.footer');
if (footer) {
  const footerLinks = [
    { label: 'Accueil', href: homeHref },
    { label: 'Produits', href: `${pagePrefix}portfolio.html` },
    { label: 'Services', href: `${pagePrefix}services.html` },
    { label: 'À propos', href: `${pagePrefix}a-propos.html` },
    { label: 'Galerie', href: `${pagePrefix}certification.html` },
    { label: 'Contact', href: `${pagePrefix}contact.html` }
  ];
  const moreLinks = [
    { label: 'Compétences', href: `${pagePrefix}competences.html` },
    { label: 'Parcours', href: `${pagePrefix}parcours.html` },
    { label: 'Blog', href: `${pagePrefix}blog.html` },
    { label: 'Collaboration', href: projectRequestHref },
    { label: 'Confidentialité', href: `${pagePrefix}confidentialite.html` }
  ];
  const socialLinks = [
    { label: 'X', name: 'x', href: 'https://x.com/Ange_Dev0', icon: 'fa-x-twitter' },
    { label: 'Facebook', name: 'facebook', href: 'https://www.facebook.com/share/1BG1mN116X/', icon: 'fa-facebook-f' },
    { label: 'Instagram', name: 'instagram', href: 'https://www.instagram.com/goodfellagf?igsh=eDV4bDE3Z294Mmdv', icon: 'fa-instagram' },
    { label: 'LinkedIn', name: 'linkedin', href: 'https://www.linkedin.com/in/koffi-ang%C3%A9lo-edemnawo-861206448?trk=contact-info', icon: 'fa-linkedin-in' },
    { label: 'TikTok', name: 'tiktok', href: 'https://www.tiktok.com/@ange_dev0?_r=1&_t=ZS-9BD1P42bm4O', icon: 'fa-tiktok' },
    { label: 'WhatsApp', name: 'whatsapp', href: 'https://wa.me/22892603558', icon: 'fa-whatsapp' }
  ];
  const linkList = (links) => links.map(({ label, href }) => `<li><a href="${href}">${label}<i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></li>`).join('');
  const footerLogo = `<span class="brand-mark" aria-hidden="true"><img src="${logoHref}" alt=""></span><span class="brand-copy"><strong>Angedev.tech</strong><small>Développeur web front-end</small></span>`;

  footer.innerHTML = `
    <div class="container footer__grid">
      <section class="footer__brand" aria-label="Présentation de Angedev.tech">
        <a href="${homeHref}" class="footer__logo" aria-label="Angedev.tech, accueil">${footerLogo}</a>
        <p class="footer__role">Développeur web front-end en formation</p>
        <p>Je crée des solutions web modernes, performantes et accessibles pour un monde numérique meilleur.</p>
        <nav class="footer__social" aria-label="Réseaux sociaux">
          ${socialLinks.map(({ label, name, href, icon }) => `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" data-social="${name}"><i class="fa-brands ${icon}" aria-hidden="true"></i></a>`).join('')}
        </nav>
      </section>
      <nav class="footer__col" aria-label="Liens rapides">
        <h2>Liens rapides</h2>
        <ul>${linkList(footerLinks)}</ul>
        <h3 class="footer__subheading">Explorer aussi</h3>
        <ul>${linkList(moreLinks)}</ul>
      </nav>
      <section class="footer__col">
        <h2>Mes services</h2>
        <ul>
          <li><a href="${pagePrefix}services.html">Sites vitrines<i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></li>
          <li><a href="${pagePrefix}services.html">Landing pages<i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></li>
          <li><a href="${pagePrefix}services.html">Portfolio professionnel<i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></li>
          <li><a href="${pagePrefix}services.html">Intégration HTML/CSS<i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></li>
          <li><a href="${pagePrefix}services.html">Responsive &amp; maintenance<i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></li>
        </ul>
      </section>
      <section class="footer__col footer__contact">
        <h2>Contact</h2>
        <ul>
          <li><a href="tel:+22892603558"><i class="fa-solid fa-phone" aria-hidden="true"></i>+228 92 60 35 58</a></li>
          <li><a href="mailto:edemnawokoffiangelo@email.com"><i class="fa-solid fa-envelope" aria-hidden="true"></i>edemnawokoffiangelo@email.com</a></li>
          <li><span><i class="fa-solid fa-location-dot" aria-hidden="true"></i>Lomé, Togo</span></li>
        </ul>
        <a class="footer__contact-button" href="${pagePrefix}contact.html"><i class="fa-regular fa-paper-plane" aria-hidden="true"></i> Me contacter</a>
      </section>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>© ${new Date().getFullYear()} Angedev.tech. Tous droits réservés.</p>
        <span class="footer__motto">Code <i aria-hidden="true"></i> Créer <i aria-hidden="true"></i> Innover</span>
        <button class="footer__back-to-top" id="backToTop" type="button" aria-label="Retour en haut"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
      </div>
    </div>
  `;
}

document.querySelectorAll('.footer__back-to-top').forEach((button) => {
  button.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  }));
});

document.querySelectorAll('.footer').forEach((element) => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.classList.add('footer--visible');
    return;
  }

  element.classList.add('footer--reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('footer--visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  observer.observe(element);
});

const projectCta = document.createElement('a');
const isProjectPage = window.location.pathname.toLowerCase().endsWith('/demander-projet.html');
projectCta.className = 'project-cta';
projectCta.href = isProjectPage
  ? '#dpForm'
  : document.body.dataset.page === 'accueil'
    ? 'html/demander-projet.html'
    : 'demander-projet.html';
projectCta.setAttribute('aria-label', 'Demander un projet');
projectCta.setAttribute('aria-keyshortcuts', 'Space ArrowUp ArrowDown ArrowLeft ArrowRight Escape');
projectCta.setAttribute('title', 'Maintenez le clic pour déplacer · Espace puis les flèches au clavier');
projectCta.innerHTML = '<span>Demander un projet</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
document.body.appendChild(projectCta);

let activePointerId = null;
let pointerStart = null;
let hasDragged = false;
let suppressClick = false;
let keyboardMoveMode = false;

function positionProjectCta(left, top) {
  const margin = 8;
  const maxLeft = Math.max(margin, window.innerWidth - projectCta.offsetWidth - margin);
  const maxTop = Math.max(margin, window.innerHeight - projectCta.offsetHeight - margin);
  const header = document.querySelector('.header');
  const headerBottom = header ? header.getBoundingClientRect().height + margin : margin;
  const minTop = Math.min(headerBottom, maxTop);
  projectCta.style.left = `${Math.max(margin, Math.min(left, maxLeft))}px`;
  projectCta.style.top = `${Math.max(minTop, Math.min(top, maxTop))}px`;
  projectCta.style.right = 'auto';
  projectCta.style.bottom = 'auto';
}

function finishProjectCtaMove() {
  projectCta.classList.remove('is-dragging');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  projectCta.classList.add('is-dropped');
}

projectCta.addEventListener('pointerdown', (event) => {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
  activePointerId = event.pointerId;
  const rect = projectCta.getBoundingClientRect();
  pointerStart = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
  hasDragged = false;
  projectCta.classList.add('is-dragging');
  projectCta.setPointerCapture(event.pointerId);
});

projectCta.addEventListener('pointermove', (event) => {
  if (event.pointerId !== activePointerId || !pointerStart) return;
  const deltaX = event.clientX - pointerStart.x;
  const deltaY = event.clientY - pointerStart.y;
  if (!hasDragged && Math.hypot(deltaX, deltaY) < 5) return;
  hasDragged = true;
  positionProjectCta(pointerStart.left + deltaX, pointerStart.top + deltaY);
});

function endProjectCtaPointer(event) {
  if (event.pointerId !== activePointerId) return;
  activePointerId = null;
  pointerStart = null;
  projectCta.classList.remove('is-dragging');
  if (hasDragged) {
    suppressClick = event.type === 'pointerup';
    finishProjectCtaMove();
  }
  hasDragged = false;
}

projectCta.addEventListener('pointerup', endProjectCtaPointer);
projectCta.addEventListener('pointercancel', endProjectCtaPointer);
projectCta.addEventListener('click', (event) => {
  if (!suppressClick) return;
  event.preventDefault();
  event.stopPropagation();
  suppressClick = false;
});
projectCta.addEventListener('animationend', (event) => {
  if (event.animationName === 'projectCtaSettle') projectCta.classList.remove('is-dropped');
});
projectCta.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && keyboardMoveMode) {
    keyboardMoveMode = false;
    projectCta.classList.remove('is-dragging');
    projectCta.setAttribute('aria-label', 'Demander un projet');
    finishProjectCtaMove();
    event.preventDefault();
    return;
  }
  if (event.key === 'Escape' && keyboardMoveMode) {
    keyboardMoveMode = false;
    projectCta.classList.remove('is-dragging');
    projectCta.setAttribute('aria-label', 'Demander un projet');
    event.preventDefault();
    return;
  }
  if (event.key === ' ' && !event.repeat) {
    keyboardMoveMode = !keyboardMoveMode;
    projectCta.classList.toggle('is-dragging', keyboardMoveMode);
    projectCta.setAttribute('aria-label', keyboardMoveMode
      ? 'Mode déplacement activé. Utilisez les flèches pour déplacer, Espace ou Échap pour terminer.'
      : 'Demander un projet');
    if (!keyboardMoveMode) finishProjectCtaMove();
    event.preventDefault();
    return;
  }
  const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  if (!keyboardMoveMode || !directions[event.key]) return;
  const [x, y] = directions[event.key];
  const rect = projectCta.getBoundingClientRect();
  const distance = event.shiftKey ? 30 : 10;
  positionProjectCta(rect.left + x * distance, rect.top + y * distance);
  event.preventDefault();
});
projectCta.addEventListener('blur', () => {
  if (!keyboardMoveMode) return;
  keyboardMoveMode = false;
  projectCta.classList.remove('is-dragging');
  projectCta.setAttribute('aria-label', 'Demander un projet');
  finishProjectCtaMove();
});
window.addEventListener('resize', () => {
  if (projectCta.style.left) {
    const rect = projectCta.getBoundingClientRect();
    positionProjectCta(rect.left, rect.top);
  }
});

document.querySelectorAll('img:not([loading])').forEach((image) => {
  if (image.closest('.hero')) return;
  image.loading = 'lazy';
  image.decoding = 'async';
});

const fadeEls = document.querySelectorAll('.service-card, .project-card, .goal-card, .testimonial-card, .stat-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }), { threshold: 0.1 });
  fadeEls.forEach((element) => observer.observe(element));
}
