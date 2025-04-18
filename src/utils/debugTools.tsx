
import React, { useState, useEffect } from 'react';

/**
 * Debug wrapper component that provides debugging information in development mode
 */
export const DebugInfo: React.FC<{
  componentName: string;
  children: React.ReactNode;
  data?: Record<string, any>;
  showOutline?: boolean;
}> = ({ componentName, children, data, showOutline = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  
  // Skip entirely in production
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }
  
  // Increment render count on each render
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  return (
    <div 
      className={`relative ${showOutline ? 'outline outline-1 outline-dashed outline-blue-300/50' : ''}`}
      data-component={componentName}
    >
      <div 
        className="absolute top-0 right-0 z-50 bg-gray-100 text-xs p-1 rounded-bl-md cursor-pointer flex items-center opacity-50 hover:opacity-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="w-3 h-3 rounded-full bg-blue-400 mr-1"></span>
        <span>{componentName}</span>
      </div>
      
      {isExpanded && (
        <div className="absolute top-6 right-0 z-50 bg-gray-100 text-xs p-2 rounded-bl-md border border-gray-200 shadow-md max-w-xs max-h-60 overflow-auto">
          <div className="mb-1 pb-1 border-b border-gray-200">
            <span className="font-bold">Render count:</span> {renderCount}
          </div>
          {data && Object.entries(data).map(([key, value]) => (
            <div key={key} className="mb-1">
              <span className="font-bold">{key}:</span> {
                typeof value === 'object' 
                  ? JSON.stringify(value, null, 2) 
                  : String(value)
              }
            </div>
          ))}
        </div>
      )}
      
      {children}
    </div>
  );
};

/**
 * Hook to log lifecycle events of a component
 */
export const useComponentLogger = (componentName: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] Mounted`);
      
      return () => {
        console.log(`[${componentName}] Unmounted`);
      };
    }
  }, [componentName]);
  
  const logEvent = (eventName: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] ${eventName}`, data || '');
    }
  };
  
  return { logEvent };
};

/**
 * Global debugging toggle
 */
export const useDebugMode = () => {
  const [isDebugMode, setIsDebugMode] = useState(() => {
    // Check if debug mode was enabled in localStorage
    return process.env.NODE_ENV === 'development' && 
      localStorage.getItem('debug_mode') === 'true';
  });
  
  const toggleDebugMode = () => {
    const newValue = !isDebugMode;
    setIsDebugMode(newValue);
    localStorage.setItem('debug_mode', String(newValue));
  };
  
  return { isDebugMode, toggleDebugMode };
};

/**
 * Debug button to toggle debug mode
 */
export const DebugToggle: React.FC = () => {
  const { isDebugMode, toggleDebugMode } = useDebugMode();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <button
      onClick={toggleDebugMode}
      className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white text-xs p-2 rounded-full shadow-lg opacity-70 hover:opacity-100"
    >
      {isDebugMode ? 'Debug: ON' : 'Debug: OFF'}
    </button>
  );
};

/**
 * Context provider for app-wide debugging configuration
 */
export const DebugContext = React.createContext({
  isDebugMode: false,
  componentBoundaries: false,
  logPerformance: false,
  verboseLogging: false,
});

export const DebugProvider: React.FC<{
  children: React.ReactNode;
  options?: {
    componentBoundaries?: boolean;
    logPerformance?: boolean;
    verboseLogging?: boolean;
  };
}> = ({ children, options = {} }) => {
  const { isDebugMode } = useDebugMode();
  
  const contextValue = {
    isDebugMode,
    componentBoundaries: options.componentBoundaries ?? true,
    logPerformance: options.logPerformance ?? true,
    verboseLogging: options.verboseLogging ?? false,
  };
  
  return (
    <DebugContext.Provider value={contextValue}>
      {children}
      {isDebugMode && <DebugToggle />}
    </DebugContext.Provider>
  );
};

export const useDebugContext = () => React.useContext(DebugContext);
