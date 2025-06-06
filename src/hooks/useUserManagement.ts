
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { UserWithProfile, AppRole } from '@/types/roles';
import { useUserRoles } from '@/hooks/user-management/useUserRoles';
import { useOrganizations } from '@/hooks/user-management/useOrganizations';

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { assignUserRole, removeUserRole } = useUserRoles();
  const { organizations, isLoading: organizationsLoading, createOrganization, refetchOrganizations } = useOrganizations();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      console.log('useUserManagement: User management disabled in simplified mode');
      
      // Return empty array since advanced user management is disabled
      setUsers([]);
      
      toast({
        title: 'User Management Unavailable',
        description: 'Advanced user management is not available in the simplified client area setup.',
        variant: 'destructive',
      });

    } catch (error) {
      console.error('💥 useUserManagement: Error:', error);
      toast({
        title: 'Error',
        description: 'User management feature is not available in simplified mode',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refetchData = fetchUsers;

  useEffect(() => {
    // Don't automatically fetch users since the feature is disabled
    setIsLoading(false);
  }, []);

  return {
    users,
    isLoading: isLoading || organizationsLoading,
    organizations,
    assignUserRole,
    removeUserRole,
    createOrganization,
    refetchData,
    refetchOrganizations,
  };
};
