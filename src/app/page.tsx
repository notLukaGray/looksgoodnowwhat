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
      <div className="flex-1 mx-auto my-auto flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-center lg:h-full w-full ">
        {}
        <div className="flex flex-col items-center justify-center lg:hidden w-full h-full">
          {}
          <div className="h-10"></div>

          {}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-[240px]">
              <div
                className="quote-text leading-relaxed"
                style={{ fontSize: '1rem' }}
              >
                {quote1}
              </div>
              <div className="quote-publisher text-xs">{publisher1}</div>
            </div>
          </div>

          {}
          <div className="h-[6vh] min-h-[30px] max-h-[80px]"></div>

          {}
          <div className="flex flex-col items-center justify-center">
            <Link href="/introduction" className="cursor-pointer">
              <div className="cover-shadow hover:scale-110 transition-all duration-300">
                <Image
                  src={image}
                  alt="Book Cover"
                  width={400}
                  height={520}
                  className="w-[280px] h-[364px] object-cover hover:opacity-90 transition-all duration-300"
                  draggable={false}
                  priority
                />
              </div>
            </Link>
          </div>

          {}
          <div className="h-[6vh] min-h-[30px] max-h-[80px]"></div>

          {}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-[240px]">
              <div
                className="quote-text leading-relaxed"
                style={{ fontSize: '1rem' }}
              >
                {quote2}
              </div>
              <div className="quote-publisher text-xs">{publisher2}</div>
            </div>
          </div>
        </div>

        {}
        <div className="hidden lg:flex lg:flex-row lg:justify-center lg:items-center lg:h-full lg:flex-1 w-full">
          {}
          <div className="flex flex-col items-center justify-center text-center lg:p-32 lg:flex-1">
            <div className="max-w-[240px]">
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
          <div className="flex flex-col items-center justify-center lg:p-32 lg:flex-1">
            <Link href="/introduction" className="cursor-pointer">
              <div className="cover-shadow hover:scale-110 transition-all duration-300">
                <Image
                  src={image}
                  alt="Book Cover"
                  width={400}
                  height={520}
                  className="lg:w-[400px] lg:h-[520px] object-cover hover:opacity-90 transition-all duration-300"
                  draggable={false}
                  priority
                />
              </div>
            </Link>
          </div>

          {}
          <div className="flex flex-col items-center justify-center text-center lg:p-32 lg:flex-1">
            <div className="max-w-[240px]">
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
      </div>

      {}
      <footer className="w-full text-center footer mt-auto mb-16 pt-24">
        {footer}
      </footer>
    </main>
  );
}
