'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Helper function to generate anchor ID from heading text
function generateAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

// Helper function to create heading component with anchor
function createHeadingComponent(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return function HeadingComponent({
    children,
    ...props
  }: {
    children?: React.ReactNode;
  }) {
    const [justCopied, setJustCopied] = useState(false);

    // Extract text content for anchor ID
    const textContent = React.Children.toArray(children)
      .map(child => (typeof child === 'string' ? child : ''))
      .join('')
      .trim();

    const anchorId = generateAnchorId(textContent);

    const copyToClipboard = async () => {
      const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
      try {
        await navigator.clipboard.writeText(url);
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 800); // Reset after 800ms
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 800); // Reset after 800ms
      }
    };

    const HeadingTag = `h${level}` as const;

    return React.createElement(
      HeadingTag,
      {
        id: anchorId,
        className: 'group relative scroll-mt-20',
        ...props,
      },
      children,
      React.createElement(
        'span',
        {
          style: { whiteSpace: 'nowrap' },
        },
        ' ',
        React.createElement(
          'button',
          {
            onClick: copyToClipboard,
            className: `opacity-0 group-hover:opacity-60 hover:opacity-100 transition-all duration-200 ${
              justCopied ? 'opacity-100' : 'text-gray-400 hover:text-gray-700'
            } inline-flex items-center`,
            style: justCopied ? { color: '#ff6b35' } : {},
            'aria-label': 'Copy link to this heading',
            title: 'Copy link to this section',
          },
          React.createElement(
            'svg',
            {
              height: '20',
              width: '20',
              viewBox: '0 0 512 512',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            React.createElement('path', {
              d: 'M200.66,352H144a96,96,0,0,1,0-192h55.41',
              style: {
                fill: 'none',
                stroke: 'currentColor',
                strokeLinecap: 'square',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
              },
            }),
            React.createElement('path', {
              d: 'M312.59,160H368a96,96,0,0,1,0,192H311.34',
              style: {
                fill: 'none',
                stroke: 'currentColor',
                strokeLinecap: 'square',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
              },
            }),
            React.createElement('line', {
              style: {
                fill: 'none',
                stroke: 'currentColor',
                strokeLinecap: 'square',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
              },
              x1: '169.07',
              x2: '344.93',
              y1: '256',
              y2: '256',
            })
          )
        )
      )
    );
  };
}

// Create heading components (only h1 and h2 as we decided)
const H1WithAnchor = createHeadingComponent(1);
const H2WithAnchor = createHeadingComponent(2);

interface MarkdownWithAnchorsProps {
  content: string;
}

export default function MarkdownWithAnchors({
  content,
}: MarkdownWithAnchorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll spy functionality - only track h1 and h2
    const headings = document.querySelectorAll('h1[id], h2[id]');
    const headingElements = Array.from(headings) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        // Find the heading that's most visible
        let mostVisible = entries[0];
        entries.forEach(entry => {
          if (entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        });

        // Update URL hash if a heading is significantly visible
        if (mostVisible.isIntersecting && mostVisible.intersectionRatio > 0.5) {
          const id = mostVisible.target.id;
          const newUrl = `${window.location.pathname}#${id}`;

          // Update URL without triggering scroll or page reload
          if (window.location.hash !== `#${id}`) {
            window.history.replaceState(null, '', newUrl);
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-80px 0px -80px 0px', // Account for fixed nav
      }
    );

    // Start observing after a small delay to ensure elements are rendered
    const timeoutId = setTimeout(() => {
      headingElements.forEach(heading => observer.observe(heading));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [content]);

  return (
    <div ref={containerRef}>
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
          h1: H1WithAnchor,
          h2: H2WithAnchor,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
