import fs from 'fs';
import path from 'path';
import React from 'react';
import Image from 'next/image';

function parseHomeMarkdown(md: string) {
  const quote1Match = md.match(/Quote 01:\n>\s*"([\s\S]*?)"/);
  const publisher1Match = md.match(/Publisher: ([^\n]+)/);
  const imageMatch = md.match(/Image: ([^\n]+)/);
  const quote2Match = md.match(/Quote 02:\n>\s*"([\s\S]*?)"/);
  const footerMatch = md.match(/Footer: ([^\n]+)/);

  const quote1 = quote1Match ? quote1Match[1].trim() : '';
  const publisher1 = publisher1Match ? publisher1Match[1].trim() : '';
  const image = imageMatch ? imageMatch[1].trim() : '';
  const quote2 = quote2Match ? quote2Match[1].trim() : '';

  // Find the second publisher by looking for "Publisher:" after Quote 02
  const quote2Index = md.indexOf('Quote 02:');
  const publisher2Match =
    quote2Index !== -1
      ? md.slice(quote2Index).match(/Publisher: ([^\n]+)/)
      : null;
  const publisher2 = publisher2Match ? publisher2Match[1].trim() : '';

  const footer = footerMatch ? footerMatch[1].trim() : '';

  return { quote1, publisher1, image, quote2, publisher2, footer };
}

const contentPath = path.join(process.cwd(), 'src/content/home.md');
const content = fs.readFileSync(contentPath, 'utf8');
const { quote1, publisher1, image, quote2, publisher2, footer } =
  parseHomeMarkdown(content);

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
