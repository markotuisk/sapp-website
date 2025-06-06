
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { AppRole, UserProfile } from '@/types/roles';

export const useRole = () => {
  const { user, isAuthenticated } = useAuth();
  const [userRoles, setUserRoles] = useState<AppRole[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simple admin check based on email (you can customize this)
  const checkAdminAccess = useCallback((email: string) => {
    // Add your admin emails here
    const adminEmails = ['admin@example.com', 'admin@yourdomain.com'];
    return adminEmails.includes(email.toLowerCase());
  }, []);

  // Memoize the refreshUserData function to prevent infinite loops
  const refreshUserData = useCallback(async () => {
    if (!user) return;
    
    console.log('useRole: Refreshing user data...');
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user profile from profiles table (no organization joins)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        throw new Error('Failed to fetch user profile');
      }

      if (profile) {
        console.log('useRole: Profile data:', profile);
        // Create UserProfile with email from auth user
        const userProfileData: UserProfile = {
          id: profile.id,
          email: user.email || '',
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          phone: null,
          phone_country_code: null,
          phone_local_number: null,
          organization_type: null,
          department: null,
          job_title: null,
          organization_id: null,
          organization: null
        };
        setUserProfile(userProfileData);

        // Simple role assignment based on email
        if (user.email && checkAdminAccess(user.email)) {
          setUserRoles(['admin']);
        } else {
          setUserRoles(['client']); // Default role for authenticated users
        }
      } else {
        // If no profile exists, create minimal profile data
        const userProfileData: UserProfile = {
          id: user.id,
          email: user.email || '',
          first_name: null,
          last_name: null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          phone: null,
          phone_country_code: null,
          phone_local_number: null,
          organization_type: null,
          department: null,
          job_title: null,
          organization_id: null,
          organization: null
        };
        setUserProfile(userProfileData);

        // Simple role assignment
        if (user.email && checkAdminAccess(user.email)) {
          setUserRoles(['admin']);
        } else {
          setUserRoles(['client']);
        }
      }
      
      setError(null);
    } catch (error: any) {
      console.error('Error refreshing user data:', error);
      setError(error.message || 'Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  }, [user, checkAdminAccess]);

  useEffect(() => {
    if (!user || !isAuthenticated) {
      setUserRoles([]);
      setUserProfile(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('useRole: Fetching data for user:', user.id);

        // Try to fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          throw new Error('Failed to fetch user profile');
        } else if (profile) {
          console.log('useRole: Profile data:', profile);
          const userProfileData: UserProfile = {
            id: profile.id,
            email: user.email || '',
            first_name: profile.first_name,
            last_name: profile.last_name,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
            phone: null,
            phone_country_code: null,
            phone_local_number: null,
            organization_type: null,
            department: null,
            job_title: null,
            organization_id: null,
            organization: null
          };
          setUserProfile(userProfileData);
        }

        // Simple role assignment based on email
        if (user.email && checkAdminAccess(user.email)) {
          console.log('useRole: User is admin:', user.email);
          setUserRoles(['admin']);
        } else {
          console.log('useRole: User is client:', user.email);
          setUserRoles(['client']);
        }

      } catch (error: any) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, isAuthenticated, checkAdminAccess]);

  const hasRole = (role: AppRole): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: AppRole[]): boolean => {
    return roles.some(role => userRoles.includes(role));
  };

  const isAdmin = (): boolean => {
    const hasAdminRole = hasRole('admin');
    console.log('useRole: isAdmin check - hasAdminRole:', hasAdminRole, 'userRoles:', userRoles);
    return hasAdminRole;
  };
  
  const isClient = (): boolean => hasRole('client');
  const isManager = (): boolean => hasRole('manager');
  const isSupport = (): boolean => hasRole('support');

  return {
    userRoles,
    userProfile,
    clientData: null, // Disabled in simplified mode
    isLoading,
    error,
    hasRole,
    hasAnyRole,
    isAdmin,
    isClient,
    isManager,
    isSupport,
    refreshUserData,
    emergencyMode: false, // Disabled in simplified mode
  };
};
