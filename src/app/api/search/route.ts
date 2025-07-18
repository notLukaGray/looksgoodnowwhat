import { NextRequest, NextResponse } from 'next/server';
import { createSearchIndex, performSearch } from '../../../lib/search';

interface CacheEntry {
  data: {
    results: Array<{
      slug: string;
      title: string;
      excerpt: string;
      heading?: string;
      anchorId?: string;
    }>;
  };
  timestamp: number;
}

// Cache search results for better performance
const searchCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Create search index once and reuse
let searchIndex: ReturnType<typeof createSearchIndex> | null = null;

function getSearchIndex() {
  if (!searchIndex) {
    searchIndex = createSearchIndex();
  }
  return searchIndex;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  // Check cache first
  const cacheKey = `${query}-${limit}`;
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const index = getSearchIndex();
    const searchResults = performSearch(query, index, limit);

    const results = searchResults.map(result => ({
      slug: result.slug,
      title: result.title,
      excerpt: result.excerpt,
      heading: result.heading,
      anchorId: result.anchorId,
    }));

    const response = { results };

    // Cache the result
    searchCache.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] });
  }
}
