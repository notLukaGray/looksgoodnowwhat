import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'book';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = '/apple-touch-icon.png',
  url,
  type = 'website',
  author = 'Luka Gray',
  publishedTime,
  modifiedTime,
  structuredData,
}: SEOHeadProps) {
  const siteTitle = title
    ? `${title} | Looks Good, Now What`
    : 'Looks Good, Now What - Strategic Design Thinking for Students and Educators';
  const siteDescription =
    description ||
    'A comprehensive guide to strategic design thinking for students and educators. Learn practical approaches to design challenges, client relationships, and career development in the creative industry.';
  const siteUrl = url || 'https://looksgoodnowwhat.com';
  const siteImage = image.startsWith('http')
    ? image
    : `https://looksgoodnowwhat.com${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Looks Good, Now What" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card removed - no Twitter account */}

      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#dfdfdf" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </Head>
  );
}
