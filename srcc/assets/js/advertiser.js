document.addEventListener("DOMContentLoaded", function () {
  // Dados simulados das roupas anunciadas
  const clothesData = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x300?text=Vestido+de+Festa",
      title: "Vestido Longo de Festa Vermelho",
      price: "R$ 120/dia",
      status: "available",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x300?text=Blazer+Social",
      title: "Blazer Social Masculino Preto",
      price: "R$ 80/dia",
      status: "rented",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x300?text=Saia+Longa",
      title: "Saia Longa Floral com Fenda",
      price: "R$ 60/dia",
      status: "available",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x300?text=Conjunto+Casual",
      title: "Conjunto Casual Feminino",
      price: "R$ 90/dia",
      status: "pending",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/300x300?text=Paletó+Elegante",
      title: "Paletó Elegante Cinza",
      price: "R$ 100/dia",
      status: "available",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/300x300?text=Vestido+Curto",
      title: "Vestido Curto para Festas",
      price: "R$ 70/dia",
      status: "rented",
    },
  ];

  // Elementos do DOM
  const clothesGrid = document.getElementById("clothesGrid");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettingsModal =
    document.getElementById("closeSettingsModal");

  // Carregar roupas na grade
  function loadClothes() {
    clothesGrid.innerHTML = "";

    clothesData.forEach((item) => {
      const statusClass =
        item.status === "available"
          ? "status-available"
          : item.status === "rented"
            ? "status-rented"
            : "status-pending";

      const statusText =
        item.status === "available"
          ? "Disponível"
          : item.status === "rented"
            ? "Alugada"
            : "Pendente";

      const card = document.createElement("div");
      card.className = "clothes-card";
      card.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" class="clothes-image">
                        <div class="clothes-details">
                            <h3 class="clothes-title">${item.title}</h3>
                            <p class="clothes-price">${item.price}</p>
                            <span class="clothes-status ${statusClass}">${statusText}</span>
                            <div class="clothes-actions">
                                <button class="action-btn edit-btn" onclick="editClothes(${item.id})">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button class="action-btn remove-btn" onclick="removeClothes(${item.id})">
                                    <i class="fas fa-trash"></i> Remover
                                </button>
                                <a href="roupa.html?id=${item.id}" class="action-btn details-btn">
                                    <i class="fas fa-eye"></i> Detalhes
                                </a>
                            </div>
                        </div>
                    `;
      clothesGrid.appendChild(card);
    });
  }

  // Funções globais para os botões
  window.editClothes = function (id) {
    alert(`Editar roupa com ID: ${id}`);
  };

  window.removeClothes = function (id) {
    if (confirm("Tem certeza que deseja remover este anúncio?")) {
      alert(`Roupa com ID: ${id} removida com sucesso!`);
      // Aqui você faria uma chamada AJAX para remover do backend
    }
  };

  // Editar perfil
  editProfileBtn.addEventListener("click", function () {
    alert("Abrir tela de edição de perfil");
  });

  // Configurações
  settingsBtn.addEventListener("click", function () {
    settingsModal.style.display = "flex";
  });

  closeSettingsModal.addEventListener("click", function () {
    settingsModal.style.display = "none";
  });

  // Fechar modal ao clicar fora
  window.addEventListener("click", function (event) {
    if (event.target === settingsModal) {
      settingsModal.style.display = "none";
    }
  });

  // Fechar modal ao pressionar ESC
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      settingsModal.style.display === "flex"
    ) {
      settingsModal.style.display = "none";
    }
  });

  // Carregar os dados iniciais
  loadClothes();
});