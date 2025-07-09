import Link from 'next/link';

export default function Footer() {
  return (
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
  );
}
