'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchProducts } from '@/lib/products';
import { formatPrice } from '@/lib/cart';

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = searchProducts(query);
      setResults(searchResults.slice(0, 5)); // Show max 5 results
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
      onClose();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          autoFocus
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </form>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              onClick={onClose}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{product.name}</div>
                <div className="text-sm text-gray-600">{formatPrice(product.price)}</div>
              </div>
            </Link>
          ))}
          
          {query.length > 2 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block p-3 text-center text-sm text-blue-600 hover:bg-gray-50 border-t border-gray-100"
              onClick={onClose}
            >
              See all results for "{query}"
            </Link>
          )}
        </div>
      )}
    </div>
  );
}