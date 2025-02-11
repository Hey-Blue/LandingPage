'use client';

import { useEffect, useRef } from 'react';
import { CountUp } from 'countup.js';
import { Odometer } from 'odometer_countup';

interface CounterProps {
  value: number;
}

export const Counter = ({ value }: CounterProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (counterRef.current) {
      const counter = new CountUp(counterRef.current, value, {
        plugin: new Odometer({ duration: 2.3, lastDigitDelay: 0 }),
        duration: 3.0,
        startVal: 0
      });
      
      counter.start();
    }
  }, [value]);

  return (
    <span ref={counterRef} className="text-4xl font-bold text-blue-600">
      0
    </span>
  );
};