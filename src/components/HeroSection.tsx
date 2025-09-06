import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://placehold.co/1920x1080?text=Modern+Fashion+Hero+Elegant+Clothing+Store+Interior+Sophisticated"
          alt="Modern fashion store interior with elegant clothing displays"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Perfect Style
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Premium fashion for the modern wardrobe. Explore our curated collection of contemporary clothing for men and women.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/women">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold w-full sm:w-auto">
              Shop Women
            </Button>
          </Link>
          
          <Link href="/men">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold w-full sm:w-auto">
              Shop Men
            </Button>
          </Link>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>🚚</span>
            <span>Free Shipping Over $100</span>
          </div>
          <div className="flex items-center gap-2">
            <span>↩️</span>
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
}