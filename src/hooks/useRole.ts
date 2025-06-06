
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UserRole {
  role: string;
  assigned_at: string;
}

export const useRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!user) {
        setRoles([]);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role, assigned_at')
          .eq('user_id', user.id);

        if (error) throw error;
        setRoles(data || []);
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setRoles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRoles();
  }, [user]);

  const hasRole = (role: string) => {
    return roles.some(userRole => userRole.role === role);
  };

  const isAdmin = hasRole('admin');

  return {
    roles,
    hasRole,
    isAdmin,
    isLoading
  };
};
