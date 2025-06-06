
import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionDelay: number;
}

export const usePerformanceMonitoring = (componentName: string) => {
  const startTime = useRef<number>(Date.now());
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      const loadTime = Date.now() - startTime.current;
      
      // Log performance metrics
      console.log(`[Performance] ${componentName} loaded in ${loadTime}ms`);
      
      // Report to performance API if available
      if ('performance' in window && window.performance.mark) {
        window.performance.mark(`${componentName}-loaded`);
      }
    }
  }, [componentName]);

  const measureInteraction = (actionName: string) => {
    const startInteraction = Date.now();
    
    return () => {
      const interactionTime = Date.now() - startInteraction;
      console.log(`[Performance] ${componentName}.${actionName} took ${interactionTime}ms`);
      
      if ('performance' in window && window.performance.mark) {
        window.performance.mark(`${componentName}-${actionName}-completed`);
      }
    };
  };

  return { measureInteraction };
};
