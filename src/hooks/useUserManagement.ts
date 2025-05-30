
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
      
      // Fetch users with profiles first
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
      }

      // Fetch user roles separately
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        // Don't throw here, roles might be empty for some users
      }

      // Fetch client data separately
      const { data: clientData, error: clientError } = await supabase
        .from('client_data')
        .select('*');

      if (clientError) {
        console.error('Error fetching client data:', clientError);
        // Don't throw here, client data might not exist for all users
      }

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
          setAuthLogs(authData || []);
        }
      } catch (err) {
        console.error('Auth logs fetch failed:', err);
        setAuthLogs([]);
      }

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
      console.log(`Attempting to assign role ${role} to user ${userId}`);
      
      const { error } = await supabase.rpc('assign_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        console.error('RPC error:', error);
        throw error;
      }

      console.log(`Successfully assigned role ${role} to user ${userId}`);
      
      toast({
        title: 'Success',
        description: `Role ${role} assigned successfully`,
      });
      
      // Don't refetch here, let the parent component handle it
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: 'Error',
        description: `Failed to assign role: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
      throw error; // Re-throw so the calling function knows it failed
    }
  };

  const removeUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log(`Attempting to remove role ${role} from user ${userId}`);
      
      const { error } = await supabase.rpc('remove_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        console.error('RPC error:', error);
        throw error;
      }

      console.log(`Successfully removed role ${role} from user ${userId}`);
      
      toast({
        title: 'Success',
        description: `Role ${role} removed successfully`,
      });
      
      // Don't refetch here, let the parent component handle it
    } catch (error) {
      console.error('Error removing role:', error);
      toast({
        title: 'Error',
        description: `Failed to remove role: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
      throw error; // Re-throw so the calling function knows it failed
    }
  };

  // Organization management
  const createOrganization = async (orgData: Omit<Organization, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert(orgData)
        .select()
        .single();

      if (error) throw error;

      setOrganizations(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Organization created successfully',
      });
      return data;
    } catch (error) {
      console.error('Error creating organization:', error);
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
      const { data, error } = await supabase
        .from('user_invitations')
        .insert({
          email,
          organization_id: organizationId,
          roles
        })
        .select()
        .single();

      if (error) throw error;

      setInvitations(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Invitation sent successfully',
      });
      return data;
    } catch (error) {
      console.error('Error creating invitation:', error);
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
