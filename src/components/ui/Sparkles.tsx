
import React from 'react';

interface SparklesProps {
  className?: string;
}

const Sparkles: React.FC<SparklesProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 160 160" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="2" fill="currentColor" />
        <circle cx="80" cy="20" r="2" fill="currentColor" />
        <circle cx="120" cy="40" r="2" fill="currentColor" />
        <circle cx="140" cy="80" r="2" fill="currentColor" />
        <circle cx="120" cy="120" r="2" fill="currentColor" />
        <circle cx="80" cy="140" r="2" fill="currentColor" />
        <circle cx="40" cy="120" r="2" fill="currentColor" />
        <circle cx="20" cy="80" r="2" fill="currentColor" />
        <circle cx="60" cy="60" r="1.5" fill="currentColor" />
        <circle cx="100" cy="60" r="1.5" fill="currentColor" />
        <circle cx="60" cy="100" r="1.5" fill="currentColor" />
        <circle cx="100" cy="100" r="1.5" fill="currentColor" />
        <circle cx="80" cy="80" r="3" fill="currentColor" />
        <circle cx="30" cy="30" r="1" fill="currentColor" />
        <circle cx="130" cy="30" r="1" fill="currentColor" />
        <circle cx="130" cy="130" r="1" fill="currentColor" />
        <circle cx="30" cy="130" r="1" fill="currentColor" />
      </svg>
    </div>
  );
};

export default Sparkles;
