import fs from 'fs';
import path from 'path';

// Helper to parse frontmatter and content
function parseChapterMarkdown(md: string) {
  const partMatch = md.match(/Part: ([^\n]+)/);
  const keyImageMatch = md.match(/KeyImage: ([^\n]+)/);
  const chapterMatch = md.match(/Chapter: ([^\n]+)/);
  const chapterTitleMatch = md.match(/Chapter Title: ([^\n]+)/);
  const quoteMatch = md.match(/Quote: ([^\n]+)/);
  const quoteAuthorMatch = md.match(/Quote Author: ([^\n]+)/);
  const orderMatch = md.match(/Order: (\d+)/);
  const contentMatch = md.match(/---\n([\s\S]*)/);

  return {
    part: partMatch ? partMatch[1].trim() : '',
    keyImage: keyImageMatch ? keyImageMatch[1].trim() : '',
    chapter: chapterMatch ? chapterMatch[1].trim() : '',
    chapterTitle: chapterTitleMatch ? chapterTitleMatch[1].trim() : '',
    quote: quoteMatch ? quoteMatch[1].trim() : '',
    quoteAuthor: quoteAuthorMatch ? quoteAuthorMatch[1].trim() : '',
    order: orderMatch ? parseInt(orderMatch[1]) : 999,
    content: contentMatch ? contentMatch[1].trim() : '',
  };
}

export interface Chapter {
  slug: string;
  part: string;
  keyImage: string;
  chapter: string;
  chapterTitle: string;
  quote: string;
  quoteAuthor: string;
  order: number;
  content: string;
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

// Get all chapters' data
export function getAllChapters(): Chapter[] {
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
}

// Get navigation items grouped by part
export function getNavItems(): NavItem[] {
  const chapters = getAllChapters();

  // Group chapters by part
  const grouped = chapters.reduce(
    (acc, chapter) => {
      if (!acc[chapter.part]) {
        acc[chapter.part] = [];
      }
      acc[chapter.part].push({
        slug: chapter.slug,
        title: chapter.chapterTitle,
        order: chapter.order,
      });
      return acc;
    },
    {} as Record<string, { slug: string; title: string; order: number }[]>
  );

  // Convert to array format and sort by hardcoded part order
  return PART_ORDER.filter(part => grouped[part]) // Only include parts that have chapters
    .map(part => ({
      part,
      chapters: grouped[part].sort((a, b) => a.order - b.order), // Sort chapters by order within each part
    }));
}

// Get all chapter slugs for static generation
export function getAllChapterSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'src/content');
  return fs
    .readdirSync(contentDir)
    .filter(f => f.endsWith('.md') && f !== 'home.md')
    .map(f => f.replace(/\.md$/, ''));
}
