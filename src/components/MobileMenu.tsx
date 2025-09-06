'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/products';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeSection, setActiveSection] = useState<'main' | 'men' | 'women'>('main');

  if (!isOpen) return null;

  const renderMainMenu = () => (
    <div className="space-y-4">
      <Button
        variant="ghost"
        className="w-full justify-start text-left py-3"
        onClick={() => setActiveSection('men')}
      >
        Men's Clothing →
      </Button>
      
      <Button
        variant="ghost"
        className="w-full justify-start text-left py-3"
        onClick={() => setActiveSection('women')}
      >
        Women's Clothing →
      </Button>
      
      <Link href="/new-arrivals" onClick={onClose}>
        <Button variant="ghost" className="w-full justify-start text-left py-3">
          New Arrivals
        </Button>
      </Link>
      
      <Link href="/sale" onClick={onClose}>
        <Button variant="ghost" className="w-full justify-start text-left py-3 text-red-600">
          Sale
        </Button>
      </Link>
      
      <hr className="my-4" />
      
      <Link href="/login" onClick={onClose}>
        <Button variant="ghost" className="w-full justify-start text-left py-3">
          👤 Account
        </Button>
      </Link>
      
      <Link href="/cart" onClick={onClose}>
        <Button variant="ghost" className="w-full justify-start text-left py-3">
          🛒 Shopping Cart
        </Button>
      </Link>
    </div>
  );

  const renderCategoryMenu = (category: 'men' | 'women') => (
    <div className="space-y-4">
      <Button
        variant="ghost"
        className="w-full justify-start text-left py-3 font-medium"
        onClick={() => setActiveSection('main')}
      >
        ← Back to Main Menu
      </Button>
      
      <hr className="my-4" />
      
      <Link href={`/${category}`} onClick={onClose}>
        <Button variant="ghost" className="w-full justify-start text-left py-3 font-medium">
          All {category === 'men' ? "Men's" : "Women's"} Items
        </Button>
      </Link>
      
      {categories[category].map((subcategory) => (
        <Link
          key={subcategory.id}
          href={`/${category}?category=${subcategory.id}`}
          onClick={onClose}
        >
          <Button variant="ghost" className="w-full justify-start text-left py-3 pl-6">
            {subcategory.name} ({subcategory.count})
          </Button>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl transform transition-transform">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          {activeSection === 'main' && renderMainMenu()}
          {activeSection === 'men' && renderCategoryMenu('men')}
          {activeSection === 'women' && renderCategoryMenu('women')}
        </div>
        
        {/* Contact Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600 text-center">
            <div>Customer Service</div>
            <div className="font-medium">(555) 123-4567</div>
          </div>
        </div>
      </div>
    </div>
  );
}