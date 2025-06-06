
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { AppRole, UserProfile, ClientData } from '@/types/roles';

export const useRole = () => {
  const { user, isAuthenticated } = useAuth();
  const [userRoles, setUserRoles] = useState<AppRole[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataInitialized, setDataInitialized] = useState(false);

  const refreshUserData = useCallback(async () => {
    if (!user || !isAuthenticated) {
      console.log('useRole: No user or not authenticated, skipping data fetch');
      return;
    }
    
    console.log('useRole: Refreshing user data...');
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user profile with organization data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          organization:organizations!profiles_organization_id_fkey(
            id,
            name,
            description
          )
        `)
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        throw new Error('Failed to fetch user profile');
      }

      if (profile) {
        console.log('useRole: Profile data:', profile);
        setUserProfile(profile);
      }

      // Fetch user roles using the new safe RLS policies
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        throw new Error('Failed to fetch user roles');
      }

      if (roles) {
        console.log('useRole: User roles:', roles);
        setUserRoles(roles.map(r => r.role));
      }

      // Fetch client data
      const { data: client, error: clientError } = await supabase
        .from('client_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (clientError && clientError.code !== 'PGRST116') {
        console.error('Error fetching client data:', clientError);
      }

      if (client) {
        console.log('useRole: Client data:', client);
        setClientData(client);
      }

      setError(null);
      setDataInitialized(true);
    } catch (error: any) {
      console.error('Error refreshing user data:', error);
      setError(error.message || 'Failed to load user data');
      setDataInitialized(true);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (!user || !isAuthenticated) {
      setUserRoles([]);
      setUserProfile(null);
      setClientData(null);
      setIsLoading(false);
      setError(null);
      setDataInitialized(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('useRole: Fetching data for user:', user.id);

        // Fetch user profile with organization data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select(`
            *,
            organization:organizations!profiles_organization_id_fkey(
              id,
              name,
              description
            )
          `)
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          throw new Error('Failed to fetch user profile');
        } else if (profile) {
          console.log('useRole: Profile data:', profile);
          setUserProfile(profile);
        }

        // Fetch user roles - now safe with new RLS policies
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (rolesError) {
          console.error('Error fetching roles:', rolesError);
          setUserRoles([]);
        } else {
          console.log('useRole: User roles:', roles);
          setUserRoles(roles?.map(r => r.role) || []);
        }

        // Fetch client data
        const { data: client, error: clientError } = await supabase
          .from('client_data')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (clientError && clientError.code !== 'PGRST116') {
          console.error('Error fetching client data:', clientError);
        }

        if (client) {
          console.log('useRole: Client data:', client);
          setClientData(client);
        }

        setDataInitialized(true);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to load user data');
        setDataInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, isAuthenticated]);

  const hasRole = (role: AppRole): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: AppRole[]): boolean => {
    return roles.some(role => userRoles.includes(role));
  };

  const isAdmin = (): boolean => {
    const hasAdminRole = hasRole('admin');
    console.log('useRole: isAdmin check - hasAdminRole:', hasAdminRole, 'userRoles:', userRoles, 'dataInitialized:', dataInitialized);
    return hasAdminRole;
  };
  
  const isClient = (): boolean => hasRole('client');
  const isManager = (): boolean => hasRole('manager');
  const isSupport = (): boolean => hasRole('support');

  return {
    userRoles,
    userProfile,
    clientData,
    isLoading,
    error,
    hasRole,
    hasAnyRole,
    isAdmin,
    isClient,
    isManager,
    isSupport,
    refreshUserData,
    dataInitialized,
  };
};
