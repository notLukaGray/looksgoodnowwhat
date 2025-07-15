import { NextRequest, NextResponse } from 'next/server';
import { getAllChapters } from '../../../lib/chapters';

interface CacheEntry {
  data: { results: Array<{ slug: string; title: string; excerpt: string }> };
  timestamp: number;
}

// Cache search results for better performance
const searchCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
    const chapters = getAllChapters();

    const results = chapters
      .filter(chapter => {
        const searchText =
          `${chapter.chapterTitle} ${chapter.content}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
      .map(chapter => ({
        slug: chapter.slug,
        title: chapter.chapterTitle,
        excerpt: chapter.content.substring(0, 200) + '...',
      }))
      .slice(0, limit);

    const response = { results };

    // Cache the result
    searchCache.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    });

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ results: [] });
  }
}
