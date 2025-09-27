'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const button = buttonRef.current;

    if (!section || !title || !button) return;

    gsap.fromTo([title, button],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleContactClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta-section"
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{ background: '#FAF7F0' }}
    >
      <div className="container mx-auto text-center px-4">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Badge final */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
            <Sparkles className="w-5 h-5" style={{ color: '#FF6B35' }} />
            <span style={{ color: '#FF6B35' }} className="font-semibold text-sm tracking-wide">ÉPILOGUE : VOTRE TOUR</span>
            <Sparkles className="w-5 h-5" style={{ color: '#FF6B35' }} />
          </div>

          {/* Titre narratif */}
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-center break-words"
            style={{ color: '#2F4F2F' }}
          >
            Prêt à rejoindre la{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              révolution locale
            </span>{' '}
            ?
          </h2>

          {/* Sous-titre motivationnel */}
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed text-center" style={{ color: '#8B8680' }}>
            L'histoire ne fait que commencer. Votre quartier, vos commerçants, vos habitudes...
            <br className="hidden md:block" />
            <span style={{
              color: '#A0522D',
              fontWeight: '600',
              background: 'linear-gradient(120deg, #A0522D, #FF6B35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Tout peut changer. Aujourd'hui.
            </span>
          </p>

          {/* CTA principal */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              ref={buttonRef}
              onClick={handleContactClick}
              className="group px-10 py-5 lg:px-12 lg:py-6 text-white font-bold rounded-2xl text-lg lg:text-xl transition-all duration-500 relative overflow-hidden flex items-center gap-3 hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #E85A2B)',
                boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #E85A2B, #D4521F)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35, #E85A2B)';
              }}
            >
              <Rocket className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              <span>Démarrer l'aventure</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />

              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <button
              className="px-8 py-4 font-semibold rounded-xl border-2 transition-all duration-300 hover:scale-105"
              style={{
                color: '#2F4F2F',
                borderColor: '#2F4F2F',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2F4F2F';
                e.currentTarget.style.color = '#FAF7F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2F4F2F';
              }}
            >
              En savoir plus
            </button>
          </div>

          {/* Message final */}
          <div className="mt-16 p-8 rounded-3xl border" style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(218, 165, 32, 0.05))',
            borderColor: 'rgba(255, 107, 53, 0.1)'
          }}>
            <blockquote className="text-2xl md:text-3xl font-light italic leading-relaxed text-center" style={{ color: '#2C2C2C' }}>
              "Chaque grande révolution commence par un simple{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '600'
              }}>
                clic
              </span>
              ."
            </blockquote>
            <cite style={{ color: '#8B8680' }} className="font-medium block mt-4">— L'équipe Whatsclose</cite>
          </div>
        </div>
      </div>

      {/* Vague de transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: 'linear-gradient(to top, #2F4F2F, transparent)'
      }}></div>
    </section>
  );
}