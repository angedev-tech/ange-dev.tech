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

// 9. CERTIFICATION MODAL
// ============================================================
(function () {
  const modal = document.getElementById('certificationModal');
  const modalImg = modal ? modal.querySelector('img') : null;
  const triggers = document.querySelectorAll('.certification-card__trigger');
  const closeBtn = document.querySelector('.certification-modal__close');
  const backdrop = document.querySelector('[data-close-certification]');

  if (!modal || !modalImg || triggers.length === 0) return;

  const openModal = (button) => {
    const imageSrc = button.dataset.image || button.querySelector('img')?.src;
    const imageAlt = button.dataset.alt || button.querySelector('img')?.alt || 'Certification';

    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    modal.classList.add('certification-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('certification-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('certification-modal--open')) {
      closeModal();
    }
  });
})();

// ============================================================
