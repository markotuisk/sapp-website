
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DebugContextType {
  isDebugMode: boolean;
  componentBoundaries: boolean;
  logPerformance: boolean;
  verboseLogging: boolean;
  toggleDebugMode: () => void;
}

export const DebugContext = createContext<DebugContextType>({
  isDebugMode: false,
  componentBoundaries: false,
  logPerformance: false,
  verboseLogging: false,
  toggleDebugMode: () => {},
});

export const useDebugContext = () => useContext(DebugContext);

interface DebugProviderProps {
  children: React.ReactNode;
  options?: {
    componentBoundaries?: boolean;
    logPerformance?: boolean;
    verboseLogging?: boolean;
  };
}

export const DebugProvider: React.FC<DebugProviderProps> = ({ children, options = {} }) => {
  const [isDebugMode, setIsDebugMode] = useState(() => {
    return process.env.NODE_ENV === 'development' && 
      localStorage.getItem('debug_mode') === 'true';
  });
  
  const toggleDebugMode = () => {
    const newValue = !isDebugMode;
    setIsDebugMode(newValue);
    localStorage.setItem('debug_mode', String(newValue));
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Debug mode ${newValue ? 'enabled' : 'disabled'}`);
      if (newValue) {
        console.log('Available debug features:', {
          componentBoundaries: options.componentBoundaries ?? true,
          logPerformance: options.logPerformance ?? true,
          verboseLogging: options.verboseLogging ?? false,
        });
      }
    }
  };
  
  const contextValue = {
    isDebugMode,
    componentBoundaries: options.componentBoundaries ?? true,
    logPerformance: options.logPerformance ?? true,
    verboseLogging: options.verboseLogging ?? false,
    toggleDebugMode,
  };
  
  return (
    <DebugContext.Provider value={contextValue}>
      {children}
    </DebugContext.Provider>
  );
};
