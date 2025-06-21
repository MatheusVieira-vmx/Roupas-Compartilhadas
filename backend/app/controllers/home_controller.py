from dataclasses import dataclass
from typing import List, Dict, Optional
from datetime import datetime
from utils import format_price
from cart_controller import add_to_cart
from payment_controller import create_payment
from utils.filters import filter_clothes

# ========== MODELOS ==========
@dataclass
class ClothingItem:
    id: int
    name: str
    description: str
    image_url: str
    price: float
    distance_km: float
    tags: List[str]
    category: str
    sizes: List[str]
    rating: float

@dataclass
class CarouselSlide:
    image_url: str
    title: str
    description: str
    button_text: str

# ========== DADOS MOCKADOS ==========
MOCK_CLOTHES = [
    ClothingItem(
        id=1,
        name="Vestido Floral Verão",
        description="Vestido midi com estampa floral e tecido leve",
        image_url="https://example.com/images/dress1.jpg",
        price=89.90,
        distance_km=1.5,
        tags=["Novo", "Destaque"],
        category="Vestidos",
        sizes=["P", "M", "G"],
        rating=4.8
    ),
    ClothingItem(
        id=2,
        name="Blazer Slim Fit",
        description="Blazer social masculino em tecido premium",
        image_url="https://example.com/images/blazer1.jpg",
        price=120.00,
        distance_km=3.2,
        tags=["Promoção"],
        category="Ternos",
        sizes=["M", "G", "GG"],
        rating=4.5
    ),
    ClothingItem(
        id=3,
        name="Fantasia de Super-Herói",
        description="Fantasia completa para eventos temáticos",
        image_url="https://example.com/images/costume1.jpg",
        price=150.00,
        distance_km=5.0,
        tags=["Aluguel especial"],
        category="Fantasias",
        sizes=["Único"],
        rating=4.9
    )
]

MOCK_CAROUSEL = [
    CarouselSlide(
        image_url="https://example.com/banners/summer-collection.jpg",
        title="Coleção Verão 2023",
        description="Looks perfeitos para a estação mais quente do ano",
        button_text="Conheça agora"
    ),
    CarouselSlide(
        image_url="https://example.com/banners/new-arrivals.jpg",
        title="Novidades toda semana",
        description="Sempre atualizando nosso acervo com peças exclusivas",
        button_text="Ver novidades"
    )
]

# ========== FUNÇÕES PRINCIPAIS ==========
def get_featured_clothes() -> List[Dict]:
    """Retorna roupas em destaque com preços formatados"""
    featured = [item for item in MOCK_CLOTHES if "Destaque" in item.tags]
    
    return [{
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "image_url": item.image_url,
        "price": format_price(item.price),
        "distance": f"{item.distance_km} km",
        "tags": item.tags
    } for item in featured]

def get_home_carousel() -> List[Dict]:
    """Retorna slides para o carrossel da página inicial"""
    return [{
        "image_url": slide.image_url,
        "title": slide.title,
        "description": slide.description,
        "button_text": slide.button_text
    } for slide in MOCK_CAROUSEL]

def handle_add_to_cart(user_id: int, clothing_id: int, cart_model) -> Dict:
    """
    Adiciona item ao carrinho do usuário
    
    Args:
        user_id: ID do usuário
        clothing_id: ID da roupa
        cart_model: Modelo do carrinho
    
    Returns:
        Dict: Resultado da operação
    """
    clothing = next((item for item in MOCK_CLOTHES if item.id == clothing_id), None)
    if not clothing:
        return {"success": False, "message": "Roupa não encontrada"}
    
    result = add_to_cart(
        user_id=user_id,
        item_id=clothing_id,
        name=clothing.name,
        price=clothing.price,
        image_url=clothing.image_url,
        model=cart_model
    )
    
    return {
        "success": result.success,
        "message": result.message,
        "cart_count": result.cart_count
    }

def handle_rent_now(user_id: int, clothing_id: int) -> Dict:
    """
    Processa um aluguel imediato
    
    Args:
        user_id: ID do usuário
        clothing_id: ID da roupa
    
    Returns:
        Dict: Resultado do pagamento
    """
    clothing = next((item for item in MOCK_CLOTHES if item.id == clothing_id), None)
    if not clothing:
        return {"success": False, "message": "Roupa não encontrada"}
    
    # Cálculo do valor base (poderia ter lógica mais complexa)
    base_price = clothing.price
    rental_days = 3  # Valor padrão para aluguel imediato
    total = base_price * rental_days
    
    payment_result = create_payment(
        user_id=user_id,
        amount=total,
        description=f"Aluguel: {clothing.name}",
        rental_days=rental_days
    )
    
    return {
        "success": payment_result.success,
        "payment_id": payment_result.payment_id,
        "amount": format_price(total),
        "rental_days": rental_days
    }

def get_available_categories() -> List[str]:
    """Retorna categorias disponíveis para filtro"""
    return ["Todos", "Vestidos", "Ternos", "Fantasias", "Acessórios"]

def get_sort_options() -> List[Dict]:
    """Retorna opções de ordenação"""
    return [
        {"value": "relevance", "label": "Relevância"},
        {"value": "price_asc", "label": "Preço: menor primeiro"},
        {"value": "price_desc", "label": "Preço: maior primeiro"},
        {"value": "distance", "label": "Mais próximos"},
        {"value": "rating", "label": "Melhores avaliações"}
    ]

def get_clothes_by_filters(filters: Dict) -> List[Dict]:
    """
    Filtra roupas com base nos critérios selecionados
    
    Args:
        filters: Dicionário com filtros aplicados
            Exemplo: {
                "category": "Vestidos",
                "sizes": ["P", "M"],
                "price_min": 50,
                "price_max": 100,
                "distance_max": 5
            }
    
    Returns:
        List[Dict]: Lista de roupas filtradas
    """
    filtered_items = filter_clothes(MOCK_CLOTHES, filters)
    
    return [{
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "image_url": item.image_url,
        "price": format_price(item.price),
        "distance": f"{item.distance_km} km",
        "category": item.category,
        "sizes": item.sizes,
        "rating": item.rating
    } for item in filtered_items]

# ========== EXEMPLO DE USO ==========
if __name__ == "__main__":
    # Testando as funções
    print("=== Destaques ===")
    print(get_featured_clothes())
    
    print("\n=== Carrossel ===")
    print(get_home_carousel())
    
    print("\n=== Categorias ===")
    print(get_available_categories())
    
    print("\n=== Filtros ===")
    filtered = get_clothes_by_filters({
        "category": "Vestidos",
        "price_max": 100
    })
    print(filtered)