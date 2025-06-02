
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
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Emergency admin check - bypasses RLS when needed
  const emergencyAdminCheck = useCallback(async (userId: string) => {
    try {
      console.log('🚨 Emergency admin check for user:', userId);
      
      // Try direct RPC call first
      const { data: isAdminRPC, error: rpcError } = await supabase
        .rpc('current_user_is_admin');
        
      if (!rpcError && isAdminRPC) {
        console.log('✅ Emergency admin verification successful via RPC');
        return true;
      }
      
      // If RPC fails, try direct query with bypassed RLS
      const { data: directCheck, error: directError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .limit(1);
        
      if (!directError && directCheck && directCheck.length > 0) {
        console.log('✅ Emergency admin verification successful via direct query');
        return true;
      }
      
      console.log('⚠️ Emergency admin check failed, user is not admin');
      return false;
    } catch (error) {
      console.error('❌ Emergency admin check failed:', error);
      return false;
    }
  }, []);

  // Memoize the refreshUserData function to prevent infinite loops
  const refreshUserData = useCallback(async () => {
    if (!user) return;
    
    console.log('useRole: Refreshing user data...');
    setIsLoading(true);
    setError(null);
    
    try {
      // Try normal flow first
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

      // Check for RLS recursion error
      const hasRLSError = rolesResult.error?.code === '42P17' || 
                         profileResult.error?.code === '42P17';

      if (hasRLSError) {
        console.warn('🚨 RLS recursion detected, switching to emergency mode');
        setEmergencyMode(true);
        
        // Try emergency admin check
        const isEmergencyAdmin = await emergencyAdminCheck(user.id);
        
        if (isEmergencyAdmin) {
          console.log('✅ Emergency admin access granted');
          setUserRoles(['admin']);
          
          // Create minimal profile if needed
          if (profileResult.error) {
            setUserProfile({
              id: user.id,
              email: user.email || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              organization_id: null,
              first_name: null,
              last_name: null,
              phone: null,
              organization: null,
              avatar_url: null,
              organization_type: null,
              department: null,
              job_title: null
            });
          } else {
            setUserProfile(profileResult.data);
          }
          
          // Set minimal client data
          setClientData({
            id: user.id,
            user_id: user.id,
            organization_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            company_name: null,
            industry: null,
            company_size: null,
            subscription_tier: 'basic',
            account_status: 'active'
          });
          
          setError(null);
          return;
        }
        
        throw new Error('RLS policy recursion detected. Database policies need to be updated.');
      }

      // Normal flow - no RLS errors
      setEmergencyMode(false);
      
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
      
      setError(null);
    } catch (error: any) {
      console.error('Error refreshing user data:', error);
      setError(error.message || 'Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  }, [user, emergencyAdminCheck]);

  useEffect(() => {
    if (!user || !isAuthenticated) {
      setUserRoles([]);
      setUserProfile(null);
      setClientData(null);
      setIsLoading(false);
      setError(null);
      setEmergencyMode(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('useRole: Fetching data for user:', user.id);

        // Try to fetch user profile with organization data
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

        // Check for RLS recursion in profile fetch
        if (profileError && profileError.code === '42P17') {
          console.warn('🚨 RLS recursion in profile fetch, using emergency mode');
          await refreshUserData();
          return;
        }

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          throw new Error('Failed to fetch user profile');
        } else if (profile) {
          console.log('useRole: Profile data:', profile);
          setUserProfile(profile);
        }

        // Try to fetch user roles
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        // Check for RLS recursion in roles fetch
        if (rolesError && rolesError.code === '42P17') {
          console.warn('🚨 RLS recursion in roles fetch, switching to emergency mode');
          setEmergencyMode(true);
          
          const isEmergencyAdmin = await emergencyAdminCheck(user.id);
          if (isEmergencyAdmin) {
            setUserRoles(['admin']);
          } else {
            setUserRoles([]);
          }
        } else if (rolesError) {
          console.error('Error fetching roles:', rolesError);
          setUserRoles([]);
        } else {
          console.log('useRole: User roles:', roles);
          setUserRoles(roles?.map(r => r.role) || []);
          setEmergencyMode(false);
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

      } catch (error: any) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, isAuthenticated, emergencyAdminCheck]);

  const hasRole = (role: AppRole): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: AppRole[]): boolean => {
    return roles.some(role => userRoles.includes(role));
  };

  // Enhanced admin check with emergency fallback
  const isAdmin = (): boolean => {
    const hasAdminRole = hasRole('admin');
    console.log('useRole: isAdmin check - hasAdminRole:', hasAdminRole, 'userRoles:', userRoles, 'emergencyMode:', emergencyMode);
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
    error: emergencyMode ? 'Emergency mode active - RLS policies need database update' : error,
    hasRole,
    hasAnyRole,
    isAdmin,
    isClient,
    isManager,
    isSupport,
    refreshUserData,
    emergencyMode,
  };
};
