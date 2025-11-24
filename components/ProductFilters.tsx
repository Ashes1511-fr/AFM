'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductFilters as ProductFiltersType, Category } from '@/types';
import { Filter, X } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
  categories: Category[];
}

export default function ProductFilters({ filters, onFiltersChange, categories }: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ProductFiltersType>(filters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof ProductFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: ProductFiltersType = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters & Search
        </Button>
      </div>

      {/* Desktop Filters */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Filters</span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search for products..."
              value={localFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select 
              value={localFilters.category || 'all'} 
              onValueChange={(value) => handleFilterChange('category', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.filter(category => category.name && category.name.trim()).map((category) => (
                  <SelectItem key={category._id || category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label>Price Range ($)</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <Input
                  type="number"
                  placeholder="Min"
                  value={localFilters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max"
                  value={localFilters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label>Minimum Rating</Label>
            <Select 
              value={localFilters.minRating?.toString() || 'any'} 
              onValueChange={(value) => handleFilterChange('minRating', value === 'any' ? undefined : Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any rating</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="3">3+ stars</SelectItem>
                <SelectItem value="2">2+ stars</SelectItem>
                <SelectItem value="1">1+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <Label>Sort By</Label>
            <Select 
              value={localFilters.sortBy || 'latest'} 
              onValueChange={(value) => handleFilterChange('sortBy', value as ProductFiltersType['sortBy'])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-full overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters & Search</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="mobile-search">Search Products</Label>
                  <Input
                    id="mobile-search"
                    type="text"
                    placeholder="Search for products..."
                    value={localFilters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={localFilters.category || 'all'} 
                    onValueChange={(value) => handleFilterChange('category', value === 'all' ? undefined : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.filter(category => category.name && category.name.trim()).map((category) => (
                        <SelectItem key={category._id || category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label>Price Range (₹)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <Input
                        type="number"
                        placeholder="Min"
                        value={localFilters.minPrice || ''}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={localFilters.maxPrice || ''}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <Label>Minimum Rating</Label>
                  <Select 
                    value={localFilters.minRating?.toString() || 'any'} 
                    onValueChange={(value) => handleFilterChange('minRating', value === 'any' ? undefined : Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any rating</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="3">3+ stars</SelectItem>
                      <SelectItem value="2">2+ stars</SelectItem>
                      <SelectItem value="1">1+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <Label>Sort By</Label>
                  <Select 
                    value={localFilters.sortBy || 'latest'} 
                    onValueChange={(value) => handleFilterChange('sortBy', value as ProductFiltersType['sortBy'])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={clearFilters} className="flex-1">
                    Clear All
                  </Button>
                  <Button onClick={() => setIsMobileFilterOpen(false)} className="flex-1">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}