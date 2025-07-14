import { NextRequest, NextResponse } from 'next/server';
import { getAllChapters } from '../../../lib/chapters';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
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
      .slice(0, 10);

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
