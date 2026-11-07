// Les niveaux se remplissent une seule fois, quand le panneau devient visible.
(function () {
  document.documentElement.classList.add('js');

  const panels = document.querySelectorAll('.stack__panel, .legend');
  if (!('IntersectionObserver' in window)) {
    panels.forEach(p => p.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  panels.forEach(p => io.observe(p));
})();