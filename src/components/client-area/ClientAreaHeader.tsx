
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

export const ClientAreaHeader: React.FC = () => {
  const { user } = useAuth();
  const { userRoles, userProfile, isLoading: roleLoading } = useRole();

  return (
    <div className="bg-gradient-to-r from-sapp-dark to-sapp-blue p-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Client Area</h1>
          {user ? (
            <div className="text-blue-100">
              <p className="text-lg">Welcome back, {userProfile?.first_name || user.email}</p>
              {roleLoading ? (
                <p className="text-sm">Loading roles...</p>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {userRoles.map(role => (
                    <span
                      key={role}
                      className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full capitalize"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-blue-100 text-lg">Secure Access Portal</p>
          )}
        </div>
        <img 
          src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png" 
          alt="SAPP Security Logo" 
          className="h-32 w-32 mt-4 md:mt-0 transform transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};
