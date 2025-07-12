import { NextRequest, NextResponse } from 'next/server';
import { createSearchIndex, performSearch } from '@/lib/search';

// Create the search index with caching and TTL
let searchIndex: ReturnType<typeof createSearchIndex> | null = null;
let lastIndexTime = 0;
const INDEX_TTL = 5 * 60 * 1000; // 5 minutes

function getSearchIndex() {
  const now = Date.now();

  if (!searchIndex || now - lastIndexTime > INDEX_TTL) {
    console.log('Initializing search index...');
    searchIndex = createSearchIndex();
    lastIndexTime = now;
    console.log(
      `Search index created with ${searchIndex.data.length} chapters`
    );
  }
  return searchIndex;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limitParam = searchParams.get('limit');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        results: [],
        query: '',
        message: 'No search query provided',
      });
    }

    if (query.trim().length < 2) {
      return NextResponse.json({
        results: [],
        query,
        message: 'Search query must be at least 2 characters long',
      });
    }

    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const index = getSearchIndex();
    const results = performSearch(query, index, limit);

    return NextResponse.json({
      results,
      query,
      count: results.length,
      message:
        results.length > 0
          ? `Found ${results.length} result${results.length !== 1 ? 's' : ''}`
          : 'No results found',
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      {
        error: 'Search failed',
        message: 'An error occurred while searching',
        results: [],
        query: '',
        count: 0,
      },
      { status: 500 }
    );
  }
}
