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
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Expand only after mount and when playing
  useEffect(() => {
    if (!hasMounted) return;
    setExpanded(isPlaying);
  }, [hasMounted, isPlaying]);

  const handlePlayClick = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
      <audio ref={audioRef} src={src} preload="metadata" />
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#fff', minWidth: 32, textAlign: 'right', marginRight: 4, marginLeft: 4, flexShrink: 0 }}>{formatTime(currentTime)}</span>
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
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#fff', minWidth: 32, textAlign: 'right', flexShrink: 0 }}>{formatTime(duration)}</span>
          </>
        )}
      </div>
    </div>
  );
}
