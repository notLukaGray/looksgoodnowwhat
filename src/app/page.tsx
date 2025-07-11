import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Homepage content
const quote1 = "You've learned to make it look good...";
const publisher1 = '';
const image = '/BOOK_COVER.png';
const quote2 = '...now learn to make it work in the real world.';
const publisher2 = '';
const footer = 'Luka Gray · © All Rights Reserved';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#dfdfdf] flex flex-col px-2 py-16 overflow-x-hidden">
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
