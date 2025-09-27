'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, MapPin, TrendingDown, ArrowRight, Zap, Heart, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const problemCardsRef = useRef<HTMLDivElement>(null);
  const solutionCardsRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const problemCards = problemCardsRef.current;
    const solutionCards = solutionCardsRef.current;
    const bridge = bridgeRef.current;

    if (!section || !problemCards || !solutionCards || !bridge) return;

    gsap.fromTo('.problem-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: problemCards,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(bridge,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: bridge,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.solution-card',
      { opacity: 0, y: -60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: solutionCards,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const problemData = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Horaires rigides",
      description: "Les commerces ferment quand vous êtes disponible",
      color: "#DC2626"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visibilité limitée",
      description: "Difficile de découvrir les trésors de votre quartier",
      color: "#D97706"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Déconnexion",
      description: "Consommateurs et commerçants ne se trouvent plus",
      color: "#2563EB"
    }
  ];

  const solutionData = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Disponibilité 24/7",
      description: "Commandez quand vous voulez, récupérez quand vous pouvez"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Découverte locale",
      description: "Explorez facilement tous les commerces de votre quartier"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Connexion directe",
      description: "Une plateforme qui unit commerçants et habitants"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="story-section"
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FAF7F0 0%, #F5F1E8 100%)' }}
    >
      <div className="container mx-auto px-4">
        {/* En-tête narratif */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(160, 82, 45, 0.1)' }}>
            <TrendingDown className="w-4 h-4" style={{ color: '#A0522D' }} />
            <span style={{ color: '#A0522D' }} className="font-medium text-sm">CHAPITRE 1 : LE CONSTAT</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#2C2C2C' }}>
            Le commerce local <span style={{ color: '#A0522D' }}>souffre</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#8B8680' }}>
            Dans nos quartiers, une histoire se répète : celle de la <span style={{
              background: 'linear-gradient(120deg, #DAA520, #FF6B35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600'
            }}>désynchronisation</span>
            entre commerçants passionnés et consommateurs en quête d'authenticité.
          </p>
        </div>

        {/* Cartes problème */}
        <div ref={problemCardsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {problemData.map((item, index) => (
            <div
              key={index}
              className="problem-card group p-8 bg-white/80 backdrop-blur-sm rounded-2xl border hover:shadow-xl transition-all duration-300"
              style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}
            >
              <div
                className="inline-flex p-4 rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>{item.title}</h3>
              <p style={{ color: '#8B8680' }} className="leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Pont narratif */}
        <div ref={bridgeRef} className="text-center py-16">
          <div className="relative inline-block">
            <div
              className="absolute -inset-4 rounded-full blur-xl"
              style={{ background: 'linear-gradient(to right, rgba(255, 107, 53, 0.2), rgba(218, 165, 32, 0.2))' }}
            ></div>
            <div className="relative bg-white rounded-full p-8 border-4" style={{ borderColor: 'rgba(255, 107, 53, 0.2)' }}>
              <ArrowRight className="w-12 h-12" style={{ color: '#FF6B35' }} />
            </div>
          </div>
          <h3 className="text-3xl font-bold mt-8 mb-4" style={{ color: '#2C2C2C' }}>
            Et si on <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>changeait tout</span> ?
          </h3>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8B8680' }}>
            Whatsclose transforme ces défis en opportunités avec une approche révolutionnaire.
          </p>
          <div className="h-0.5 my-12 max-w-md mx-auto" style={{
            background: 'linear-gradient(90deg, transparent, #A0522D, transparent)'
          }}></div>
        </div>

        {/* En-tête solution */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
            <Zap className="w-4 h-4" style={{ color: '#FF6B35' }} />
            <span style={{ color: '#FF6B35' }} className="font-medium text-sm">CHAPITRE 2 : LA SOLUTION</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#2C2C2C' }}>
            Whatsclose <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>simplifie</span> tout
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#8B8680' }}>
            Une plateforme pensée pour <span style={{
              background: 'linear-gradient(120deg, #DAA520, #FF6B35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600'
            }}>reconnecter l'humain</span>
            au cœur du commerce local, disponible 24h/24.
          </p>
        </div>

        {/* Cartes solution */}
        <div ref={solutionCardsRef} className="grid md:grid-cols-3 gap-8">
          {solutionData.map((item, index) => (
            <div
              key={index}
              className="solution-card group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              style={{ borderColor: 'rgba(160, 82, 45, 0.1)', boxShadow: '0 8px 32px rgba(47, 79, 47, 0.08)' }}
            >
              <div
                className="inline-flex p-4 rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#FF6B35' }}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>{item.title}</h3>
              <p style={{ color: '#8B8680' }} className="leading-relaxed">{item.description}</p>

              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center mt-20 p-12 rounded-3xl border" style={{
          background: 'linear-gradient(to right, rgba(255, 107, 53, 0.05), rgba(218, 165, 32, 0.05))',
          borderColor: 'rgba(255, 107, 53, 0.1)'
        }}>
          <blockquote className="text-2xl md:text-3xl font-light italic leading-relaxed mb-6" style={{ color: '#2C2C2C' }}>
            "Le futur du commerce n'est pas dans la distance, mais dans la <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600'
            }}>proximité réinventée</span>."
          </blockquote>
          <cite style={{ color: '#8B8680' }} className="font-medium">— L'équipe Whatsclose</cite>
        </div>
      </div>
    </section>
  );
}