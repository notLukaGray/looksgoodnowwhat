import React from 'react';
import Image from 'next/image';

// Hardcoded quotes and content
const quote1 =
  "If you create things, the book's insights will inform the way you think about your work, regardless of how you make your living.";
const publisher1 = 'The Atlantic';
const image = 'https://shapeofdesignbook.com/img/cover.svg';
const quote2 =
  'From the very first line, Luka grabs you by the neurons and heartstrings, and doesn&apos;t let go until the very last.';
const publisher2 = 'Brain Pickings';
const footer = 'Luka Gray · © All Rights Reserved';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#dfdfdf] flex flex-col px-2 py-16 overflow-x-hidden">
      <div className="h-[60vh] mx-auto my-auto flex flex-col justify-between items-center lg:flex-row lg:justify-center lg:items-center lg:h-auto w-full ">
        {}
        <div className="flex flex-col items-center justify-center text-center p-2 lg:p-32 order-2 lg:order-1 lg:flex-1">
          <div className="max-w-[200px] lg:max-w-[180px]">
            <blockquote className="quote-text mb-6 text-base lg:text-lg leading-relaxed">
              &ldquo;{quote1}&rdquo;
            </blockquote>
            <div className="quote-publisher text-xs lg:text-sm">
              {publisher1}
            </div>
          </div>
        </div>
        {}
        <div className="flex flex-col items-center justify-center p-2 lg:p-32 order-1 lg:order-2 lg:flex-1">
          <div className="cover-shadow">
            <Image
              src={image}
              alt="Book Cover"
              width={240}
              height={320}
              className="w-[160px] h-[220px] lg:w-[240px] lg:h-[320px] object-contain"
              draggable={false}
              priority
            />
          </div>
        </div>
        {}
        <div className="flex flex-col items-center justify-center text-center p-2 lg:p-32 order-3 lg:order-3 lg:flex-1">
          <div className="max-w-[200px] lg:max-w-[180px]">
            <blockquote className="quote-text mb-6 text-base lg:text-lg leading-relaxed">
              &ldquo;{quote2}&rdquo;
            </blockquote>
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
