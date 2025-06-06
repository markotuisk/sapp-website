
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganizationData } from '@/hooks/useOrganizationData';

export const useOrganizationAccess = () => {
  const { user } = useAuth();
  const { organizationId, canAccessCrossOrganization } = useOrganizationData();
  const [permissionCache, setPermissionCache] = useState<Map<string, boolean>>(new Map());

  const checkOrganizationAccess = async (targetOrgId: string): Promise<boolean> => {
    // Check cache first
    const cacheKey = `org_access_${targetOrgId}`;
    if (permissionCache.has(cacheKey)) {
      return permissionCache.get(cacheKey)!;
    }

    try {
      // Admins can access all organizations
      if (canAccessCrossOrganization()) {
        setPermissionCache(prev => new Map(prev).set(cacheKey, true));
        return true;
      }

      // Check if user can access this specific organization
      const { data, error } = await supabase
        .rpc('can_access_organization', { target_org_id: targetOrgId });

      if (error) {
        console.error('Error checking organization access:', error);
        return false;
      }

      const hasAccess = Boolean(data);
      setPermissionCache(prev => new Map(prev).set(cacheKey, hasAccess));
      return hasAccess;
    } catch (error) {
      console.error('Organization access check failed:', error);
      return false;
    }
  };

  const validateDataAccess = (dataOrgId: string | null | undefined): boolean => {
    // Public data (no organization) is accessible to all
    if (!dataOrgId) return true;
    
    // Admins can access all data
    if (canAccessCrossOrganization()) return true;
    
    // Users can only access data from their organization
    return dataOrgId === organizationId;
  };

  const clearPermissionCache = () => {
    setPermissionCache(new Map());
  };

  useEffect(() => {
    // Clear cache when user or organization changes
    clearPermissionCache();
  }, [user, organizationId]);

  return {
    checkOrganizationAccess,
    validateDataAccess,
    clearPermissionCache,
    canAccessCrossOrganization
  };
};
