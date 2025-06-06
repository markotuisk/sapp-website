
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import type { Tables } from '@/integrations/supabase/types';

type Organization = Tables<'organizations'>;

export const useOrganizationData = () => {
  const { user } = useAuth();
  const { userProfile, clientData, isAdmin } = useRole();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the user's organization ID - prioritize client_data over profile
  const getUserOrganizationId = (): string | null => {
    // Primary source: client_data.organization_id (this is what controls access)
    if (clientData?.organization_id) {
      return clientData.organization_id;
    }
    
    // Fallback: profile.organization_id (for backward compatibility)
    if (userProfile?.organization_id) {
      return userProfile.organization_id;
    }
    
    return null;
  };

  const organizationId = getUserOrganizationId();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setIsLoading(true);
        
        // Admins can see all organizations
        if (isAdmin()) {
          console.log('useOrganizationData: Fetching all organizations for admin user');
          const { data: allOrgs, error } = await supabase
            .from('organizations')
            .select('*')
            .order('name');
            
          if (error) {
            console.error('Error fetching all organizations:', error);
          } else {
            console.log('useOrganizationData: Fetched organizations for admin:', allOrgs?.length || 0);
            setOrganizations(allOrgs || []);
          }
        } else if (organizationId) {
          // Regular users can only see their organization
          console.log('useOrganizationData: Fetching organization for regular user:', organizationId);
          const { data: userOrg, error } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', organizationId)
            .single();
            
          if (error) {
            console.error('Error fetching user organization:', error);
            setOrganizations([]);
          } else {
            console.log('useOrganizationData: Fetched user organization:', userOrg?.name);
            setOrganizations(userOrg ? [userOrg] : []);
          }
        } else {
          // No organization assigned
          console.log('useOrganizationData: No organization assigned');
          setOrganizations([]);
        }
      } catch (error) {
        console.error('Error in fetchOrganizations:', error);
        setOrganizations([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrganizations();
    } else {
      setOrganizations([]);
      setCurrentOrganization(null);
      setIsLoading(false);
    }
  }, [user, organizationId, isAdmin]);

  // Set current organization based on user's assignment
  useEffect(() => {
    if (organizationId && organizations.length > 0) {
      const org = organizations.find(o => o.id === organizationId);
      setCurrentOrganization(org || null);
      console.log('useOrganizationData: Set current organization:', org?.name || 'Not found');
    } else {
      setCurrentOrganization(null);
    }
  }, [organizationId, organizations]);

  const hasOrganization = (): boolean => {
    const hasOrg = !!organizationId && organizationId !== '00000000-0000-0000-0000-000000000001';
    console.log('useOrganizationData: hasOrganization check:', { organizationId, hasOrg });
    return hasOrg;
  };

  const isGuestUser = (): boolean => {
    const isGuest = organizationId === '00000000-0000-0000-0000-000000000001';
    console.log('useOrganizationData: isGuestUser check:', { organizationId, isGuest });
    return isGuest;
  };

  const canAccessCrossOrganization = (): boolean => {
    const canAccess = isAdmin();
    console.log('useOrganizationData: canAccessCrossOrganization check:', { isAdminResult: isAdmin(), canAccess });
    return canAccess;
  };

  const getOrganizationName = (orgId?: string): string => {
    if (!orgId) return 'No organization';
    
    if (orgId === '00000000-0000-0000-0000-000000000001') {
      return 'Guest Organization';
    }
    
    const org = organizations.find(o => o.id === orgId);
    return org?.name || 'Unknown Organization';
  };

  console.log('useOrganizationData: Current state:', {
    organizationId,
    hasOrganization: hasOrganization(),
    isGuestUser: isGuestUser(),
    canAccessCrossOrganization: canAccessCrossOrganization(),
    isAdmin: isAdmin(),
    organizationsCount: organizations.length,
    currentOrganization: currentOrganization?.name
  });

  return {
    // Core data
    organizationId,
    currentOrganization,
    organizations,
    isLoading,
    
    // Status checks
    hasOrganization,
    isGuestUser,
    canAccessCrossOrganization,
    
    // Utility functions
    getOrganizationName,
    getUserOrganizationId,
  };
};
