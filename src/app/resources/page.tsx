import Link from 'next/link';

const resources = [
  {
    title: 'Download PDF',
    description: 'Free PDF version of the complete book',
    link: '/download',
    type: 'download',
  },
  {
    title: 'Purchase Print',
    description: 'Order a physical copy of the book',
    link: '/purchase',
    type: 'purchase',
  },
  {
    title: 'Reading Guide',
    description: 'Discussion questions and further reading',
    link: '/reading-guide',
    type: 'guide',
  },
  {
    title: 'Design Resources',
    description: 'Tools, books, and websites mentioned in the book',
    link: '/design-resources',
    type: 'resources',
  },
  {
    title: 'Community',
    description: 'Connect with other readers and designers',
    link: '/community',
    type: 'community',
  },
  {
    title: 'Translations',
    description: 'The book in other languages',
    link: '/translations',
    type: 'translations',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                The Shape of Design
              </Link>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/chapters"
                className="text-gray-600 hover:text-gray-900"
              >
                Chapters
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/resources" className="text-gray-900 font-medium">
                Resources
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Resources
          </h1>
          <p className="text-lg text-gray-600">
            Additional materials and resources to help you get the most out of
            the book
          </p>
          <div className="w-16 h-1 bg-gray-300 mt-4"></div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {resources.map(resource => (
            <div
              key={resource.title}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3
                className="text-xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                <Link href={resource.link} className="hover:text-gray-700">
                  {resource.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <Link
                href={resource.link}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="space-y-16">
          {/* Recommended Reading */}
          <section>
            <h2
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Recommended Reading
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Design Theory
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      The Design of Everyday Things
                    </a>{' '}
                    by Don Norman
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Designing for People
                    </a>{' '}
                    by Henry Dreyfuss
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Thoughtful Design
                    </a>{' '}
                    by Cennydd Bowles
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Creative Process
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      The War of Art
                    </a>{' '}
                    by Steven Pressfield
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Bird by Bird
                    </a>{' '}
                    by Anne Lamott
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      The Creative Habit
                    </a>{' '}
                    by Twyla Tharp
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tools and Software */}
          <section>
            <h2
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Tools and Software
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Design Tools
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Figma
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Sketch
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Adobe Creative Suite
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Prototyping
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Framer
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      InVision
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Principle
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Development
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      VS Code
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      GitHub
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a href="#" className="hover:text-gray-900 underline">
                      Vercel
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Community */}
          <section>
            <h2
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Community and Events
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Join the community of designers and readers discussing The Shape
                of Design:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>
                  •{' '}
                  <a href="#" className="hover:text-gray-900 underline">
                    Design Book Club
                  </a>{' '}
                  - Monthly discussions
                </p>
                <p>
                  •{' '}
                  <a href="#" className="hover:text-gray-900 underline">
                    Design Conference
                  </a>{' '}
                  - Annual gathering
                </p>
                <p>
                  •{' '}
                  <a href="#" className="hover:text-gray-900 underline">
                    Online Forum
                  </a>{' '}
                  - Ongoing conversations
                </p>
                <p>
                  •{' '}
                  <a href="#" className="hover:text-gray-900 underline">
                    Workshop Series
                  </a>{' '}
                  - Hands-on learning
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              ← Back to Home
            </Link>
            <Link
              href="/chapters"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Read the Book
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2011 Frank Chimero. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/about" className="hover:text-gray-900">
                About the Author
              </Link>
              {' • '}
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
