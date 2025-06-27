document.addEventListener('DOMContentLoaded', function () {
  // ==========================================
  // 1. VARIÁVEIS GERAIS E ELEMENTOS DO DOM
  // ==========================================
  const pricePerDay = 89;
  let currentDate = new Date();
  let selectedDates = [];
  let isSearchOpen = false;

  // Elementos do Calendário
  const calendarBody = document.getElementById('calendarBody');
  const currentMonthEl = document.getElementById('currentMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const selectedDatesEl = document.getElementById('selectedDates');
  const totalPriceEl = document.getElementById('totalPrice');
  const addToCartBtn = document.getElementById('addToCart');
  const rentNowBtn = document.getElementById('rentNow');

  // Elementos da Busca
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.querySelector('.search-input');
  const searchToggle = document.getElementById('searchToggle');
  const searchIcon = document.getElementById('searchIcon');

  // Datas indisponíveis (normalmente viriam de uma API)
  const unavailableDates = [
    '2023-06-10', '2023-06-11', '2023-06-12',
    '2023-06-20', '2023-06-21', '2023-06-25'
  ];

  // ==========================================
  // 2. FUNÇÕES DO CALENDÁRIO
  // ==========================================
  function generateCalendar() {
    calendarBody.innerHTML = '';

    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    currentMonthEl.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      if (date > daysInMonth) break;

      const row = document.createElement('tr');

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');

        if (i === 0 && j < firstDay) {
          cell.textContent = '';
        } else if (date > daysInMonth) {
          cell.textContent = '';
        } else {
          cell.textContent = date;
          const formattedDate = formatDate(currentDate, date);

          if (unavailableDates.includes(formattedDate)) {
            cell.classList.add('unavailable');
          } else {
            cell.classList.add('available');
            if (selectedDates.includes(formattedDate)) {
              cell.classList.add('selected');
            }
            cell.addEventListener('click', () => toggleDateSelection(formattedDate, cell));
          }
          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  function formatDate(dateObj, day) {
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function toggleDateSelection(date, cell) {
    const index = selectedDates.indexOf(date);
    index === -1 ? selectedDates.push(date) : selectedDates.splice(index, 1);
    cell.classList.toggle('selected');
    updateSelectedDatesDisplay();
    calculateTotalPrice();
  }

  function updateSelectedDatesDisplay() {
    if (selectedDates.length === 0) {
      selectedDatesEl.textContent = 'Selecione as datas desejadas';
      return;
    }

    selectedDates.sort();
    const formatted = selectedDates.map(date => {
      const [y, m, d] = date.split('-');
      return `${d}/${m}`;
    });
    selectedDatesEl.innerHTML = `Datas selecionadas: <span>${formatted.join(', ')}</span>`;
  }

  function calculateTotalPrice() {
    totalPriceEl.innerHTML = `Total: <span>R$ ${selectedDates.length * pricePerDay}</span>`;
  }

  // ==========================================
  // 3. FUNÇÕES DA BARRA DE PESQUISA
  // ==========================================
  function toggleSearch() {
    isSearchOpen = !isSearchOpen;
    searchContainer.classList.toggle('active');

    if (isSearchOpen) {
      searchInput.focus();
      searchToggle.style.opacity = '0';
      searchToggle.style.pointerEvents = 'none';
    } else {
      searchToggle.style.opacity = '1';
      searchToggle.style.pointerEvents = 'auto';
      searchInput.blur();
    }
  }

  function performSearch(query) {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      console.log('Buscando por:', trimmedQuery);
      // Implementação real da busca:
      // window.location.href = `/busca?q=${encodeURIComponent(trimmedQuery)}`;
      alert(`Você buscou por: ${trimmedQuery}`);
    }
  }

  // ==========================================
  // 4. EVENT LISTENERS
  // ==========================================
  // Calendário
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
  });

  addToCartBtn.addEventListener('click', () => {
    if (selectedDates.length === 0) {
      alert('Por favor, selecione pelo menos uma data para aluguel.');
    } else {
      alert('Item adicionado ao carrinho com sucesso!');
    }
  });

  rentNowBtn.addEventListener('click', () => {
    if (selectedDates.length === 0) {
      alert('Por favor, selecione pelo menos uma data para aluguel.');
    } else {
      window.location.href = 'pagamento.html';
    }
  });

  // Busca
  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSearch();
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch(e.target.value);
  });

  searchIcon.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
      performSearch(searchInput.value);
    }
  });

  document.addEventListener('click', (e) => {
    if (isSearchOpen && !e.target.closest('.search-container') && !e.target.closest('.search-toggle')) {
      toggleSearch();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isSearchOpen) toggleSearch();
  });

  // Navegação
  document.querySelector('.logo')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  document.querySelector('.nav-btn i.fa-shopping-bag')?.closest('button')?.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });

  document.getElementById('showAllReviews')?.addEventListener('click', () => {
    alert('Todas as avaliações serão exibidas aqui');
  });

  // ==========================================
  // 5. INICIALIZAÇÃO
  // ==========================================
  generateCalendar();
});