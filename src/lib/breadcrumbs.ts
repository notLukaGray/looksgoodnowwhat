import { Chapter } from './chapters';
import { generateKeywordsForChapter } from './keywords';

export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
  keywords?: string[]; // Add keywords for enhanced SEO
}

// Enhanced breadcrumb names using keyword strategy
function getEnhancedBreadcrumbName(
  chapter: Chapter,
  type: 'part' | 'chapter'
): string {
  if (type === 'part') {
    // Use part name as-is, but could be enhanced with keywords
    return chapter.part;
  }

  // For chapter names, we could enhance with keywords, but let's keep it clean
  // The chapter title is already keyword-optimized
  return chapter.chapter;
}

export function generateBreadcrumbsForChapter(
  chapter: Chapter
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: 'Home',
      url: '/',
      position: 1,
      keywords: ['looks good now what', 'design thinking', 'luka gray'],
    },
  ];

  // Add part level breadcrumb
  if (chapter.part && chapter.part !== 'INTRODUCTION') {
    breadcrumbs.push({
      name: getEnhancedBreadcrumbName(chapter, 'part'),
      url: `/table-of-contents#${chapter.part.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      position: 2,
      keywords: [chapter.part.toLowerCase().replace(/[^a-z0-9]+/g, ' ')],
    });
  }

  // Add chapter breadcrumb with keywords
  const chapterKeywords = generateKeywordsForChapter(chapter);
  breadcrumbs.push({
    name: getEnhancedBreadcrumbName(chapter, 'chapter'),
    url: `/${chapter.slug}`,
    position: breadcrumbs.length + 1,
    keywords: chapterKeywords.slice(0, 5), // Top 5 keywords for breadcrumb
  });

  return breadcrumbs;
}

export function generateStructuredBreadcrumbs(chapter: Chapter) {
  const breadcrumbs = generateBreadcrumbsForChapter(chapter);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      item: {
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://looksgoodnowwhat.com'}${item.url}`,
        name: item.name,
        ...(item.keywords && { keywords: item.keywords.join(', ') }),
      },
    })),
  };
}
