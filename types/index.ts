export interface Product {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  imageUrls: string[];
  affiliateLink: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}

export interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Admin {
  _id?: string;
  id?: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'latest' | 'price-low' | 'price-high' | 'rating';
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}