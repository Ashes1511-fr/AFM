'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push('/admin/login');
    }
  };

  const getPageTitle = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length <= 1) return 'Dashboard';
    
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative z-20 h-full`}>
        <AdminSidebar onLogout={handleLogout} />
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar 
          title={getPageTitle()}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}