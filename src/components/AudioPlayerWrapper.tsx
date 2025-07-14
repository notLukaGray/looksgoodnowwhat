'use client';

import AudioPlayer from './AudioPlayer';

interface AudioPlayerWrapperProps {
  src?: string;
}

export default function AudioPlayerWrapper({ src }: AudioPlayerWrapperProps) {
  return <AudioPlayer src={src} />;
}
