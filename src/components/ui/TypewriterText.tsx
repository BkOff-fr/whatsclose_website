'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  progress: number; // 0 to 1
  className?: string;
  startProgress?: number; // When to start the typewriter (0 to 1)
  endProgress?: number; // When to finish the typewriter (0 to 1)
}

export default function TypewriterText({
  text,
  progress,
  className = '',
  startProgress = 0,
  endProgress = 1
}: TypewriterTextProps) {
  const [visibleChars, setVisibleChars] = useState(text.length); // Show all text initially
  const [currentProgress, setCurrentProgress] = useState(progress);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  useEffect(() => {
    // Listen for custom events from GSAP
    const handleProgressUpdate = (event: any) => {
      setCurrentProgress(event.detail.progress);
    };

    const element = textRef.current;
    if (element) {
      element.addEventListener('updateProgress', handleProgressUpdate);
      return () => element.removeEventListener('updateProgress', handleProgressUpdate);
    }
  }, []);

  useEffect(() => {
    // Calculate how many characters should be visible based on scroll progress
    const effectiveProgress = Math.max(0, Math.min(1, (currentProgress - startProgress) / (endProgress - startProgress)));
    const targetChars = Math.floor(effectiveProgress * text.length);

    setVisibleChars(targetChars);
  }, [currentProgress, text.length, startProgress, endProgress]);

  // Split text into characters with gradient fade effect
  const renderText = () => {
    return text.split('').map((char, index) => {
      const isSpace = char === ' ';

      let opacity = 1; // Force visible for debugging

      return (
        <span
          key={index}
          className="inline-block transition-all duration-150"
          style={{
            opacity: 1
          }}
        >
          {isSpace ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div ref={textRef} className={className}>
      {renderText()}
      {/* Cursor blink effect */}
      {visibleChars < text.length && (
        <span className="inline-block w-0.5 h-8 bg-ocre ml-1 animate-pulse" />
      )}
    </div>
  );
}