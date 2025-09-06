'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/products';
import { formatPrice } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div 
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          
          {/* Discount Badge */}
          {hasDiscount && (
            <Badge 
              variant="destructive" 
              className="absolute top-3 left-3 z-10"
            >
              -{discountPercentage}%
            </Badge>
          )}
          
          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
          
          {/* Quick Action Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              variant="secondary" 
              className="transform scale-90 group-hover:scale-100 transition-transform duration-300"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Quick View' : 'Unavailable'}
            </Button>
          </div>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            <Link href={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 capitalize">
            {product.category}'s {product.subcategory}
          </p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviews})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-bold text-lg text-gray-900">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
        
        {/* Colors Preview */}
        <div className="flex items-center space-x-1 mb-3">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                    color.toLowerCase() === 'black' ? '#000000' :
                    color.toLowerCase() === 'navy' ? '#001f3f' :
                    color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#6c757d' :
                    color.toLowerCase() === 'brown' ? '#8b4513' :
                    color.toLowerCase() === 'red' ? '#dc3545' :
                    color.toLowerCase() === 'blue' ? '#007bff' :
                    color.toLowerCase() === 'green' ? '#28a745' :
                    color.toLowerCase() === 'pink' ? '#e83e8c' :
                    color.toLowerCase() === 'beige' ? '#f5f5dc' :
                    '#6c757d'
                }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
        
        {/* Sizes Available */}
        <div className="text-xs text-gray-500">
          Sizes: {product.sizes.slice(0, 3).join(', ')}
          {product.sizes.length > 3 && ` +${product.sizes.length - 3} more`}
        </div>
      </div>
    </div>
  );
}