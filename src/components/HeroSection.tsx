'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import OptimizedVideo from './OptimizedVideo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
      "-=0.6"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleCTAClick = () => {
    if (typeof window !== 'undefined') {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: '#story-section',
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1C3F1C 0%, #2F4F2F 50%, #A0522D 100%)' }}
    >
      <OptimizedVideo className="hero-video opacity-20" />

      <div className="container relative z-20 text-center text-white">
        {/* Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#FF6B35' }}></div>
            <span className="text-white text-sm font-medium tracking-wide">RÉVOLUTION EN COURS</span>
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#DAA520' }}></div>
          </div>
        </div>

        {/* Titre */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="block" style={{
            background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Whatsclose
          </span>
          <span className="block text-white mt-2">révolutionne le</span>
          <span className="block" style={{
            background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            commerce local.
          </span>
        </h1>

        {/* Sous-titre */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed mb-12"
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          Découvrez comment <span style={{
            background: 'linear-gradient(120deg, #DAA520, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '600'
          }}>une plateforme innovante</span> reconnecte
          commerçants et consommateurs pour <span style={{
            background: 'linear-gradient(120deg, #DAA520, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '600'
          }}>redynamiser votre quartier</span>.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            ref={ctaRef}
            onClick={handleCTAClick}
            className="px-8 py-4 text-lg font-semibold rounded-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: '#FF6B35',
              boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E85A2B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FF6B35';
            }}
          >
            Découvrir l'Histoire
          </button>

          <button
            className="px-8 py-4 text-lg font-semibold rounded-xl text-white border-2 border-white bg-transparent hover:bg-white hover:text-gray-800 transition-all duration-300"
          >
            Voir la Démo
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs uppercase tracking-wider mb-4">Découvrir</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent relative">
              <div className="absolute top-0 w-1 h-4 rounded-full animate-pulse transform -translate-x-0.5" style={{ backgroundColor: '#FF6B35' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague de transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: 'linear-gradient(to top, #FAF7F0, transparent)'
      }}></div>
    </section>
  );
}