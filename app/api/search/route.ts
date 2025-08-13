
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import Book from '@/app/lib/models';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const author = searchParams.get('author');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    // Build filter object
    const filter: any = {};
    
    // Text search
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    // Author filter
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    // Rating filter
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    
    // Build sort object
    let sort: any = {};
    switch (sortBy) {
      case 'price-low':
        sort.price = 1;
        break;
      case 'price-high':
        sort.price = -1;
        break;
      case 'rating':
        sort.rating = -1;
        break;
      case 'newest':
        sort.createdAt = -1;
        break;
      case 'oldest':
        sort.createdAt = 1;
        break;
      default:
        // Relevance sorting (text search score)
        if (query) {
          sort.$text = { $score: { $meta: 'textScore' } };
        } else {
          sort.createdAt = -1;
        }
    }
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const books = await Book.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Book.countDocuments(filter);
    
    // Get aggregation data for filters
    const aggregationData = await Book.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          categories: { $addToSet: '$category' },
          authors: { $addToSet: '$author' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);
    
    const facets = aggregationData[0] || {
      categories: [],
      authors: [],
      minPrice: 0,
      maxPrice: 100,
      avgRating: 0
    };
    
    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      facets,
      filters: {
        query,
        category,
        author,
        minPrice,
        maxPrice,
        minRating,
        sortBy
      }
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search books' },
      { status: 500 }
    );
  }
}

