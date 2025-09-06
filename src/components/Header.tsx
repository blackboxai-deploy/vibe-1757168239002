'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from './SearchBar';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
          <div>Free shipping on orders over $100</div>
          <div className="flex items-center space-x-4">
            <span>Customer Service: (555) 123-4567</span>
            <span>|</span>
            <span>Free Returns</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden px-3 py-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </Button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            StyleHub
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/men" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Men
            </Link>
            <Link href="/women" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Women
            </Link>
            <Link href="/new-arrivals" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              New Arrivals
            </Link>
            <Link href="/sale" className="text-red-600 hover:text-red-700 font-medium transition-colors">
              Sale
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              onClick={toggleSearch}
              className="text-gray-700 hover:text-gray-900 px-3 py-2"
            >
              🔍
            </Button>

            {/* User Account */}
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                👤
              </Button>
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                🛒
                {cart.itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                  >
                    {cart.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <SearchBar onClose={toggleSearch} />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}