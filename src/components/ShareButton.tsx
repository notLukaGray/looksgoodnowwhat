'use client';

import { useState } from 'react';
import { siteConfig } from '../lib/config';

interface ShareButtonProps {
  chapterTitle: string;
  chapterSlug: string;
}

export default function ShareButton({
  chapterTitle,
  chapterSlug,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${siteConfig.shortDomain}/${chapterSlug}`;
  const shareText = `Check out "${chapterTitle}" from "Looks Good, Now What" by Luka Gray`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: chapterTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error occurred, fall back to copy
        copyToClipboard();
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      // Ensure document is focused
      if (document.hasFocus()) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback: create a temporary textarea element
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
          // Show URL in an alert as last resort
          alert(`Copy this URL: ${shareUrl}`);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error('Failed to copy URL:', error);
      // Show URL in an alert as last resort
      alert(`Copy this URL: ${shareUrl}`);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '48px',
          height: '48px',
          backgroundColor: '#b95b23',
          borderColor: '#ffffff',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: 9999,
          cursor: 'pointer',
          transition: 'all 0.2s',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#9d4c1e';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#b95b23';
        }}
        title="Share this chapter"
      >
        {copied ? (
          <svg
            style={{
              width: '24px',
              height: '24px',
              color: '#ffffff',
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            style={{
              width: '24px',
              height: '24px',
              color: '#ffffff',
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
        )}
      </button>

      {/* Toast notification */}
      {copied && (
        <div className="fixed bottom-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300">
          URL copied to clipboard!
        </div>
      )}
    </>
  );
}
