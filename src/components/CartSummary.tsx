'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function CartSummary() {
  const { cart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cart.total;
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  const tax = (subtotal - discount + shipping) * 0.08; // 8% tax for demo
  const total = subtotal - discount + shipping + tax;

  const handlePromoCode = () => {
    // Simple demo logic - any code gives 10% off
    if (promoCode.trim().length > 0) {
      setPromoApplied(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
      <h2 className="font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Promo Code */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-3">Promo Code</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handlePromoCode}
            disabled={promoApplied || !promoCode.trim()}
            className="whitespace-nowrap"
          >
            Apply
          </Button>
        </div>
        {promoApplied && (
          <p className="text-sm text-green-600 mt-2">✓ Promo code applied!</p>
        )}
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cart.itemCount} items)</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        {promoApplied && (
          <div className="flex justify-between text-green-600">
            <span>Discount (10% off)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <div className="text-right">
            {shipping === 0 ? (
              <div>
                <span className="font-medium text-green-600">Free</span>
                <div className="text-xs text-gray-500">Orders over $100</div>
              </div>
            ) : (
              <span className="font-medium">{formatPrice(shipping)}</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Including taxes and fees</p>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout" className="block">
        <Button size="lg" className="w-full mb-4">
          Proceed to Checkout
        </Button>
      </Link>

      {/* Continue Shopping */}
      <Link href="/">
        <Button variant="outline" size="lg" className="w-full">
          Continue Shopping
        </Button>
      </Link>

      {/* Security Features */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>🔒</span>
          <span>Secure SSL Checkout</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>↩️</span>
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>🚚</span>
          <span>Free shipping over $100</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">We accept</h4>
        <div className="flex space-x-2">
          <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
          <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
          <div className="w-10 h-6 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
            AMEX
          </div>
          <div className="w-10 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">
            PP
          </div>
        </div>
      </div>
    </div>
  );
}