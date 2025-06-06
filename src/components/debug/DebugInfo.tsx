
import React, { useState, useRef, useEffect } from 'react';
import { useDebugContext } from '@/contexts/DebugContext';

interface DebugInfoProps {
  componentName: string;
  children: React.ReactNode;
  data?: Record<string, any>;
  showOutline?: boolean;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ 
  componentName, 
  children, 
  data, 
  showOutline = true 
}) => {
  const { isDebugMode, logPerformance } = useDebugContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const renderCountRef = useRef(0);
  const mountTimeRef = useRef(performance.now());
  const [renderTime, setRenderTime] = useState<number | null>(null);
  
  if (process.env.NODE_ENV !== 'development' || !isDebugMode) {
    return <>{children}</>;
  }
  
  useEffect(() => {
    if (logPerformance) {
      const timeToRender = performance.now() - mountTimeRef.current;
      setRenderTime(timeToRender);
      console.log(`[${componentName}] Time to render: ${timeToRender.toFixed(2)}ms`);
    }
    
    renderCountRef.current += 1;
    
    // Return empty function to avoid exhaustive deps warning
    return () => {};
  }, [componentName, logPerformance]);

  return (
    <div 
      className={`relative ${showOutline ? 'outline outline-1 outline-dashed outline-blue-300/50' : ''}`}
      data-component={componentName}
    >
      <div 
        className="absolute top-0 right-0 z-50 bg-gray-100 text-xs p-1 rounded-bl-md cursor-pointer flex items-center opacity-70 hover:opacity-100"
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
          {renderTime && (
            <div className="mb-1 pb-1 border-b border-gray-200">
              <span className="font-bold">Initial render time:</span> {renderTime.toFixed(2)}ms
            </div>
          )}
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
