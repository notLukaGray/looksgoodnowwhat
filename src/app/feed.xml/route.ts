import { getAllChapters } from '../../lib/chapters';
import { siteConfig } from '../../lib/config';

// Function to escape XML entities
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const chapters = getAllChapters();
  const baseUrl = siteConfig.primaryDomain;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Looks Good, Now What</title>
    <description>A comprehensive guide to strategic design thinking for students and educators</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>1440</ttl>
    ${chapters
      .map(
        chapter => `
    <item>
      <title>Chapter ${chapter.order}: ${escapeXml(chapter.chapter)}</title>
      <description>Chapter ${chapter.order}: ${escapeXml(chapter.chapter)} - Strategic design thinking insights for students and educators.</description>
      <link>${baseUrl}/${chapter.slug}</link>
      <guid>${baseUrl}/${chapter.slug}</guid>
      <pubDate>2024-01-01T00:00:00Z</pubDate>
      <category>Design Education</category>
      <category>Strategic Design</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
