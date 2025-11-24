'use client';

import { Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminNavbarProps {
  onMenuClick?: () => void;
  title?: string;
}

export default function AdminNavbar({ onMenuClick, title = 'Dashboard' }: AdminNavbarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-4"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}