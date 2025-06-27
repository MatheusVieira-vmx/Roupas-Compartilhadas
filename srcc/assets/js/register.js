// Form Validation
const form = document.getElementById('register-form');
const inputs = form.querySelectorAll('input[required]');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');

      // Specific validations
      if (input.id === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
        input.classList.add('error');
        isValid = false;
      }

      if (input.id === 'password' && input.value.length < 6) {
        input.classList.add('error');
        isValid = false;
      }

      if (input.id === 'confirm-password' && input.value !== document.getElementById('password').value) {
        input.classList.add('error');
        isValid = false;
      }
    }
  });

  if (isValid) {
    alert('Cadastro realizado com sucesso!');
    form.reset();
  }
});

// Input masks
document.getElementById('phone').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 11) value = value.substring(0, 11);

  if (value.length > 0) {
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    if (value.length > 10) {
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    } else {
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
  }

  e.target.value = value;
});

document.getElementById('zipcode').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 8) value = value.substring(0, 8);

  if (value.length > 5) {
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
  }

  e.target.value = value;
});

// Profile picture upload
const uploadBtn = document.querySelector('.upload-btn');
const profilePreview = document.querySelector('.profile-preview');

uploadBtn.addEventListener('click', function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        profilePreview.innerHTML = `<img src="${event.target.result}" alt="Foto de perfil">`;
      };
      reader.readAsDataURL(file);
    }
  };

  input.click();
});