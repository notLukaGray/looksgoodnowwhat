import { MetadataRoute } from 'next';
import { getAllChapters, Chapter } from '../lib/chapters';
import { siteConfig } from '../lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getAllChapters();
  const baseUrl = siteConfig.primaryDomain;

  // Static pages (only finished ones)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    // Comment out pages that aren't finished yet
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/chapters`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/resources`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.7,
    // },
  ];

  // Chapter pages
  const chapterPages = chapters.map((chapter: Chapter) => ({
    url: `${baseUrl}/${chapter.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...chapterPages];
}
