'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  Plus,
  LogOut,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    name: 'Add Product',
    href: '/admin/products/add',
    icon: Plus,
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: FolderOpen,
  },
];

interface AdminSidebarProps {
  onLogout?: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}