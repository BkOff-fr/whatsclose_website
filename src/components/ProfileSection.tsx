'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Store, Users, Building2, Handshake, ArrowRight, Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Profile {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  story: {
    problem: string;
    solution: string;
    result: string;
    quote: string;
    author: string;
    role: string;
    cta: string;
  };
}

const profiles: Profile[] = [
  {
    id: 'commercant',
    title: 'Commerçants',
    subtitle: 'Vendez plus, gérez moins',
    icon: <Store className="w-8 h-8" />,
    color: 'bg-orange-vif',
    story: {
      problem: "Marie ferme sa boulangerie à 19h mais les clients arrivent à 19h30...",
      solution: "Avec Whatsclose, ses clients commandent à l'avance. Elle prépare sereinement.",
      result: "Fini le stress, fini le gaspillage. +40% de revenus en 6 mois.",
      quote: "Whatsclose m'a rendu ma liberté. Mes clients sont contents, je suis sereine, et mes revenus ont explosé !",
      author: "Marie Dubois",
      role: "Boulangère, Lyon 3ème",
      cta: "Calculer mon impact"
    }
  },
  {
    id: 'consommateur',
    title: 'Consommateurs',
    subtitle: 'Découvrez le meilleur de votre quartier',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-terre',
    story: {
      problem: "Thomas cherchait des produits frais locaux mais ne savait jamais quoi, où, quand...",
      solution: "L'app lui montre tout ce qui l'entoure : horaires, disponibilités, spécialités.",
      result: "Il découvre 3 nouveaux commerces par mois et économise 2h de courses.",
      quote: "Je redécouvre mon quartier chaque semaine ! Fini les supermarchés, vive le local.",
      author: "Thomas Martin",
      role: "Père de famille, Bordeaux",
      cta: "Télécharger l'app"
    }
  },
  {
    id: 'collectivite',
    title: 'Collectivités',
    subtitle: 'Redynamisez votre territoire',
    icon: <Building2 className="w-8 h-8" />,
    color: 'bg-foret',
    story: {
      problem: "La ville voyait ses centres-villes se vider, les commerces fermer un à un...",
      solution: "Whatsclose a connecté tous les acteurs : commerçants, habitants, visiteurs.",
      result: "15% d'augmentation du trafic local et 8 nouvelles ouvertures de commerces.",
      quote: "Notre centre-ville revit ! Les habitants consomment local, les touristes découvrent nos artisans.",
      author: "Sophie Moreau",
      role: "Adjointe au Commerce, Mairie d'Angers",
      cta: "Organiser une présentation"
    }
  },
  {
    id: 'partenaire',
    title: 'Partenaires',
    subtitle: 'Intégrez l\'écosystème du futur',
    icon: <Handshake className="w-8 h-8" />,
    color: 'bg-bois-fonce',
    story: {
      problem: "LogiLocal avait du mal à connecter ses services de livraison avec les commerces...",
      solution: "L'API Whatsclose a intégré leurs services en 48h. Connexion fluide, partout.",
      result: "300% d'augmentation des livraisons locales et satisfaction client au top.",
      quote: "L'intégration fut un jeu d'enfant. Nos livreurs ont maintenant du travail, les commerçants des solutions.",
      author: "Marc Dupont",
      role: "CEO LogiLocal",
      cta: "Voir la documentation"
    }
  }
];

export default function ProfileSection() {
  const [activeProfile, setActiveProfile] = useState('commercant');
  const sectionRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée des profils
    gsap.fromTo('.profile-nav-item',
      { opacity: 0, x: -50, rotationY: -20 },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation continue de la story active
    gsap.fromTo('.story-active',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );

  }, [activeProfile]);

  const handleProfileClick = (profileId: string) => {
    if (profileId === activeProfile) return;

    // Animation de sortie
    gsap.to(storyRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveProfile(profileId);
        // Animation d'entrée
        gsap.fromTo(storyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  };

  const activeStory = profiles.find(p => p.id === activeProfile)?.story;
  const activeProfileData = profiles.find(p => p.id === activeProfile);

  return (
    <section
      ref={sectionRef}
      id="profiles-section"
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1C3F1C 0%, #2F4F2F 100%)' }}
    >
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(250, 247, 240, 0.1)' }}>
            <Users className="w-4 h-4" style={{ color: '#FAF7F0' }} />
            <span style={{ color: '#FAF7F0' }} className="font-medium text-sm">CHAPITRE 3 : LES PROTAGONISTES</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-center">
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Quatre histoires</span><span style={{ color: '#FAF7F0' }}>, un même succès</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-center" style={{ color: 'rgba(250, 247, 240, 0.8)' }}>
            Découvrez comment Whatsclose transforme la vie de chacun,
            <span style={{ color: '#D4B39C', fontWeight: '600' }}> une relation à la fois</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Navigation des profils */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {profiles.map((profile, index) => (
                <button
                  key={profile.id}
                  onClick={() => handleProfileClick(profile.id)}
                  className={`profile-nav-item w-full text-left p-6 rounded-2xl border-2 transition-all duration-500 group
                    ${activeProfile === profile.id
                      ? 'transform translate-x-4 shadow-xl'
                      : 'hover:transform hover:translate-x-2'
                    }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    borderColor: activeProfile === profile.id ? '#FF6B35' : 'rgba(250, 247, 240, 0.2)',
                    backgroundColor: activeProfile === profile.id ? 'rgba(255, 107, 53, 0.1)' : 'rgba(250, 247, 240, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeProfile !== profile.id) {
                      e.currentTarget.style.borderColor = 'rgba(250, 247, 240, 0.4)';
                      e.currentTarget.style.backgroundColor = 'rgba(250, 247, 240, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeProfile !== profile.id) {
                      e.currentTarget.style.borderColor = 'rgba(250, 247, 240, 0.2)';
                      e.currentTarget.style.backgroundColor = 'rgba(250, 247, 240, 0.05)';
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300" style={{
                      backgroundColor: profile.id === 'commercant' ? '#FF6B35' :
                                     profile.id === 'consommateur' ? '#A0522D' :
                                     profile.id === 'collectivite' ? '#2F4F2F' : '#8B5A3C'
                    }}>
                      {profile.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1" style={{ color: '#FAF7F0' }}>{profile.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(250, 247, 240, 0.7)' }}>{profile.subtitle}</p>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all duration-300`} style={{
                      color: activeProfile === profile.id ? '#FF6B35' : 'rgba(250, 247, 240, 0.4)',
                      transform: activeProfile === profile.id ? 'rotate(90deg)' : 'rotate(0deg)'
                    }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contenu de l'histoire */}
          <div className="lg:col-span-3">
            <div
              ref={storyRef}
              className="story-active p-8 lg:p-12 rounded-3xl relative overflow-hidden min-h-[600px] flex flex-col justify-center"
              style={{
                background: 'rgba(250, 247, 240, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(160, 82, 45, 0.1)',
                boxShadow: '0 8px 32px rgba(47, 79, 47, 0.08)',
                color: '#2C2C2C'
              }}
            >
              {activeStory && activeProfileData && (
                <>
                  {/* Header avec icône et titre */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-2xl text-white" style={{
                      backgroundColor: activeProfileData.id === 'commercant' ? '#FF6B35' :
                                     activeProfileData.id === 'consommateur' ? '#A0522D' :
                                     activeProfileData.id === 'collectivite' ? '#2F4F2F' : '#8B5A3C'
                    }}>
                      {activeProfileData.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>{activeProfileData.title}</h3>
                      <p style={{ color: '#8B8680' }}>{activeProfileData.subtitle}</p>
                    </div>
                  </div>

                  {/* Narrative en 3 actes */}
                  <div className="space-y-8 mb-10">
                    <div className="p-6 bg-red-50 rounded-2xl border-l-4 border-red-400">
                      <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 bg-red-400 text-white rounded-full text-xs flex items-center justify-center">1</span>
                        Le Problème
                      </h4>
                      <p className="text-red-700 leading-relaxed">{activeStory.problem}</p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
                      <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-400 text-white rounded-full text-xs flex items-center justify-center">2</span>
                        La Solution Whatsclose
                      </h4>
                      <p className="text-blue-700 leading-relaxed">{activeStory.solution}</p>
                    </div>

                    <div className="p-6 bg-green-50 rounded-2xl border-l-4 border-green-400">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 bg-green-400 text-white rounded-full text-xs flex items-center justify-center">3</span>
                        Le Résultat
                      </h4>
                      <p className="text-green-700 leading-relaxed font-semibold">{activeStory.result}</p>
                    </div>
                  </div>

                  {/* Témoignage */}
                  <div className="p-8 rounded-2xl border mb-8" style={{
                    background: 'linear-gradient(to right, rgba(255, 107, 53, 0.05), rgba(218, 165, 32, 0.05))',
                    borderColor: 'rgba(255, 107, 53, 0.2)'
                  }}>
                    <Quote className="w-8 h-8 mb-4" style={{ color: '#FF6B35' }} />
                    <blockquote className="text-xl italic leading-relaxed mb-6" style={{ color: '#2C2C2C' }}>
                      "{activeStory.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 107, 53, 0.2)' }}>
                        <Star className="w-6 h-6" style={{ color: '#FF6B35' }} />
                      </div>
                      <div>
                        <cite className="font-bold block" style={{ color: '#2C2C2C' }}>{activeStory.author}</cite>
                        <span className="text-sm" style={{ color: '#8B8680' }}>{activeStory.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <button className="px-8 py-4 text-lg font-semibold rounded-xl text-white transition-all duration-300 group relative overflow-hidden" style={{
                      background: '#FF6B35',
                      boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#E85A2B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FF6B35';
                    }}>
                      <span className="relative z-10">{activeStory.cta}</span>
                      <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{
                        background: 'linear-gradient(to right, #E85A2B, #DAA520)'
                      }}></div>
                    </button>
                  </div>

                  {/* Effet de brillance */}
                  <div className="absolute top-0 left-0 w-full h-1" style={{
                    background: 'linear-gradient(to right, transparent, rgba(255, 107, 53, 0.3), transparent)'
                  }}></div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats inspirantes */}
        <div className="grid md:grid-cols-4 gap-8 mt-20">
          {[
            { number: '1000+', label: 'Commerçants connectés' },
            { number: '15000+', label: 'Consommateurs actifs' },
            { number: '25', label: 'Villes partenaires' },
            { number: '40%', label: 'Augmentation moyenne CA' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(250, 247, 240, 0.1)' }}>
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{
                background: 'linear-gradient(135deg, #FF6B35, #DAA520, #A0522D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>{stat.number}</div>
              <div style={{ color: 'rgba(250, 247, 240, 0.8)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 rounded-full blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.05), transparent)'
      }}></div>
      <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 rounded-full blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(218, 165, 32, 0.05), transparent)'
      }}></div>
    </section>
  );
}