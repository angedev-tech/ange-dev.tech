// 6. CONTACT FORM (Formspree)
// ============================================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi en cours...'; }
    if (formSuccess) formSuccess.style.display = 'none';
    if (formError) formError.style.display = 'none';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        if (formSuccess) formSuccess.style.display = 'block';
        contactForm.reset();
      } else {
        console.error(`Échec Formspree pour le formulaire de contact (HTTP ${response.status}).`);
        if (formError) formError.style.display = 'block';
      }
    } catch (error) {
      console.error('Échec réseau pour le formulaire de contact.', error);
      if (formError) formError.style.display = 'block';
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Envoyer le message';
    }
    setTimeout(() => {
      if (formSuccess) formSuccess.style.display = 'none';
      if (formError) formError.style.display = 'none';
    }, 6000);
  });
}

// ============================================================
