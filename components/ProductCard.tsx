'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ExternalLink, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
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
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {!imageError && product.imageUrls && product.imageUrls[0] ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              unoptimized={true}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
          {product.price && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
              ₹{product.price.toFixed(2)}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="sm:hidden flex gap-3 p-3">
        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg">
          {!imageError && product.imageUrls && product.imageUrls[0] ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
              onError={() => setImageError(true)}
              unoptimized={true}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <ImageIcon className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product._id || product.id}`}>
            <h3 className="font-semibold text-sm mb-1 line-clamp-2 hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
          
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center">
              {renderStars(product.rating).slice(0, 5).map((star, index) => (
                <div key={index} className="w-3 h-3">
                  {React.cloneElement(star, { className: star.props.className.replace('h-4 w-4', 'h-3 w-3') })}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
          
          {product.price && (
            <div className="text-lg font-bold text-primary mb-1">
              ₹{product.price.toFixed(2)}
            </div>
          )}
          
          <div className="flex gap-1">
            <Button asChild size="sm" className="text-xs px-2 py-1 h-7">
              <Link href={`/product/${product._id || product.id}`}>
                View
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="text-xs px-2 py-1 h-7"
            >
              <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                Deal
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Desktop Content */}
      <CardContent className="hidden sm:block p-4">
        <Link href={`/product/${product._id || product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded-md">{product.category}</span>
        </div>
      </CardContent>
      
      {/* Desktop Footer */}
      <CardFooter className="hidden sm:flex p-4 pt-0 gap-2">
        <Button asChild className="flex-1">
          <Link href={`/product/${product._id || product.id}`}>
            View Details
          </Link>
        </Button>
        
        <Button 
          asChild 
          variant="outline" 
          className="flex-1"
        >
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Go to Deal
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}