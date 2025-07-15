import React from 'react';

export const metadata = {
  title: 'Table of Contents - Looks Good, Now What',
  description: 'All chapters in "Looks Good, Now What" for search engines.',
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
  { slug: 'chapterone', title: 'Creative Work as Argument' },
  { slug: 'chaptertwo', title: 'Positioning That Means Something' },
  { slug: 'chapterthree', title: 'Reading the Room' },
  { slug: 'chapterfour', title: 'Emotional vs. Functional' },
  { slug: 'chapterfive', title: 'Differentiation & Distinction' },
  { slug: 'chaptersix', title: 'Naming: Methods, Mistakes, & Meaning' },
  { slug: 'chapterseven', title: 'The Role of Language & Tone' },
  { slug: 'chaptereight', title: 'Conceptual Coherence' },
  { slug: 'chapternine', title: 'Descriptive vs. Suggestive Thinking' },
  { slug: 'chapterten', title: 'Stop Guessing, Start Mapping' },
  { slug: 'chaptereleven', title: 'Creative Process' },
  { slug: 'chaptertwelve', title: 'Strategy as a Constraint' },
  { slug: 'chapterthirteen', title: 'Concept to Execution' },
  { slug: 'chapterfourteen', title: 'Making the Invisible Visible' },
  { slug: 'chapterfifteen', title: 'Brief to Breakthrough' },
  { slug: 'chaptersixteen', title: 'Proof, Not Opinions' },
  { slug: 'chapterseventeen', title: 'The Minimum Lovable Concept' },
  { slug: 'chaptereighteen', title: 'Prototyping to Learn, Not Prove' },
  { slug: 'chapternineteen', title: 'Case Study Thinking' },
  { slug: 'chaptertwenty', title: 'Deck-Building Workshop' },
  { slug: 'chaptertwentyone', title: 'The Negotiation Lab' },
  { slug: 'chaptertwentytwo', title: 'Anti-Frameworks: How Models Break' },
  { slug: 'chaptertwentythree', title: 'Creative or Confused' },
  { slug: 'chaptertwentyfour', title: 'Strategic Flexibility' },
  { slug: 'chaptertwentyfive', title: 'Creative Compromise' },
  { slug: 'chaptertwentysix', title: 'Strategy vs. Style' },
  { slug: 'chaptertwentyseven', title: 'Good/Fast/Cheap' },
  {
    slug: 'chaptertwentyeight',
    title: "What to Do When You Don't Know What to Do",
  },
  // Add more chapters as needed
];

export default function TableOfContentsPage() {
  return (
    <>
      <h1>Table of Contents</h1>
      <p>All chapters in &quot;Looks Good, Now What&quot;:</p>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.slug}>
            <a href={`/${chapter.slug}`}>{chapter.title}</a>
          </li>
        ))}
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Table of Contents - Looks Good, Now What',
            description: 'All chapters in the book "Looks Good, Now What"',
            numberOfItems: chapters.length,
            itemListElement: chapters.map((chapter, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Chapter',
                '@id': `https://looksgoodnowwhat.com/${chapter.slug}`,
                name: chapter.title,
                url: `https://looksgoodnowwhat.com/${chapter.slug}`,
                isPartOf: {
                  '@type': 'Book',
                  name: 'Looks Good, Now What',
                  author: {
                    '@type': 'Person',
                    name: 'Luka Gray',
                  },
                },
              },
            })),
          }),
        }}
      />
    </>
  );
}
