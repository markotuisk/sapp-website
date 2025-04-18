
import React from 'react';
import { useDebugContext } from '@/contexts/DebugContext';

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
