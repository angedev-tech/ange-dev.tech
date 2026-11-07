/* js/demander-projet.js — Assistant « Demander un projet » en 4 étapes */
(function () {
  const WHATSAPP = '22892603558'; // numéro qui reçoit les demandes : indicatif + numéro, sans « + »
  const MAX_MB = 15;              // taille maximale du cahier des charges (PDF)
  const form = document.getElementById('dpForm');
  if (!form) return;

  const $ = (id) => document.getElementById(id);
  const panels = [...form.querySelectorAll('.dp__panel')];
  const bars = [...document.querySelectorAll('#dpSteps li')];
  const back = $('dpBack'), next = $('dpNext'), send = $('dpSend'), msg = $('dpMsg');
  const drop = $('dpDrop'), fileInput = $('dpFile'), fname = $('dpFileName'), fhint = $('dpFileHint');
  const LABELS = ['Continuer', 'Continuer', 'Vos coordonnées'];
  const DEFAULT_FILE = [fname.textContent, fhint.textContent];
  let step = 0;

  const val = (n) => (form.elements[n] ? form.elements[n].value : '').trim();
  const modules = () => [...form.querySelectorAll('input[name="modules"]:checked')].map((i) => i.value);
  const title = () => document.querySelector('.dp__title').scrollIntoView({ behavior: 'smooth', block: 'start' });
  const show = (text) => { msg.textContent = text; msg.hidden = !text; };

  function valid() {
    if (step === 0) return !!val('type_solution');
    if (step === 1) return modules().length > 0;
    if (step === 2) return !!val('delai');
    return true;
  }
  function render() {
    panels.forEach((p, i) => { p.hidden = i !== step; });
    bars.forEach((b, i) => { b.classList.toggle('is-done', i < step); b.classList.toggle('is-current', i === step); });
    back.hidden = step === 0;
    next.hidden = step === 3;
    send.hidden = step !== 3;
    if (step < 3) $('dpNextLabel').textContent = LABELS[step];
    next.disabled = !valid();
    show('');
  }
  function go(n) { step = Math.max(0, Math.min(3, n)); render(); title(); }

  back.addEventListener('click', () => go(step - 1));
  next.addEventListener('click', () => { if (valid()) go(step + 1); });
  form.addEventListener('change', () => { next.disabled = !valid(); });

  // --- Cahier des charges : sélection et glisser-déposer ---
  function setFile(f) {
    let err = '';
    if (f && !/\.pdf$/i.test(f.name)) err = 'Seul un fichier PDF est accepté.';
    else if (f && f.size > MAX_MB * 1048576) err = `Le fichier dépasse ${MAX_MB} Mo.`;
    if (err) { fileInput.value = ''; f = null; show(err); } else { show(''); }
    fname.textContent = f ? f.name : DEFAULT_FILE[0];
    fhint.textContent = f ? `${(f.size / 1048576).toFixed(1)} Mo · cliquez pour changer` : DEFAULT_FILE[1];
    drop.classList.toggle('has-file', !!f);
  }
  fileInput.addEventListener('change', () => setFile(fileInput.files[0]));
  ['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
  ['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.remove('is-over'); }));
  drop.addEventListener('drop', (e) => {
    const f = e.dataTransfer.files[0];
    if (!f) return;
    const dt = new DataTransfer(); dt.items.add(f); fileInput.files = dt.files; setFile(f);
  });

  // --- Envoi (Formspree) puis proposition de continuer sur WhatsApp ---
  const post = (fd) => fetch(form.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (step < 3) { if (valid()) go(step + 1); return; }
    const file = fileInput.files[0];
    const d = { type: val('type_solution'), modules: modules(), delai: val('delai'), nom: val('nom'), entreprise: val('entreprise'),
                whatsapp: val('indicatif') + ' ' + val('whatsapp'), description: val('description') };
    const fd = new FormData(form);
    fd.delete('modules'); fd.delete('indicatif');
    fd.set('modules', d.modules.join(', '));
    fd.set('whatsapp', d.whatsapp);
    fd.set('_subject', `Nouvelle demande de projet – ${d.type} – ${d.nom}`);
    if (!file) fd.delete('cahier_des_charges');

    const label = send.innerHTML;
    send.disabled = true; send.textContent = 'Envoi en cours…'; show('');
    try {
      let res = await post(fd), sansPdf = false;
      if (!res.ok && file) { // offre Formspree sans pièces jointes : on renvoie la demande sans le PDF
        fd.delete('cahier_des_charges');
        fd.set('cahier_des_charges_note', `PDF non transmis (${file.name}) : à demander sur WhatsApp`);
        res = await post(fd); sansPdf = true;
      }
      if (!res.ok) throw new Error(res.status);
      done(d, file, sansPdf);
    } catch (err) {
      show('Envoi impossible pour le moment. Réessayez dans un instant ou écrivez-nous directement sur WhatsApp.');
    } finally {
      send.disabled = false; send.innerHTML = label;
    }
  });

  function done(d, file, sansPdf) {
    const txt = `Bonjour, je viens d’envoyer une demande de projet depuis votre site.\n\n• Solution : ${d.type}\n• Modules : ${d.modules.join(', ')}\n• Délai : ${d.delai}\n• Nom : ${d.nom}${d.entreprise ? ' (' + d.entreprise + ')' : ''}\n\n${d.description.slice(0, 600)}`
      + (file ? '\n\n(Je vous envoie mon cahier des charges PDF ici.)' : '');
    $('dpWa').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
    $('dpDoneText').textContent = 'Merci ! Votre demande est bien arrivée. Nous vous contactons sur WhatsApp sous 24h.'
      + (sansPdf ? ' Votre PDF n’a pas pu être joint automatiquement : envoyez-le-nous directement sur WhatsApp.' : '');
    form.hidden = true; $('dpDone').hidden = false;
    bars.forEach((b) => { b.classList.add('is-done'); b.classList.remove('is-current'); });
    title();
  }
  $('dpAgain').addEventListener('click', () => {
    form.reset(); setFile(null); form.hidden = false; $('dpDone').hidden = true; go(0);
  });
  render();
})();