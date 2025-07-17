import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import {
  getTableOfContentsBreadcrumbs,
  generateStructuredStaticBreadcrumbs,
} from '../../lib/breadcrumbs';

export const metadata = {
  title: 'Table of Contents - Looks Good, Now What',
  description: 'All chapters in "Looks Good, Now What" for search engines.',
  keywords: [
    'table of contents',
    'chapter list',
    'book chapters',
    'design book chapters',
    'design thinking chapters',
    'looks good now what',
    'table',
    'contents',
    'chapter',
    'list',
    'looks',
    'good',
    'now',
    'what',
    'luka gray',
    'luka',
    'gray',
  ],
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://looksgoodnowwhat.com/table-of-contents',
  },
  other: {
    'content-language': 'en',
    'revisit-after': '7 days',
  },
};

// Hardcoded flat list of all chapters (update as needed)
const chapters = [
  { slug: 'introduction', title: 'Introduction' },
  { slug: 'chapterone', title: 'Creative Theory in Design' },
  { slug: 'chaptertwo', title: 'Framing: What Are We Solving?' },
  { slug: 'chapterthree', title: 'Creative Work as Argument' },
  { slug: 'chapterfour', title: 'Positioning That Means Something' },
  { slug: 'chapterfive', title: 'Reading the Room' },
  { slug: 'chaptersix', title: 'Emotional vs. Functional' },
  { slug: 'chapterseven', title: 'Differentiation & Distinction' },
  { slug: 'chaptereight', title: 'Naming: Methods, Mistakes, & Meaning' },
  { slug: 'chapternine', title: 'The Role of Language & Tone' },
  { slug: 'chapterten', title: 'Conceptual Coherence' },
  { slug: 'chaptereleven', title: 'Descriptive vs. Suggestive Thinking' },
  { slug: 'chaptertwelve', title: 'Stop Guessing, Start Mapping' },
  { slug: 'chapterthirteen', title: 'Creative Process' },
  { slug: 'chapterfourteen', title: 'Strategy as a Constraint' },
  { slug: 'chapterfifteen', title: 'Concept to Execution' },
  { slug: 'chaptersixteen', title: 'Making the Invisible Visible' },
  { slug: 'chapterseventeen', title: 'Brief to Breakthrough' },
  { slug: 'chaptereighteen', title: 'Proof, Not Opinions' },
  { slug: 'chapternineteen', title: 'The Minimum Lovable Concept' },
  { slug: 'chaptertwenty', title: 'Prototyping to Learn, Not Prove' },
  { slug: 'chaptertwentyone', title: 'Case Study Thinking' },
  { slug: 'chaptertwentytwo', title: 'Deck-Building Workshop' },
  { slug: 'chaptertwentythree', title: 'The Negotiation Lab' },
  { slug: 'chaptertwentyfour', title: 'Anti-Frameworks: How Models Break' },
  { slug: 'chaptertwentyfive', title: 'Creative or Confused' },
  { slug: 'chaptertwentysix', title: 'Strategic Flexibility' },
  { slug: 'chaptertwentyseven', title: 'Creative Compromise' },
  { slug: 'chaptertwentyeight', title: 'Strategy vs. Style' },
  { slug: 'chaptertwentynine', title: 'Good/Fast/Cheap' },
  { slug: 'chapterthirty', title: "What to Do When You Don't Know What to Do" },
];

export default function TableOfContentsPage() {
  const breadcrumbs = getTableOfContentsBreadcrumbs();
  const structuredBreadcrumbs =
    generateStructuredStaticBreadcrumbs(breadcrumbs);
  const tableOfContentsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TableOfContents',
    name: 'Table of Contents',
    about: {
      '@type': 'Book',
      name: 'Looks Good, Now What',
      author: {
        '@type': 'Person',
        name: 'Luka Gray',
        url: 'https://notlukagray.com/',
      },
      genre: 'Design, Education, Business Strategy',
      educationalLevel: 'advanced',
      publisher: {
        '@type': 'Person',
        name: 'Luka Gray',
        url: 'https://notlukagray.com/',
      },
    },
    hasPart: chapters.map(chapter => ({
      '@type': 'Chapter',
      name: chapter.title,
      url: `https://looksgoodnowwhat.com/${chapter.slug}`,
    })),
  };
  return (
    <>
      {/* Visual Breadcrumbs */}
      <div className="w-full max-w-5xl mx-auto mb-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {/* Structured Data: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredBreadcrumbs),
        }}
      />
      {/* Structured Data: TableOfContents */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tableOfContentsJsonLd),
        }}
      />
      <h1>Table of Contents</h1>
      <p>All chapters in &quot;Looks Good, Now What&quot;:</p>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.slug}>
            <a href={`/${chapter.slug}`}>{chapter.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
