// Carousel functionality
const carousel = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
const itemCount = items.length;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update indicators
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Auto-rotate carousel
let carouselInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % itemCount;
  updateCarousel();
}, 5000);

// Manual controls
document.querySelector('.prev').addEventListener('click', () => {
  clearInterval(carouselInterval);
  currentIndex = (currentIndex - 1 + itemCount) % itemCount;
  updateCarousel();
  carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
  }, 5000);
});

document.querySelector('.next').addEventListener('click', () => {
  clearInterval(carouselInterval);
  currentIndex = (currentIndex + 1) % itemCount;
  updateCarousel();
  carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
  }, 5000);
});

// Click on indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    clearInterval(carouselInterval);
    currentIndex = index;
    updateCarousel();
    carouselInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % itemCount;
      updateCarousel();
    }, 5000);
  });
});

// Filter modal functionality
const filterModal = document.getElementById('filter-modal');
const openFilterBtn = document.getElementById('open-filter');
const closeFilterBtn = document.getElementById('close-filter');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');

openFilterBtn.addEventListener('click', () => {
  filterModal.classList.add('active');
});

closeFilterBtn.addEventListener('click', () => {
  filterModal.classList.remove('active');
});

applyFiltersBtn.addEventListener('click', () => {
  filterModal.classList.remove('active');
  // Here you would typically apply the filters to your product list
  // For the demo, we'll just show an alert
  alert('Filtros aplicados com sucesso!');
});

resetFiltersBtn.addEventListener('click', () => {
  // Reset all filter options
  document.querySelectorAll('.filter-option.active').forEach(option => {
    if (!option.textContent.includes('Todos') && !option.textContent.includes('Qualquer')) {
      option.classList.remove('active');
    }
  });

  // Reset price range
  const priceRange = document.querySelector('.price-range');
  priceRange.value = 200;

  // Activate default options
  document.querySelectorAll('.filter-option').forEach(option => {
    if (option.textContent.includes('Todos') || option.textContent.includes('Qualquer')) {
      option.classList.add('active');
    }
  });
});

// Toggle filter options
document.querySelectorAll('.filter-option').forEach(option => {
  option.addEventListener('click', function () {
    // For category filters, only allow one active at a time
    if (this.parentElement.previousElementSibling.textContent === 'Categorias') {
      this.parentElement.querySelectorAll('.filter-option').forEach(opt => {
        opt.classList.remove('active');
      });
    }
    this.classList.toggle('active');
  });
});

// Close modal when clicking outside
filterModal.addEventListener('click', (e) => {
  if (e.target === filterModal) {
    filterModal.classList.remove('active');
  }
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.querySelector('.product-image').style.transform = 'scale(1.03)';
  });

  card.addEventListener('mouseleave', function () {
    this.querySelector('.product-image').style.transform = 'scale(1)';
  });
});

// Redireciona para a página de perfil
document.querySelector('.nav-btn i.fa-user')?.closest('button')?.addEventListener('click', () => {
  window.location.href = 'advertiser.html';
});


// Redireciona para o carrinho
document.querySelector('.nav-btn i.fa-shopping-bag')?.closest('button')?.addEventListener('click', () => {
  window.location.href = 'cart.html';
});

// Redireciona para a home ao clicar na logo
document.querySelector('.logo')?.addEventListener('click', () => {
  window.location.href = 'home.html';
});