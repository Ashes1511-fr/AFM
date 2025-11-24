'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import ProductImageCarousel from '@/components/ProductImageCarousel';
import { Product } from '@/types';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        
        if (!response.ok) {
          setError(true);
          return;
        }
        
        const data = await response.json();
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-gray-200 rounded-md"></div>
                <div className="aspect-square bg-gray-200 rounded-md"></div>
                <div className="aspect-square bg-gray-200 rounded-md"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <ProductImageCarousel 
            images={product.imageUrls || []} 
            productTitle={product.title}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-lg font-medium text-gray-700">
                {product.rating.toFixed(1)} out of 5
              </span>
            </div>
            
            <div className="text-4xl font-bold text-primary mb-6">
              ₹{product.price.toFixed(2)}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Product Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full" 
              onClick={() => window.open(product.affiliateLink, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Get This Deal
            </Button>
            
            <p className="text-sm text-gray-500 text-center">
              * This is an affiliate link. We may earn a commission at no extra cost to you.
            </p>
          </div>

          {/* Key Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Features
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Premium quality materials
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Advanced technology
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Excellent customer reviews
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Competitive pricing
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

