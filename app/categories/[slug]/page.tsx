import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { Product, Category, ProductFilters as ProductFiltersType } from '@/types';

// Mock data
const mockCategories: Category[] = [
  { _id: '1', name: 'Electronics', slug: 'electronics' },
  { _id: '2', name: 'Fitness', slug: 'fitness' },
  { _id: '3', name: 'Home & Office', slug: 'home-office' },
  { _id: '4', name: 'Fashion', slug: 'fashion' },
];

const mockProducts: Product[] = [
  {
    _id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 199.99,
    category: 'Electronics',
    rating: 4.5,
    imageUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
    affiliateLink: 'https://example.com/headphones',
    isActive: true,
  },
  {
    _id: '4',
    title: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with excellent sound quality.',
    price: 79.99,
    category: 'Electronics',
    rating: 4.2,
    imageUrls: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop'],
    affiliateLink: 'https://example.com/speaker',
    isActive: true,
  },
  {
    _id: '2',
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch.',
    price: 299.99,
    category: 'Fitness',
    rating: 4.8,
    imageUrls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'],
    affiliateLink: 'https://example.com/smartwatch',
    isActive: true,
  },
  {
    _id: '5',
    title: 'Running Shoes',
    description: 'Comfortable running shoes with advanced cushioning.',
    price: 129.99,
    category: 'Fitness',
    rating: 4.6,
    imageUrls: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'],
    affiliateLink: 'https://example.com/running-shoes',
    isActive: true,
  },
];

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = mockProducts.filter(p => 
    p.category.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-xl text-gray-600">
          Discover the best {category.name.toLowerCase()} products with amazing deals
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found in this category
          </h3>
          <p className="text-gray-600 mb-4">
            Check back soon for new products in {category.name}!
          </p>
          <Button asChild>
            <a href="/products">Browse All Products</a>
          </Button>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = mockCategories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found - AffiliateHub',
    };
  }

  return {
    title: `${category.name} Products - AffiliateHub`,
    description: `Discover the best ${category.name.toLowerCase()} products with amazing deals and discounts.`,
    keywords: `${category.name}, deals, products, affiliate, shopping`,
  };
}