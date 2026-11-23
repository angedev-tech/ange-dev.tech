(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!finePointer.matches || reducedMotion.matches) return;

  const root = document.documentElement;
  const cursor = document.createElement('div');
  const core = document.createElement('span');
  const trail = Array.from({ length: 4 }, (_, index) => {
    const element = document.createElement('span');
    element.className = 'cursor-hyper-ripple__trail';
    element.style.setProperty('--trail-size', `${22 + index * 8}px`);
    element.style.setProperty('--trail-opacity', `${0.54 - index * 0.1}`);
    cursor.appendChild(element);
    return { element, x: -100, y: -100 };
  });

  cursor.className = 'cursor-hyper-ripple';
  cursor.setAttribute('aria-hidden', 'true');
  core.className = 'cursor-hyper-ripple__core';
  cursor.appendChild(core);
  document.body.appendChild(cursor);
  root.classList.add('cursor-hyper-ripple-enabled');

  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let animationFrame = 0;
  let clickAnimationFrame = 0;

  const setPosition = (element, x, y) => {
    element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  core.addEventListener('animationend', (event) => {
    if (event.animationName === 'hyperRippleClick') core.classList.remove('is-clicking');
  });

  const animate = () => {
    currentX += (targetX - currentX) * 0.3;
    currentY += (targetY - currentY) * 0.3;
    setPosition(core, currentX, currentY);

    let isMoving = Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1;
    let previousX = currentX;
    let previousY = currentY;
    trail.forEach((point, index) => {
      const easing = 0.24 - index * 0.035;
      point.x += (previousX - point.x) * easing;
      point.y += (previousY - point.y) * easing;
      setPosition(point.element, point.x, point.y);
      if (Math.abs(previousX - point.x) > 0.1 || Math.abs(previousY - point.y) > 0.1) {
        isMoving = true;
      }
      previousX = point.x;
      previousY = point.y;
    });

    if (isMoving) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      animationFrame = 0;
    }
  };

  const isNativeControl = (target) => target instanceof Element && target.closest(
    'input, textarea, select, [contenteditable]:not([contenteditable="false"])'
  );

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;

    targetX = event.clientX;
    targetY = event.clientY;
    cursor.classList.toggle('is-hidden', Boolean(isNativeControl(event.target)));
    cursor.classList.add('is-visible');
    if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
  }, { passive: true });

  window.addEventListener('pointerout', (event) => {
    if (event.pointerType === 'mouse' && !event.relatedTarget) {
      cursor.classList.remove('is-visible');
    }
  }, { passive: true });

  document.addEventListener('click', (event) => {
    if (event.detail === 0 || event.button !== 0 || !Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return;

    core.style.setProperty('--cursor-x', `${currentX}px`);
    core.style.setProperty('--cursor-y', `${currentY}px`);
    core.classList.remove('is-clicking');
    window.cancelAnimationFrame(clickAnimationFrame);
    clickAnimationFrame = window.requestAnimationFrame(() => {
      core.classList.add('is-clicking');
    });

    for (let index = 0; index < 3; index += 1) {
      const ring = document.createElement('span');
      ring.className = 'cursor-hyper-ripple__ring';
      ring.setAttribute('aria-hidden', 'true');
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
      ring.style.animationDelay = `${index * 85}ms`;
      document.body.appendChild(ring);
      window.setTimeout(() => ring.remove(), 950);
    }
  });
})();
