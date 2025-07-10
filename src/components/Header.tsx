import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Looks Good, Now What
            </Link>
          </div>
          <div className="flex space-x-6 text-sm">
            {/* Navigation links can be added here when pages are created */}
          </div>
        </nav>
      </div>
    </header>
  );
}
