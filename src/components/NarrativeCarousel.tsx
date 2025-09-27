'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, ShoppingCart, Package, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene {
  time?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isTitle?: boolean;
}

const scenes: Scene[] = [
  {
    title: "Suivez le parcours d'un produit local.",
    description: "",
    isTitle: true
  },
  {
    time: "08:00",
    title: "La mise en ligne.",
    description: "Marie, boulangère, ajoute sa production du jour sur Whatsclose. Pains, viennoiseries, tout est géolocalisé et visible par les habitants du quartier.",
    icon: <Smartphone className="w-32 h-32" />
  },
  {
    time: "12:30",
    title: "La commande.",
    description: "Thomas, depuis son bureau, commande son pain pour le soir. Il paie directement dans l'app et reçoit une confirmation instantanée.",
    icon: <ShoppingCart className="w-32 h-32" />
  },
  {
    time: "16:00",
    title: "La préparation.",
    description: "Marie reçoit la notification et prépare la commande. Elle l'emballe et la marque comme prête pour le retrait.",
    icon: <Package className="w-32 h-32" />
  },
  {
    time: "18:30",
    title: "Le retrait.",
    description: "Après sa journée, Thomas passe récupérer sa commande après le travail. Scan du QR code, retrait en 30 secondes. Simple et efficace.",
    icon: <CheckCircle className="w-32 h-32" />
  }
];

export default function NarrativeCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;

    if (!track || !section) return;

    const scenes = gsap.utils.toArray('.narrative-scene');

    const scrollTween = gsap.to(track, {
      xPercent: -100 * (scenes.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => "+=" + (track.offsetWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    // Animate elements within each scene
    scenes.forEach((scene) => {
      const sceneElement = scene as HTMLElement;
      const sceneElements = sceneElement.querySelectorAll('h2, h3, p, div');

      gsap.from(sceneElements, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sceneElement,
          containerAnimation: scrollTween,
          start: 'left center',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getSceneStyles = (index: number): string => {
    const baseStyles = "rounded-lg p-8 flex items-center justify-center";

    switch (index) {
      case 1: return `${baseStyles} bg-foret text-creme`;
      case 2: return `${baseStyles} bg-ocre text-white`;
      case 3: return `${baseStyles} bg-creme border-4 border-foret text-foret`;
      case 4: return `${baseStyles} bg-foret text-creme`;
      default: return baseStyles;
    }
  };

  return (
    <section ref={sectionRef} id="narrative-section" className="bg-creme text-foret overflow-hidden">
      <div ref={trackRef} className="flex" style={{ width: '500%' }}>
        {scenes.map((scene, index) => (
          <div key={index} className="narrative-scene w-full min-h-screen flex justify-center items-center py-16 px-4 sm:px-6 lg:px-8">
            {scene.isTitle ? (
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">{scene.title}</h2>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto w-full">
                {index % 2 === 1 ? (
                  <>
                    <div className="text-center md:text-left space-y-4">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-ocre">{scene.time}</p>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{scene.title}</h3>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-foret/80 max-w-md mx-auto md:mx-0">{scene.description}</p>
                    </div>
                    <div className={`${getSceneStyles(index)} aspect-square max-w-xs mx-auto`}>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-current">
                        {scene.icon}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`${getSceneStyles(index)} aspect-square max-w-xs mx-auto md:order-1`}>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-current">
                        {scene.icon}
                      </div>
                    </div>
                    <div className="text-center md:text-left space-y-4 md:order-2">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-ocre">{scene.time}</p>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{scene.title}</h3>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-foret/80 max-w-md mx-auto md:mx-0">{scene.description}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}