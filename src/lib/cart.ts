import { Product } from './products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export class CartManager {
  private static STORAGE_KEY = 'clothing-store-cart';

  static getCart(): Cart {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, itemCount: 0 };
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const cart = JSON.parse(stored);
        return this.calculateTotals(cart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }

    return { items: [], total: 0, itemCount: 0 };
  }

  static saveCart(cart: Cart): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  static addItem(product: Product, selectedSize: string, selectedColor: string, quantity: number = 1): Cart {
    const cart = this.getCart();
    const itemId = `${product.id}-${selectedSize}-${selectedColor}`;
    
    const existingItemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: itemId,
        product,
        quantity,
        selectedSize,
        selectedColor
      };
      cart.items.push(newItem);
    }
    
    const updatedCart = this.calculateTotals(cart);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static removeItem(itemId: string): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    
    const updatedCart = this.calculateTotals(cart);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static updateQuantity(itemId: string, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        return this.removeItem(itemId);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }
    
    const updatedCart = this.calculateTotals(cart);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static clearCart(): Cart {
    const emptyCart = { items: [], total: 0, itemCount: 0 };
    this.saveCart(emptyCart);
    return emptyCart;
  }

  private static calculateTotals(cart: Cart): Cart {
    let total = 0;
    let itemCount = 0;

    cart.items.forEach(item => {
      total += item.product.price * item.quantity;
      itemCount += item.quantity;
    });

    return {
      ...cart,
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
      itemCount
    };
  }

  static getItemCount(): number {
    return this.getCart().itemCount;
  }

  static getCartTotal(): number {
    return this.getCart().total;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}