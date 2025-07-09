import Link from "next/link";

export default function IntroductionPage() {
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
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Chapter Header */}
        <div className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/chapters" className="hover:text-gray-700">← Back to Chapters</Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Introduction: How and Why
          </h1>
          <div className="w-16 h-1 bg-gray-300"></div>
        </div>

        {/* Chapter Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Design is everywhere. It&apos;s in the chair you&apos;re sitting on, the screen you&apos;re reading from, 
            and the way this text is arranged on the page. Design is not just about making things look 
            pretty—it&apos;s about solving problems and making the world work better.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            This book is about understanding design as a process, not just a product. It&apos;s about how 
            we think about design, how we practice it, and how we can better understand the role it 
            plays in our lives. Design is not something that happens in isolation—it&apos;s deeply connected 
            to how we work, how we see, how we make, how we think, how we learn, and how we live.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            The Shape of Things
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Everything has a shape. The shape of a book, the shape of a website, the shape of a city, 
            the shape of an idea. These shapes are not arbitrary—they emerge from the constraints and 
            possibilities of their context. Understanding these shapes helps us understand the world 
            around us and our place within it.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Design is the process of giving shape to ideas. It's about taking something abstract—a 
            problem, a need, a desire—and making it concrete. This process is not always straightforward. 
            It involves iteration, experimentation, failure, and learning. It requires both analytical 
            thinking and intuitive leaps.
          </p>

          <blockquote className="border-l-4 border-gray-300 pl-6 my-8 italic text-xl text-gray-600">
            "Design is not just what it looks like and feels like. Design is how it works."
            <footer className="text-sm text-gray-500 mt-2">— Steve Jobs</footer>
          </blockquote>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Why This Matters
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            In a world that's increasingly complex and interconnected, design thinking becomes more 
            important than ever. We need to be able to see problems from multiple angles, to understand 
            the needs of different stakeholders, and to create solutions that work for everyone.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            This book is for anyone who wants to understand design better—whether you're a designer, 
            a developer, a manager, or just someone who's curious about how the world works. It's about 
            developing a design mindset that you can apply to any problem, in any context.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            So let's begin. Let's explore the shape of design together.
          </p>
        </article>

        {/* Chapter Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              ← Previous: No previous chapter
            </div>
            <Link 
              href="/chapters/chapter-1"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Next: Chapter 1 →
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