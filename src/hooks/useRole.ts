
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { AppRole, UserProfile, ClientData } from '@/types/roles';

export const useRole = () => {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<AppRole[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserRoles([]);
      setUserProfile(null);
      setClientData(null);
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
        } else if (profile) {
          setUserProfile(profile);
        }

        // Fetch user roles
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (rolesError) {
          console.error('Error fetching roles:', rolesError);
        } else {
          setUserRoles(roles?.map(r => r.role) || []);
        }

        // Fetch client data if user has client role
        const { data: client, error: clientError } = await supabase
          .from('client_data')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (clientError && clientError.code !== 'PGRST116') {
          console.error('Error fetching client data:', clientError);
        } else if (client) {
          setClientData(client);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const hasRole = (role: AppRole): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: AppRole[]): boolean => {
    return roles.some(role => userRoles.includes(role));
  };

  const isAdmin = (): boolean => hasRole('admin');
  const isClient = (): boolean => hasRole('client');
  const isManager = (): boolean => hasRole('manager');
  const isSupport = (): boolean => hasRole('support');

  return {
    userRoles,
    userProfile,
    clientData,
    isLoading,
    hasRole,
    hasAnyRole,
    isAdmin,
    isClient,
    isManager,
    isSupport,
  };
};
