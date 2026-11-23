const certificateFilters = document.querySelectorAll('[data-certificate-filter]');
const certificateCards = document.querySelectorAll('.certification-card[data-certificate-type]');

certificateFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const type = filter.dataset.certificateFilter;
    certificateFilters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    certificateCards.forEach((card) => {
      card.hidden = type !== 'all' && card.dataset.certificateType !== type;
    });
  });
});

