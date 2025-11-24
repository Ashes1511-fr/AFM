import { NextRequest, NextResponse } from 'next/server';
import { comparePasswords } from '@/lib/auth';
import { generateEdgeToken } from '@/lib/edge-auth';
import dbConnect from '@/lib/mongodb';
import { AdminModel } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called');
    const { email, password } = await request.json();
    console.log('Received credentials:', { email, password: '***' });

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Admin credentials
    if (email === 'workwithme153@gmail.com' && password === 'Work@1511#') {
      console.log('Admin credentials matched, generating token...');
      
      try {
        const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-change-this-in-production';
        const token = await generateEdgeToken({
          userId: 'admin-user',
          email: 'workwithme153@gmail.com',
        }, JWT_SECRET);
        console.log('Token generated successfully:', token.substring(0, 20) + '...');

        const response = NextResponse.json(
          { message: 'Login successful' },
          { status: 200 }
        );

        // Set httpOnly cookie
        console.log('Setting cookie with token...');
        response.cookies.set('admin-token', token, {
          httpOnly: true,
          secure: false, // Set to false for development
          sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/'
        });

        console.log('Cookie set successfully, returning response');
        return response;
      } catch (tokenError) {
        console.error('Error generating token:', tokenError);
        return NextResponse.json(
          { message: 'Authentication error' },
          { status: 500 }
        );
      }
    }

    // In production, check against database
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await comparePasswords(password, admin.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({
      userId: admin._id.toString(),
      email: admin.email,
    });

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}