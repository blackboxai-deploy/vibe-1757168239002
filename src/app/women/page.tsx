'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductsByCategory, categories } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductFilters } from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';

export default function WomenPage() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get('category');
  
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allWomenProducts = getProductsByCategory('women', selectedCategory || undefined);
  
  const filteredProducts = useMemo(() => {
    let products = allWomenProducts.filter(product => {
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Size filter
      if (selectedSizes.length > 0) {
        if (!selectedSizes.some(size => product.sizes.includes(size))) {
          return false;
        }
      }
      
      // Color filter
      if (selectedColors.length > 0) {
        if (!selectedColors.some(color => product.colors.includes(color))) {
          return false;
        }
      }
      
      return true;
    });
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        products = products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products = products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products = products.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        products = products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    return products;
  }, [allWomenProducts, sortBy, priceRange, selectedSizes, selectedColors]);

  const categoryName = selectedCategory 
    ? categories.women.find(cat => cat.id === selectedCategory)?.name 
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {categoryName ? `Women's ${categoryName}` : "Women's Collection"}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              {categoryName 
                ? `Explore our elegant selection of women's ${categoryName.toLowerCase()}`
                : "Elegant designs that celebrate your unique style. Discover premium womenswear for every moment."
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.women.map((category) => (
                <a
                  key={category.id}
                  href={`/women?category=${category.id}`}
                  className={`px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-gray-900 transition-colors ${
                    selectedCategory === category.id ? 'bg-white text-gray-900' : 'text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ProductFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              category="women"
            />
          </div>

          {/* Main Product Area */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {categoryName ? `Women's ${categoryName}` : "Women's Clothing"}
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  🔍 Filters
                </Button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-8 p-4 bg-white rounded-lg shadow">
                <ProductFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedSizes={selectedSizes}
                  setSelectedSizes={setSelectedSizes}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  category="women"
                />
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">👗</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or browse our other collections
                </p>
                <Button
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}