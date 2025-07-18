'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src?: string;
  className?: string;
}

export default function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventListenersRef = useRef<{
    updateTime: () => void;
    updateDuration: () => void;
    handleEnded: () => void;
    handleError: (e: Event) => void;
    handleLoadStart: () => void;
  } | null>(null);

  // Speed options in order
  const speedOptions = [0.75, 1, 1.5, 2];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Cleanup function to properly dispose of audio element
  const cleanupAudio = () => {
    if (audioRef.current) {
      try {
        // Pause and reset audio
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';

        // Remove event listeners
        if (eventListenersRef.current) {
          audioRef.current.removeEventListener(
            'timeupdate',
            eventListenersRef.current.updateTime
          );
          audioRef.current.removeEventListener(
            'loadedmetadata',
            eventListenersRef.current.updateDuration
          );
          audioRef.current.removeEventListener(
            'ended',
            eventListenersRef.current.handleEnded
          );
          audioRef.current.removeEventListener(
            'error',
            eventListenersRef.current.handleError
          );
          audioRef.current.removeEventListener(
            'loadstart',
            eventListenersRef.current.handleLoadStart
          );
        }

        // Reset refs
        audioRef.current = null;
        eventListenersRef.current = null;
      } catch (err) {
        console.warn('Error during audio cleanup:', err);
      }
    }
  };

  // Cleanup effect to pause audio and remove event listeners when component unmounts
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []); // Remove isPlaying dependency to ensure cleanup always runs

  // Reset state when src changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setExpanded(false);
    setError(null);

    // Clean up existing audio element
    cleanupAudio();
  }, [src]);

  // Create audio element only when first needed
  const ensureAudioElement = () => {
    if (!audioRef.current && src) {
      try {
        audioRef.current = new Audio(src);
        audioRef.current.preload = 'metadata';
        audioRef.current.playbackRate = playbackRate;

        const updateTime = () => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        };

        const updateDuration = () => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setError(null);
          }
        };

        const handleEnded = () => {
          setIsPlaying(false);
          setCurrentTime(0);
        };

        const handleError = (e: Event) => {
          console.error('Audio error:', e);
          setError('Failed to load audio');
          setIsPlaying(false);
        };

        const handleLoadStart = () => {
          setError(null);
        };

        // Store event listeners for cleanup
        eventListenersRef.current = {
          updateTime,
          updateDuration,
          handleEnded,
          handleError,
          handleLoadStart,
        };

        audioRef.current.addEventListener('timeupdate', updateTime);
        audioRef.current.addEventListener('loadedmetadata', updateDuration);
        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('error', handleError);
        audioRef.current.addEventListener('loadstart', handleLoadStart);
      } catch (err) {
        console.error('Error creating audio element:', err);
        setError('Failed to create audio player');
      }
    }
  };

  // Expand only after mount and when playing
  useEffect(() => {
    if (!hasMounted) return;
    setExpanded(isPlaying);
  }, [hasMounted, isPlaying]);

  const handlePlayClick = async () => {
    if (!src) return;

    try {
      // Create audio element on first play
      ensureAudioElement();

      if (!audioRef.current) {
        setError('Audio player not available');
        return;
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset error state when attempting to play
        setError(null);

        // Try to play audio
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Error playing audio:', err);
      setError('Failed to play audio');
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current && !isNaN(time)) {
      try {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
      } catch (err) {
        console.warn('Error seeking audio:', err);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSpeedChange = () => {
    const currentIndex = speedOptions.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speedOptions.length;
    const newSpeed = speedOptions[nextIndex];
    setPlaybackRate(newSpeed);

    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  if (!src) {
    return (
      <div
        className={`bg-gray-100 rounded-lg p-4 text-center text-gray-500 ${className}`}
      >
        No audio file provided
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600 ${className}`}
      >
        <div className="text-sm font-medium">{error}</div>
        <button
          onClick={handlePlayClick}
          className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 64,
      }}
    >
      <div
        style={{
          background: '#b95b23',
          borderRadius: 9999,
          width: expanded ? 'min(300px, 80vw)' : 64,
          height: 64,
          minWidth: 64,
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'flex-start' : 'center',
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
          paddingLeft: expanded ? 4 : 0,
          paddingRight: expanded ? 8 : 0,
        }}
      >
        <button
          onClick={handlePlayClick}
          style={{
            background: 'transparent',
            border: 'none',
            borderRadius: 9999,
            width: 48,
            height: 48,
            minWidth: 48,
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            outline: 'none',
            zIndex: 2,
            position: 'relative',
            marginRight: expanded ? 4 : 0,
            transition: 'margin-right 1s cubic-bezier(0.4,0,0.2,1)',
          }}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          disabled={!src}
        >
          {isPlaying ? (
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
              <rect x="5" y="4" width="3.5" height="12" rx="1" />
              <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
              <polygon points="6,4 16,10 6,16" />
            </svg>
          )}
        </button>
        {expanded && (
          <>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: '#fff',
                minWidth: 32,
                textAlign: 'right',
                marginRight: 4,
                marginLeft: 4,
                flexShrink: 0,
              }}
            >
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                flex: 1,
                accentColor: '#fff',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 4,
                height: 4,
                marginRight: 4,
                minWidth: 0,
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: '#fff',
                minWidth: 32,
                textAlign: 'right',
                flexShrink: 0,
              }}
            >
              {formatTime(duration)}
            </span>
            <button
              onClick={handleSpeedChange}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                marginLeft: 8,
                color: '#fff',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
              aria-label={`Playback speed: ${playbackRate}x`}
            >
              {playbackRate === 0.75 ? '.75x' : `${playbackRate}x`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
