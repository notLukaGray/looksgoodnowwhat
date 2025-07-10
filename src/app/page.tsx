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
      <div className="h-[60vh] mx-auto my-auto flex flex-col justify-between items-center lg:flex-row lg:justify-center lg:items-center lg:h-auto w-full ">
        {}
        <div className="flex flex-col items-center justify-center text-center p-2 lg:p-32 order-2 lg:order-1 lg:flex-1">
          <div className="max-w-[240px] lg:max-w-[240px]">
            <div
              className="quote-text mb-6 leading-relaxed"
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
        <div className="flex flex-col items-center justify-center p-2 lg:p-32 order-1 lg:order-2 lg:flex-1">
          <div className="cover-shadow">
            <Link href="/introduction" className="cursor-pointer">
              <Image
                src={image}
                alt="Book Cover"
                width={400}
                height={520}
                className="w-[240px] h-[320px] lg:w-[400px] lg:h-[520px] object-cover hover:opacity-90 hover:scale-110 transition-all duration-300"
                draggable={false}
                priority
              />
            </Link>
          </div>
        </div>
        {}
        <div className="flex flex-col items-center justify-center text-center p-2 lg:p-32 order-3 lg:order-3 lg:flex-1">
          <div className="max-w-[240px] lg:max-w-[240px]">
            <div
              className="quote-text mb-6 leading-relaxed"
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

      {}
      <footer className="w-full text-center footer mt-auto mb-16 pt-24">
        {footer}
      </footer>
    </main>
  );
}
