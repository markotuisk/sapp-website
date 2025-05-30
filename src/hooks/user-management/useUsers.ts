
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { UserWithProfile, AppRole } from '@/types/roles';

export const useUsers = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      console.log('useUsers: Starting user fetch...');
      
      // Fetch users with profiles first
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
      }

      console.log('useUsers: Fetched profiles:', profilesData?.length || 0);

      // Fetch user roles separately
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      }

      console.log('useUsers: Fetched roles:', rolesData?.length || 0);

      // Fetch client data separately
      const { data: clientData, error: clientError } = await supabase
        .from('client_data')
        .select('*');

      if (clientError) {
        console.error('Error fetching client data:', clientError);
      }

      console.log('useUsers: Fetched client data:', clientData?.length || 0);

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

      console.log('useUsers: Transformed users:', transformedUsers.length);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    refetchUsers: fetchUsers,
  };
};
