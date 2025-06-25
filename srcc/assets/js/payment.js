document.querySelector('.logo')?.addEventListener('click', () => {
  window.location.href = '../pages/home.html';
});

document.addEventListener('DOMContentLoaded', function () {
  // Seleção do método de pagamento
  const paymentOptions = document.querySelectorAll('.payment-option');
  const paymentForms = {
    creditCard: document.getElementById('creditCardForm'),
    pix: document.getElementById('pixForm'),
    boleto: document.getElementById('boletoForm')
  };

  paymentOptions.forEach(option => {
    option.addEventListener('click', function () {
      // Remove a classe active de todas as opções
      paymentOptions.forEach(opt => opt.classList.remove('active'));
      // Adiciona a classe active apenas na opção clicada
      this.classList.add('active');

      // Oculta todos os formulários
      Object.values(paymentForms).forEach(form => form.classList.remove('active'));

      // Mostra apenas o formulário correspondente
      const method = this.querySelector('input').value;
      paymentForms[method].classList.add('active');
    });
  });

  // Formatação do número do cartão
  const cardNumber = document.getElementById('cardNumber');
  cardNumber.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = formatted;

    // Detectar tipo de cartão e destacar ícone
    const visaIcon = document.getElementById('visaIcon');
    const mastercardIcon = document.getElementById('mastercardIcon');
    const amexIcon = document.getElementById('amexIcon');

    // Reset all icons
    [visaIcon, mastercardIcon, amexIcon].forEach(icon => {
      icon.classList.remove('active');
    });

    if (/^4/.test(value)) {
      visaIcon.classList.add('active');
    } else if (/^5[1-5]/.test(value)) {
      mastercardIcon.classList.add('active');
    } else if (/^3[47]/.test(value)) {
      amexIcon.classList.add('active');
    }
  });

  // Formatação da data de validade
  const cardExpiry = document.getElementById('cardExpiry');
  cardExpiry.addEventListener('input', function (e) {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
  });

  // Validação dos formulários e abertura do modal
  const paymentFormsElements = document.querySelectorAll('.payment-form');
  const confirmationModal = document.getElementById('confirmationModal');

  paymentFormsElements.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validações para cartão de crédito
      if (form.id === 'creditCardForm') {
        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value.trim();

        if (!cardName || cardNumber.length < 16 || !cardExpiry || !cardCvv) {
          alert('Por favor, preencha todos os campos do cartão corretamente.');
          return;
        }
      }

      // Mostrar modal de confirmação
      confirmationModal.style.display = 'flex';
    });
  });

  // Fechar modal ao clicar fora do conteúdo
  confirmationModal.addEventListener('click', function (e) {
    if (e.target === confirmationModal) {
      confirmationModal.style.display = 'none';
    }
  });

  // Fechar modal ao pressionar ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && confirmationModal.style.display === 'flex') {
      confirmationModal.style.display = 'none';
    }
  });
});