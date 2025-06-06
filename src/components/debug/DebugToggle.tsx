import React, { useState, useEffect } from 'react';
import { useDebugContext } from '@/contexts/DebugContext';

export const DebugToggle: React.FC = () => {
  const { isDebugMode, toggleDebugMode } = useDebugContext();
  const [showGrid, setShowGrid] = useState(false);
  const [showTailwindGrid, setShowTailwindGrid] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        toggleDebugMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDebugMode]);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const handleToggleTailwindGrid = () => {
    setShowTailwindGrid(!showTailwindGrid);
  };

  const renderGridMarkers = () => {
    const markers = [];
    const gridSize = 20;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    for (let x = gridSize; x < windowWidth; x += gridSize) {
      markers.push(
        <div 
          key={`x-${x}`} 
          className="debug-grid-marker" 
          style={{ left: x, top: 0 }}
        >
          {x}
        </div>
      );
    }
    
    for (let y = gridSize; y < windowHeight; y += gridSize) {
      markers.push(
        <div 
          key={`y-${y}`} 
          className="debug-grid-marker" 
          style={{ top: y, left: 0 }}
        >
          {y}
        </div>
      );
    }
    
    return markers;
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <div className="flex gap-2 bg-black/10 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <button
            onClick={toggleDebugMode}
            className={`text-white text-xs p-2 rounded-full shadow-lg transition-all ${
              isDebugMode ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-gray-900'
            }`}
            aria-label="Toggle debug mode"
            title="Toggle debug mode (Ctrl+Shift+D)"
          >
            {isDebugMode ? 'Debug: ON' : 'Debug: OFF'}
          </button>
          <button
            onClick={handleToggleGrid}
            className={`text-white text-xs p-2 rounded-full shadow-lg transition-all ${
              showGrid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'
            }`}
            aria-label="Toggle grid"
            title="Toggle grid overlay"
          >
            {showGrid ? 'Grid: ON' : 'Grid: OFF'}
          </button>
          <button
            onClick={handleToggleTailwindGrid}
            className={`text-white text-xs p-2 rounded-full shadow-lg transition-all ${
              showTailwindGrid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-800 hover:bg-gray-900'
            }`}
            aria-label="Toggle Tailwind grid"
            title="Toggle Tailwind grid overlay"
          >
            {showTailwindGrid ? 'Grid: ON' : 'Grid: OFF'}
          </button>
        </div>
        {isDebugMode && (
          <div className="text-xs bg-black/80 text-white p-2 rounded-lg text-center">
            Debug Mode Active
          </div>
        )}
      </div>
      
      {showGrid && (
        <div className="debug-grid">
          {renderGridMarkers()}
        </div>
      )}
      
      {showTailwindGrid && (
        <>
          <div className="tailwind-grid-overlay-columns">
            {[...Array(12)].map((_, i) => (
              <div key={i} />
            ))}
          </div>
          <div className="tailwind-grid-overlay">
            {[...Array(12 * 10)].map((_, i) => (
              <div key={i} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
