
import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <RefreshCw className="h-8 w-8 animate-spin text-sapp-blue" />
      <span className="ml-3 text-lg">Loading version information...</span>
    </div>
  );
};

export default LoadingState;
