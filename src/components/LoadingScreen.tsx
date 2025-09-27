'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MapPin } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const logoCircleRef = useRef<SVGCircleElement>(null);
  const loadingTextRef = useRef<HTMLHeadingElement>(null);
  const mapIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadingScreen = loadingScreenRef.current;
    const logoFg = logoCircleRef.current;
    const loadingText = loadingTextRef.current;
    const mapIcon = mapIconRef.current;

    if (!loadingScreen || !logoFg || !loadingText || !mapIcon) return;

    gsap.set(mapIcon, { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('loading');
        onComplete();
      }
    });

    tl.to(logoFg, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' })
      .to(mapIcon, { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)' }, "-=0.8")
      .to(loadingText, { opacity: 1, y: -10, duration: 0.6 }, "-=0.5")
      .to(loadingScreen, { y: '-100%', duration: 1, ease: 'power3.inOut', delay: 0.5 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loadingScreenRef}
      className="fixed top-0 left-0 w-full h-screen bg-foret z-[100] flex items-center justify-center"
    >
      <div className="text-center text-creme">
        <div className="relative flex items-center justify-center">
          <svg className="w-48 h-48" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="var(--creme)" strokeWidth="2" fill="none" opacity="0.2"/>
          </svg>
          <svg className="absolute w-48 h-48" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              ref={logoCircleRef}
              cx="50" cy="50" r="45"
              stroke="var(--ocre)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset="283"
            />
          </svg>
          <div ref={mapIconRef} className="absolute opacity-0">
            <MapPin className="w-16 h-16 text-creme" />
          </div>
        </div>
        <h2 ref={loadingTextRef} className="text-3xl font-bold font-display mt-8 opacity-0">
          Whatsclose
        </h2>
      </div>
    </div>
  );
}