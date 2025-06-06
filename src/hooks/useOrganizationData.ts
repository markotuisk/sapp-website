
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
          const { data: allOrgs, error } = await supabase
            .from('organizations')
            .select('*')
            .order('name');
            
          if (error) {
            console.error('Error fetching all organizations:', error);
          } else {
            setOrganizations(allOrgs || []);
          }
        } else if (organizationId) {
          // Regular users can only see their organization
          const { data: userOrg, error } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', organizationId)
            .single();
            
          if (error) {
            console.error('Error fetching user organization:', error);
            setOrganizations([]);
          } else {
            setOrganizations(userOrg ? [userOrg] : []);
          }
        } else {
          // No organization assigned
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
    } else {
      setCurrentOrganization(null);
    }
  }, [organizationId, organizations]);

  const hasOrganization = (): boolean => {
    return !!organizationId && organizationId !== '00000000-0000-0000-0000-000000000001';
  };

  const isGuestUser = (): boolean => {
    return organizationId === '00000000-0000-0000-0000-000000000001';
  };

  const canAccessCrossOrganization = (): boolean => {
    return isAdmin();
  };

  const getOrganizationName = (orgId?: string): string => {
    if (!orgId) return 'No organization';
    
    if (orgId === '00000000-0000-0000-0000-000000000001') {
      return 'Guest Organization';
    }
    
    const org = organizations.find(o => o.id === orgId);
    return org?.name || 'Unknown Organization';
  };

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
