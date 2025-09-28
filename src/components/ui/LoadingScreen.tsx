'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simple timer-based animation that doesn't depend on GSAP
    const timer = setTimeout(() => {
      setIsComplete(true);

      // Remove loading class from body
      document.body.classList.remove('loading');

      // Hide loading screen after animation
      setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.style.display = 'none';
        }
      }, 1000);
    }, 1800); // 1.8 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="loading-screen"
      className={`fixed top-0 left-0 w-full h-screen bg-foret z-[100] flex items-center justify-center transition-transform duration-1000 ${
        isComplete ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="text-center text-creme">
        <div className="relative flex items-center justify-center">
          {/* Background circle */}
          <svg className="w-48 h-48" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--creme)"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
          </svg>

          {/* Animated progress circle */}
          <svg
            className="absolute w-48 h-48 -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--ocre)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset="283"
              className="animate-loading-progress"
            />
          </svg>

          {/* Icon */}
          <div className="absolute flex items-center justify-center">
            <div className={`text-6xl transition-all duration-800 delay-1000 ${
              isComplete ? 'scale-110 opacity-100' : 'scale-0 opacity-0'
            }`}>
              🍃
            </div>
          </div>
        </div>

        <h2 className={`text-2xl font-bold font-display mt-8 transition-all duration-500 delay-800 ${
          isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Whatsclose
        </h2>

        <p className={`text-sm mt-3 transition-all duration-400 delay-1200 ${
          isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Chargement de l'expérience...
        </p>
      </div>
    </div>
  );
}