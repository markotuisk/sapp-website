
// Simplified context for public website - no authentication needed
import React, { createContext, useContext } from 'react';

interface PublicContextType {
  isPublicSite: boolean;
}

const PublicContext = createContext<PublicContextType>({
  isPublicSite: true
});

export const PublicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PublicContext.Provider value={{ isPublicSite: true }}>
      {children}
    </PublicContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(PublicContext);
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    ...context
  };
};
