import { NextRequest, NextResponse } from 'next/server';
import { verifyEdgeToken } from '@/lib/edge-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Middleware checking path:', pathname);

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;
    console.log('Token found:', token ? 'YES' : 'NO');
    console.log('Token value (first 20 chars):', token ? token.substring(0, 20) + '...' : 'none');

    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-change-this-in-production';
      const payload = await verifyEdgeToken(token, JWT_SECRET);
      console.log('Token valid:', payload ? 'YES' : 'NO');
      console.log('Token payload:', payload);
      
      if (!payload) {
        console.log('Invalid token, redirecting to login');
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin-token');
        return response;
      }

      console.log('Access granted to:', pathname);
    } catch (error) {
      console.log('Error verifying token:', error);
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};