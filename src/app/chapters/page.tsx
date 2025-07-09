import Link from 'next/link';

const chapters = [
  {
    id: 'introduction',
    title: 'Introduction',
    subtitle: 'How and Why',
    description: 'An overview of the book and its purpose',
  },
  {
    id: 'chapter-1',
    title: 'Chapter 1',
    subtitle: 'How We Work',
    description: 'Understanding the creative process and how designers work',
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2',
    subtitle: 'How We See',
    description: 'The role of perception and observation in design',
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3',
    subtitle: 'How We Make',
    description: 'The act of creation and the tools we use',
  },
  {
    id: 'chapter-4',
    title: 'Chapter 4',
    subtitle: 'How We Think',
    description: 'The mental models and frameworks that guide our work',
  },
  {
    id: 'chapter-5',
    title: 'Chapter 5',
    subtitle: 'How We Learn',
    description: 'Continuous improvement and the learning process',
  },
  {
    id: 'chapter-6',
    title: 'Chapter 6',
    subtitle: 'How We Live',
    description: "Design's impact on our daily lives and society",
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    subtitle: 'The Shape of Things to Come',
    description: 'Looking forward to the future of design',
  },
];

export default function ChaptersPage() {
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
              <Link href="/chapters" className="text-gray-900 font-medium">
                Chapters
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link
                href="/resources"
                className="text-gray-600 hover:text-gray-900"
              >
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
            Chapters
          </h1>
          <p className="text-lg text-gray-600">
            Explore the chapters of The Shape of Design
          </p>
        </div>

        {/* Chapters List */}
        <div className="space-y-8">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="border-b border-gray-100 pb-8 last:border-b-0"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h2
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    <Link
                      href={`/chapters/${chapter.id}`}
                      className="hover:text-gray-700"
                    >
                      {chapter.title}: {chapter.subtitle}
                    </Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {chapter.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/chapters/${chapter.id}`}
                      className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                      Read Chapter →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
              href="/chapters/introduction"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Start Reading
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
