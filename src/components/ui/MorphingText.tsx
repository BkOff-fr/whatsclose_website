'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MorphingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
  trigger?: boolean;
}

export default function MorphingText({
  texts,
  className = '',
  interval = 2000,
  trigger = true
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setIsVisible(true);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval, trigger]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.span
            key={currentIndex}
            initial={{
              opacity: 0,
              rotateX: -90,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              rotateX: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              rotateX: 90,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="block"
          >
            {texts[currentIndex]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}