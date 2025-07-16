import fs from 'fs';
import path from 'path';
import { cache } from 'react';

// Helper to parse frontmatter and content
function parseChapterMarkdown(md: string) {
  const partMatch = md.match(/Part: ([^\n]+)/);
  const keyImageMatch = md.match(/KeyImage: ([^\n]+)/);
  const chapterMatch = md.match(/Chapter: ([^\n]+)/);
  const quoteMatch = md.match(/Quote: ([^\n]+)/);
  const quoteAuthorMatch = md.match(/Quote Author: ([^\n]+)/);
  const keywordsMatch = md.match(/Keywords: ([^\n]+)/);
  const orderMatch = md.match(/Order: (\d+)/);
  const audioFileMatch = md.match(/AudioFile: ([^\n]+)/);
  const audioTextMatch = md.match(/AudioText: ([^\n]+)/);
  const contentMatch = md.match(/---\n([\s\S]*)/);

  return {
    part: partMatch ? partMatch[1].trim() : '',
    keyImage: keyImageMatch ? keyImageMatch[1].trim() : '',
    chapter: chapterMatch ? chapterMatch[1].trim() : '',
    quote: quoteMatch ? quoteMatch[1].trim() : '',
    quoteAuthor: quoteAuthorMatch ? quoteAuthorMatch[1].trim() : '',
    keywords: keywordsMatch
      ? keywordsMatch[1].split(',').map(k => k.trim())
      : undefined,
    order: orderMatch ? parseInt(orderMatch[1]) : 999,
    audioFile: audioFileMatch ? audioFileMatch[1].trim() : '',
    audioText: audioTextMatch ? audioTextMatch[1].trim() : '',
    content: contentMatch ? contentMatch[1].trim() : '',
  };
}

export interface Chapter {
  slug: string;
  part: string;
  keyImage: string;
  chapter: string;
  quote: string;
  quoteAuthor: string;
  order: number;
  audioFile: string;
  audioText: string;
  content: string;
  keywords?: string[]; // Optional custom keywords to override automatic extraction
}

export interface NavItem {
  part: string;
  chapters: { slug: string; title: string; order: number }[];
}

// Hardcoded part order
const PART_ORDER = [
  'INTRODUCTION',
  'Part I: FOUNDATIONS',
  'Part II: BUILDING',
  'Part III: TURNING',
  'Part IV: SELLING',
  'Part V: PRESSURING',
];

// Get all chapters' data (cached)
export const getAllChapters = cache((): Chapter[] => {
  const contentDir = path.join(process.cwd(), 'src/content');
  const chapters = fs
    .readdirSync(contentDir)
    .filter(f => f.endsWith('.md') && f !== 'home.md')
    .map(f => {
      const slug = f.replace(/\.md$/, '');
      const md = fs.readFileSync(path.join(contentDir, f), 'utf8');
      return { slug, ...parseChapterMarkdown(md) };
    });

  // Sort by part order, then by chapter order
  return chapters.sort((a, b) => {
    const partA = PART_ORDER.indexOf(a.part);
    const partB = PART_ORDER.indexOf(b.part);
    if (partA !== partB) return partA - partB;

    // If same part, sort by order field
    return a.order - b.order;
  });
});

// Get navigation items grouped by part (cached)
export const getNavItems = cache((): NavItem[] => {
  const chapters = getAllChapters();

  // Group chapters by part
  const grouped = chapters.reduce(
    (acc, chapter) => {
      if (!acc[chapter.part]) {
        acc[chapter.part] = [];
      }
      acc[chapter.part].push({
        slug: chapter.slug,
        title: chapter.chapter,
        order: chapter.order,
      });
      return acc;
    },
    {} as Record<string, { slug: string; title: string; order: number }[]>
  );

  // Convert to array format and sort by hardcoded part order
  const navItems = PART_ORDER.filter(part => grouped[part]) // Only include parts that have chapters
    .map(part => ({
      part,
      chapters: grouped[part].sort((a, b) => a.order - b.order), // Sort chapters by order within each part
    }));

  // Add the About page as a special section after all chapters
  navItems.push({
    part: 'ABOUT',
    chapters: [
      {
        slug: 'about',
        title: 'About Luka Gray',
        order: 999, // High order number to ensure it appears last
      },
    ],
  });

  return navItems;
});

// Get all chapter slugs for static generation (cached)
export const getAllChapterSlugs = cache((): string[] => {
  const contentDir = path.join(process.cwd(), 'src/content');
  return fs
    .readdirSync(contentDir)
    .filter(f => f.endsWith('.md') && f !== 'home.md')
    .map(f => f.replace(/\.md$/, ''));
});
