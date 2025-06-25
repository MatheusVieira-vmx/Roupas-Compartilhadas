document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Foco automático no campo de e-mail
  emailInput.focus();

  // Validação do formulário
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validação simples
    if (!emailInput.value.trim()) {
      alert('Por favor, informe seu e-mail');
      emailInput.focus();
      return;
    }

    if (!passwordInput.value.trim()) {
      alert('Por favor, informe sua senha');
      passwordInput.focus();
      return;
    }

    // Validação básica de e-mail
    if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      alert('Por favor, informe um e-mail válido');
      emailInput.focus();
      return;
    }

    // Simulação de login bem-sucedido
    alert('Login realizado com sucesso! Redirecionando...');

    // Redirecionamento após 1 segundo
    setTimeout(function () {
      window.location.href = './home.html';
    }, 1000);
  });
});