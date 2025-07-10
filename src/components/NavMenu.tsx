'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  part: string;
  chapters: { slug: string; title: string; order: number }[];
}

interface NavMenuProps {
  navItems: NavItem[];
}

const BAR_HEIGHT = 40;
const ANIMATION_DURATION = 1000; // ms
const LINE_HEIGHT = 20; // px, for nav item spacing

export default function NavMenu({ navItems }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(BAR_HEIGHT);
  const [windowHeight, setWindowHeight] = useState(0);
  const animRef = useRef<number | null>(null);

  // Set windowHeight on mount and resize
  useEffect(() => {
    function updateHeight() {
      setWindowHeight(typeof window !== 'undefined' ? window.innerHeight : 0);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (open && windowHeight > 0) {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
        setCurrentHeight(BAR_HEIGHT + progress * (windowHeight - BAR_HEIGHT));
        if (progress < 1) {
          animRef.current = requestAnimationFrame(animate);
        }
      };
      animRef.current = requestAnimationFrame(animate);
      return () => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
      };
    } else {
      setCurrentHeight(BAR_HEIGHT);
      return undefined;
    }
  }, [open, windowHeight]);

  useEffect(() => {
    // Prevent background scroll when nav is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Flatten navItems for fade-in logic
  const flatNav: { type: 'part' | 'chapter'; text: string; slug?: string }[] =
    [];
  navItems.forEach(({ part, chapters }) => {
    flatNav.push({ type: 'part', text: part });
    chapters.forEach(chapter =>
      flatNav.push({ type: 'chapter', text: chapter.title, slug: chapter.slug })
    );
  });

  const navAreaHeight = flatNav.length * LINE_HEIGHT;
  const navStartY = windowHeight > 0 ? (windowHeight - navAreaHeight) / 2 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: currentHeight,
        background: 'white',
        zIndex: 9999,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: open ? undefined : 'height 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={() => setOpen(!open)}
      onMouseEnter={() => {
        if (!open) setCurrentHeight(60);
      }}
      onMouseLeave={() => {
        if (!open) setCurrentHeight(40);
      }}
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
        {}
        <Link
          href="/"
          className="nav-title-link"
          style={{ textDecoration: 'none', border: 'none', outline: 'none' }}
          onClick={e => {
            e.stopPropagation();
          }}
          onMouseEnter={e => {
            e.stopPropagation();
            setCurrentHeight(40);
          }}
          onMouseLeave={e => {
            e.stopPropagation();
            if (!open) {
              // Trigger the parent's mouse enter event to restore the hover state
              const parentElement = e.currentTarget.parentElement;
              if (parentElement) {
                const mouseEnterEvent = new MouseEvent('mouseenter', {
                  bubbles: true,
                  cancelable: true,
                });
                parentElement.dispatchEvent(mouseEnterEvent);
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
              cursor: 'pointer',
              transition: 'color 0.2s',
              textDecoration: 'none',
              border: 'none',
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#222';
              e.stopPropagation();
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#888';
              e.stopPropagation();
            }}
          >
            Looks Good, Now What – Luka Gray
          </span>
        </Link>
        {}
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
      {}
      <div
        style={{
          position: 'absolute',
          top: '6rem',
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 6rem)',
          overflowY: 'auto',
        }}
      >
        {flatNav.map((item, i) => {
          const lineY = navStartY + i * LINE_HEIGHT + LINE_HEIGHT / 2;
          const visible = currentHeight > lineY;
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
                  padding: 0,
                  textAlign: 'center',
                  height: LINE_HEIGHT,
                  lineHeight: `${LINE_HEIGHT}px`,
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.5s',
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
                  padding: 0,
                  textAlign: 'center',
                  height: LINE_HEIGHT,
                  lineHeight: `${LINE_HEIGHT}px`,
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.5s',
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
      </div>
    </div>
  );
}
