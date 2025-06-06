
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganizationData } from '@/hooks/useOrganizationData';
import { useUserRoles } from '@/hooks/user-management/useUserRoles';
import { useUsers } from '@/hooks/user-management/useUsers';
import { useOrganizations } from '@/hooks/user-management/useOrganizations';
import type { UserWithProfile, AppRole } from '@/types/roles';

export const useUserManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { canAccessCrossOrganization, organizationId } = useOrganizationData();
  const { assignUserRole, removeUserRole } = useUserRoles();
  const { users, isLoading: usersLoading, refetchUsers } = useUsers();
  const { organizations, isLoading: orgsLoading, createOrganization, refetchOrganizations } = useOrganizations();
  
  const [isLoading, setIsLoading] = useState(true);

  // Combine loading states
  useEffect(() => {
    setIsLoading(usersLoading || orgsLoading);
  }, [usersLoading, orgsLoading]);

  // Filter users based on organization access
  const getFilteredUsers = (): UserWithProfile[] => {
    if (!user) return [];
    
    // Admins can see all users
    if (canAccessCrossOrganization()) {
      return users;
    }
    
    // Regular users can only see users from their organization
    if (organizationId) {
      return users.filter(u => u.clientData?.organization_id === organizationId);
    }
    
    return [];
  };

  const filteredUsers = getFilteredUsers();

  const assignRole = async (userId: string, role: AppRole) => {
    try {
      await assignUserRole(userId, role);
      await refetchUsers();
      toast({
        title: 'Success',
        description: `Role ${role} assigned successfully`,
      });
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to assign role',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    try {
      await removeUserRole(userId, role);
      await refetchUsers();
      toast({
        title: 'Success',
        description: `Role ${role} removed successfully`,
      });
    } catch (error) {
      console.error('Error removing role:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove role',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const refetchData = async () => {
    try {
      await Promise.all([
        refetchUsers(),
        refetchOrganizations()
      ]);
    } catch (error) {
      console.error('Error refetching user management data:', error);
    }
  };

  return {
    // Data
    users: filteredUsers,
    organizations,
    isLoading,
    
    // Actions
    assignUserRole: assignRole,
    removeUserRole: removeRole,
    createOrganization,
    
    // Utilities
    refetchData,
    refetchUsers,
    refetchOrganizations,
    canAccessCrossOrganization,
    organizationId,
  };
};
