'use client';

import Link from 'next/link';
import { CartItem as CartItemType } from '@/lib/cart';
import { formatPrice } from '@/lib/cart';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="p-6 flex flex-col sm:flex-row gap-6">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link href={`/product/${item.product.id}`}>
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-3">
        <div>
          <Link 
            href={`/product/${item.product.id}`}
            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {item.product.name}
          </Link>
          <p className="text-sm text-gray-600 capitalize">
            {item.product.category}'s {item.product.subcategory}
          </p>
        </div>

        {/* Selected Options */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Size:</span>
            <span className="font-medium">{item.selectedSize}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Color:</span>
            <div className="flex items-center space-x-1">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor: item.selectedColor.toLowerCase() === 'white' ? '#ffffff' :
                    item.selectedColor.toLowerCase() === 'black' ? '#000000' :
                    item.selectedColor.toLowerCase() === 'navy' ? '#001f3f' :
                    item.selectedColor.toLowerCase() === 'grey' || item.selectedColor.toLowerCase() === 'gray' ? '#6c757d' :
                    item.selectedColor.toLowerCase() === 'brown' ? '#8b4513' :
                    item.selectedColor.toLowerCase() === 'red' ? '#dc3545' :
                    item.selectedColor.toLowerCase() === 'blue' ? '#007bff' :
                    item.selectedColor.toLowerCase() === 'green' ? '#28a745' :
                    item.selectedColor.toLowerCase() === 'pink' ? '#e83e8c' :
                    item.selectedColor.toLowerCase() === 'beige' ? '#f5f5dc' :
                    '#6c757d'
                }}
              />
              <span className="font-medium">{item.selectedColor}</span>
            </div>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
              >
                −
              </button>
              <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Remove
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
              Save for later
            </Button>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <div className="font-semibold text-lg text-gray-900">
          {formatPrice(itemTotal)}
        </div>
        {item.quantity > 1 && (
          <div className="text-sm text-gray-600">
            {formatPrice(item.product.price)} each
          </div>
        )}
      </div>
    </div>
  );
}