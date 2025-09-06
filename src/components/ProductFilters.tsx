'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { categories, sizes, colors, priceRanges } from '@/lib/products';

interface ProductFiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  category: 'men' | 'women';
}

export function ProductFilters({
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  category
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sizes: true,
    colors: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const relevantSizes = category === 'men' 
    ? sizes.filter(size => ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38'].includes(size))
    : sizes;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-blue-600 hover:text-blue-700"
        >
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex justify-between items-center w-full py-3 border-b border-gray-200"
        >
          <span className="font-medium text-gray-900">Categories</span>
          <span className="text-gray-500">
            {expandedSections.categories ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.categories && (
          <div className="mt-4 space-y-3">
            {categories[category].map((cat) => (
              <div key={cat.id} className="flex items-center space-x-3">
                <a
                  href={`/${category}?category=${cat.id}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {cat.name} ({cat.count})
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full py-3 border-b border-gray-200"
        >
          <span className="font-medium text-gray-900">Price Range</span>
          <span className="text-gray-500">
            {expandedSections.price ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.price && (
          <div className="mt-4">
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                max={1000}
                min={0}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => setPriceRange([range.min, range.max === Infinity ? 1000 : range.max])}
                  className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('sizes')}
          className="flex justify-between items-center w-full py-3 border-b border-gray-200"
        >
          <span className="font-medium text-gray-900">Sizes</span>
          <span className="text-gray-500">
            {expandedSections.sizes ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.sizes && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {relevantSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label 
                  htmlFor={`size-${size}`} 
                  className="text-sm cursor-pointer"
                >
                  {size}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('colors')}
          className="flex justify-between items-center w-full py-3 border-b border-gray-200"
        >
          <span className="font-medium text-gray-900">Colors</span>
          <span className="text-gray-500">
            {expandedSections.colors ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.colors && (
          <div className="mt-4 space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-3">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
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
                <Label 
                  htmlFor={`color-${color}`} 
                  className="text-sm cursor-pointer"
                >
                  {color}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {(selectedSizes.length > 0 || selectedColors.length > 0) && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSizes.map(size => (
              <span
                key={size}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {size}
                <button
                  onClick={() => handleSizeChange(size, false)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
            {selectedColors.map(color => (
              <span
                key={color}
                className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {color}
                <button
                  onClick={() => handleColorChange(color, false)}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}