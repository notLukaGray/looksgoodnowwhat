// Site configuration for multiple domains
export const siteConfig = {
  // Primary domain (for canonical URLs and structured data)
  primaryDomain: 'https://looksgoodnowwhat.com',

  // All valid domains
  domains: ['https://looksgoodnowwhat.com', 'https://lgnw.space'],

  // Check if current domain is primary
  isPrimaryDomain: (domain: string) =>
    domain === 'https://looksgoodnowwhat.com',

  // Get canonical URL (always use primary domain)
  getCanonicalUrl: (path: string) => `https://looksgoodnowwhat.com${path}`,

  // Site metadata
  title:
    'Looks Good, Now What - Strategic Design Thinking for Students and Educators',
  description:
    'A comprehensive guide to strategic design thinking for students and educators. Learn practical approaches to design challenges, client relationships, and career development in the creative industry.',
  author: 'Luka Gray',
  twitterHandle: '@lukagray',

  // SEO settings
  keywords: [
    'design thinking',
    'strategic design',
    'design education',
    'creative career',
    'design process',
    'client relationships',
    'design strategy',
    'student resources',
    'educator resources',
  ],

  // Social media
  social: {
    // Add social media handles as needed
  },

  // Book metadata
  book: {
    title: 'Looks Good, Now What',
    isbn: '978-0-000000-0-0',
    genre: 'Design, Education, Business',
    audience: 'Students and Educators in Design',
    educationalLevel: 'Undergraduate, Graduate, Professional Development',
  },
};
