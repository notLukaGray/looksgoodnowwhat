import { getAllChapters } from '../../lib/chapters';
import { siteConfig } from '../../lib/config';
import {
  chapterDescriptions,
  chapterCategories,
} from '../../lib/chapterDescriptions';

// Function to escape XML entities
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Function to get file size for audio files
function getAudioFileSize(audioFile: string): number {
  if (!audioFile) return 0;

  // Hardcoded file sizes based on the files in public/vo/
  const fileSizes: Record<string, number> = {
    '/vo/introduction-audio.mp3': 658 * 1024, // 658KB
    '/vo/chapterone-audio.mp3': 5.0 * 1024 * 1024, // 5.0MB
    '/vo/chaptertwo-audio.mp3': 4.9 * 1024 * 1024, // 4.9MB
    '/vo/chapterthree-audio.mp3': 6.6 * 1024 * 1024, // 6.6MB
  };

  return fileSizes[audioFile] || 0;
}

export async function GET() {
  const chapters = getAllChapters().filter(chapter => chapter.audioFile); // Only chapters with audio
  const baseUrl = siteConfig.primaryDomain;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Looks Good, Now What - Audio Chapters</title>
    <description>${escapeXml('Audio versions of chapters from "Looks Good, Now What" - a practical guide to bridging the gap between creative work and real strategy. Perfect for designers, students, and teams who want to learn on the go.')}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/podcast.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>1440</ttl>
    <managingEditor>luka@looksgoodnowwhat.com (Luka Gray)</managingEditor>
    <webMaster>luka@looksgoodnowwhat.com (Luka Gray)</webMaster>
    <itunes:author>Luka Gray</itunes:author>
    <itunes:summary>${escapeXml('Audio chapters from "Looks Good, Now What" - learn design strategy on the go.')}</itunes:summary>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:category text="Education">
      <itunes:category text="Design" />
    </itunes:category>
    <itunes:owner>
      <itunes:name>Luka Gray</itunes:name>
      <itunes:email>luka@looksgoodnowwhat.com</itunes:email>
    </itunes:owner>
    <image>
      <url>${baseUrl}/apple-touch-icon.png</url>
      <title>Looks Good, Now What - Audio Chapters</title>
      <link>${baseUrl}</link>
      <width>180</width>
      <height>180</height>
    </image>
    <sy:updatePeriod>weekly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    ${chapters
      .map(chapter => {
        const audioUrl = `${baseUrl}${chapter.audioFile}`;
        const audioSize = getAudioFileSize(chapter.audioFile);

        return `
    <item>
      <title>Chapter ${chapter.order}: ${escapeXml(chapter.chapter)}</title>
      <description>${escapeXml(chapterDescriptions[chapter.slug] || '')}</description>
      <link>${baseUrl}/${chapter.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${chapter.slug}</guid>
      <pubDate>2024-01-01T00:00:00Z</pubDate>
      <dc:creator>Luka Gray</dc:creator>
      <dc:date>2024-01-01T00:00:00Z</dc:date>
      <content:encoded><![CDATA[${chapterDescriptions[chapter.slug] || ''}]]></content:encoded>
      <enclosure url="${audioUrl}" length="${audioSize}" type="audio/mpeg" />
      <itunes:duration>${chapter.audioText || 'Unknown'}</itunes:duration>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:episode>${chapter.order}</itunes:episode>
      ${(chapterCategories[chapter.slug] || ['Design']).map(cat => `<category>${escapeXml(cat)}</category>`).join('\n      ')}
    </item>`;
      })
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
