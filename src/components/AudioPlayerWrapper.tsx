'use client';

import dynamic from 'next/dynamic';

// Dynamically import AudioPlayer with SSR disabled
const AudioPlayer = dynamic(() => import('./AudioPlayer'), {
  ssr: false,
  loading: () => null,
});

interface AudioPlayerWrapperProps {
  src?: string;
  title?: string;
}

export default function AudioPlayerWrapper({
  src,
  title,
}: AudioPlayerWrapperProps) {
  return <AudioPlayer src={src} title={title} />;
}
