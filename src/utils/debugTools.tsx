
import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

/**
 * Debug context to manage global debug state
 */
export const DebugContext = React.createContext({
  isDebugMode: false,
  componentBoundaries: false,
  logPerformance: false,
  verboseLogging: false,
  toggleDebugMode: () => {},
});

export const useDebugContext = () => useContext(DebugContext);

/**
 * Debug wrapper component that provides debugging information in development mode
 */
export const DebugInfo: React.FC<{
  componentName: string;
  children: React.ReactNode;
  data?: Record<string, any>;
  showOutline?: boolean;
}> = ({ componentName, children, data, showOutline = true }) => {
  const { isDebugMode } = useDebugContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const renderCountRef = useRef(0);
  
  // Skip entirely in production or if debug mode is off
  if (process.env.NODE_ENV !== 'development' || !isDebugMode) {
    return <>{children}</>;
  }
  
  // Increment render count on each render
  useEffect(() => {
    renderCountRef.current += 1;
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
            <span className="font-bold">Render count:</span> {renderCountRef.current}
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

/**
 * Debug provider for app-wide debugging configuration
 */
export const DebugProvider: React.FC<{
  children: React.ReactNode;
  options?: {
    componentBoundaries?: boolean;
    logPerformance?: boolean;
    verboseLogging?: boolean;
  };
}> = ({ children, options = {} }) => {
  const [isDebugMode, setIsDebugMode] = useState(() => {
    // Check if debug mode was enabled in localStorage
    return process.env.NODE_ENV === 'development' && 
      localStorage.getItem('debug_mode') === 'true';
  });
  
  const toggleDebugMode = () => {
    const newValue = !isDebugMode;
    setIsDebugMode(newValue);
    localStorage.setItem('debug_mode', String(newValue));
    
    // Show feedback when debug mode changes
    if (process.env.NODE_ENV === 'development') {
      console.log(`Debug mode ${newValue ? 'enabled' : 'disabled'}`);
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
      {process.env.NODE_ENV === 'development' && <DebugToggle />}
    </DebugContext.Provider>
  );
};

/**
 * Debug button to toggle debug mode
 */
export const DebugToggle: React.FC = () => {
  const { isDebugMode, toggleDebugMode } = useDebugContext();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <button
      onClick={toggleDebugMode}
      className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white text-xs p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-all"
    >
      {isDebugMode ? 'Debug: ON' : 'Debug: OFF'}
    </button>
  );
};
