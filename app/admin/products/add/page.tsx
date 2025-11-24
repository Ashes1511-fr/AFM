'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';

const categories = [
  'Electronics',
  'Fitness',
  'Home & Office',
  'Fashion',
  'Books',
  'Sports',
  'Beauty',
  'Automotive',
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    rating: '',
    affiliateLink: '',
    isActive: true,
  });
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreviews(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For now, we'll use image URLs. In production, you'd upload files to a storage service
      const validImageUrls = imageUrls.filter(url => url.trim() !== '');
      const allImages = [...validImageUrls, ...imagePreviews];
      
      if (allImages.length === 0) {
        alert('Please add at least one image (URL or upload)');
        setLoading(false);
        return;
      }
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        imageUrls: allImages,
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        const data = await response.json();
        console.error('Product creation error:', data);
        alert(data.message || 'Failed to create product');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">Create a new product for your affiliate store</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rating and Affiliate Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="rating">Rating (1-5) *</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={handleInputChange}
                  placeholder="4.5"
                />
              </div>
              
              <div>
                <Label htmlFor="affiliateLink">Affiliate Link *</Label>
                <Input
                  id="affiliateLink"
                  name="affiliateLink"
                  type="url"
                  required
                  value={formData.affiliateLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com/product"
                />
              </div>
            </div>

            {/* Product Images */}
            <div>
              <Label className="text-base font-medium">Product Images</Label>
              <p className="text-sm text-gray-600 mb-4">
                Add images using URLs or upload files. At least one image is recommended.
              </p>

              {/* File Upload Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Upload Images</Label>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Files
                      </span>
                    </Button>
                  </Label>
                </div>
                
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative overflow-hidden rounded-lg border bg-gray-50">
                          <img
                            src={preview}
                            alt={`Upload preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeUploadedFile(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-center mt-1 text-gray-500 truncate">
                          {uploadedFiles[index]?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Image URLs Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Image URLs</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addImageUrl}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add URL
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      {imageUrls.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeImageUrl(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <Select 
                value={formData.isActive ? 'active' : 'inactive'} 
                onValueChange={(value) => setFormData({ ...formData, isActive: value === 'active' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/products">
              Cancel
            </Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}