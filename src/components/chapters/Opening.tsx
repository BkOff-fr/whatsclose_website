'use client';

import { useEffect, useState } from 'react';

export default function Opening() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show content with delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Setup GSAP animations if available
    const setupGSAPAnimations = () => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        const { gsap } = window;

        // Video parallax on scroll
        gsap.to('.hero-video', {
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          },
          scale: 1.2,
          ease: 'none'
        });

        // CTA button click handler
        const mainCtaButton = document.getElementById('main-cta');
        if (mainCtaButton) {
          mainCtaButton.addEventListener('click', () => {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: '#disconnection-section',
              ease: 'power3.inOut'
            });
          });
        }
      }
    };

    // Check for GSAP periodically
    const checkGSAP = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkGSAP);
        setupGSAPAnimations();
      }
    }, 500);

    // Clear interval after 10 seconds
    setTimeout(() => clearInterval(checkGSAP), 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(checkGSAP);
    };
  }, []);

  const handleCTAClick = () => {
    // Fallback scroll behavior if GSAP isn't available
    const target = document.getElementById('disconnection-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden p-4">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
      >
        <source
          src="https://videos.pexels.com/video-files/3255231/3255231-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero Content */}
      <div className="z-10 text-white">
        <h1 className={`text-hero font-bold text-gradient font-display transition-all duration-800 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          Le commerce local a son système d'exploitation.
        </h1>

        <p className={`text-lg md:text-xl mt-6 text-creme font-light max-w-4xl mx-auto transition-all duration-600 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Une infrastructure unique pour reconnecter les créateurs, les consommateurs et les territoires.
        </p>

        <button
          id="main-cta"
          onClick={handleCTAClick}
          className={`mt-8 button-primary transition-all duration-500 delay-800 ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
          }`}
        >
          Découvrez la Révolution Locale
        </button>
      </div>
    </section>
  );
}