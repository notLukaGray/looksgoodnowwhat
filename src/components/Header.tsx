import Link from 'next/link';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  return (
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
              className={
                currentPage === 'chapters'
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }
            >
              Chapters
            </Link>
            <Link
              href="/about"
              className={
                currentPage === 'about'
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }
            >
              About
            </Link>
            <Link
              href="/resources"
              className={
                currentPage === 'resources'
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }
            >
              Resources
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
