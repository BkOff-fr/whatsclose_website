'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface OptimizedVideoProps {
  className?: string;
  poster?: string;
  fallbackImage?: string;
}

export default function OptimizedVideo({
  className = "",
  poster,
  fallbackImage = "/hero-fallback.svg"
}: OptimizedVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setVideoError(true);
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Show static image if user prefers reduced motion or video failed
  if (prefersReducedMotion || videoError) {
    return (
      <div className={className}>
        <img
          src={fallbackImage}
          alt="Commerce local - Image de fond"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1] brightness-[0.4]"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-foret transform -translate-x-1/2 -translate-y-1/2 z-[-1] flex items-center justify-center">
          <div className="text-creme text-xl">Chargement...</div>
        </div>
      )}

      {/* Optimized video with multiple formats */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1] brightness-[0.4]"
        preload="metadata"
      >
        {/* WebM format for better compression */}
        <source
          src="https://videos.pexels.com/video-files/3255231/3255231-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />

        {/* Fallback for very old browsers */}
        <img
          src={fallbackImage}
          alt="Commerce local - Image de fond"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1] brightness-[0.4]"
        />
      </video>
    </div>
  );
}