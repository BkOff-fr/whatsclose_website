'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const scrollTrigger = ScrollTrigger.create({
      start: window.innerHeight * 0.9,
      end: 99999,
      onEnter: () => header.classList.remove('-translate-y-full'),
      onLeaveBack: () => header.classList.add('-translate-y-full')
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, { duration: 1, scrollTo: sectionId, ease: 'power2.inOut' });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 p-4 transition-transform duration-500 -translate-y-full"
    >
      <div className="container mx-auto bg-black/20 backdrop-blur-sm p-3 rounded-full flex justify-between items-center">
        <button
          onClick={() => scrollToSection('#hero-section')}
          className="text-2xl font-bold text-creme font-display"
          aria-label="Retour à l'accueil Whatsclose"
        >
          Whatsclose
        </button>
        <nav className="flex gap-6 items-center text-creme" role="navigation" aria-label="Navigation principale">
          <button
            onClick={() => scrollToSection('#pour-qui-section')}
            className="hidden md:block hover:text-ocre transition-colors"
            aria-label="Aller à la section Pour Qui"
          >
            Pour Qui ?
          </button>
          <button
            onClick={() => scrollToSection('#narrative-section')}
            className="hidden md:block hover:text-ocre transition-colors"
            aria-label="Aller à la section Expérience utilisateur"
          >
            L&apos;Expérience
          </button>
          <button
            onClick={() => scrollToSection('#final-cta-section')}
            className="bg-ocre px-4 py-2 rounded-full font-bold text-white hover:scale-105 transition-transform"
            aria-label="Aller à la section Contact"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}