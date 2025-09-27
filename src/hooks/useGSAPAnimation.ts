'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useReducedMotion } from './useReducedMotion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export interface GSAPAnimationConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export interface GSAPTimelineConfig {
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
}

export function useGSAPAnimation() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const createTimeline = (config?: GSAPTimelineConfig) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline(config);
    return timelineRef.current;
  };

  const createScrollTrigger = (config: GSAPAnimationConfig) => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }
    scrollTriggerRef.current = ScrollTrigger.create(config);
    return scrollTriggerRef.current;
  };

  const scrollTo = (target: string | HTMLElement, duration: number = 1, ease: string = 'power2.inOut') => {
    gsap.to(window, {
      duration,
      scrollTo: target,
      ease
    });
  };

  const animateFrom = (
    target: string | HTMLElement | HTMLElement[],
    fromVars: gsap.TweenVars,
    toVars?: gsap.TweenVars,
    duration: number = 1
  ) => {
    const vars = {
      ...fromVars,
      duration: prefersReducedMotion ? 0.1 : duration,
      ease: prefersReducedMotion ? 'none' : (fromVars.ease || 'power2.out'),
      ...toVars
    };
    return gsap.fromTo(target, fromVars, vars);
  };

  const animateTo = (
    target: string | HTMLElement | HTMLElement[],
    vars: gsap.TweenVars,
    duration: number = 1
  ) => {
    return gsap.to(target, {
      ...vars,
      duration: prefersReducedMotion ? 0.1 : duration,
      ease: prefersReducedMotion ? 'none' : (vars.ease || 'power2.out')
    });
  };

  const animateSet = (target: string | HTMLElement | HTMLElement[], vars: gsap.TweenVars) => {
    return gsap.set(target, vars);
  };

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  return {
    gsap,
    ScrollTrigger,
    createTimeline,
    createScrollTrigger,
    scrollTo,
    animateFrom,
    animateTo,
    animateSet,
    timeline: timelineRef.current,
    scrollTrigger: scrollTriggerRef.current,
    prefersReducedMotion
  };
}

export default useGSAPAnimation;