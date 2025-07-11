'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchResult } from '@/lib/search';

interface SearchResponse {
  results: SearchResult[];
  query: string;
  count: number;
  message: string;
  error?: string;
}

export default function SearchClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(query);
  const [displayCount, setDisplayCount] = useState(3);
  const [hasMore, setHasMore] = useState(false);

  // Perform search
  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setAllResults([]);
      setMessage('');
      setDisplayCount(3);
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}&limit=300`
      );
      const data: SearchResponse = await response.json();

      const allResultsData = data.results || [];
      setAllResults(allResultsData);
      setResults(allResultsData.slice(0, 3));
      setDisplayCount(3);
      setHasMore(allResultsData.length > 3);
      setMessage(data.message || '');
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setAllResults([]);
      setMessage('Search failed. Please try again.');
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more results
  const loadMoreResults = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Brief loading delay for smooth UX
    setTimeout(() => {
      const newCount = displayCount + 3;
      setResults(allResults.slice(0, newCount));
      setDisplayCount(newCount);
      setHasMore(newCount < allResults.length);
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, hasMore, displayCount, allResults]);

  // Search when query parameter changes
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [query]);

  // Scroll detection for infinite loading
  useEffect(() => {
    if (!hasMore || allResults.length === 0) return;

    const container = resultsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isLoadingMore) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const threshold = scrollHeight - 200; // Load when 200px from bottom

      if (scrollTop + clientHeight >= threshold && hasMore && !isLoadingMore) {
        loadMoreResults();
      }
    };

    // Add scroll listener to the results container
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [
    hasMore,
    isLoadingMore,
    allResults.length,
    results.length,
    loadMoreResults,
  ]);

  // Handle new search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Helper function to escape regex characters
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Strip HTML tags from text
  const stripHtmlTags = (text: string): string => {
    return text.replace(/<[^>]*>/g, '');
  };

  // Highlight search terms in text
  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;

    // First strip HTML tags from the text
    const cleanText = stripHtmlTags(text);

    const terms = searchQuery.toLowerCase().split(/\s+/);
    let highlightedText = cleanText;

    terms.forEach(term => {
      const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<mark style="background-color: #ff6b35; color: white; padding: 1px 3px; border-radius: 2px;">$1</mark>'
      );
    });

    return highlightedText;
  };

  return (
    <div
      style={{
        fontFamily: 'IBM Plex Mono, monospace',
        minHeight: '100vh',
      }}
    >
      <div style={{ height: '40px' }}></div>
      <div
        style={{
          position: 'sticky',
          top: '60px', // Account for navbar height
          background: 'white',
          zIndex: 10,
          padding: '2rem',
          borderBottom: '1px solid #f0f0f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '1rem',
              display: 'inline-block',
            }}
          >
            ← Back to Book
          </Link>

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#222',
            }}
          >
            Search Results
          </h1>

          <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search the book..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#ccc';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = '#ddd';
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 18px',
                  background: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#e55a2b';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#ff6b35';
                }}
              >
                Search
              </button>
            </div>
          </form>

          {query && (
            <p
              style={{
                color: '#666',
                fontSize: '14px',
                margin: 0,
              }}
            >
              {isLoading
                ? 'Searching...'
                : allResults.length > 0
                  ? `Showing ${results.length} of ${allResults.length} results for "${query}"`
                  : `No results for "${query}"`}
            </p>
          )}
        </div>
      </div>
      <div
        ref={resultsContainerRef}
        style={{
          height: 'calc(100vh - 420px)',
          overflowY: 'auto',
          padding: '2rem 2rem 2rem 2rem',
          paddingRight: 'calc(2rem + 8px)',
          paddingBottom: 'calc(2rem + 20px)',
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {isLoading && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666',
            }}
          >
            <div>Searching through chapters...</div>
          </div>
        )}
        {!isLoading && query && allResults.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666',
            }}
          >
            <div>No results found for &quot;{query}&quot;</div>
            <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>
              Try different keywords or check your spelling
            </div>
          </div>
        )}
        {!isLoading && results.length > 0 && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {results.map(result => (
                <div
                  key={result.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    background: 'white',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#ff6b35';
                    e.currentTarget.style.boxShadow =
                      '0 4px 12px rgba(255,107,53,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#eee';
                    e.currentTarget.style.boxShadow =
                      '0 1px 3px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ marginBottom: '0.75rem' }}>
                    <Link
                      href={`/${result.slug}${result.anchorId ? `#${result.anchorId}` : ''}`}
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#222',
                        textDecoration: 'none',
                        marginBottom: '0.25rem',
                        display: 'block',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#ff6b35';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#222';
                      }}
                    >
                      {result.heading || result.title}
                    </Link>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {result.part} • Chapter {result.chapter}{' '}
                      {result.heading &&
                        result.heading !== result.title &&
                        ` • ${result.heading}`}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#444',
                      marginBottom: '0.75rem',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightText(result.excerpt, query),
                    }}
                  />
                  <Link
                    href={`/${result.slug}${result.anchorId ? `#${result.anchorId}` : ''}`}
                    style={{
                      fontSize: '12px',
                      color: '#ff6b35',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    Read in context →
                  </Link>
                </div>
              ))}
            </div>
            {isLoadingMore && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  color: '#666',
                }}
              >
                <div style={{ fontSize: '14px' }}>Loading more results...</div>
              </div>
            )}
            {!hasMore && !isLoadingMore && allResults.length > 3 && (
              <div
                style={{
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '12px',
                  padding: '2rem',
                  fontStyle: 'italic',
                }}
              >
                You&apos;ve seen all {allResults.length} results
              </div>
            )}
          </>
        )}
        {message && !isLoading && allResults.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '14px',
              marginTop: '1rem',
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
