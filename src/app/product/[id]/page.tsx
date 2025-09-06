'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { getProductById, getProductsByCategory } from '@/lib/products';
import { formatPrice } from '@/lib/cart';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { ImageGallery } from '@/components/ImageGallery';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  if (!product) {
    notFound();
  }

  // Get related products from the same category and subcategory
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id && p.subcategory === product.subcategory)
    .slice(0, 4);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    setAddingToCart(true);
    try {
      addToCart(product, selectedSize, selectedColor, quantity);
      // Show success message (could be a toast notification)
      alert('Added to cart successfully!');
    } catch (error) {
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">/</span>
          <a href={`/${product.category}`} className="hover:text-gray-900 capitalize">
            {product.category}
          </a>
          <span className="mx-2">/</span>
          <a href={`/${product.category}?category=${product.subcategory}`} className="hover:text-gray-900 capitalize">
            {product.subcategory}
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 capitalize">
                {product.category}'s {product.subcategory}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400 text-lg">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    -{discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.inStock ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓ In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                Size Guide
              </a>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                      selectedColor === color
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div
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
                    />
                    <span className="text-sm font-medium">{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || addingToCart || !selectedSize || !selectedColor}
                className="w-full py-4 text-lg font-semibold"
                size="lg"
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="py-3">
                  ❤️ Add to Wishlist
                </Button>
                <Button variant="outline" className="py-3">
                  📱 Share
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <span>🚚</span>
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders over $100</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span>↩️</span>
                <div>
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-sm text-gray-600">30-day return policy</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span>🔒</span>
                <div>
                  <div className="font-medium">Secure Payment</div>
                  <div className="text-sm text-gray-600">SSL encrypted checkout</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">You May Also Like</h2>
              <p className="text-gray-600">Similar products in this category</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}