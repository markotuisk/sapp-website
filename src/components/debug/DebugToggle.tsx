
import React, { useState } from 'react';
import { useDebugContext } from '@/contexts/DebugContext';

export const DebugToggle: React.FC = () => {
  const { isDebugMode, toggleDebugMode } = useDebugContext();
  const [showGrid, setShowGrid] = useState(false);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  const renderGridMarkers = () => {
    const markers = [];
    const gridSize = 20;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Vertical markers
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
    
    // Horizontal markers
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
      <div className="fixed bottom-4 right-4 z-50 flex space-x-2">
        <button
          onClick={toggleDebugMode}
          className="bg-gray-800 text-white text-xs p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-all"
        >
          {isDebugMode ? 'Debug: ON' : 'Debug: OFF'}
        </button>
        <button
          onClick={handleToggleGrid}
          className="bg-gray-800 text-white text-xs p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-all"
        >
          {showGrid ? 'Grid: ON' : 'Grid: OFF'}
        </button>
      </div>
      
      {showGrid && (
        <div className="debug-grid">
          {renderGridMarkers()}
        </div>
      )}
    </>
  );
};
