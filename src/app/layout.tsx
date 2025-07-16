import './globals.css';
import { Lora, IBM_Plex_Mono, Inter } from 'next/font/google';
import NavMenu from '../components/NavMenu';
import { getNavItems } from '../lib/chapters';
import { siteConfig } from '../lib/config';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Courier', 'monospace'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700', '900'],
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
});

export const metadata = {
  title: {
    default: siteConfig.title,
    template: '%s | Looks Good, Now What',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.primaryDomain),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  // themeColor: '#dfdfdf', // Removed as per Next.js 15+ requirements
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.primaryDomain,
    siteName: 'Looks Good, Now What',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'Looks Good, Now What - Book Cover',
      },
    ],
  },
  // Twitter Card removed - no Twitter account
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
    'msvalidate.01': '30C80AE81BD7AF50BF9D005609FD1A54', // Bing verification
  },
};

// Add viewport export for theme color
export function generateViewport() {
  return {
    themeColor: '#dfdfdf',
    width: 'device-width',
    initialScale: 1,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = getNavItems();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />

        {}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://free-images.com" />

        {}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://free-images.com" />

        {/* RSS Feeds */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Podcast Feed"
          href="/podcast.xml"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Book',
                name: 'Looks Good, Now What',
                description:
                  'A comprehensive guide to strategic design thinking for students and educators',
                author: {
                  '@type': 'Person',
                  name: 'Luka Gray',
                },
                publisher: {
                  '@type': 'Person',
                  name: 'Luka Gray',
                },
                url: siteConfig.primaryDomain,
                isbn: siteConfig.book.isbn,
                genre: siteConfig.book.genre,
                audience: {
                  '@type': 'Audience',
                  audienceType: siteConfig.book.audience,
                },
                educationalLevel: siteConfig.book.educationalLevel,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Looks Good, Now What',
                url: siteConfig.primaryDomain,
                description: siteConfig.description,
                author: {
                  '@type': 'Person',
                  name: 'Luka Gray',
                },
                inLanguage: 'en-US',
                copyrightYear: '2024',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Luka Gray',
                url: siteConfig.primaryDomain,
                logo: `${siteConfig.primaryDomain}/apple-touch-icon.png`,
                sameAs: [],
              },
            ]),
          }}
        />
      </head>
      <body
        className={`${lora.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased bg-[#dfdfdf] text-[#222]`}
      >
        <NavMenu navItems={navItems} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
