'use client';

import { useState, useEffect } from 'react';
import { Cart, CartManager } from '@/lib/cart';
import { Product } from '@/lib/products';

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage on mount
    const loadedCart = CartManager.getCart();
    setCart(loadedCart);
    setIsLoading(false);
  }, []);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity: number = 1) => {
    const updatedCart = CartManager.addItem(product, selectedSize, selectedColor, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = CartManager.removeItem(itemId);
    setCart(updatedCart);
    return updatedCart;
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedCart = CartManager.updateQuantity(itemId, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  const clearCart = () => {
    const updatedCart = CartManager.clearCart();
    setCart(updatedCart);
    return updatedCart;
  };

  const getItemInCart = (productId: string, size: string, color: string) => {
    const itemId = `${productId}-${size}-${color}`;
    return cart.items.find(item => item.id === itemId);
  };

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemInCart
  };
}