
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAccountUnlock = () => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { toast } = useToast();

  const unlockUserAccount = async (email: string) => {
    try {
      setIsUnlocking(true);
      
      const { data, error } = await supabase
        .rpc('unlock_user_account', { target_email: email });
      
      if (error) throw error;
      
      if (data?.success) {
        toast({
          title: 'Account Unlocked',
          description: data.message,
        });
        return data;
      } else {
        toast({
          title: 'Unlock Failed',
          description: data?.message || 'Failed to unlock account',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      console.error('Error unlocking account:', error);
      toast({
        title: 'Error',
        description: 'Failed to unlock account',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUnlocking(false);
    }
  };

  const getUserLockoutStatus = async (email: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_lockout_status', { target_email: email });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting lockout status:', error);
      return null;
    }
  };

  return {
    unlockUserAccount,
    getUserLockoutStatus,
    isUnlocking
  };
};
