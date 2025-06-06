
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { UserWithProfile, AppRole } from '@/types/roles';
import type { Tables } from '@/integrations/supabase/types';
import { useUserRoles } from '@/hooks/user-management/useUserRoles';
import { useOrganizations } from '@/hooks/user-management/useOrganizations';

type Organization = Tables<'organizations'>;

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { assignUserRole, removeUserRole } = useUserRoles();
  const { organizations, isLoading: organizationsLoading, createOrganization, refetchOrganizations } = useOrganizations();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      console.log('useUserManagement: Starting user fetch...');
      
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('Authentication error:', authError);
        throw new Error('User not authenticated');
      }
      
      // Check if user has admin role
      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
        
      if (roleError) {
        console.error('Error checking user roles:', roleError);
        throw new Error('Failed to verify user permissions');
      }
      
      const hasAdminRole = userRoles?.some(r => r.role === 'admin');
      if (!hasAdminRole) {
        throw new Error('Access denied: Admin role required');
      }
      
      // Fetch users with profiles - note the organization field is now an object
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          *,
          organization:organizations!profiles_organization_id_fkey(
            id,
            name,
            description
          )
        `)
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
      }

      console.log('useUserManagement: Fetched profiles:', profilesData?.length || 0);

      // Fetch user roles separately
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      }

      console.log('useUserManagement: Fetched roles:', rolesData?.length || 0);

      // Fetch client data separately
      const { data: clientData, error: clientError } = await supabase
        .from('client_data')
        .select('*');

      if (clientError) {
        console.error('Error fetching client data:', clientError);
      }

      console.log('useUserManagement: Fetched client data:', clientData?.length || 0);

      // Transform and combine the data
      const transformedUsers = profilesData?.map(profile => {
        const userRoles = rolesData?.filter(role => role.user_id === profile.id).map(r => r.role) || [];
        const userClientData = clientData?.find(cd => cd.user_id === profile.id) || null;
        
        return {
          id: profile.id,
          email: profile.email,
          profile: profile,
          roles: userRoles as AppRole[],
          clientData: userClientData
        };
      }) || [];

      console.log('useUserManagement: Transformed users:', transformedUsers.length);
      setUsers(transformedUsers);

    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refetchData = fetchUsers;

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading: isLoading || organizationsLoading,
    organizations,
    assignUserRole,
    removeUserRole,
    createOrganization,
    refetchData,
    refetchOrganizations,
  };
};
