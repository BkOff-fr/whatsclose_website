'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Opening from '@/components/chapters/Opening';
import Disconnection from '@/components/chapters/Disconnection';
import TheRevolution from '@/components/chapters/TheRevolution';
import Vision from '@/components/chapters/Vision';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    ScrollToPlugin: any;
    lucide: any;
  }
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Show main content after a delay, regardless of GSAP loading
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Initialize GSAP if available
      if (typeof window !== 'undefined' && window.gsap) {
        window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
      }

      // Initialize Lucide icons if available
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />

      <main className={`relative transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Chapitre 0 - Ouverture */}
        <Opening />

        {/* Chapitre 1 - La Déconnexion */}
        <Disconnection />

        {/* Chapitre 2 - La Révolution */}
        <TheRevolution />
      </main>
    </>
  );
}