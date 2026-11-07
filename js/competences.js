// 4. SKILL BARS ANIMATION
// ============================================================
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar__fill');
  bars.forEach(bar => {
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = bar.style.getPropertyValue('--w') || getComputedStyle(bar).getPropertyValue('--w');
    }, 100);
  });
}

// ============================================================

animateSkillBars();
