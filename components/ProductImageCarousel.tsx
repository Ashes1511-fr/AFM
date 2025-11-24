'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageCarouselProps {
  images: string[];
  productTitle: string;
}

export default function ProductImageCarousel({ images, productTitle }: ProductImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>(new Array(images.length).fill(false));

  const validImages = images.filter(img => img && img.trim() !== '');
  
  if (validImages.length === 0) {
    return (
      <div className="aspect-square relative overflow-hidden rounded-lg border bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No image available</p>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  const currentImage = validImages[currentImageIndex];
  const currentImageHasError = imageErrors[currentImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative overflow-hidden rounded-lg border bg-gray-100">
        {!currentImageHasError && currentImage ? (
          <Image
            src={currentImage}
            alt={`${productTitle} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority={currentImageIndex === 0}
            unoptimized={true}
            onError={() => handleImageError(currentImageIndex)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Image unavailable</p>
            </div>
          </div>
        )}
        
        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentImageIndex + 1} / {validImages.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail Gallery */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square relative overflow-hidden rounded-md border-2 transition-all ${
                index === currentImageIndex 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {!imageErrors[index] && image ? (
                <Image
                  src={image}
                  alt={`${productTitle} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={true}
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageIcon className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}