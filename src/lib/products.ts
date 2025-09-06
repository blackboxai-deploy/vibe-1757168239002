export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'men' | 'women';
  subcategory: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export const products: Product[] = [
  // Men's Clothing
  {
    id: "m1",
    name: "Classic White Dress Shirt",
    description: "Premium cotton dress shirt perfect for formal occasions and business meetings. Features button-down collar and French cuffs.",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://placehold.co/400x500?text=Classic+White+Dress+Shirt+Premium+Cotton+Formal+Business",
    images: [
      "https://placehold.co/400x500?text=Classic+White+Dress+Shirt+Premium+Cotton+Formal+Business",
      "https://placehold.co/400x500?text=White+Dress+Shirt+Close+Up+Collar+Details",
      "https://placehold.co/400x500?text=White+Dress+Shirt+Back+View+Tailored+Fit"
    ],
    category: "men",
    subcategory: "shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Navy"],
    inStock: true,
    rating: 4.5,
    reviews: 128,
    featured: true
  },
  {
    id: "m2",
    name: "Slim Fit Dark Jeans",
    description: "Modern slim-fit jeans crafted from premium denim with stretch for comfort. Perfect for casual and smart-casual looks.",
    price: 79.99,
    image: "https://placehold.co/400x500?text=Slim+Fit+Dark+Denim+Jeans+Premium+Stretch+Casual",
    images: [
      "https://placehold.co/400x500?text=Slim+Fit+Dark+Denim+Jeans+Premium+Stretch+Casual",
      "https://placehold.co/400x500?text=Dark+Jeans+Side+View+Slim+Fit+Profile",
      "https://placehold.co/400x500?text=Denim+Jeans+Pocket+Detail+Quality+Stitching"
    ],
    category: "men",
    subcategory: "pants",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Black", "Grey"],
    inStock: true,
    rating: 4.3,
    reviews: 89,
    featured: true
  },
  {
    id: "m3",
    name: "Leather Bomber Jacket",
    description: "Genuine leather bomber jacket with quilted lining. Classic style meets modern comfort with ribbed cuffs and waistband.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://placehold.co/400x500?text=Leather+Bomber+Jacket+Genuine+Quilted+Lining+Classic",
    images: [
      "https://placehold.co/400x500?text=Leather+Bomber+Jacket+Genuine+Quilted+Lining+Classic",
      "https://placehold.co/400x500?text=Leather+Bomber+Side+View+Ribbed+Details",
      "https://placehold.co/400x500?text=Bomber+Jacket+Interior+Quilted+Lining+Premium"
    ],
    category: "men",
    subcategory: "outerwear",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Brown", "Navy"],
    inStock: true,
    rating: 4.7,
    reviews: 45,
    featured: true
  },
  {
    id: "m4",
    name: "Cotton Polo Shirt",
    description: "Classic cotton polo shirt with three-button placket. Comfortable fit perfect for weekend casual or golf.",
    price: 49.99,
    image: "https://placehold.co/400x500?text=Cotton+Polo+Shirt+Classic+Three+Button+Weekend+Casual",
    images: [
      "https://placehold.co/400x500?text=Cotton+Polo+Shirt+Classic+Three+Button+Weekend+Casual",
      "https://placehold.co/400x500?text=Polo+Shirt+Collar+Detail+Button+Placket",
      "https://placehold.co/400x500?text=Cotton+Polo+Back+View+Clean+Lines"
    ],
    category: "men",
    subcategory: "shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Navy", "Red", "Green"],
    inStock: true,
    rating: 4.2,
    reviews: 67
  },
  {
    id: "m5",
    name: "Wool Blend Blazer",
    description: "Sophisticated wool blend blazer perfect for business or formal events. Tailored fit with notched lapels and functional buttons.",
    price: 199.99,
    image: "https://placehold.co/400x500?text=Wool+Blend+Blazer+Sophisticated+Business+Formal+Tailored",
    images: [
      "https://placehold.co/400x500?text=Wool+Blend+Blazer+Sophisticated+Business+Formal+Tailored",
      "https://placehold.co/400x500?text=Wool+Blazer+Lapel+Detail+Notched+Professional",
      "https://placehold.co/400x500?text=Blazer+Interior+Lining+Quality+Construction"
    ],
    category: "men",
    subcategory: "outerwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Charcoal", "Black"],
    inStock: true,
    rating: 4.6,
    reviews: 34
  },

  // Women's Clothing
  {
    id: "w1",
    name: "Silk Blouse",
    description: "Elegant silk blouse with delicate button details and flowing fit. Perfect for office wear or evening occasions.",
    price: 129.99,
    originalPrice: 180.00,
    image: "https://placehold.co/400x500?text=Elegant+Silk+Blouse+Delicate+Button+Details+Office+Evening",
    images: [
      "https://placehold.co/400x500?text=Elegant+Silk+Blouse+Delicate+Button+Details+Office+Evening",
      "https://placehold.co/400x500?text=Silk+Blouse+Button+Detail+Flowing+Fabric",
      "https://placehold.co/400x500?text=Silk+Blouse+Back+View+Elegant+Drape"
    ],
    category: "women",
    subcategory: "tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Navy", "Blush", "Black"],
    inStock: true,
    rating: 4.8,
    reviews: 156,
    featured: true
  },
  {
    id: "w2",
    name: "High-Waisted Skinny Jeans",
    description: "Flattering high-waisted skinny jeans with stretch denim for all-day comfort. Classic five-pocket styling.",
    price: 89.99,
    image: "https://placehold.co/400x500?text=High+Waisted+Skinny+Jeans+Stretch+Denim+Comfort+Classic",
    images: [
      "https://placehold.co/400x500?text=High+Waisted+Skinny+Jeans+Stretch+Denim+Comfort+Classic",
      "https://placehold.co/400x500?text=Skinny+Jeans+Side+Profile+High+Waist+Fit",
      "https://placehold.co/400x500?text=Jeans+Pocket+Detail+Five+Pocket+Styling"
    ],
    category: "women",
    subcategory: "bottoms",
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Dark Blue", "Black", "Light Blue"],
    inStock: true,
    rating: 4.4,
    reviews: 203,
    featured: true
  },
  {
    id: "w3",
    name: "Floral Midi Dress",
    description: "Romantic floral midi dress with three-quarter sleeves and A-line silhouette. Perfect for spring and summer occasions.",
    price: 149.99,
    image: "https://placehold.co/400x500?text=Floral+Midi+Dress+Romantic+Three+Quarter+Sleeves+Spring",
    images: [
      "https://placehold.co/400x500?text=Floral+Midi+Dress+Romantic+Three+Quarter+Sleeves+Spring",
      "https://placehold.co/400x500?text=Midi+Dress+A+Line+Silhouette+Flowing",
      "https://placehold.co/400x500?text=Floral+Dress+Sleeve+Detail+Quarter+Length"
    ],
    category: "women",
    subcategory: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Blue", "Floral Pink", "Floral Green"],
    inStock: true,
    rating: 4.6,
    reviews: 78,
    featured: true
  },
  {
    id: "w4",
    name: "Cashmere Cardigan",
    description: "Luxurious cashmere cardigan with button closure and ribbed trim. Soft, lightweight comfort for layering.",
    price: 189.99,
    originalPrice: 250.00,
    image: "https://placehold.co/400x500?text=Cashmere+Cardigan+Luxurious+Button+Closure+Ribbed+Trim",
    images: [
      "https://placehold.co/400x500?text=Cashmere+Cardigan+Luxurious+Button+Closure+Ribbed+Trim",
      "https://placehold.co/400x500?text=Cashmere+Cardigan+Button+Detail+Soft+Texture",
      "https://placehold.co/400x500?text=Cardigan+Ribbed+Trim+Detail+Premium+Quality"
    ],
    category: "women",
    subcategory: "outerwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Navy", "Pink", "Grey"],
    inStock: true,
    rating: 4.9,
    reviews: 92,
    featured: true
  },
  {
    id: "w5",
    name: "Pleated Mini Skirt",
    description: "Trendy pleated mini skirt in premium fabric. Perfect for pairing with blouses or casual tops for versatile styling.",
    price: 69.99,
    image: "https://placehold.co/400x500?text=Pleated+Mini+Skirt+Trendy+Premium+Fabric+Versatile+Styling",
    images: [
      "https://placehold.co/400x500?text=Pleated+Mini+Skirt+Trendy+Premium+Fabric+Versatile+Styling",
      "https://placehold.co/400x500?text=Mini+Skirt+Pleated+Detail+Movement+Flow",
      "https://placehold.co/400x500?text=Pleated+Skirt+Waistband+Detail+Clean+Finish"
    ],
    category: "women",
    subcategory: "bottoms",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy", "Camel"],
    inStock: true,
    rating: 4.3,
    reviews: 134
  },
  {
    id: "w6",
    name: "Wrap Top",
    description: "Versatile wrap top with tie closure and flattering V-neckline. Comfortable jersey fabric perfect for any occasion.",
    price: 59.99,
    image: "https://placehold.co/400x500?text=Wrap+Top+Versatile+Tie+Closure+V+Neckline+Jersey+Fabric",
    images: [
      "https://placehold.co/400x500?text=Wrap+Top+Versatile+Tie+Closure+V+Neckline+Jersey+Fabric",
      "https://placehold.co/400x500?text=Wrap+Top+Tie+Detail+Flattering+Waist",
      "https://placehold.co/400x500?text=Wrap+Top+V+Neckline+Elegant+Drape"
    ],
    category: "women",
    subcategory: "tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Red", "Navy"],
    inStock: true,
    rating: 4.5,
    reviews: 87
  }
];

export const categories = {
  men: [
    { id: 'shirts', name: 'Shirts', count: products.filter(p => p.category === 'men' && p.subcategory === 'shirts').length },
    { id: 'pants', name: 'Pants', count: products.filter(p => p.category === 'men' && p.subcategory === 'pants').length },
    { id: 'outerwear', name: 'Outerwear', count: products.filter(p => p.category === 'men' && p.subcategory === 'outerwear').length }
  ],
  women: [
    { id: 'tops', name: 'Tops', count: products.filter(p => p.category === 'women' && p.subcategory === 'tops').length },
    { id: 'bottoms', name: 'Bottoms', count: products.filter(p => p.category === 'women' && p.subcategory === 'bottoms').length },
    { id: 'dresses', name: 'Dresses', count: products.filter(p => p.category === 'women' && p.subcategory === 'dresses').length },
    { id: 'outerwear', name: 'Outerwear', count: products.filter(p => p.category === 'women' && p.subcategory === 'outerwear').length }
  ]
};

export function getProductsByCategory(category: 'men' | 'women', subcategory?: string): Product[] {
  return products.filter(product => {
    if (subcategory) {
      return product.category === category && product.subcategory === subcategory;
    }
    return product.category === category;
  });
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function searchProducts(query: string, category?: 'men' | 'women'): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.subcategory.toLowerCase().includes(searchTerm);
    
    if (category) {
      return matchesSearch && product.category === category;
    }
    
    return matchesSearch;
  });
}

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '24', '26', '28', '30', '32', '34', '36', '38'];
export const colors = ['Black', 'White', 'Navy', 'Grey', 'Brown', 'Red', 'Blue', 'Green', 'Pink', 'Beige'];
export const priceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200+', min: 200, max: Infinity }
];