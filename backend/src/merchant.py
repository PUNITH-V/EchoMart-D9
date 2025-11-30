"""
E-commerce merchant module for voice shopping assistant.
Implements product catalog, order management, and merchant functions.
"""

import json
import os
from datetime import datetime
from typing import Optional, List, Dict

# Product catalog
PRODUCTS = [
    # Mugs
    {
        "id": "mug-001",
        "name": "Stoneware Coffee Mug",
        "description": "Handcrafted stoneware mug, 350ml",
        "price": 800,
        "currency": "INR",
        "category": "mug",
        "color": "white",
        "image": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    },
    {
        "id": "mug-002",
        "name": "Blue Travel Mug",
        "description": "Insulated travel mug, 400ml",
        "price": 950,
        "currency": "INR",
        "category": "mug",
        "color": "blue",
        "image": "https://images.unsplash.com/photo-1534889156217-d643df14f14a?w=400&h=400&fit=crop",
    },
    {
        "id": "mug-003",
        "name": "Ceramic Espresso Cup",
        "description": "Small ceramic espresso cup, 100ml",
        "price": 650,
        "currency": "INR",
        "category": "mug",
        "color": "black",
        "image": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=400&fit=crop",
    },
    {
        "id": "mug-004",
        "name": "Red Ceramic Mug",
        "description": "Classic ceramic mug, 300ml",
        "price": 750,
        "currency": "INR",
        "category": "mug",
        "color": "red",
        "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop",
    },
    {
        "id": "mug-005",
        "name": "Green Tea Cup",
        "description": "Elegant tea cup with saucer, 250ml",
        "price": 900,
        "currency": "INR",
        "category": "mug",
        "color": "green",
        "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    },
    # Hoodies
    {
        "id": "hoodie-001",
        "name": "Black Logo Hoodie",
        "description": "Unisex cotton hoodie with logo",
        "price": 1499,
        "currency": "INR",
        "category": "hoodie",
        "color": "black",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    },
    {
        "id": "hoodie-002",
        "name": "Grey Zip Hoodie",
        "description": "Premium zip-up hoodie",
        "price": 1799,
        "currency": "INR",
        "category": "hoodie",
        "color": "grey",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    },
    {
        "id": "hoodie-003",
        "name": "Navy Blue Pullover Hoodie",
        "description": "Warm fleece-lined hoodie",
        "price": 1599,
        "currency": "INR",
        "category": "hoodie",
        "color": "blue",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop",
    },
    {
        "id": "hoodie-004",
        "name": "White Minimalist Hoodie",
        "description": "Clean design cotton hoodie",
        "price": 1399,
        "currency": "INR",
        "category": "hoodie",
        "color": "white",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400&h=400&fit=crop",
    },
    # T-Shirts
    {
        "id": "tshirt-001",
        "name": "White Classic T-Shirt",
        "description": "Soft cotton t-shirt",
        "price": 699,
        "currency": "INR",
        "category": "tshirt",
        "color": "white",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    },
    {
        "id": "tshirt-002",
        "name": "Navy Blue T-Shirt",
        "description": "Premium cotton t-shirt",
        "price": 749,
        "currency": "INR",
        "category": "tshirt",
        "color": "blue",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    },
    {
        "id": "tshirt-003",
        "name": "Black Graphic Tee",
        "description": "Cotton t-shirt with graphic print",
        "price": 799,
        "currency": "INR",
        "category": "tshirt",
        "color": "black",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
    },
    {
        "id": "tshirt-004",
        "name": "Grey V-Neck T-Shirt",
        "description": "Stylish v-neck cotton tee",
        "price": 729,
        "currency": "INR",
        "category": "tshirt",
        "color": "grey",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
    },
    {
        "id": "tshirt-005",
        "name": "Red Polo T-Shirt",
        "description": "Classic polo style t-shirt",
        "price": 899,
        "currency": "INR",
        "category": "tshirt",
        "color": "red",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
    },
    # Caps
    {
        "id": "cap-001",
        "name": "Black Baseball Cap",
        "description": "Classic baseball cap with adjustable strap",
        "price": 499,
        "currency": "INR",
        "category": "cap",
        "color": "black",
        "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    },
    {
        "id": "cap-002",
        "name": "White Sports Cap",
        "description": "Breathable sports cap",
        "price": 549,
        "currency": "INR",
        "category": "cap",
        "color": "white",
        "image": "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&h=400&fit=crop",
    },
    {
        "id": "cap-003",
        "name": "Blue Trucker Cap",
        "description": "Mesh back trucker style cap",
        "price": 599,
        "currency": "INR",
        "category": "cap",
        "color": "blue",
        "image": "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop",
    },
    {
        "id": "cap-004",
        "name": "Grey Snapback Cap",
        "description": "Urban style snapback cap",
        "price": 649,
        "currency": "INR",
        "category": "cap",
        "color": "grey",
        "image": "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=400&h=400&fit=crop",
    },
    # Bags
    {
        "id": "bag-001",
        "name": "Black Backpack",
        "description": "Spacious laptop backpack, 25L",
        "price": 1999,
        "currency": "INR",
        "category": "bag",
        "color": "black",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    },
    {
        "id": "bag-002",
        "name": "Grey Messenger Bag",
        "description": "Professional messenger bag",
        "price": 1799,
        "currency": "INR",
        "category": "bag",
        "color": "grey",
        "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    },
    {
        "id": "bag-003",
        "name": "Blue Gym Bag",
        "description": "Durable gym duffle bag",
        "price": 1499,
        "currency": "INR",
        "category": "bag",
        "color": "blue",
        "image": "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400&h=400&fit=crop",
    },
    {
        "id": "bag-004",
        "name": "Brown Leather Tote",
        "description": "Premium leather tote bag",
        "price": 2499,
        "currency": "INR",
        "category": "bag",
        "color": "brown",
        "image": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    },
    {
        "id": "bag-005",
        "name": "White Canvas Tote",
        "description": "Eco-friendly canvas tote",
        "price": 899,
        "currency": "INR",
        "category": "bag",
        "color": "white",
        "image": "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop",
    },
]

# In-memory orders storage
ORDERS: List[Dict] = []
ORDERS_FILE = "orders.json"


def _load_orders():
    """Load orders from file on startup."""
    global ORDERS
    if os.path.exists(ORDERS_FILE):
        try:
            with open(ORDERS_FILE, "r") as f:
                ORDERS = json.load(f)
        except Exception:
            ORDERS = []


def _save_order(order: Dict):
    """Append order to file."""
    try:
        with open(ORDERS_FILE, "w") as f:
            json.dump(ORDERS, f, indent=2)
    except Exception as e:
        print(f"Error saving order: {e}")


def list_products(filters: Optional[Dict] = None) -> List[Dict]:
    """
    List products with optional filters.
    
    Args:
        filters: Optional dict with keys:
            - category: str (e.g., "mug", "hoodie", "tshirt")
            - max_price: int (maximum price in INR)
            - color: str (e.g., "black", "white", "blue")
    
    Returns:
        List of product dicts matching the filters
    """
    results = PRODUCTS.copy()
    
    if filters:
        if "category" in filters:
            category = filters["category"].lower()
            results = [p for p in results if p["category"] == category]
        
        if "max_price" in filters:
            max_price = int(filters["max_price"])
            results = [p for p in results if p["price"] <= max_price]
        
        if "color" in filters:
            color = filters["color"].lower()
            results = [p for p in results if p.get("color", "").lower() == color]
    
    return results


def create_order(line_items: List[Dict]) -> Dict:
    """
    Create an order from line items.
    
    Args:
        line_items: List of dicts with keys:
            - product_id: str
            - quantity: int
            - size: str (optional, for apparel)
    
    Returns:
        Order dict with id, items, total, currency, created_at
    """
    if not line_items:
        raise ValueError("Cannot create order with empty line items")
    
    # Validate products and compute total
    order_items = []
    total = 0
    
    for item in line_items:
        product_id = item.get("product_id")
        quantity = item.get("quantity", 1)
        size = item.get("size")
        
        # Find product
        product = next((p for p in PRODUCTS if p["id"] == product_id), None)
        if not product:
            raise ValueError(f"Product {product_id} not found")
        
        # Validate size if required
        if "sizes" in product and not size:
            raise ValueError(f"Size required for {product['name']}")
        
        if "sizes" in product and size and size not in product["sizes"]:
            raise ValueError(f"Size {size} not available for {product['name']}")
        
        line_total = product["price"] * quantity
        total += line_total
        
        order_items.append({
            "product_id": product_id,
            "product_name": product["name"],
            "quantity": quantity,
            "size": size,
            "price": product["price"],
            "line_total": line_total,
        })
    
    # Create order
    order_id = f"order_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    order = {
        "id": order_id,
        "items": order_items,
        "total": total,
        "currency": "INR",
        "created_at": datetime.now().isoformat(),
        "status": "completed",
    }
    
    # Save order
    ORDERS.append(order)
    _save_order(order)
    
    return order


def get_last_order() -> Optional[Dict]:
    """
    Get the most recent order.
    
    Returns:
        Most recent order dict or None if no orders exist
    """
    if not ORDERS:
        return None
    return ORDERS[-1]


# Load orders on module import
_load_orders()
