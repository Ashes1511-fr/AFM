'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { Product, Category, ProductFilters as ProductFiltersType, PaginationData } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      searchParams.set('page', pagination.page.toString());
      searchParams.set('limit', pagination.limit.toString());
      
      if (filters.search) searchParams.set('search', filters.search);
      if (filters.category) searchParams.set('category', filters.category);
      if (filters.minPrice !== undefined) searchParams.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) searchParams.set('maxPrice', filters.maxPrice.toString());
      if (filters.minRating !== undefined) searchParams.set('minRating', filters.minRating.toString());
      if (filters.sortBy) searchParams.set('sortBy', filters.sortBy);

      const response = await fetch(`/api/products?${searchParams.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setPagination(data.pagination);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      } else {
        // Fallback to default categories if API fails
        setCategories([
          { _id: '1', name: 'Electronics', slug: 'electronics' },
          { _id: '2', name: 'Fitness', slug: 'fitness' },
          { _id: '3', name: 'Home & Office', slug: 'home-office' },
          { _id: '4', name: 'Fashion', slug: 'fashion' },
          { _id: '5', name: 'Books', slug: 'books' },
          { _id: '6', name: 'Sports', slug: 'sports' },
          { _id: '7', name: 'Beauty', slug: 'beauty' },
          { _id: '8', name: 'Automotive', slug: 'automotive' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback categories
      setCategories([
        { _id: '1', name: 'Electronics', slug: 'electronics' },
        { _id: '2', name: 'Fitness', slug: 'fitness' },
        { _id: '3', name: 'Home & Office', slug: 'home-office' },
        { _id: '4', name: 'Fashion', slug: 'fashion' },
        { _id: '5', name: 'Books', slug: 'books' },
        { _id: '6', name: 'Sports', slug: 'sports' },
        { _id: '7', name: 'Beauty', slug: 'beauty' },
        { _id: '8', name: 'Automotive', slug: 'automotive' },
      ]);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when filters or pagination changes
  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.page]);

  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Products
        </h1>
        <p className="text-xl text-gray-600">
          Discover amazing products with the best deals
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar - Hidden on mobile, shown in overlay */}
        <div className="hidden lg:block lg:w-80">
          <ProductFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            categories={categories}
          />
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Mobile Filters */}
          <div className="lg:hidden mb-4">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              categories={categories}
            />
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm">
              Showing {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)}-
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : products.length > 0 ? (
            <>
              {/* Desktop Grid */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Mobile List */}
              <div className="sm:hidden space-y-3 mb-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === pagination.page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={() => setFilters({})}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}