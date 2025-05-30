import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';
import type { AppRole, UserWithProfile } from '@/types/roles';

type Organization = Tables<'organizations'>;
type UserInvitation = Tables<'user_invitations'>;
type UserActivityLog = Tables<'user_activity_logs'>;
type AuthLog = Tables<'auth_logs'>;

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [activityLogs, setActivityLogs] = useState<UserActivityLog[]>([]);
  const [authLogs, setAuthLogs] = useState<AuthLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('useUserManagement: Starting data fetch...');
      
      // Fetch users with profiles first
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
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
        // Don't throw here, roles might be empty for some users
      }

      console.log('useUserManagement: Fetched roles:', rolesData?.length || 0);

      // Fetch client data separately
      const { data: clientData, error: clientError } = await supabase
        .from('client_data')
        .select('*');

      if (clientError) {
        console.error('Error fetching client data:', clientError);
        // Don't throw here, client data might not exist for all users
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

      // Fetch organizations
      try {
        const { data: orgsData, error: orgsError } = await supabase
          .from('organizations')
          .select('*')
          .order('created_at', { ascending: false });

        if (orgsError) {
          console.error('Error fetching organizations:', orgsError);
        } else {
          console.log('useUserManagement: Fetched organizations:', orgsData?.length || 0);
          setOrganizations(orgsData || []);
        }
      } catch (err) {
        console.error('Organizations fetch failed:', err);
        setOrganizations([]);
      }

      // Fetch invitations
      try {
        const { data: invitationsData, error: invitationsError } = await supabase
          .from('user_invitations')
          .select(`
            *,
            organizations(name)
          `)
          .order('created_at', { ascending: false });

        if (invitationsError) {
          console.error('Error fetching invitations:', invitationsError);
        } else {
          console.log('useUserManagement: Fetched invitations:', invitationsData?.length || 0);
          setInvitations(invitationsData || []);
        }
      } catch (err) {
        console.error('Invitations fetch failed:', err);
        setInvitations([]);
      }

      // Fetch activity logs
      try {
        const { data: activityData, error: activityError } = await supabase
          .from('user_activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (activityError) {
          console.error('Error fetching activity logs:', activityError);
        } else {
          console.log('useUserManagement: Fetched activity logs:', activityData?.length || 0);
          setActivityLogs(activityData || []);
        }
      } catch (err) {
        console.error('Activity logs fetch failed:', err);
        setActivityLogs([]);
      }

      // Fetch auth logs
      try {
        const { data: authData, error: authError } = await supabase
          .from('auth_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100);

        if (authError) {
          console.error('Error fetching auth logs:', authError);
        } else {
          console.log('useUserManagement: Fetched auth logs:', authData?.length || 0);
          setAuthLogs(authData || []);
        }
      } catch (err) {
        console.error('Auth logs fetch failed:', err);
        setAuthLogs([]);
      }

      console.log('useUserManagement: Data fetch completed successfully');

    } catch (error) {
      console.error('Error fetching user management data:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load user management data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // User management functions with improved error handling and logging
  const assignUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log(`useUserManagement: Attempting to assign role ${role} to user ${userId}`);
      
      // First check if the role already exists to avoid conflicts
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', role)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing role:', checkError);
        throw checkError;
      }

      if (existingRole) {
        console.log(`Role ${role} already exists for user ${userId}, skipping assignment`);
        return; // Role already exists, no need to assign again
      }

      const { error } = await supabase.rpc('assign_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        console.error('useUserManagement: RPC error:', error);
        throw new Error(`Failed to assign role ${role}: ${error.message}`);
      }

      console.log(`useUserManagement: Successfully assigned role ${role} to user ${userId}`);
      
    } catch (error) {
      console.error('useUserManagement: Error assigning role:', error);
      throw error;
    }
  };

  const removeUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log(`useUserManagement: Attempting to remove role ${role} from user ${userId}`);
      
      const { error } = await supabase.rpc('remove_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        console.error('useUserManagement: RPC error:', error);
        throw new Error(`Failed to remove role ${role}: ${error.message}`);
      }

      console.log(`useUserManagement: Successfully removed role ${role} from user ${userId}`);
      
    } catch (error) {
      console.error('useUserManagement: Error removing role:', error);
      throw error;
    }
  };

  // Organization management
  const createOrganization = async (orgData: Omit<Organization, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('useUserManagement: Creating organization:', orgData);
      const { data, error } = await supabase
        .from('organizations')
        .insert(orgData)
        .select()
        .single();

      if (error) {
        console.error('useUserManagement: Error creating organization:', error);
        throw error;
      }

      console.log('useUserManagement: Successfully created organization:', data);
      setOrganizations(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Organization created successfully',
      });
      return data;
    } catch (error) {
      console.error('useUserManagement: Error creating organization:', error);
      toast({
        title: 'Error',
        description: 'Failed to create organization',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // User invitation
  const createInvitation = async (email: string, organizationId: string, roles: AppRole[]) => {
    try {
      console.log('useUserManagement: Creating invitation for:', email, 'org:', organizationId, 'roles:', roles);
      const { data, error } = await supabase
        .from('user_invitations')
        .insert({
          email,
          organization_id: organizationId,
          roles
        })
        .select()
        .single();

      if (error) {
        console.error('useUserManagement: Error creating invitation:', error);
        throw error;
      }

      console.log('useUserManagement: Successfully created invitation:', data);
      setInvitations(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Invitation sent successfully',
      });
      return data;
    } catch (error) {
      console.error('useUserManagement: Error creating invitation:', error);
      toast({
        title: 'Error',
        description: 'Failed to send invitation',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    users,
    organizations,
    invitations,
    activityLogs,
    authLogs,
    isLoading,
    assignUserRole,
    removeUserRole,
    createOrganization,
    createInvitation,
    refetchData: fetchData,
  };
};
