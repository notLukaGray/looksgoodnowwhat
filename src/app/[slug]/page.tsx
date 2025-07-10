import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getAllChapters, getAllChapterSlugs } from '../../lib/chapters';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '../../lib/config';
import ShareButton from '../../components/ShareButton';

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
    openGraph: {
      title: chapter.chapterTitle,
      description: `Chapter ${chapter.order}: ${chapter.chapterTitle}`,
      url: `${siteConfig.primaryDomain}/${slug}`,
      type: 'article',
      images: [
        {
          url: '/apple-touch-icon.png',
          width: 180,
          height: 180,
          alt: `Chapter ${chapter.order}: ${chapter.chapterTitle}`,
        },
      ],
    },
    // Twitter Card removed - no Twitter account
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapters = getAllChapters();
  const chapter = chapters.find(c => c.slug === slug);

  if (!chapter) return <div>Chapter not found.</div>;

  return (
    <div className="min-h-screen bg-[#dfdfdf]">
      <div style={{ height: '40px' }}></div>
      <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-2.5rem)] gap-0 m-0 px-0">
        {/* Chapter Image */}
        <div
          className="rounded-none shadow basis-[20%] lg:basis-[40%] h-[20vh] lg:h-auto max-h-[20vh] lg:max-h-none relative overflow-visible"
          style={{
            backgroundImage: chapter.keyImage
              ? `url(${chapter.keyImage})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <ShareButton chapterTitle={chapter.chapterTitle} chapterSlug={slug} />
        </div>
        {/* Chapter Content */}
        <div className="flex-1 bg-white rounded-none shadow-lg p-6 overflow-y-auto basis-[80%] lg:basis-[60%] flex flex-col m-0">
          <div className="prose prose-sm md:prose-base max-w-none w-4/5 mx-auto">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ children, ...props }) => {
                  // If the paragraph is empty or only contains whitespace, render as a spacer
                  if (
                    !children ||
                    (typeof children === 'string' && children.trim() === '')
                  ) {
                    return <div className="h-6" />;
                  }
                  return <p {...props}>{children}</p>;
                },
              }}
            >
              {chapter.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Navigation */}
        <ChapterNavigation currentSlug={slug} />
      </div>

      {/* Structured Data for Chapter */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            mainEntity: {
              '@type': 'WebPage',
              name: chapter.chapterTitle,
              description: `Chapter ${chapter.order}: ${chapter.chapterTitle}`,
            },
          }),
        }}
      />
    </div>
  );
}

// Navigation component
function ChapterNavigation({ currentSlug }: { currentSlug: string }) {
  const chapters = getAllChapters();
  const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <>
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
          <div className="text-2xl text-gray-700 font-light select-none">‹</div>
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
          <div className="text-2xl text-gray-700 font-light select-none">›</div>
        </Link>
      )}
    </>
  );
}
