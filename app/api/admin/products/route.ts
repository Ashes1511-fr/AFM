import { NextRequest, NextResponse } from 'next/server';
import { verifyEdgeToken } from '@/lib/edge-auth';
import dbConnect from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-change-this-in-production';

// Helper function to verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) {
    return null;
  }
  return await verifyEdgeToken(token, JWT_SECRET);
}

// GET - Fetch all products (for admin)
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isActive = searchParams.get('isActive');

    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ProductModel.countDocuments(query)
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/admin/products called');
    
    const admin = await verifyAdmin(request);
    console.log('Admin verification result:', admin);
    if (!admin) {
      console.log('Admin verification failed');
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productData = await request.json();
    console.log('Received product data:', productData);
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'price', 'category', 'rating', 'affiliateLink'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate data types
    if (typeof productData.price !== 'number' || productData.price < 0) {
      return NextResponse.json(
        { message: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    if (typeof productData.rating !== 'number' || productData.rating < 1 || productData.rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Make sure imageUrls is an array (can be empty)
    if (!Array.isArray(productData.imageUrls)) {
      productData.imageUrls = [];
    }

    await dbConnect();
    
    const product = new ProductModel(productData);
    await product.save();

    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}