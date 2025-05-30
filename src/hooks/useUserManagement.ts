
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
      
      const [usersRes, orgsRes, invitationsRes, activityRes, authRes] = await Promise.all([
        // Fetch users with profiles and roles
        supabase
          .from('profiles')
          .select(`
            *,
            user_roles(role),
            client_data(*),
            organizations(name, industry)
          `),
        supabase
          .from('organizations')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('user_invitations')
          .select('*, organizations(name)')
          .order('created_at', { ascending: false }),
        supabase
          .from('user_activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100),
        supabase
          .from('auth_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100)
      ]);

      if (usersRes.error) throw usersRes.error;
      if (orgsRes.error) throw orgsRes.error;
      if (invitationsRes.error) throw invitationsRes.error;
      if (activityRes.error) throw activityRes.error;
      if (authRes.error) throw authRes.error;

      // Transform users data
      const transformedUsers = usersRes.data?.map(user => ({
        id: user.id,
        email: user.email,
        profile: user,
        roles: user.user_roles?.map(r => r.role) || [],
        clientData: user.client_data?.[0] || null
      })) || [];

      setUsers(transformedUsers);
      setOrganizations(orgsRes.data || []);
      setInvitations(invitationsRes.data || []);
      setActivityLogs(activityRes.data || []);
      setAuthLogs(authRes.data || []);
    } catch (error) {
      console.error('Error fetching user management data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user management data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // User management functions
  const assignUserRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase.rpc('assign_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Role ${role} assigned successfully`,
      });
      
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign role',
        variant: 'destructive',
      });
    }
  };

  const removeUserRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase.rpc('remove_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Role ${role} removed successfully`,
      });
      
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error removing role:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove role',
        variant: 'destructive',
      });
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
