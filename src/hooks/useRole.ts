
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

  // Memoize the refreshUserData function to prevent infinite loops
  const refreshUserData = useCallback(async () => {
    if (!user) return;
    
    console.log('useRole: Refreshing user data...');
    setIsLoading(true);
    setError(null);
    
    try {
      // Re-fetch all data with organization join
      const [profileResult, rolesResult, clientResult] = await Promise.all([
        supabase
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
          .single(),
        supabase.from('user_roles').select('role').eq('user_id', user.id),
        supabase.from('client_data').select('*').eq('user_id', user.id).single()
      ]);

      if (profileResult.error && profileResult.error.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileResult.error);
        throw new Error('Failed to fetch user profile');
      }

      if (profileResult.data) {
        console.log('useRole: Refreshed profile:', profileResult.data);
        setUserProfile(profileResult.data);
      }
      
      if (rolesResult.error) {
        console.error('Error fetching roles:', rolesResult.error);
        throw new Error('Failed to fetch user roles');
      }

      if (rolesResult.data) {
        console.log('useRole: Refreshed roles:', rolesResult.data);
        setUserRoles(rolesResult.data.map(r => r.role));
      }
      
      if (clientResult.data) {
        console.log('useRole: Refreshed client data:', clientResult.data);
        setClientData(clientResult.data);
      }
    } catch (error: any) {
      console.error('Error refreshing user data:', error);
      setError(error.message || 'Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !isAuthenticated) {
      setUserRoles([]);
      setUserProfile(null);
      setClientData(null);
      setIsLoading(false);
      setError(null);
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

        // Fetch user roles
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (rolesError) {
          console.error('Error fetching roles:', rolesError);
          throw new Error('Failed to fetch user roles');
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
          // Don't throw here, client data might not exist for all users
        }

        if (client) {
          console.log('useRole: Client data:', client);
          setClientData(client);
        } else {
          // If no client data exists, create it and sync organization from profile
          console.log('useRole: No client data found, creating and syncing...');
          const orgId = profile?.organization_id || '00000000-0000-0000-0000-000000000001';
          
          const { data: newClientData, error: createError } = await supabase
            .from('client_data')
            .insert({
              user_id: user.id,
              organization_id: orgId
            })
            .select()
            .single();
            
          if (createError) {
            console.error('Error creating client data:', createError);
          } else {
            console.log('useRole: Created and synced client data:', newClientData);
            setClientData(newClientData);
          }
        }

        // Data consistency check: Sync organization between profile and client_data
        if (profile && client) {
          const profileOrgId = profile.organization_id;
          const clientOrgId = client.organization_id;
          
          if (profileOrgId && clientOrgId && profileOrgId !== clientOrgId) {
            console.log('useRole: Organization mismatch detected, syncing...');
            // Prioritize client_data and update profile
            await supabase
              .from('profiles')
              .update({ organization_id: clientOrgId })
              .eq('id', user.id);
            console.log('useRole: Synced profile organization to match client_data');
          } else if (profileOrgId && !clientOrgId) {
            console.log('useRole: Client data missing organization, syncing from profile...');
            // Update client_data with profile organization
            await supabase
              .from('client_data')
              .update({ organization_id: profileOrgId })
              .eq('user_id', user.id);
            console.log('useRole: Synced client_data organization from profile');
            // Update local state
            setClientData(prev => prev ? { ...prev, organization_id: profileOrgId } : null);
          }
        }

      } catch (error: any) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to load user data');
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

  // Use the optimized security definer function for admin checks
  const isAdmin = (): boolean => hasRole('admin');
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
  };
};
