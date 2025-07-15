import React from 'react';
import { getAllChapters, getAllChapterSlugs } from '../../lib/chapters';
import { Metadata } from 'next';
import { siteConfig } from '../../lib/config';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Lazy load non-critical components
const ShareButton = dynamic(() => import('../../components/ShareButton'), {
  loading: () => (
    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
  ),
  ssr: true,
});

const AudioPlayerWrapper = dynamic(
  () => import('../../components/AudioPlayerWrapper'),
  {
    loading: () => (
      <div className="w-64 h-16 bg-gray-200 rounded-full animate-pulse" />
    ),
    ssr: true,
  }
);

const MarkdownWithAnchors = dynamic(
  () => import('../../components/MarkdownWithAnchors'),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      </div>
    ),
    ssr: true,
  }
);

export async function generateStaticParams() {
  return getAllChapterSlugs().map(slug => ({ slug }));
}

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapters = getAllChapters();
  const chapter = chapters.find(c => c.slug === slug);

  if (!chapter) {
    return {
      title: 'Chapter Not Found',
      description: 'The requested chapter could not be found.',
    };
  }

  return {
    title: chapter.chapterTitle,
    description: `Chapter ${chapter.order}: ${chapter.chapterTitle} - Strategic design thinking insights for students and educators.`,
    keywords: [
      'design thinking',
      'strategic design',
      chapter.chapterTitle.toLowerCase(),
      'design education',
      'creative process',
      'design strategy',
    ],
    authors: [{ name: 'Luka Gray' }],
    creator: 'Luka Gray',
    publisher: 'Luka Gray',
    openGraph: {
      title: chapter.chapterTitle,
      description: `Chapter ${chapter.order}: ${chapter.chapterTitle}`,
      url: `${siteConfig.primaryDomain}/${slug}`,
      type: 'article',
      images: [
        {
          url: chapter.keyImage || '/apple-touch-icon.png',
          width: 1200,
          height: 630,
          alt: `Chapter ${chapter.order}: ${chapter.chapterTitle}`,
        },
      ],
      publishedTime: '2024-01-01',
      modifiedTime: new Date().toISOString(),
      section: 'Design Education',
      tags: ['design thinking', 'strategic design', 'education'],
    },
    alternates: {
      canonical: `${siteConfig.primaryDomain}/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:author': 'Luka Gray',
      'article:section': 'Design Education',
      'article:tag': 'design thinking, strategic design, education',
      'content-language': 'en',
      'revisit-after': '7 days',
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapters = getAllChapters();
  const chapter = chapters.find(c => c.slug === slug);

  if (!chapter) return <div>Chapter not found.</div>;

  const currentIndex = chapters.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#dfdfdf]" style={{ paddingTop: '40px' }}>
      <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-40px)] gap-0 m-0 px-0">
        {/* Background Image Section */}
        <div className="rounded-none shadow basis-[20%] lg:basis-[40%] h-[20vh] lg:h-auto max-h-[20vh] lg:max-h-none relative overflow-hidden" style={{ backgroundColor: '#dfdfdf' }}>
          {chapter.keyImage && (
            <Image
              src={chapter.keyImage}
              alt={`${chapter.chapterTitle} background`}
              fill
              sizes="(max-width: 1024px) 20vw, 40vw"
              className="object-cover"
              priority={false}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          )}
          <ShareButton chapterTitle={chapter.chapterTitle} chapterSlug={slug} />
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white rounded-none shadow-lg p-6 overflow-y-auto basis-[80%] lg:basis-[60%] flex flex-col m-0">
          {/* Spacer */}
          <div style={{ height: '100px' }} />

          {/* Audio Player */}
          {chapter.audioFile && (
            <div className="w-4/5 mx-auto">
              <div
                style={{
                  marginTop: '4rem',
                  marginBottom: '0rem',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <AudioPlayerWrapper src={chapter.audioFile} />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-sm md:prose-base max-w-none w-4/5 mx-auto">
            <MarkdownWithAnchors content={chapter.content} />
          </div>
        </div>

        {/* Navigation Links */}
        {prevChapter && (
          <Link
            href={`/${prevChapter.slug}`}
            className="fixed left-0 top-0 h-full w-[30px] flex items-center justify-center z-10 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            style={{
              background:
                'linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1))',
              backdropFilter: 'blur(2px)',
              left: '0px',
            }}
          >
            <div className="text-2xl text-gray-700 font-light select-none">
              ‹
            </div>
          </Link>
        )}

        {nextChapter && (
          <Link
            href={`/${nextChapter.slug}`}
            className="fixed top-0 h-full w-[30px] flex items-center justify-center z-10 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
              backdropFilter: 'blur(2px)',
              right: '0px',
            }}
          >
            <div className="text-2xl text-gray-700 font-light select-none">
              ›
            </div>
          </Link>
        )}
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: chapter.chapterTitle,
              description: `Chapter ${chapter.order}: ${chapter.chapterTitle}`,
              author: {
                '@type': 'Person',
                name: 'Luka Gray',
              },
              publisher: {
                '@type': 'Person',
                name: 'Luka Gray',
              },
              datePublished: '2024-01-01',
              dateModified: '2024-01-01',
              url: `${siteConfig.primaryDomain}/${slug}`,
              image: chapter.keyImage
                ? `${siteConfig.primaryDomain}${chapter.keyImage}`
                : `${siteConfig.primaryDomain}/apple-touch-icon.png`,
              articleSection: 'Design Education',
              keywords: 'design thinking, strategic design, education',
              educationalLevel: 'intermediate',
              audience: {
                '@type': 'Audience',
                audienceType: 'students, young professionals',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${siteConfig.primaryDomain}/${slug}`,
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Chapter',
              name: chapter.chapterTitle,
              description: `Chapter ${chapter.order}: ${chapter.chapterTitle}`,
              position: chapter.order,
              isPartOf: {
                '@type': 'Book',
                name: 'Looks Good, Now What',
                author: {
                  '@type': 'Person',
                  name: 'Luka Gray',
                },
              },
              url: `${siteConfig.primaryDomain}/${slug}`,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@id': siteConfig.primaryDomain,
                    name: 'Home',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@id': `${siteConfig.primaryDomain}/${slug}`,
                    name: chapter.chapterTitle,
                  },
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
