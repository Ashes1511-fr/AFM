'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';
import { Category } from '@/types';

// Mock categories data
const mockCategories: Category[] = [
  { _id: '1', name: 'Electronics', slug: 'electronics', createdAt: new Date('2024-01-01') },
  { _id: '2', name: 'Fitness', slug: 'fitness', createdAt: new Date('2024-01-02') },
  { _id: '3', name: 'Home & Office', slug: 'home-office', createdAt: new Date('2024-01-03') },
  { _id: '4', name: 'Fashion', slug: 'fashion', createdAt: new Date('2024-01-04') },
  { _id: '5', name: 'Books', slug: 'books', createdAt: new Date('2024-01-05') },
  { _id: '6', name: 'Sports', slug: 'sports', createdAt: new Date('2024-01-06') },
  { _id: '7', name: 'Beauty', slug: 'beauty', createdAt: new Date('2024-01-07') },
  { _id: '8', name: 'Automotive', slug: 'automotive', createdAt: new Date('2024-01-08') },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });
  const [loading, setLoading] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData({
      name,
      slug: generateSlug(name)
    });
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCategory) {
        // Update existing category
        setCategories(categories.map(cat => 
          cat._id === editingCategory._id 
            ? { ...cat, name: formData.name, slug: formData.slug }
            : cat
        ));
      } else {
        // Add new category
        const newCategory: Category = {
          _id: Date.now().toString(),
          name: formData.name,
          slug: formData.slug,
          createdAt: new Date(),
        };
        setCategories([...categories, newCategory]);
      }
      
      setIsDialogOpen(false);
      setFormData({ name: '', slug: '' });
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(cat => cat._id !== categoryId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Manage product categories</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="category-slug"
                />
                <p className="text-sm text-gray-600 mt-1">
                  This will be used in the URL: /categories/{formData.slug || 'category-slug'}
                </p>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category._id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FolderOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">/categories/{category.slug}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {category.createdAt?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCategory(category._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600 mb-6">Get started by adding your first category.</p>
              <Button onClick={openAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}