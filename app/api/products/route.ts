import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

// GET - Fetch products for public use
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const sortBy = searchParams.get('sortBy') || 'latest';

    let query: any = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (minPrice) {
      query.price = { ...query.price, $gte: parseFloat(minPrice) };
    }
    
    if (maxPrice) {
      query.price = { ...query.price, $lte: parseFloat(maxPrice) };
    }
    
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    let sort: any = { createdAt: -1 }; // default: latest
    
    switch (sortBy) {
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'latest':
      default:
        sort = { createdAt: -1 };
        break;
    }

    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-__v'),
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