
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganizationAwareData } from '@/hooks/useOrganizationAwareData';
import type { UserWithProfile, AppRole } from '@/types/roles';

export const useOrganizationAwareUserManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const { organizationId, canAccessCrossOrganization } = useOrganizationAwareData();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 useOrganizationAwareUserManagement: Starting organization-aware user fetch...');
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Check if user has admin or manager role using the new safe functions
      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
        
      if (roleError) {
        throw new Error('Failed to verify user permissions');
      }
      
      const hasAdminRole = userRoles?.some(r => r.role === 'admin');
      const hasManagerRole = userRoles?.some(r => r.role === 'manager');
      
      if (!hasAdminRole && !hasManagerRole) {
        throw new Error('Access denied: Admin or Manager role required');
      }
      
      let profilesQuery = supabase
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

      // Apply organization filtering for non-admin users
      if (!canAccessCrossOrganization && organizationId) {
        profilesQuery = profilesQuery.eq('organization_id', organizationId);
      }

      const { data: profilesData, error: profilesError } = await profilesQuery;

      if (profilesError) {
        throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
      }

      console.log('✅ Organization-aware profiles fetched:', profilesData?.length || 0);

      // Fetch user roles and client data
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('*');

      const { data: clientData } = await supabase
        .from('client_data')
        .select('*');

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

      console.log('✅ Organization-aware users processed:', transformedUsers.length);
      setUsers(transformedUsers);

    } catch (error) {
      console.error('💥 useOrganizationAwareUserManagement: Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const assignUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log('🔄 Assigning role with organization context...');
      
      // Use the safe RPC function
      const { error } = await supabase.rpc('assign_user_role', {
        _user_id: userId,
        _role: role,
        _assigned_by: user?.id
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: 'Success',
        description: `Role ${role} assigned successfully`,
      });

      // Refresh the user list
      await fetchUsers();
    } catch (error) {
      console.error('💥 Error assigning role:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to assign role',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const removeUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log('🔄 Removing role with organization context...');
      
      const { error } = await supabase.rpc('remove_user_role', {
        _user_id: userId,
        _role: role,
        _removed_by: user?.id
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: 'Success',
        description: `Role ${role} removed successfully`,
      });

      // Refresh the user list
      await fetchUsers();
    } catch (error) {
      console.error('💥 Error removing role:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove role',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [organizationId]);

  return {
    users,
    isLoading,
    assignUserRole,
    removeUserRole,
    refetchUsers: fetchUsers,
    canAccessCrossOrganization
  };
};
