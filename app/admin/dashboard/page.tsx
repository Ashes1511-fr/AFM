'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Package, 
  FolderOpen, 
  Eye, 
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart
} from 'lucide-react';

// Mock stats data
const stats = [
  {
    title: 'Total Products',
    value: '156',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Package,
  },
  {
    title: 'Active Categories',
    value: '8',
    change: '+2',
    changeType: 'positive' as const,
    icon: FolderOpen,
  },
  {
    title: 'Total Views',
    value: '12,345',
    change: '+23%',
    changeType: 'positive' as const,
    icon: Eye,
  },
  {
    title: 'Revenue (Est.)',
    value: '$2,345',
    change: '+15%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
];

const mockProducts = [
  { id: '1', name: 'Premium Wireless Headphones', category: 'Electronics', status: 'Active', price: '₹16,499.99' },
  { id: '2', name: 'Smart Fitness Watch', category: 'Fitness', status: 'Active', price: '₹24,799.99' },
  { id: '3', name: 'Ergonomic Office Chair', category: 'Home & Office', status: 'Active', price: '₹37,199.99' },
  { id: '4', name: 'Bluetooth Speaker', category: 'Electronics', status: 'Draft', price: '₹6,599.99' },
  { id: '5', name: 'Running Shoes', category: 'Fitness', status: 'Active', price: '₹10,749.99' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your affiliate store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/products/add">
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/products">
                <Eye className="mr-2 h-4 w-4" />
                View All Products
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/categories">
                <FolderOpen className="mr-2 h-4 w-4" />
                Manage Categories
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/">
                <Eye className="mr-2 h-4 w-4" />
                View Public Site
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.price}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/admin/products">
                View All Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Growing Traffic</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your site traffic has increased by 23% this month. Keep up the great work!
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Engaged Users</h3>
              <p className="text-sm text-gray-600 mt-1">
                Users are spending more time browsing your products and clicking affiliate links.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Higher Conversions</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your affiliate conversion rate has improved by 15% compared to last month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}