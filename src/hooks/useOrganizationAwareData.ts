
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

export const useOrganizationAwareData = () => {
  const { user } = useAuth();
  const { userProfile, isAdmin } = useRole();
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userProfile) {
      // Get organization from client_data (primary source) or profile (fallback)
      const orgId = userProfile.organization?.id || userProfile.organization_id;
      setOrganizationId(orgId || null);
      setIsLoading(false);
    }
  }, [userProfile]);

  const getOrganizationSpecificQuery = (baseQuery: any, tableName: string) => {
    // Enhanced admin check - admins can see all data
    const userIsAdmin = isAdmin();
    console.log('🔍 getOrganizationSpecificQuery: Admin check result:', userIsAdmin);
    
    if (userIsAdmin) {
      console.log('✅ Admin user detected, returning unrestricted query');
      return baseQuery;
    }

    if (!organizationId) {
      console.log('⚠️ No organization ID, returning empty result query');
      // Users without organization see no data
      return baseQuery.eq('organization_id', '00000000-0000-0000-0000-000000000000');
    }

    console.log('🏢 Regular user, applying organization filter:', organizationId);
    // Regular users see only their organization's data
    switch (tableName) {
      case 'news_articles':
        return baseQuery.or(`organization_id.eq.${organizationId},organization_id.is.null`);
      case 'user_activity_logs':
        return baseQuery.eq('organization_id', organizationId);
      case 'client_documents':
        // This is handled by RLS policies
        return baseQuery;
      default:
        return baseQuery.eq('organization_id', organizationId);
    }
  };

  const addOrganizationContext = (data: any) => {
    if (!organizationId) return data;
    
    return {
      ...data,
      organization_id: organizationId
    };
  };

  return {
    organizationId,
    isLoading,
    getOrganizationSpecificQuery,
    addOrganizationContext,
    canAccessCrossOrganization: isAdmin()
  };
};
