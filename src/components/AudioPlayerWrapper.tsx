'use client';

import dynamic from 'next/dynamic';

// Dynamically import AudioPlayer with SSR disabled
const AudioPlayer = dynamic(() => import('./AudioPlayer'), {
  ssr: false,
  loading: () => null,
});

export default function AudioPlayerWrapper() {
  return <AudioPlayer />;
}
