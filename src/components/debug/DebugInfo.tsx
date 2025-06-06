
import React from 'react';

interface DebugInfoProps {
  componentName: string;
  data?: any;
  children: React.ReactNode;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ children }) => {
  // In production/public site, just render children without debug overlay
  return <>{children}</>;
};
