(function () {
  const form = document.getElementById('capture-form');
  const feedback = document.getElementById('form-feedback');
  const phone = document.getElementById('whatsapp');
  if (!form || !feedback || !phone) return;
  const warn = (message) => { feedback.hidden = false; feedback.className = 'form-feedback is-error'; feedback.textContent = message; };
  phone.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g,'').slice(0,11);
    let output = digits;
    if (digits.length > 2) output = '(' + digits.slice(0,2) + ') ' + digits.slice(2);
    if (digits.length > 7) output = '(' + digits.slice(0,2) + ') ' + digits.slice(2,7) + '-' + digits.slice(7);
    phone.value = output;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.hidden = true;
    if (form.elements.site.value) return;
    const name = form.elements.nome.value.trim();
    const phoneDigits = form.elements.whatsapp.value.replace(/\D/g,'');
    const email = form.elements.email.value.trim();
    if (name.length < 3) { warn('Informe seu nome completo.'); form.elements.nome.focus(); return; }
    if (phoneDigits.length < 10 || phoneDigits.length > 11) { warn('Informe um WhatsApp válido com DDD.'); form.elements.whatsapp.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { warn('Informe um e-mail válido.'); form.elements.email.focus(); return; }
    if (!form.querySelector('input[name="perfil"]:checked')) { warn('Escolha se você já é paciente ou convidada.'); return; }
    if (!form.elements.consentimento.checked) { warn('Autorize o contato da organização para prosseguir.'); return; }
    feedback.hidden = false;
    feedback.className = 'form-feedback is-demo';
    feedback.textContent = 'Formulário validado! Esta é uma demonstração: nenhum dado foi enviado. Para receber inscrições de verdade, será necessário conectar a página a um serviço de cadastro.';
  });
})();
