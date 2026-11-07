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
