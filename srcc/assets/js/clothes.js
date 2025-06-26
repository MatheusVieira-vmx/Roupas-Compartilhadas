document.addEventListener('DOMContentLoaded', function () {
  // Current date and selected dates
  let currentDate = new Date();
  let selectedDates = [];

  // Sample unavailable dates (in a real app, this would come from an API)
  const unavailableDates = [
    '2023-06-10',
    '2023-06-11',
    '2023-06-12',
    '2023-06-20',
    '2023-06-21',
    '2023-06-25'
  ];

  // DOM Elements
  const calendarBody = document.getElementById('calendarBody');
  const currentMonthEl = document.getElementById('currentMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const selectedDatesEl = document.getElementById('selectedDates');
  const totalPriceEl = document.getElementById('totalPrice');
  const addToCartBtn = document.getElementById('addToCart');
  const rentNowBtn = document.getElementById('rentNow');

  // Price per day
  const pricePerDay = 89;

  // Generate calendar
  function generateCalendar() {
    // Clear previous calendar
    calendarBody.innerHTML = '';

    // Set month and year in header
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    currentMonthEl.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Get first day of month and total days in month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Create calendar rows
    let date = 1;
    for (let i = 0; i < 6; i++) {
      // Stop if we've rendered all days
      if (date > daysInMonth) break;

      // Create row
      const row = document.createElement('tr');

      // Create cells
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');

        if (i === 0 && j < firstDay) {
          // Empty cells before first day
          cell.textContent = '';
        } else if (date > daysInMonth) {
          // Empty cells after last day
          cell.textContent = '';
        } else {
          // Day cells
          cell.textContent = date;

          // Format date for comparison
          const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

          // Check if date is unavailable
          if (unavailableDates.includes(formattedDate)) {
            cell.classList.add('unavailable');
            cell.textContent = date;
          } else {
            cell.classList.add('available');

            // Check if date is selected
            if (selectedDates.includes(formattedDate)) {
              cell.classList.add('selected');
            }

            // Add click event
            cell.addEventListener('click', function () {
              toggleDateSelection(formattedDate, cell);
            });
          }

          date++;
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);
    }
  }

  // Toggle date selection
  function toggleDateSelection(date, cell) {
    const index = selectedDates.indexOf(date);

    if (index === -1) {
      // Add date to selection
      selectedDates.push(date);
      cell.classList.add('selected');
    } else {
      // Remove date from selection
      selectedDates.splice(index, 1);
      cell.classList.remove('selected');
    }

    updateSelectedDatesDisplay();
    calculateTotalPrice();
  }

  // Update selected dates display
  function updateSelectedDatesDisplay() {
    if (selectedDates.length === 0) {
      selectedDatesEl.textContent = 'Selecione as datas desejadas';
      return;
    }

    // Sort dates
    selectedDates.sort();

    // Format dates for display
    const formattedDates = selectedDates.map(date => {
      const [year, month, day] = date.split('-');
      return `${day}/${month}`;
    });

    selectedDatesEl.innerHTML = `Datas selecionadas: <span>${formattedDates.join(', ')}</span>`;
  }

  // Calculate total price
  function calculateTotalPrice() {
    const total = selectedDates.length * pricePerDay;
    totalPriceEl.innerHTML = `Total: <span>R$ ${total}</span>`;
  }

  // Month navigation
  prevMonthBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
  });

  nextMonthBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
  });

  // Add to cart functionality
  addToCartBtn.addEventListener('click', function () {
    if (selectedDates.length === 0) {
      alert('Por favor, selecione pelo menos uma data para aluguel.');
      return;
    }

    alert('Item adicionado ao carrinho com sucesso!');
    // In a real app, you would add the item and selected dates to the cart
  });

  // Rent now functionality
  rentNowBtn.addEventListener('click', function () {
    if (selectedDates.length === 0) {
      alert('Por favor, selecione pelo menos uma data para aluguel.');
      return;
    }

    window.location.href = 'pagamento.html';
    // In a real app, you would pass the selected dates as parameters
  });

  // Initialize calendar
  generateCalendar();

  // In a real app, you would fetch the product details and availability from an API
  /*
  fetch('/api/products/123')
      .then(response => response.json())
      .then(product => {
          // Update the page with product data
          document.querySelector('.main-image').src = product.image;
          document.querySelector('.product-title').textContent = product.title;
          document.querySelector('.product-description').textContent = product.description;
          // ... and so on for other fields
          
          // Update unavailable dates
          unavailableDates = product.unavailable_dates;
          generateCalendar();
      });
  */
});

// Logo click event
document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = 'home.html';
});

// Nav buttons functionality
document.querySelectorAll('.nav-btn')[0].addEventListener('click', function() {
    alert('Funcionalidade de busca será implementada aqui');
});

document.querySelector('.nav-btn i.fa-shopping-bag')?.closest('button')?.addEventListener('click', () => {
  window.location.href = 'cart.html';
});


// Show all reviews
document.getElementById('showAllReviews').addEventListener('click', function() {
    alert('Todas as avaliações serão exibidas aqui');
    // In a real app, you would show a modal or redirect to a reviews page
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');

searchBtn.addEventListener('click', function() {
    // Toggle search container
    searchContainer.classList.toggle('active');
    
    // Focus on input when visible
    if (searchContainer.classList.contains('active')) {
        searchContainer.querySelector('input').focus();
    }
});

// Close search when clicking outside
document.addEventListener('click', function(e) {
    if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
        searchContainer.classList.remove('active');
    }
});

// Optional: Search functionality
const searchInput = searchContainer.querySelector('input');
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch(this.value);
    }
});

function performSearch(query) {
    if (query.trim() !== '') {
        alert(`Buscando por: ${query}`);
        // Aqui você pode implementar a lógica de busca real
        // Por exemplo: window.location.href = `busca.html?q=${encodeURIComponent(query)}`;
    }
}