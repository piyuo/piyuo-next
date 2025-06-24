"use client";

import { useEffect, useRef, useState } from 'react';

export function ScreenshotPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.loop = true;
      video.autoplay = true;

      const handleCanPlay = () => {
        setIsLoaded(true);
        video.play().catch(console.error);
      };

      const handleLoadedData = () => {
        setIsLoaded(true);
        video.play().catch(console.error);
      };

      const handleLoadedMetadata = () => {
        setIsLoaded(true);
        video.play().catch(console.error);
      };

      // Try multiple events to ensure video starts playing
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Force play attempt after a short delay as fallback
      const timeoutId = setTimeout(() => {
        setIsLoaded(true);
        video.play().catch(console.error);
      }, 1000);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative bg-cover bg-center rounded-2xl overflow-hidden shadow-2xl"
      style={{
        backgroundImage: 'url(/images/screenshot.webp)',
        aspectRatio: '16/9'
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
      >
        <source src="/videos/screenshot.webm" type="video/webm" />
        <source src="/videos/screenshot.mp4" type="video/mp4" />
      </video>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="text-white text-lg">Loading video...</div>
        </div>
      )}
    </div>
  );
}
