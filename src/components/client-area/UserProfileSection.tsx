
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building2, User, Loader2 } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { useAuth } from '@/contexts/AuthContext';

export const UserProfileSection: React.FC = () => {
  const { user } = useAuth();
  const { userProfile, clientData, isLoading } = useRole();

  const getInitials = () => {
    const first = userProfile?.first_name?.charAt(0) || '';
    const last = userProfile?.last_name?.charAt(0) || '';
    return (first + last).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    return user?.email || 'User';
  };

  const getOrganizationDisplay = () => {
    // Handle organization as object or fallback to client data
    const orgName = userProfile?.organization && typeof userProfile.organization === 'object' 
      ? userProfile.organization.name 
      : clientData?.company_name;
    return orgName || null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border">
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
        </div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border">
      <Avatar className="h-12 w-12">
        <AvatarImage src={userProfile?.avatar_url} />
        <AvatarFallback className="bg-sapp-blue text-white">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sapp-dark">{getDisplayName()}</h3>
          {userProfile?.job_title && (
            <Badge variant="secondary" className="text-xs">
              {userProfile.job_title}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-600">{user?.email}</p>
        
        {getOrganizationDisplay() && (
          <div className="flex items-center gap-1 mt-1">
            <Building2 className="h-3 w-3 text-gray-500" />
            <span className="text-sm text-gray-600">{getOrganizationDisplay()}</span>
            {userProfile?.department && (
              <span className="text-sm text-gray-500">• {userProfile.department}</span>
            )}
          </div>
        )}
        
        {userProfile?.organization_type && (
          <Badge variant="outline" className="text-xs mt-1">
            {userProfile.organization_type}
          </Badge>
        )}
      </div>
    </div>
  );
};
