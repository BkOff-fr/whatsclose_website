'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import ProfileSection from '@/components/ProfileSection';
import NarrativeCarousel from '@/components/NarrativeCarousel';
import ImpactCalculator from '@/components/ImpactCalculator';
import CTASection from '@/components/CTASection';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading');

    return () => {
      // Clean up ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.classList.remove('loading');

    // Set up main content visibility animation
    gsap.set('#main-content', { autoAlpha: 0 });

    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      onEnter: () => {
        gsap.to('#main-content', { autoAlpha: 1, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to('#main-content', { autoAlpha: 0, duration: 0.5 });
      }
    });
  };

  return (
    <ErrorBoundary>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <Header />

      <HeroSection />

      <main id="main-content" className="relative z-10">
        <ProblemSolutionSection />
        <ProfileSection />
        <NarrativeCarousel />
        <ImpactCalculator />
        <CTASection />
      </main>

      <footer className="bg-foret py-12 text-creme/70">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Whatsclose. Révolutionner le commerce local.</p>
        </div>
      </footer>
    </ErrorBoundary>
  );
}