import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">The Shape of Design</Link>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/chapters" className="text-gray-600 hover:text-gray-900">Chapters</Link>
              <Link href="/about" className="text-gray-900 font-medium">About</Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            About
          </h1>
          <div className="w-16 h-1 bg-gray-300"></div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            About the Book
          </h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The Shape of Design is a book about design and the creative process. It explores how we think 
            about design, how we practice it, and how we can better understand the role it plays in our lives.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The book is structured around six key themes: how we work, how we see, how we make, how we think, 
            how we learn, and how we live. Each chapter delves into these aspects of the design process, 
            offering insights and perspectives that can help anyone understand design better.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            About the Author
          </h2>

          <div className="flex items-start space-x-6 mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Frank Chimero</h3>
              <p className="text-gray-600 mb-4">
                Frank Chimero is a designer, writer, and illustrator based in Portland, Oregon. 
                He has worked with clients like Microsoft, Adobe, and The New York Times, and his 
                writing has appeared in publications like The Manual and A List Apart.
              </p>
              <p className="text-gray-600">
                Frank believes that design is fundamentally about people and their needs. His work 
                focuses on creating experiences that are both beautiful and functional, and his 
                writing explores the deeper questions about what design means and why it matters.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            The Project
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            This book was originally published in 2011 and has since become a classic in the design 
            community. It&apos;s been translated into multiple languages and has influenced countless 
            designers and thinkers around the world.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The book is available in multiple formats: as a free PDF download, as a print book, 
            and as this web version. Each format is designed to serve different reading preferences 
            and contexts.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Get in Touch
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            If you have questions about the book, want to share your thoughts, or just want to say hello, 
            you can reach out through the contact page or connect on social media.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Connect</h3>
            <div className="space-y-2 text-gray-600">
              <p>• <Link href="/contact" className="hover:text-gray-900 underline">Contact Form</Link></p>
              <p>• <a href="https://twitter.com/frank_chimero" className="hover:text-gray-900 underline">Twitter</a></p>
              <p>• <a href="https://frankchimero.com" className="hover:text-gray-900 underline">Personal Website</a></p>
            </div>
          </div>
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
              <Link href="/about" className="hover:text-gray-900">About the Author</Link>
              {" • "}
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 