import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';

// Mock data - in production, this would come from your database
const featuredProducts: Product[] = [
  {
    _id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 199.99,
    category: 'Electronics',
    rating: 4.5,
    imageUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
    affiliateLink: 'https://example.com/headphones',
    isActive: true,
  },
  {
    _id: '2',
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring GPS and heart rate monitoring.',
    price: 299.99,
    category: 'Fitness',
    rating: 4.8,
    imageUrls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'],
    affiliateLink: 'https://example.com/smartwatch',
    isActive: true,
  },
  {
    _id: '3',
    title: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support and adjustable height.',
    price: 449.99,
    category: 'Home & Office',
    rating: 4.3,
    imageUrls: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop'],
    affiliateLink: 'https://example.com/office-chair',
    isActive: true,
  },
];

const categories: Category[] = [
  { _id: '1', name: 'Electronics', slug: 'electronics' },
  { _id: '2', name: 'Fitness', slug: 'fitness' },
  { _id: '3', name: 'Home & Office', slug: 'home-office' },
  { _id: '4', name: 'Fashion', slug: 'fashion' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div 
          className="absolute inset-0 bg-black opacity-50"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">LuminexCo</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience premium quality products with exclusive deals and exceptional value. 
              Your trusted partner for superior affiliate offerings and luxury experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Explore our wide range of product categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category._id} 
                href={`/categories/${category.slug}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Check out our hand-picked selection of the best products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LuminexCo?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  🏆 Best Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  We curate only the best deals and products from trusted brands and retailers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  ⚡ Fast & Secure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Quick access to deals with secure affiliate links to protect your shopping experience.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  🎯 Personalized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Advanced filtering and search to find exactly what you're looking for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}