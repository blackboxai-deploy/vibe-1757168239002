import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections designed for every style and occasion
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Men's Category */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl">
            <div className="aspect-[4/3] relative">
              <img
                src="https://placehold.co/800x600?text=Men+Fashion+Collection+Sophisticated+Business+Casual+Modern+Style"
                alt="Men's fashion collection featuring sophisticated business and casual wear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-3xl font-bold mb-3">Men's Collection</h3>
                  <p className="text-lg mb-6 opacity-90">
                    From sharp business attire to relaxed weekend wear, discover styles that define modern masculinity.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Link href="/men?category=shirts">
                      <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                        Shirts
                      </Button>
                    </Link>
                    <Link href="/men?category=pants">
                      <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                        Pants
                      </Button>
                    </Link>
                    <Link href="/men?category=outerwear">
                      <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                        Outerwear
                      </Button>
                    </Link>
                  </div>
                  
                  <Link href="/men">
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                      Shop Men's Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Women's Category */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl">
            <div className="aspect-[4/3] relative">
              <img
                src="https://placehold.co/800x600?text=Women+Fashion+Collection+Elegant+Dresses+Contemporary+Chic+Style"
                alt="Women's fashion collection featuring elegant dresses and contemporary chic styles"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-3xl font-bold mb-3">Women's Collection</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Elegant pieces that celebrate femininity with contemporary flair and timeless sophistication.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Link href="/women?category=dresses">
                      <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                        Dresses
                      </Button>
                    </Link>
                    <Link href="/women?category=tops">
                      <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                        Tops
                      </Button>
                    </Link>
                    <Link href="/women?category=bottoms">
                      <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                        Bottoms
                      </Button>
                    </Link>
                  </div>
                  
                  <Link href="/women">
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                      Shop Women's Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Carefully selected materials and expert craftsmanship in every piece</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="font-semibold mb-2">Sustainable Fashion</h3>
            <p className="text-gray-600">Committed to environmentally responsible practices and ethical manufacturing</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl mb-4">📏</div>
            <h3 className="font-semibold mb-2">Perfect Fit</h3>
            <p className="text-gray-600">Comprehensive size guide and easy returns to ensure the perfect fit</p>
          </div>
        </div>
      </div>
    </section>
  );
}