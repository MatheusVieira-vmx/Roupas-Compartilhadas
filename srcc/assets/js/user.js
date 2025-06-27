document.addEventListener('DOMContentLoaded', function () {
  // Elementos do DOM
  const editProfileBtn = document.getElementById('editProfileBtn');
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const logoutBtn = document.querySelector('.logout-btn');

  // Modais
  const editProfileModal = document.getElementById('editProfileModal');
  const changePasswordModal = document.getElementById('changePasswordModal');

  // Botões de fechar modal
  const closeEditModal = document.getElementById('closeEditModal');
  const closePasswordModal = document.getElementById('closePasswordModal');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');

  // Botões de salvar
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const savePasswordBtn = document.getElementById('savePasswordBtn');

  // Campos de perfil
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profilePicture = document.getElementById('profilePicture');

  // Campos de edição
  const editName = document.getElementById('editName');
  const editEmail = document.getElementById('editEmail');
  const editPhoto = document.getElementById('editPhoto');

  // Abrir modal de edição de perfil
  editProfileBtn.addEventListener('click', function () {
    editProfileModal.style.display = 'flex';
  });

  // Abrir modal de alteração de senha
  changePasswordBtn.addEventListener('click', function () {
    changePasswordModal.style.display = 'flex';
  });

  // Fechar modais
  function closeAllModals() {
    editProfileModal.style.display = 'none';
    changePasswordModal.style.display = 'none';
  }

  closeEditModal.addEventListener('click', closeAllModals);
  closePasswordModal.addEventListener('click', closeAllModals);
  cancelEditBtn.addEventListener('click', closeAllModals);
  cancelPasswordBtn.addEventListener('click', closeAllModals);

  // Fechar modal ao clicar fora
  window.addEventListener('click', function (event) {
    if (event.target === editProfileModal) {
      editProfileModal.style.display = 'none';
    }
    if (event.target === changePasswordModal) {
      changePasswordModal.style.display = 'none';
    }
  });

  // Fechar modal ao pressionar ESC
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });

  // Salvar perfil
  saveProfileBtn.addEventListener('click', function () {
    profileName.textContent = editName.value;
    profileEmail.textContent = editEmail.value;

    // Simular upload de foto
    if (editPhoto.files && editPhoto.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicture.src = e.target.result;
      };
      reader.readAsDataURL(editPhoto.files[0]);
    }

    closeAllModals();
    alert('Perfil atualizado com sucesso!');
  });

  // Alterar senha
  savePasswordBtn.addEventListener('click', function () {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (newPassword.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    // Simular alteração de senha
    closeAllModals();
    alert('Senha alterada com sucesso!');

    // Limpar campos
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
  });

  const logoLink = document.getElementById('logoLink');

  logoLink.addEventListener('click', function (e) {
    e.preventDefault(); // Previne comportamento padrão, se necessário
    window.location.href = 'home.html'; // Redireciona para a tela inicial
  });

  // Logout
  logoutBtn.addEventListener('click', function (e) {
    if (!confirm('Deseja realmente sair?')) {
      e.preventDefault();
    }
  });
});