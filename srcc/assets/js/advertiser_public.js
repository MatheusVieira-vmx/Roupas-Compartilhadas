document.addEventListener('DOMContentLoaded', function () {
  // Simular dados do anunciante
  const anunciante = {
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    localizacao: "São Paulo, SP",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
    avaliacao: 5,
    avaliacoesCount: 24
  };

  // Simular lista de roupas anunciadas
  const roupasAnunciadas = [
    {
      id: 1,
      titulo: "Vestido Floral Midi",
      imagem: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
      preco: 89,
      status: "available"
    },
    {
      id: 2,
      titulo: "Terno Slim Preto",
      imagem: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      preco: 120,
      status: "available"
    },
    {
      id: 3,
      titulo: "Bolsa de Luxo Dourada",
      imagem: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      preco: 65,
      status: "available"
    },
    {
      id: 4,
      titulo: "Conjunto Esportivo",
      imagem: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
      preco: 40,
      status: "rented"
    }
  ];

  // Função para renderizar as roupas
  function renderClothes() {
    const clothesGrid = document.getElementById('clothesGrid');
    clothesGrid.innerHTML = '';

    if (roupasAnunciadas.length === 0) {
      clothesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhuma roupa disponível no momento.</p>';
      return;
    }

    roupasAnunciadas.forEach(roupa => {
      let statusText, statusClass;
      switch (roupa.status) {
        case 'available':
          statusText = 'Disponível';
          statusClass = 'status-available';
          break;
        case 'rented':
          statusText = 'Alugada';
          statusClass = 'status-rented';
          break;
        case 'pending':
          statusText = 'Pendente';
          statusClass = 'status-pending';
          break;
      }

      const itemHTML = `
                        <div class="clothing-card">
                            <img src="${roupa.imagem}" alt="${roupa.titulo}" class="clothing-image">
                            <div class="clothing-info">
                                <h3 class="clothing-title">${roupa.titulo}</h3>
                                <div class="clothing-price">R$ ${roupa.preco} <span style="font-size: 0.8rem; color: var(--gray);">/ dia</span></div>
                                <span class="clothing-status ${statusClass}">${statusText}</span>
                                <div class="action-buttons">
                                    <button class="action-btn cart-btn" data-id="${roupa.id}">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Carrinho
                                    </button>
                                    <button class="action-btn rent-btn" data-id="${roupa.id}">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Alugar
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
      clothesGrid.innerHTML += itemHTML;
    });

    // Adicionar eventos aos botões
    document.querySelectorAll('.cart-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const itemId = this.getAttribute('data-id');
        alert(`Item ID: ${itemId} adicionado ao carrinho!`);
      });
    });

    document.querySelectorAll('.rent-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const itemId = this.getAttribute('data-id');
        window.location.href = `pagamento.html?item=${itemId}`;
      });
    });
  }

  // Simular carregamento assíncrono
  setTimeout(() => {
    renderClothes();
  }, 1000);

  // Botão Entrar em Contato
  document.getElementById('contactBtn').addEventListener('click', function () {
    alert('Abrindo chat com o anunciante...');
  });
});