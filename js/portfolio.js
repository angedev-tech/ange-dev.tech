// Filtres de la galerie
const projectFilters = document.querySelectorAll('[data-project-filter]');
const projectCards = document.querySelectorAll('.project-card[data-project-category]');

projectFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const category = filter.dataset.projectFilter;
    projectFilters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    projectCards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.projectCategory !== category;
    });
  });
});

// 10. YOUTHCONNECT MODAL
// ============================================================
(function () {
  const overlay = document.getElementById('yc-detail-modal');
  if (!overlay) return;

  window.ycOpen = function (e) {
    if (e) e.preventDefault();
    overlay.classList.add('yc-open');
    document.body.style.overflow = 'hidden';
  };

  window.ycClose = function () {
    overlay.classList.remove('yc-open');
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) window.ycClose();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('yc-open')) {
      window.ycClose();
    }
  });
})();
