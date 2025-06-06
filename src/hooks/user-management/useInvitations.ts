
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { AppRole } from '@/types/roles';

// Define a simple invitation type for compatibility
type UserInvitation = {
  id: string;
  email: string;
  organization_id: string;
  roles: AppRole[];
  created_at: string;
};

export const useInvitations = () => {
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchInvitations = async () => {
    try {
      setIsLoading(true);
      console.log('useInvitations: Invitations feature disabled in simplified mode');
      
      // Return empty array since user_invitations table doesn't exist
      setInvitations([]);
      
      toast({
        title: 'Invitations Unavailable',
        description: 'User invitations are not available in the simplified client area setup.',
        variant: 'destructive',
      });
    } catch (err) {
      console.error('Invitations fetch failed:', err);
      setInvitations([]);
      toast({
        title: 'Error',
        description: 'Failed to load invitations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createInvitation = async (email: string, organizationId: string, roles: AppRole[]) => {
    try {
      console.log('useInvitations: Invitation creation disabled in simplified mode');
      
      toast({
        title: 'Invitation Creation Unavailable',
        description: 'User invitation creation is not available in the simplified client area setup.',
        variant: 'destructive',
      });
      
      throw new Error('Invitation creation not available in simplified mode');
    } catch (error) {
      console.error('useInvitations: Error creating invitation:', error);
      toast({
        title: 'Error',
        description: 'Failed to send invitation',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    // Don't automatically fetch invitations since the feature is disabled
    setIsLoading(false);
  }, []);

  return {
    invitations,
    isLoading,
    createInvitation,
    refetchInvitations: fetchInvitations,
  };
};
