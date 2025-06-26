document.addEventListener('DOMContentLoaded', async function () {
  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartContent = document.getElementById('cartContent');
  const backBtn = document.getElementById('backBtn');
  const continueBtn = document.getElementById('continueBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartItemTemplate = document.getElementById('cart-item-template');

  // Elementos para frete
  const cepInput = document.getElementById('cepInput');
  const cepCalculateBtn = document.getElementById('cepCalculateBtn');
  const freteInfo = document.getElementById('freteInfo');
  // Seletores diretos para os valores do resumo
  const subtotalElement = document.querySelector('.summary-row:first-child .summary-value');
  const freteElement = document.querySelector('.summary-row:nth-child(2) .summary-value');
  const totalElement = document.querySelector('.total-value');

  let cartData = await fetchCartData();

  // Tabela de frete definida pelo vendedor
  const tabelaFrete = [
    { maxKm: 10, valor: 10 },
    { maxKm: 30, valor: 20 },
    { maxKm: 50, valor: 40 },
    { maxKm: Infinity, valor: 70 }
  ];

  // Valor atual do frete (começa em 0)
  let valorFrete = 0;

  // Função que simula cálculo de distância baseado no CEP
  function calcularDistanciaSimulada(cepCliente) {
    const numCep = parseInt(cepCliente.replace('-', ''));
    if (numCep <= 20000000) return 5;
    if (numCep <= 40000000) return 20;
    if (numCep <= 60000000) return 45;
    return 60;
  }

  // Busca o valor do frete na tabela conforme distância
  function buscarValorFrete(distanciaKm) {
    const faixa = tabelaFrete.find(f => distanciaKm <= f.maxKm);
    return faixa ? faixa.valor : 0;
  }

  // Função simulada que busca os dados do carrinho
  function fetchCartData() {
    return new Promise(resolve => {
      resolve([
        {
          id: 101,
          name: "Vestido Floral Midi",
          price: 89,
          quantity: 1,
          days: 1,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=736&q=80"
        },
        {
          id: 102,
          name: "Terno Slim Preto",
          price: 120,
          quantity: 1,
          days: 1,
          image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?auto=format&fit=crop&w=687&q=80"
        }
      ]);
    });
  }

  // Mostra/oculta a área do carrinho e mensagem de vazio
  function checkCart() {
    if (cartData.length === 0) {
      cartContent.style.display = 'none';
      emptyCart.style.display = 'block';
    } else {
      cartContent.style.display = 'block';
      emptyCart.style.display = 'none';
    }
  }

  // Atualiza os valores do resumo: subtotal, frete e total
  function updateSummary() {
    // Calcula subtotal diretamente dos dados do carrinho
    const subtotal = cartData.reduce((total, item) => total + (item.price * item.days), 0);

    // Atualiza o subtotal na tela
    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;

    // Atualiza o frete na tela
    freteElement.textContent = valorFrete === 0 ? 'Grátis' : `R$ ${valorFrete.toFixed(2)}`;

    // Calcula e atualiza o total = subtotal + frete
    const total = subtotal + valorFrete;
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
  }

  // Renderiza os itens no carrinho
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    cartData.forEach(item => {
      const template = cartItemTemplate.content.cloneNode(true);
      const cartItem = template.querySelector('.cart-item');
      cartItem.dataset.id = item.id;

      template.querySelector('.item-image').src = item.image;
      template.querySelector('.item-image').alt = item.name;
      template.querySelector('.item-name').textContent = item.name;
      template.querySelector('.item-price').textContent = `R$ ${item.price}/dia`;
      template.querySelector('.quantity-value').textContent = item.days;
      template.querySelector('.item-total').textContent = `Total: R$ ${(item.price * item.days).toFixed(2)}`;

      cartItemsContainer.appendChild(template);
    });
  }

  // Reseta o frete (valor e mensagem) ao alterar o carrinho
  function resetarFrete() {
    valorFrete = 0;
    if (freteInfo) {
      freteInfo.textContent = '';
      freteInfo.style.color = '';
    }
    updateSummary(); // Atualiza valores do resumo para refletir frete zero
  }

  // Adiciona eventos nos botões de quantidade e remover
  function addEventListeners() {
    document.querySelectorAll('.plus-day').forEach(btn => {
      btn.addEventListener('click', function () {
        const itemId = parseInt(this.closest('.cart-item').dataset.id);
        const item = cartData.find(i => i.id === itemId);
        item.days++;
        renderCart();
        addEventListeners();
        updateSummary();
        resetarFrete();
      });
    });

    document.querySelectorAll('.minus-day').forEach(btn => {
      btn.addEventListener('click', function () {
        const itemId = parseInt(this.closest('.cart-item').dataset.id);
        const item = cartData.find(i => i.id === itemId);
        if (item.days > 1) item.days--;
        renderCart();
        addEventListeners();
        updateSummary();
        resetarFrete();
      });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const itemId = parseInt(this.closest('.cart-item').dataset.id);
        cartData = cartData.filter(i => i.id !== itemId);
        renderCart();
        addEventListeners();
        checkCart();
        updateSummary();
        resetarFrete();
      });
    });
  }

  // Evento do botão para calcular frete com base no CEP
  cepCalculateBtn?.addEventListener('click', () => {
    if (!cepInput) return;

    const cep = cepInput.value.trim();

    // Validação simples do CEP (formato 00000-000)
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(cep)) {
      freteInfo.textContent = 'Por favor, insira um CEP válido (ex: 12345-678).';
      freteInfo.style.color = 'red';
      return;
    }

    // Simula cálculo de distância e busca valor do frete
    const distancia = calcularDistanciaSimulada(cep);
    valorFrete = buscarValorFrete(distancia);

    // Exibe mensagem para o usuário
    if (valorFrete === 0) {
      freteInfo.textContent = 'Frete grátis para sua região!';
      freteInfo.style.color = 'green';
    } else {
      freteInfo.textContent = `Frete estimado: R$ ${valorFrete.toFixed(2)} (distância aprox. ${distancia} km)`;
      freteInfo.style.color = 'var(--primary)';
    }

    // Atualiza o resumo incluindo o frete calculado
    updateSummary();
  });

  // Eventos de navegação
  backBtn?.addEventListener('click', () => window.location.href = './home.html');
  continueBtn?.addEventListener('click', () => window.location.href = './home.html');
  checkoutBtn?.addEventListener('click', () => window.location.href = './payment.html');
  document.querySelector('.logo')?.addEventListener('click', () => window.location.href = './home.html');

  // Inicializa o carrinho
  checkCart();
  renderCart();
  addEventListeners();
  updateSummary();
});
