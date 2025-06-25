document.addEventListener('DOMContentLoaded', function () {
  const priceRange = document.getElementById('priceRange');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  const applyBtn = document.getElementById('applyFilters');

  // Sincronizar slider com inputs
  priceRange.addEventListener('input', function () {
    minPrice.value = 0;
    maxPrice.value = this.value;
  });

  // Sincronizar inputs com slider
  minPrice.addEventListener('change', function () {
    if (parseInt(this.value) > parseInt(maxPrice.value)) {
      this.value = maxPrice.value;
    }
    priceRange.value = maxPrice.value;
  });

  maxPrice.addEventListener('change', function () {
    if (parseInt(this.value) < parseInt(minPrice.value)) {
      this.value = minPrice.value;
    }
    priceRange.value = this.value;
  });

  // Aplicar filtros
  applyBtn.addEventListener('click', function () {
    const category = document.getElementById('category').value;
    const sizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(el => el.value);
    const minPriceValue = minPrice.value || 0;
    const maxPriceValue = maxPrice.value || 500;
    const location = document.getElementById('location').value;

    // Aqui você pode:
    // 1. Redirecionar para index.html com parâmetros
    // 2. Salvar no localStorage
    // 3. Enviar para uma API

    // Exemplo com parâmetros na URL:
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (sizes.length) params.append('sizes', sizes.join(','));
    params.append('minPrice', minPriceValue);
    params.append('maxPrice', maxPriceValue);
    if (location) params.append('location', location);

    window.location.href = `index.html?${params.toString()}`;
  });

  // Valores iniciais
  minPrice.value = 0;
  maxPrice.value = priceRange.value;
});