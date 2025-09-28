'use client';

import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function TheRevolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [powerLevel, setPowerLevel] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [revolutionTriggered, setRevolutionTriggered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    if (revolutionTriggered) return;

    setClickCount(prev => prev + 1);
    setPowerLevel(prev => Math.min(prev + 20, 100));
    setIsCharging(true);

    setTimeout(() => setIsCharging(false), 200);

    if (powerLevel >= 80) {
      setRevolutionTriggered(true);
    }
  };

  const resetExperience = () => {
    setPowerLevel(0);
    setClickCount(0);
    setRevolutionTriggered(false);
    setIsCharging(false);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative cursor-pointer select-none"
      onClick={handleClick}
      style={{
        background: revolutionTriggered
          ? `radial-gradient(circle, rgba(204, 119, 34, 0.3) 0%, rgba(34, 66, 41, 1) 70%)`
          : `linear-gradient(135deg, #2d1810 0%, #1a1a1a 100%)`
      }}
    >
      {/* Système de particules réactif */}
      {Array.from({ length: powerLevel }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-ocre rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -200]
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
            repeat: Infinity
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-4 text-center">
        {!revolutionTriggered ? (
          /* Interface de charge - L'utilisateur construit la révolution */
          <motion.div>
            <motion.h1
              className="text-6xl md:text-8xl font-display text-white mb-8"
              animate={isCharging ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.2 }}
            >
              DÉCLENCHE
            </motion.h1>

            <motion.h2
              className="text-4xl md:text-6xl font-display text-gradient mb-12"
              animate={isCharging ? {
                textShadow: [
                  '0 0 20px rgba(204, 119, 34, 0.5)',
                  '0 0 40px rgba(204, 119, 34, 1)',
                  '0 0 20px rgba(204, 119, 34, 0.5)'
                ]
              } : {}}
            >
              LA RÉVOLUTION
            </motion.h2>

            {/* Barre de puissance interactive */}
            <motion.div className="relative w-full max-w-md mx-auto mb-8">
              <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-ocre"
                  animate={{
                    width: `${powerLevel}%`,
                    boxShadow: powerLevel > 50 ? '0 0 20px rgba(204, 119, 34, 0.8)' : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="absolute -top-2 -bottom-2 bg-white rounded-full w-2"
                animate={{
                  left: `${powerLevel}%`,
                  boxShadow: powerLevel > 80 ? '0 0 15px #CC7722' : 'none'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Instructions dynamiques */}
            <motion.div className="space-y-4">
              {powerLevel < 20 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl text-white"
                >
                  👆 Cliquez pour alimenter la révolution
                </motion.p>
              )}

              {powerLevel >= 20 && powerLevel < 60 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl text-orange-400"
                >
                  🔥 L'énergie monte... Continuez !
                </motion.p>
              )}

              {powerLevel >= 60 && powerLevel < 100 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl text-ocre font-bold"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ⚡ PRESQUE... ENCORE UN PEU !
                </motion.p>
              )}
            </motion.div>

            {/* Compteur de clics */}
            <motion.div className="mt-8">
              <span className="text-creme-dark">Énergie accumulée: {clickCount} clics</span>
            </motion.div>
          </motion.div>
        ) : (
          /* Révolution déclenchée - Explosion d'énergie */
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Explosion centrale */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [0, 2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div className="w-32 h-32 bg-gradient-to-r from-ocre to-ocre-light rounded-full opacity-50 blur-xl" />
            </motion.div>

            <motion.h1
              className="text-8xl md:text-9xl font-display text-gradient mb-16 relative z-10"
              animate={{
                textShadow: [
                  '0 0 30px rgba(204, 119, 34, 0.8)',
                  '0 0 60px rgba(204, 119, 34, 1)',
                  '0 0 30px rgba(204, 119, 34, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              RÉVOLUTION !
            </motion.h1>

            {/* Les 3 piliers apparaissent en morphing */}
            <motion.div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
              {[
                { icon: '🏪', title: 'Casiers\n24/7', delay: 0 },
                { icon: '🌾', title: 'Vrac\nLocal', delay: 0.3 },
                { icon: '📱', title: 'App\nSur-Mesure', delay: 0.6 }
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    y: [0, -20, 0]
                  }}
                  transition={{
                    delay: pillar.delay,
                    duration: 1,
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="bg-ocre/20 rounded-2xl p-8 backdrop-blur-lg border border-ocre/50"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(204, 119, 34, 0.4)' }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    {pillar.icon}
                  </motion.div>
                  <h3 className="text-ocre font-bold text-lg whitespace-pre-line">
                    {pillar.title}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            {/* Message de victoire */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mt-12 space-y-4"
            >
              <motion.p
                className="text-xl text-creme"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 FÉLICITATIONS ! Vous venez de créer l'avenir ! 🎉
              </motion.p>

              <motion.button
                onClick={resetExperience}
                className="px-6 py-3 bg-ocre/20 border border-ocre rounded-xl text-ocre hover:bg-ocre/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Recommencer l'expérience
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Feedback visuel pour les clics */}
      {isCharging && (
        <motion.div
          className="absolute inset-0 bg-ocre/20 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </section>
  );
}