'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/CartItem';
import { CartSummary } from '@/components/CartSummary';

export default function CartPage() {
  const { cart, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cart.items.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/women">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                  Shop Women's Collection
                </Button>
              </Link>
              <Link href="/men">
                <Button size="lg" variant="outline">
                  Shop Men's Collection
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Items in your cart</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="flex justify-between items-center">
                <Link href="/">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>←</span>
                    <span>Continue Shopping</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {cart.items.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended for you</h2>
              <p className="text-gray-600">Complete your look with these items</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* This would typically show recommended products based on cart contents */}
              <div className="text-center text-gray-500 col-span-full">
                <p>Recommended products would appear here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}