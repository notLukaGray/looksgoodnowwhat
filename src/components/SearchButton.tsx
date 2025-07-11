'use client';

interface SearchButtonProps {
  onClick: (e: React.MouseEvent) => void;
  mode: 'open' | 'search';
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function SearchButton({
  onClick,
  mode,
  className = '',
  style = {},
  onMouseEnter,
  onMouseLeave,
}: SearchButtonProps) {
  const isSearchMode = mode === 'search';

  return (
    <button
      onClick={onClick}
      className={`search-button ${className}`}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isSearchMode
          ? '#f3f4f6'
          : 'transparent';
        onMouseEnter?.();
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        onMouseLeave?.(e);
      }}
      title={isSearchMode ? 'Search' : 'Search the book'}
    >
      <svg
        width={isSearchMode ? '18' : '14'}
        height={isSearchMode ? '18' : '14'}
        viewBox="0 0 24 24"
        fill="none"
        stroke={isSearchMode ? '#ff6b35' : '#888'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.stroke = isSearchMode ? '#e55a2b' : '#222';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.stroke = isSearchMode ? '#ff6b35' : '#888';
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </button>
  );
}
