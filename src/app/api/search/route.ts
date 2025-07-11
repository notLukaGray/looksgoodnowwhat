import { NextRequest, NextResponse } from 'next/server';
import { createSearchIndex, performSearch } from '@/lib/search';

// Create the search index once when the API starts
let searchIndex: ReturnType<typeof createSearchIndex> | null = null;

function getSearchIndex() {
  if (!searchIndex) {
    console.log('Initializing search index...');
    searchIndex = createSearchIndex();
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
