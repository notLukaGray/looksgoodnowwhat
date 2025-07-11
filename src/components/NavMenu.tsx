'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import SearchButton from './SearchButton';
import { useRouter, usePathname } from 'next/navigation';
import { SearchResult } from '@/lib/search';

interface NavItem {
  part: string;
  chapters: { slug: string; title: string; order: number }[];
}

interface NavMenuProps {
  navItems: NavItem[];
}

const BAR_HEIGHT = 40;
const LINE_HEIGHT = 40;

export default function NavMenu({ navItems }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTiny, setIsTiny] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Debounced search function
  const debouncedSearch = useRef<NodeJS.Timeout | null>(null);

  // Perform search for modal overlay (top 3 results only)
  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=3`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setIsLoading(value.trim().length >= 2);

    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }

    debouncedSearch.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Handle search activation
  const handleSearchActivate = () => {
    setSearchActive(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 1000);
  };

  // Handle search deactivation
  const handleSearchDeactivate = () => {
    setSearchActive(false);
    setQuery('');
    setResults([]);
    setIsLoading(false);
    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    router.push(
      `/${result.slug}${result.anchorId ? `#${result.anchorId}` : ''}`
    );
    handleSearchDeactivate();
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      handleSearchDeactivate();
    }
  };

  // Handle escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchActive) {
        handleSearchDeactivate();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchActive &&
        searchInputRef.current &&
        !searchInputRef.current.closest('div')?.contains(e.target as Node)
      ) {
        handleSearchDeactivate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      if (debouncedSearch.current) {
        clearTimeout(debouncedSearch.current);
      }
    };
  }, [searchActive]);

  // Set mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkTiny = () => setIsTiny(window.innerWidth <= 400);

    checkMobile();
    checkTiny();

    window.addEventListener('resize', () => {
      checkMobile();
      checkTiny();
    });

    return () =>
      window.removeEventListener('resize', () => {
        checkMobile();
        checkTiny();
      });
  }, []);

  // Reset navbar state when route changes
  useEffect(() => {
    setOpen(false);
    setHovered(false);
    handleSearchDeactivate();
  }, [pathname]);

  // Prevent background scroll when nav is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [open]);

  // Flatten navItems
  const flatNav: { type: 'part' | 'chapter'; text: string; slug?: string }[] =
    [];
  navItems.forEach(({ part, chapters }) => {
    flatNav.push({ type: 'part', text: part });
    chapters.forEach(chapter =>
      flatNav.push({ type: 'chapter', text: chapter.title, slug: chapter.slug })
    );
  });

  // Calculate nav height
  const navHeight = open ? '100vh' : hovered ? '60px' : '40px';

  return (
    <div
      ref={navBarRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: navHeight,
        background: 'white',
        zIndex: 9999,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'height 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: BAR_HEIGHT,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Search Section */}
        <div
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onClick={e => e.stopPropagation()}
          onMouseEnter={() => setHovered(false)}
          onMouseLeave={e => {
            // Check if mouse is still over nav bar
            if (navBarRef.current) {
              const { clientX, clientY } = e;
              const el = document.elementFromPoint(clientX, clientY);
              if (el && navBarRef.current.contains(el)) {
                setHovered(true);
              }
            }
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: searchActive ? 240 : 32,
              transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
              overflow: 'hidden',
              boxSizing: 'content-box',
            }}
            onClick={e => e.stopPropagation()}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search chapters..."
              style={{
                width: searchActive ? '200px' : '0px',
                minWidth: 0,
                padding: searchActive ? '4px 8px' : '0px',
                border: searchActive ? '1px solid #ddd' : 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'IBM Plex Mono, monospace',
                outline: 'none',
                background: 'white',
                boxShadow: searchActive ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                transition: 'all 1s cubic-bezier(0.4,0,0.2,1)',
                opacity: searchActive ? 1 : 0,
                pointerEvents: searchActive ? 'auto' : 'none',
                marginRight: '8px',
              }}
              onKeyDown={e => {
                if (e.key === 'Escape') {
                  handleSearchDeactivate();
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit();
                }
                e.stopPropagation();
              }}
              onMouseEnter={() => setHovered(false)}
              onMouseLeave={(e: React.MouseEvent) => {
                if (navBarRef.current) {
                  const { clientX, clientY } = e;
                  const el = document.elementFromPoint(clientX, clientY);
                  if (el && navBarRef.current.contains(el)) {
                    setHovered(true);
                  }
                }
              }}
            />
            <SearchButton
              onClick={e => {
                e.stopPropagation();
                if (searchActive) {
                  if (query.trim()) {
                    handleSearchSubmit();
                  } else {
                    handleSearchDeactivate();
                  }
                } else {
                  handleSearchActivate();
                }
              }}
              mode={searchActive && query.trim() ? 'search' : 'open'}
              onMouseEnter={() => setHovered(false)}
              onMouseLeave={(e: React.MouseEvent) => {
                if (navBarRef.current) {
                  const { clientX, clientY } = e;
                  const el = document.elementFromPoint(clientX, clientY);
                  if (el && navBarRef.current.contains(el)) {
                    setHovered(true);
                  }
                }
              }}
            />
          </div>
        </div>

        <Link
          href="/"
          className="nav-title-link"
          style={{
            textDecoration: 'none',
            border: 'none',
            outline: 'none',
            opacity: isMobile && searchActive ? 0 : 1,
            transition: 'opacity 1s ease',
            pointerEvents: isMobile && searchActive ? 'none' : 'auto',
          }}
          onClick={e => {
            if (isMobile && searchActive) {
              e.preventDefault();
              return;
            }
            e.stopPropagation();
          }}
          onMouseEnter={() => setHovered(false)}
          onMouseLeave={e => {
            if (navBarRef.current) {
              const { clientX, clientY } = e;
              const el = document.elementFromPoint(clientX, clientY);
              if (el && navBarRef.current.contains(el)) {
                setHovered(true);
              }
            }
          }}
        >
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 12,
              color: '#888',
              letterSpacing: 1,
              cursor: isMobile && searchActive ? 'default' : 'pointer',
              transition: 'color 0.2s',
              textDecoration: 'none',
              border: 'none',
              outline: 'none',
            }}
            onMouseEnter={e => {
              if (isMobile && searchActive) return;
              e.currentTarget.style.color = '#222';
              e.stopPropagation();
            }}
            onMouseLeave={e => {
              if (isMobile && searchActive) return;
              e.currentTarget.style.color = '#888';
              e.stopPropagation();
            }}
          >
            {isTiny
              ? 'Looks Good, Now What'
              : 'Looks Good, Now What – Luka Gray'}
          </span>
        </Link>

        <span
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <span
            style={{
              width: 12,
              height: 1,
              background: '#888',
              borderRadius: 1,
            }}
          ></span>
          <span
            style={{
              width: 12,
              height: 1,
              background: '#888',
              borderRadius: 1,
            }}
          ></span>
          <span
            style={{
              width: 12,
              height: 1,
              background: '#888',
              borderRadius: 1,
            }}
          ></span>
        </span>
      </div>

      {/* Nav items */}
      {open && (
        <div
          style={{
            flex: 1,
            width: '100%',
            overflowY: 'auto',
            paddingTop: '2rem',
          }}
        >
          {flatNav.map((item, i) => {
            const isPart = item.type === 'part';
            const isFirst = i === 0;

            if (isPart) {
              return (
                <div
                  key={item.text + i}
                  style={{
                    color: 'black',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    margin: 0,
                    padding: '0 1rem',
                    textAlign: 'center',
                    height: LINE_HEIGHT,
                    lineHeight: `${LINE_HEIGHT}px`,
                    letterSpacing: 1,
                    marginTop: !isFirst ? 16 : 0,
                    border: 'none',
                    outline: 'none',
                    textDecoration: 'none',
                  }}
                >
                  {item.text}
                </div>
              );
            } else {
              return (
                <Link
                  key={item.text + i}
                  href={`/${item.slug}`}
                  onClick={e => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  style={{
                    color: 'black',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    margin: 0,
                    padding: '0 1rem',
                    textAlign: 'center',
                    height: LINE_HEIGHT,
                    lineHeight: `${LINE_HEIGHT}px`,
                    letterSpacing: 1,
                    textDecoration: 'none',
                    display: 'block',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#666';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'black';
                  }}
                >
                  {item.text}
                </Link>
              );
            }
          })}
          <div style={{ height: '120px' }}></div>
        </div>
      )}

      {/* Search Overlay */}
      {searchActive && query.length >= 2 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 2000,
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              zIndex: 999,
            }}
            onClick={handleSearchDeactivate}
          />

          <div
            style={{
              position: 'fixed',
              top: '3.5rem',
              left: '2rem',
              width: '350px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxHeight: '400px',
              overflowY: 'auto',
              fontFamily: 'IBM Plex Mono, monospace',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #eee',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#555',
                }}
              >
                {isLoading ? 'Searching...' : `Quick Results for "${query}"`}
              </div>
              <button
                onClick={handleSearchDeactivate}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#888',
                  padding: '2px',
                }}
              >
                ✕
              </button>
            </div>

            {isLoading && (
              <div
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#888',
                  fontSize: '12px',
                }}
              >
                <div>Searching through chapters...</div>
              </div>
            )}

            {!isLoading && results.length === 0 && query.length >= 2 && (
              <div
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#888',
                  fontSize: '12px',
                }}
              >
                <div>No quick results found for &quot;{query}&quot;</div>
                <div
                  style={{ fontSize: '11px', marginTop: '4px', color: '#aaa' }}
                >
                  Try the full search page for more results
                </div>
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div>
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      borderBottom:
                        index < results.length - 1
                          ? '1px solid #f0f0f0'
                          : 'none',
                      fontSize: '12px',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: '4px',
                        color: '#222',
                        fontSize: '13px',
                      }}
                    >
                      {result.heading || result.title}
                    </div>
                    <div
                      style={{
                        color: '#666',
                        fontSize: '11px',
                        marginBottom: '4px',
                      }}
                    >
                      {result.part} • Chapter {result.chapter}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#888',
                        lineHeight: '1.3',
                      }}
                    >
                      {result.excerpt.substring(0, 100)}...
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    borderTop: '1px solid #f0f0f0',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  <button
                    onClick={handleSearchSubmit}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff6b35',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontFamily: 'IBM Plex Mono, monospace',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    View all results on search page →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
