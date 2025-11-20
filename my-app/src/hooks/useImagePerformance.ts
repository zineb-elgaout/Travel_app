// hooks/useImagePerformance.ts
import { useState, useRef } from 'react';

export const useImagePerformance = () => {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const timers = useRef<Record<string, number>>({});

  const startTimer = (imageUrl: string) => {
    timers.current[imageUrl] = Date.now();
  };

  const endTimer = (imageUrl: string) => {
    const startTime = timers.current[imageUrl];
    if (startTime) {
      const loadTime = Date.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        [imageUrl]: loadTime
      }));
      
      // Log pour le debugging
      console.log(`🖼 ${imageUrl}: ${loadTime}ms`);
    }
  };

  return { metrics, startTimer, endTimer };
};