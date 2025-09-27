'use client';

import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Clock, TrendingUp, Euro } from 'lucide-react';

interface CalculatorMetrics {
  timeSaved: number;
  salesIncrease: number;
  revenueGained: number;
}

export default function ImpactCalculator() {
  const [salesValue, setSalesValue] = useState<number>(50);
  const [metrics, setMetrics] = useState<CalculatorMetrics>({
    timeSaved: 8,
    salesIncrease: 25,
    revenueGained: 1200
  });

  const timeSavedRef = useRef<HTMLSpanElement>(null);
  const salesIncreaseRef = useRef<HTMLSpanElement>(null);
  const revenueGainedRef = useRef<HTMLSpanElement>(null);

  const calculateMetrics = (sales: number): CalculatorMetrics => {
    return {
      timeSaved: Math.round(sales * 0.15),
      salesIncrease: 25, // Fixed percentage
      revenueGained: Math.round(sales * 24)
    };
  };

  const animateCounter = (
    element: HTMLSpanElement | null,
    from: number,
    to: number,
    duration: number = 0.5
  ) => {
    if (!element) return;

    const counter = { value: from };
    gsap.to(counter, {
      duration,
      value: to,
      onUpdate: () => {
        element.textContent = Math.round(counter.value).toString();
      },
      ease: 'power2.out'
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setSalesValue(newValue);

    const newMetrics = calculateMetrics(newValue);

    // Animate each metric
    animateCounter(timeSavedRef.current, metrics.timeSaved, newMetrics.timeSaved);
    animateCounter(salesIncreaseRef.current, metrics.salesIncrease, newMetrics.salesIncrease);
    animateCounter(revenueGainedRef.current, metrics.revenueGained, newMetrics.revenueGained);

    setMetrics(newMetrics);
  };

  return (
    <section id="calculator-section" className="bg-foret text-creme py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 text-gradient leading-[1.2] sm:leading-[1.15] md:leading-[1.1] tracking-tight break-words">
            Calculez votre impact.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-creme/90">
            Estimez concrètement ce que Whatsclose peut changer pour votre commerce.
          </p>
        </div>

        <div className="bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl max-w-5xl mx-auto border border-creme/10">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <label htmlFor="sales-slider" className="block text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Combien de ventes faites-vous par jour ?
            </label>
            <div className="flex items-center gap-4 sm:gap-6 max-w-2xl mx-auto">
              <span className="text-base sm:text-lg font-semibold text-creme/80 min-w-[2rem]" aria-label="Minimum 10 ventes">10</span>
              <input
                type="range"
                id="sales-slider"
                min="10"
                max="200"
                value={salesValue}
                onChange={handleSliderChange}
                className="w-full slider"
                style={{ background: 'var(--foret)' }}
                aria-label="Curseur pour sélectionner le nombre de ventes par jour"
                aria-describedby="sales-description"
              />
              <span className="text-base sm:text-lg font-semibold text-creme/80 min-w-[2rem]" aria-label="Maximum 200 ventes">200</span>
            </div>
            <p id="sales-description" className="sr-only">
              Utilisez ce curseur pour estimer l&apos;impact de Whatsclose sur votre commerce
            </p>
            <div className="mt-8 text-center">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                <span className="text-ocre">{salesValue}</span>
                <span className="text-lg sm:text-xl lg:text-2xl text-creme/80 ml-2">ventes/jour</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-8 border-t border-creme/20">
            <div className="text-center p-4 rounded-xl bg-black/20 border border-creme/10">
              <Clock className="w-12 h-12 lg:w-16 lg:h-16 text-ocre mx-auto mb-4" />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                <span ref={timeSavedRef}>{metrics.timeSaved}</span>
                <span className="text-ocre">h</span>
              </p>
              <p className="text-sm sm:text-base text-creme/80 leading-relaxed">de temps gagné / semaine</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-black/20 border border-creme/10">
              <TrendingUp className="w-12 h-12 lg:w-16 lg:h-16 text-ocre mx-auto mb-4" />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                <span className="text-ocre">+</span><span ref={salesIncreaseRef}>{metrics.salesIncrease}</span>
                <span className="text-ocre">%</span>
              </p>
              <p className="text-sm sm:text-base text-creme/80 leading-relaxed">d&apos;augmentation des ventes</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-black/20 border border-creme/10">
              <Euro className="w-12 h-12 lg:w-16 lg:h-16 text-ocre mx-auto mb-4" />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                <span ref={revenueGainedRef}>{metrics.revenueGained}</span>
                <span className="text-ocre"> €</span>
              </p>
              <p className="text-sm sm:text-base text-creme/80 leading-relaxed">de revenus additionnels / mois</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        .slider:focus {
          outline: none;
        }
        .slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: var(--foret);
          border-radius: 4px;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: var(--ocre);
          cursor: pointer;
          margin-top: -8px;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}