
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UnlockResult {
  success: boolean;
  message: string;
  cleared_attempts?: number;
}

export const useAccountUnlock = () => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { toast } = useToast();

  const unlockUserAccount = async (email: string): Promise<UnlockResult | null> => {
    try {
      setIsUnlocking(true);
      
      const { data, error } = await supabase
        .rpc('unlock_user_account', { target_email: email });
      
      if (error) {
        console.error('Error unlocking account:', error);
        toast({
          title: 'Error',
          description: `Failed to unlock account: ${error.message}`,
          variant: 'destructive',
        });
        return null;
      }
      
      const result = typeof data === 'string' ? JSON.parse(data) : data;
      
      if (result.success) {
        toast({
          title: 'Account Unlocked',
          description: result.message,
        });
      } else {
        toast({
          title: 'Failed to Unlock',
          description: result.message,
          variant: 'destructive',
        });
      }
      
      return result;
    } catch (error) {
      console.error('Account unlock failed:', error);
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
      
      if (error) {
        console.error('Error checking lockout status:', error);
        return null;
      }
      
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
      console.error('Failed to check lockout status:', error);
      return null;
    }
  };

  return {
    unlockUserAccount,
    getUserLockoutStatus,
    isUnlocking,
  };
};
