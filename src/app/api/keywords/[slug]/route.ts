import { NextRequest } from 'next/server';
import { getAllChapters } from '../../../../lib/chapters';
import { generateKeywordsForChapter } from '../../../../lib/keywords';

export async function GET(req: NextRequest) {
  // Extract slug from the URL
  const url = new URL(req.url);
  const slug = url.pathname.split('/').filter(Boolean).pop();

  const chapters = getAllChapters();
  const chapter = chapters.find(c => c.slug === slug);

  if (!chapter) {
    return new Response(JSON.stringify({ error: 'Chapter not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const keywords = chapter.keywords || generateKeywordsForChapter(chapter);

  return new Response(JSON.stringify({ slug, keywords }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
