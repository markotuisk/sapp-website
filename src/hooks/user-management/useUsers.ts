
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { UserWithProfile } from '@/types/roles';

export const useUsers = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      console.log('useUsers: User management disabled in simplified mode');
      
      // Return empty array since advanced user management is disabled
      setUsers([]);
      
      toast({
        title: 'User Management Unavailable',
        description: 'Advanced user management is not available in the simplified client area setup.',
        variant: 'destructive',
      });

    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Don't automatically fetch users since the feature is disabled
    setIsLoading(false);
  }, []);

  return {
    users,
    isLoading,
    refetchUsers: fetchUsers,
  };
};
