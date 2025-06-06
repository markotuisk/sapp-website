
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

export const useOrganizationAwareData = () => {
  const { user } = useAuth();
  const { userProfile, isAdmin } = useRole();
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      // For simplified mode, just set to null since organization features are disabled
      setOrganizationId(null);
      setIsLoading(false);
    }
  }, [userProfile]);

  const getOrganizationSpecificQuery = (baseQuery: any, tableName: string) => {
    // For simplified mode, just return the base query without organization filtering
    console.log('🔍 getOrganizationSpecificQuery: Organization filtering disabled in simplified mode');
    return baseQuery;
  };

  const addOrganizationContext = (data: any) => {
    // For simplified mode, just return the data without organization context
    return data;
  };

  return {
    organizationId,
    isLoading,
    getOrganizationSpecificQuery,
    addOrganizationContext,
    canAccessCrossOrganization: isAdmin()
  };
};
