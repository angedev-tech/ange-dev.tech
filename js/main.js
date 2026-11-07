const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('header--scrolled', window.scrollY > 60);
  const backButton = document.getElementById('backToTop');
  if (backButton) backButton.classList.toggle('back-to-top--visible', window.scrollY > 400);
});
const toggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (toggle && navList) toggle.addEventListener('click', () => {
  navList.classList.toggle('nav__list--open');
  toggle.classList.toggle('nav__toggle--open');
});
document.querySelectorAll('.nav__link[data-page]').forEach((link) => {
  link.classList.toggle('nav__link--active', link.dataset.page === document.body.dataset.page);
});
const backToTop = document.getElementById('backToTop');
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const projectCta = document.createElement('a');
const isProjectPage = window.location.pathname.toLowerCase().endsWith('/demander-projet.html');
projectCta.className = 'project-cta';
projectCta.href = isProjectPage
  ? '#dpForm'
  : document.body.dataset.page === 'accueil'
    ? 'html/demander-projet.html'
    : 'demander-projet.html';
projectCta.setAttribute('aria-label', 'Demander un projet');
projectCta.innerHTML = '<span>Demander un projet</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
document.body.appendChild(projectCta);

const fadeEls = document.querySelectorAll('.service-card, .project-card, .goal-card, .testimonial-card, .stat-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }), { threshold: 0.1 });
  fadeEls.forEach((element) => observer.observe(element));
}
