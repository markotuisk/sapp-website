
import { supabase } from '@/integrations/supabase/client';
import type { AppRole } from '@/types/roles';

export const useUserRoles = () => {
  const assignUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log(`useUserRoles: Attempting to assign role ${role} to user ${userId}`);
      
      // First check if the role already exists to avoid conflicts
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', role)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing role:', checkError);
        throw checkError;
      }

      if (existingRole) {
        console.log(`Role ${role} already exists for user ${userId}, skipping assignment`);
        return;
      }

      const { error } = await supabase.rpc('assign_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        console.error('useUserRoles: RPC error:', error);
        throw new Error(`Failed to assign role ${role}: ${error.message}`);
      }

      console.log(`useUserRoles: Successfully assigned role ${role} to user ${userId}`);
      
    } catch (error) {
      console.error('useUserRoles: Error assigning role:', error);
      throw error;
    }
  };

  const removeUserRole = async (userId: string, role: AppRole) => {
    try {
      console.log(`useUserRoles: Attempting to remove role ${role} from user ${userId}`);
      
      const { error } = await supabase.rpc('remove_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        console.error('useUserRoles: RPC error:', error);
        throw new Error(`Failed to remove role ${role}: ${error.message}`);
      }

      console.log(`useUserRoles: Successfully removed role ${role} from user ${userId}`);
      
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
