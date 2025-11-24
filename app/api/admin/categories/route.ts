import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import { CategoryModel } from '@/lib/models';

// Helper function to verify admin authentication
function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) {
    return null;
  }
  return verifyToken(token);
}

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new category (admin only)
export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, slug } = await request.json();
    
    if (!name || !slug) {
      return NextResponse.json(
        { message: 'Name and slug are required' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // Check if category with same name or slug already exists
    const existingCategory = await CategoryModel.findOne({
      $or: [{ name }, { slug }]
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { message: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }

    const category = new CategoryModel({ name, slug });
    await category.save();

    return NextResponse.json(
      { message: 'Category created successfully', category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}