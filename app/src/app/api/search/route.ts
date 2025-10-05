import { NextRequest, NextResponse } from 'next/server';
import { searchAll } from '@/lib/meili';
import { trackSearch } from '@/lib/analytics';

// export const dynamic = 'force-dynamic'; // Not compatible with static export

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';
    const categories = searchParams.get('categories')?.split(',') || [];
    const grades = searchParams.get('grades')?.split(',') || [];
    const tags = searchParams.get('tags')?.split(',') || [];
    const priceMin = searchParams.get('price_min') ? parseFloat(searchParams.get('price_min')!) : undefined;
    const priceMax = searchParams.get('price_max') ? parseFloat(searchParams.get('price_max')!) : undefined;
    const sortBy = searchParams.get('sort_by') || 'relevance';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    if (!query.trim()) {
      return NextResponse.json({
        results: [],
        total: 0,
        facets: {},
        pagination: {
          page,
          limit,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      });
    }

    const filters = {
      type: type as 'all' | 'blog' | 'products' | 'bundles',
      categories: categories.length > 0 ? categories : undefined,
      grades: grades.length > 0 ? grades : undefined,
      tags: tags.length > 0 ? tags : undefined,
      priceRange: priceMin !== undefined || priceMax !== undefined ? {
        min: priceMin || 0,
        max: priceMax || 1000,
      } : undefined,
      sortBy: sortBy as 'relevance' | 'newest' | 'oldest' | 'price_low' | 'price_high',
    };

    const results = await searchAll({
      query,
      filters,
      limit,
      offset,
    });

    // Track search analytics
    trackSearch({
      searchTerm: query,
      resultsCount: results.total,
    });

    const totalPages = Math.ceil(results.total / limit);

    return NextResponse.json({
      results: results.results,
      total: results.total,
      facets: results.facets,
      pagination: {
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
