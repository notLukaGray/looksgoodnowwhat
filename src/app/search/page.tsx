export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import SearchClientPage from './SearchClientPage';
import {
  getSearchBreadcrumbs,
  generateStructuredStaticBreadcrumbs,
} from '../../lib/breadcrumbs';
import { Metadata } from 'next';
import { siteConfig } from '../../lib/config';

export const metadata: Metadata = {
  title: 'Search - Looks Good, Now What',
  description:
    'Search through all chapters and content in "Looks Good, Now What" - a comprehensive guide to strategic design thinking.',
  keywords: [
    'search',
    'design thinking book',
    'chapter search',
    'content search',
    'looks good now what',
    'design education',
    'strategic design',
  ],
  authors: [{ name: 'Luka Gray' }],
  creator: 'Luka Gray',
  publisher: 'Luka Gray',
  openGraph: {
    title: 'Search - Looks Good, Now What',
    description:
      'Search through all chapters and content in "Looks Good, Now What"',
    url: `${siteConfig.primaryDomain}/search`,
    type: 'website',
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'Search - Looks Good, Now What',
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.primaryDomain}/search`,
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

export default function SearchPage() {
  const breadcrumbs = getSearchBreadcrumbs();
  const structuredBreadcrumbs =
    generateStructuredStaticBreadcrumbs(breadcrumbs);
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredBreadcrumbs),
        }}
      />
      <SearchClientPage />
    </>
  );
}
