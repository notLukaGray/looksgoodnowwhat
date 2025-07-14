'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import AudioPlayer with SSR disabled
const AudioPlayer = dynamic(() => import('./AudioPlayer'), {
  ssr: false,
  loading: () => null,
});

export default function AudioPlayerWrapper() {
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [audioTitle, setAudioTitle] = useState<string>('');

  useEffect(() => {
    // Find the audio player placeholder and get the audio source
    const placeholder = document.getElementById('audio-player-placeholder');
    if (placeholder) {
      const src = placeholder.getAttribute('data-audio-src');
      if (src) {
        setAudioSrc(src);
        // Try to get the title from the chapter content
        const chapterTitle =
          document.querySelector('h1')?.textContent || 'Audio';
        setAudioTitle(chapterTitle);
      }
    }
  }, []);

  return <AudioPlayer src={audioSrc} title={audioTitle} />;
}
