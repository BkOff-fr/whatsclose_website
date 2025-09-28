'use client';

import { useEffect } from 'react';
import TypewriterText from '@/components/ui/TypewriterText';

export default function Disconnection() {
  useEffect(() => {
    const setupScrollytelling = () => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        const { gsap, ScrollTrigger } = window;

        const section = document.getElementById('disconnection-section');
        const problem = document.getElementById('problem-container');
        const solution = document.getElementById('solution-container');
        const path = document.getElementById('scrolly-path');
        const typewriter1 = document.querySelector('.typewriter-1');
        const typewriter2 = document.querySelector('.typewriter-2');

        if (!section || !problem || !solution || !path) return;

        // Set initial states
        gsap.set(solution, { opacity: 0, y: 50 });
        gsap.set(path, { opacity: 1 });

        // Create main scroll-controlled timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: 1, // Smooth scroll control
            onUpdate: (self: any) => {
              const progress = self.progress;

              // No sticky - simple flow

              // All animations are now reversible with smooth interpolation

              // Phase 1: Problem fade out (reversible)
              const fadeProgress = Math.min(progress / 0.35, 1);
              gsap.set(problem, {
                opacity: Math.max(0.2, 1 - (fadeProgress * 0.8)),
                scale: Math.max(0.9, 1 - (fadeProgress * 0.1)),
                y: fadeProgress * -30
              });

              // Phase 2: Path morphing (reversible)
              if (progress <= 0.30) {
                // Initial curved state
                gsap.set(path, {
                  attr: { d: "M20 50 C 80 100, 120 0, 180 50 C 240 100, 280 0, 380 50" },
                  strokeDasharray: "none",
                  strokeDashoffset: "0"
                });
              } else if (progress <= 0.75) {
                const morphProgress = (progress - 0.30) / 0.45;

                if (morphProgress <= 0.33) {
                  const step1 = morphProgress / 0.33;
                  const y1 = 100 - (step1 * 20);
                  const y2 = 0 + (step1 * 20);
                  gsap.set(path, {
                    attr: { d: `M20 50 C 80 ${y1}, 120 ${y2}, 180 50 C 240 ${y1}, 280 ${y2}, 380 50` },
                    strokeDasharray: "none",
                    strokeDashoffset: "0"
                  });
                } else if (morphProgress <= 0.66) {
                  const step2 = (morphProgress - 0.33) / 0.33;
                  const y1 = 80 - (step2 * 20);
                  const y2 = 20 + (step2 * 20);
                  gsap.set(path, {
                    attr: { d: `M20 50 C 80 ${y1}, 120 ${y2}, 180 50 C 240 ${y1}, 280 ${y2}, 380 50` },
                    strokeDasharray: "none",
                    strokeDashoffset: "0"
                  });
                } else {
                  const step3 = (morphProgress - 0.66) / 0.34;
                  const y1 = 60 - (step3 * 10);
                  const y2 = 40 + (step3 * 10);
                  gsap.set(path, {
                    attr: { d: `M20 50 C 80 ${y1}, 120 ${y2}, 180 50 C 240 ${y1}, 280 ${y2}, 380 50` },
                    strokeDasharray: "none",
                    strokeDashoffset: "0"
                  });
                }
              } else {
                // Phase 3: Straight line with draw effect (reversible)
                const pathLength = 360;
                const drawProgress = Math.max(0, (progress - 0.75) / 0.25);
                const drawOffset = pathLength * (1 - drawProgress);

                gsap.set(path, {
                  attr: { d: "M20 50 L 380 50" },
                  strokeDasharray: pathLength,
                  strokeDashoffset: drawOffset
                });
              }

              // Phase 4: Typewriter animations (reversible)
              const solutionProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.75));

              // Update typewriter components with current progress
              if (typewriter1) {
                typewriter1.dispatchEvent(new CustomEvent('updateProgress', { detail: { progress } }));
              }

              if (typewriter2) {
                typewriter2.dispatchEvent(new CustomEvent('updateProgress', { detail: { progress } }));
              }
            }
          }
        });
      }
    };

    // Wait for GSAP to be available
    const checkGSAP = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkGSAP);
        setupScrollytelling();
      }
    }, 100);

    return () => clearInterval(checkGSAP);
  }, []);

  return (
    <section id="disconnection-section" className="min-h-screen bg-creme text-foret section-transition flex items-center">
      <div className="container mx-auto text-center">
        <div id="problem-container">
          <p className="text-lg md:text-xl font-semibold mb-4">
            Aujourd'hui, la logistique locale est un labyrinthe.
          </p>
          <h2 className="text-title font-bold max-w-4xl mx-auto font-display">
            Des circuits complexes, des horaires rigides et des opportunités manquées.
          </h2>
        </div>

        <div className="w-full h-48 my-12 flex items-center justify-center">
          <svg id="scrolly-svg" className="w-full max-w-2xl" viewBox="0 0 400 100">
            <path
              id="scrolly-path"
              d="M20 50 C 80 100, 120 0, 180 50 C 240 100, 280 0, 380 50"
              stroke="var(--ocre)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div id="solution-container">
          <TypewriterText
            text="Notre solution est une ligne droite."
            progress={0} // This will be updated by GSAP
            className="text-lg md:text-xl font-semibold mb-4 text-ocre typewriter-1"
            startProgress={0.3}
            endProgress={0.6}
          />
          <TypewriterText
            text="Une connexion directe, intelligente et flexible entre ceux qui créent et ceux qui savourent."
            progress={0} // This will be updated by GSAP
            className="text-title font-bold max-w-4xl mx-auto font-display typewriter-2"
            startProgress={0.5}
            endProgress={0.9}
          />
        </div>
      </div>
    </section>
  );
}