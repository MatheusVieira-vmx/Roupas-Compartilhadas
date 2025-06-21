# utils/formatters.py

def format_price(value: float) -> str:
    """
    Formata um número float para o padrão monetário brasileiro.
    
    Exemplo:
        1299.9 -> 'R$ 1.299,90'
    
    Args:
        value (float): Valor numérico a ser formatado
    
    Returns:
        str: Valor formatado como string
    """
    return f"R$ {value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
