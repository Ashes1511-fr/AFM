import mongoose, { Schema, model, models } from 'mongoose';
import { Product, Category, Admin } from '@/types';

// Product Schema
const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  imageUrls: [{ type: String, required: true }],
  affiliateLink: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// Category Schema
const categorySchema = new Schema<Category>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

// Admin Schema
const adminSchema = new Schema<Admin>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, {
  timestamps: true,
});

// Models
export const ProductModel = models.Product || model<Product>('Product', productSchema);
export const CategoryModel = models.Category || model<Category>('Category', categorySchema);
export const AdminModel = models.Admin || model<Admin>('Admin', adminSchema);