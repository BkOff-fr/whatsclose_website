'use client';

import { useEffect, useState } from 'react';

export default function Vision() {
  const [currentOS, setCurrentOS] = useState(0);
  const osList = ["Windows", "Android", "Whatsclose"];

  useEffect(() => {
    const setupVisionAnimation = () => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        const { gsap, ScrollTrigger } = window;

        // OS Text morphing animation
        const osTextElement = document.getElementById('os-text');
        if (osTextElement) {
          let osIndex = 0;
          const interval = setInterval(() => {
            osIndex = (osIndex + 1) % osList.length;
            setCurrentOS(osIndex);

            gsap.fromTo(osTextElement, {
              opacity: 0,
              rotateX: -90,
              filter: "blur(10px)"
            }, {
              opacity: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out"
            });
          }, 2500);

          // Clean up interval on component unmount
          return () => clearInterval(interval);
        }

        // Main content animation on scroll
        const visionContainer = document.getElementById('vision-container');
        if (visionContainer) {
          gsap.fromTo('#vision-title', {
            opacity: 0,
            y: 50
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visionContainer,
              start: 'top center',
              toggleActions: 'play none none reverse'
            }
          });

          gsap.fromTo('#vision-description', {
            opacity: 0,
            y: 30
          }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visionContainer,
              start: 'top center',
              toggleActions: 'play none none reverse'
            }
          });
        }

        // Infrastructure layers parallax
        const layer1 = document.getElementById('infra-layer-1');
        const layer2 = document.getElementById('infra-layer-2');
        const layer3 = document.getElementById('infra-layer-3');

        if (layer1 && layer2 && layer3) {
          gsap.to(layer1, {
            y: -100,
            scrollTrigger: {
              trigger: '#vision-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });

          gsap.to(layer2, {
            y: -200,
            scrollTrigger: {
              trigger: '#vision-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });

          gsap.to(layer3, {
            y: -300,
            scrollTrigger: {
              trigger: '#vision-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });
        }

        // Circuit board animation
        const circuitLines = document.querySelectorAll('#circuit-board .circuit-line');
        circuitLines.forEach((line, index) => {
          gsap.fromTo(line, {
            strokeDashoffset: 1000
          }, {
            strokeDashoffset: 0,
            duration: 2,
            delay: index * 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#circuit-board',
              start: 'top center',
              toggleActions: 'play none none reverse'
            }
          });
        });
      }
    };

    // Wait for GSAP to be available
    const checkGSAP = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkGSAP);
        setupVisionAnimation();
      }
    }, 100);

    return () => clearInterval(checkGSAP);
  }, []);

  return (
    <section id="vision-section" className="min-h-screen bg-foret text-creme section-transition relative overflow-hidden">
      {/* Infrastructure layers for parallax */}
      <div id="infra-layer-1" className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23CC7722' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div id="infra-layer-2" className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border border-ocre rounded-full" />
        <div className="absolute top-40 right-32 w-24 h-24 border border-creme rounded-lg rotate-45" />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 border border-ocre-light rounded-full" />
      </div>

      <div id="infra-layer-3" className="absolute inset-0 opacity-30">
        <div className="absolute top-60 right-20 w-16 h-16 bg-ocre/20 rounded-full" />
        <div className="absolute bottom-60 left-16 w-20 h-20 bg-creme/20 rounded-lg" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div id="vision-container" className="container mx-auto text-center pt-section">
          <h2 id="vision-title" className="text-title font-bold mb-8 font-display">
            La Vision
          </h2>

          {/* OS Morphing Text */}
          <div className="mb-16">
            <div className="text-4xl md:text-6xl font-bold mb-8 font-display">
              <span id="os-text" className="text-gradient">
                {osList[currentOS]}
              </span>
            </div>
            <p className="text-lg text-creme/80 max-w-2xl mx-auto">
              Une métaphore révélatrice : le commerce local a besoin de son propre système d'exploitation
            </p>
          </div>

          <p id="vision-description" className="text-subtitle max-w-4xl mx-auto mb-20 leading-relaxed">
            Imaginez un système d'exploitation pour le commerce local. Une infrastructure invisible qui connecte, organise et optimise chaque interaction commerciale de proximité.
          </p>
        </div>

        {/* Circuit Board Visualization */}
        <div className="container mx-auto px-6 mb-20">
          <div id="circuit-board" className="relative h-96 glass-dark rounded-3xl overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-ocre"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Circuit lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line
                className="circuit-line"
                x1="20%"
                y1="50%"
                x2="80%"
                y2="50%"
                stroke="var(--ocre)"
                strokeWidth="3"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <line
                className="circuit-line"
                x1="50%"
                y1="20%"
                x2="50%"
                y2="80%"
                stroke="var(--ocre)"
                strokeWidth="3"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <line
                className="circuit-line"
                x1="20%"
                y1="30%"
                x2="80%"
                y2="30%"
                stroke="var(--creme)"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <line
                className="circuit-line"
                x1="20%"
                y1="70%"
                x2="80%"
                y2="70%"
                stroke="var(--creme)"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>

            {/* Connection points */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-ocre rounded-full animate-pulse-slow" />
            </div>

            {/* Central text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-creme mb-2 font-display">
                  Système d'Exploitation
                </h3>
                <p className="text-ocre font-body">Commerce Local v1.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revolution comparisons */}
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center text-creme mb-12 font-display">
            Les Révolutions Comparées
          </h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 text-center card-hover">
              <div className="mb-4">
                <span className="text-creme/60 text-sm">Avant :</span>
                <p className="text-lg text-creme">Ordinateur sans OS</p>
              </div>

              <div className="text-4xl my-4 text-ocre">↓</div>

              <div className="mb-4">
                <span className="text-creme/60 text-sm">Après :</span>
                <p className="text-lg text-ocre font-semibold">Windows révolutionne l'informatique</p>
              </div>

              <div className="border-t border-creme/20 pt-4 mt-4">
                <span className="text-creme/60 text-sm">Parallèle :</span>
                <p className="text-creme font-semibold">Commerce local fragmenté → Whatsclose l'unifie</p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center card-hover">
              <div className="mb-4">
                <span className="text-creme/60 text-sm">Avant :</span>
                <p className="text-lg text-creme">Téléphones basiques</p>
              </div>

              <div className="text-4xl my-4 text-ocre">↓</div>

              <div className="mb-4">
                <span className="text-creme/60 text-sm">Après :</span>
                <p className="text-lg text-ocre font-semibold">Android connecte le monde</p>
              </div>

              <div className="border-t border-creme/20 pt-4 mt-4">
                <span className="text-creme/60 text-sm">Parallèle :</span>
                <p className="text-creme font-semibold">Commerces isolés → Whatsclose les relie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}