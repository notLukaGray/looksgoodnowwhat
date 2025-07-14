import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '../lib/config';

export const metadata: Metadata = {
  title: 'Looks Good, Now What',
  description:
    'A comprehensive guide to strategic design thinking for students and educators. Learn practical approaches to design challenges and career development.',
  keywords: [
    'design thinking',
    'strategic design',
    'design education',
    'creative process',
    'design strategy',
    'design book',
    'Luka Gray',
  ],
  authors: [{ name: 'Luka Gray' }],
  creator: 'Luka Gray',
  publisher: 'Luka Gray',
  openGraph: {
    title: 'Looks Good, Now What',
    description:
      'A comprehensive guide to strategic design thinking for students and educators. Learn practical approaches to design challenges and career development.',
    url: siteConfig.primaryDomain,
    type: 'website',
    images: [
      {
        url: '/BOOK_COVER.png',
        width: 400,
        height: 520,
        alt: 'Looks Good, Now What - Book Cover',
      },
    ],
  },
  alternates: {
    canonical: siteConfig.primaryDomain,
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
    'content-language': 'en',
    'revisit-after': '7 days',
  },
};

// Homepage content
const quote1 = "You've learned to make it look good...";
const publisher1 = '';
const image = '/BOOK_COVER.png';
const quote2 = '...now learn to make it work in the real world.';
const publisher2 = '';
const footer = 'Luka Gray · © All Rights Reserved';

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-[#dfdfdf] flex flex-col px-2 py-16 overflow-x-hidden"
      style={{ paddingTop: '40px' }}
    >
      <h1 className="text-center text-4xl font-bold mb-8">
        Strategic Design Thinking
      </h1>
      <div className="flex-1 mx-auto flex flex-col lg:flex-row justify-center items-center lg:h-full w-full lg:gap-8">
        {}
        <div className="h-10 lg:hidden"></div>

        {}
        <div className="flex flex-col items-center justify-center text-center lg:flex-1">
          <div className="max-w-[240px]">
            <div
              className="quote-text leading-relaxed"
              style={{ fontSize: '1rem' }}
            >
              {quote1}
            </div>
            <div className="quote-publisher text-xs lg:text-sm">
              {publisher1}
            </div>
          </div>
        </div>

        {}
        <div className="min-h-[32px] lg:hidden"></div>

        {}
        <div className="flex flex-col items-center justify-center lg:flex-1">
          <div className="my-8 lg:my-0">
            <Link href="/introduction" className="cursor-pointer">
              <div className="cover-shadow hover:scale-110 transition-all duration-300">
                <Image
                  src={image}
                  alt="Book Cover"
                  width={400}
                  height={520}
                  className="w-[280px] h-[364px] lg:w-[400px] lg:h-[520px] object-cover hover:opacity-90 transition-all duration-300"
                  draggable={false}
                  priority
                />
              </div>
            </Link>
          </div>
        </div>

        {}
        <div className="min-h-[32px] lg:hidden"></div>

        {}
        <div className="flex flex-col items-center justify-center text-center lg:flex-1">
          <div className="max-w-[240px]">
            <div
              className="quote-text leading-relaxed"
              style={{ fontSize: '1rem' }}
            >
              {quote2}
            </div>
            <div className="quote-publisher text-xs lg:text-sm">
              {publisher2}
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full text-center footer mt-auto mb-16 pt-24">
        {footer}
      </footer>
    </main>
  );
}
