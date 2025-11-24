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

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const product = await ProductModel.findById(params.id);
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productData = await request.json();
    
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
    
    const product = await ProductModel.findByIdAndUpdate(
      params.id,
      { ...productData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product updated successfully', product }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const product = await ProductModel.findByIdAndDelete(params.id);
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}