
import { useEffect } from 'react';
import { useDebugContext } from '@/contexts/DebugContext';

export const useComponentLogger = (componentName: string) => {
  const { isDebugMode, verboseLogging } = useDebugContext();
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isDebugMode && verboseLogging) {
      console.log(`[${componentName}] Mounted`);
      
      return () => {
        console.log(`[${componentName}] Unmounted`);
      };
    }
  }, [componentName, isDebugMode, verboseLogging]);
  
  const logEvent = (eventName: string, data?: any) => {
    if (process.env.NODE_ENV === 'development' && isDebugMode) {
      console.log(`[${componentName}] ${eventName}`, data || '');
    }
  };
  
  return { logEvent };
};
