
import React, { useState } from 'react';
import { useDebugContext } from '@/utils/debugTools';

interface ImageDebugProps {
  src: string;
  dimensions: { width: number; height: number };
  aspectRatio: number;
  loadTime?: number;
}

const ImageDebugInfo: React.FC<ImageDebugProps> = ({ src, dimensions, aspectRatio, loadTime }) => {
  const { isDebugMode } = useDebugContext();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isDebugMode || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 z-50 bg-gray-100 text-xs p-1 rounded-bl-md">
      <div 
        className="cursor-pointer flex items-center opacity-50 hover:opacity-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="w-3 h-3 rounded-full bg-green-400 mr-1"></span>
        <span>Image Debug</span>
      </div>
      
      {isExpanded && (
        <div className="mt-1 p-2 bg-white shadow-lg rounded-md">
          <p>Size: {dimensions.width}x{dimensions.height}</p>
          <p>Aspect ratio: {aspectRatio.toFixed(2)}</p>
          {loadTime && <p>Load time: {loadTime}ms</p>}
          <p className="truncate">Source: {src}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDebugInfo;
