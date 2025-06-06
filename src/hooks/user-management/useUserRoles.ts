
import type { AppRole } from '@/types/roles';

export const useUserRoles = () => {
  const assignUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log(`useUserRoles: Role assignment disabled in simplified mode`);
      
      throw new Error('Role assignment feature not available in simplified mode');
    } catch (error) {
      console.error('useUserRoles: Error assigning role:', error);
      throw error;
    }
  };

  const removeUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log(`useUserRoles: Role removal disabled in simplified mode`);
      
      throw new Error('Role removal feature not available in simplified mode');
    } catch (error) {
      console.error('useUserRoles: Error removing role:', error);
      throw error;
    }
  };

  return {
    assignUserRole,
    removeUserRole,
  };
};
