import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

// GET - Fetch single product for public use
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Fetching product with ID:', params.id);
    await dbConnect();
    
    const product = await ProductModel.findOne({
      _id: params.id,
      isActive: true
    }).select('-__v');
    
    console.log('Product found:', product ? 'YES' : 'NO');

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Get related products (same category, excluding current product)
    const relatedProducts = await ProductModel.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true
    })
    .limit(4)
    .select('-__v');

    return NextResponse.json({
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}