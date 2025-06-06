
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SecurityStatus {
  isAccountLocked: boolean;
  failedAttempts: number;
  remainingAttempts?: number;
  lockoutUntil?: string;
  remainingMinutes?: number;
  message: string;
  isAdmin?: boolean;
}

interface SecurityCheckResponse {
  is_locked: boolean;
  failed_attempts: number;
  remaining_attempts?: number;
  lockout_until?: string;
  remaining_minutes?: number;
  message: string;
  is_admin?: boolean;
}

export const useSecurityMonitoring = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAccountSecurity = async (email: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .rpc('check_failed_login_attempts', { user_email: email });
      
      if (error) {
        console.error('Error checking account security:', error);
        return null;
      }
      
      // Parse the JSON response properly with safe type conversion
      const parsedData = typeof data === 'string' 
        ? JSON.parse(data) 
        : (data as unknown) as SecurityCheckResponse;
      
      const status: SecurityStatus = {
        isAccountLocked: parsedData.is_locked,
        failedAttempts: parsedData.failed_attempts,
        remainingAttempts: parsedData.remaining_attempts,
        lockoutUntil: parsedData.lockout_until,
        remainingMinutes: parsedData.remaining_minutes,
        message: parsedData.message,
        isAdmin: parsedData.is_admin
      };
      
      setSecurityStatus(status);
      
      // Show different messages based on admin status
      if (status.isAccountLocked && !status.isAdmin) {
        toast({
          title: 'Account Temporarily Locked',
          description: `${status.message} Contact an administrator if you need immediate access.`,
          variant: 'destructive',
        });
      } else if (status.isAdmin) {
        console.log('Admin user - lockout protection active');
      }
      
      return status;
    } catch (error) {
      console.error('Security check failed:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logSecurityEvent = async (
    email: string,
    action: string,
    success: boolean,
    errorMessage?: string
  ) => {
    try {
      const userAgent = navigator.userAgent;
      const additionalContext = {
        location: 'client-area',
        timestamp: new Date().toISOString()
      };

      await supabase.rpc('log_security_event', {
        event_email: email,
        event_action: action,
        event_success: success,
        event_user_agent: userAgent,
        event_error: errorMessage || null,
        additional_context: additionalContext
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      checkAccountSecurity(user.email);
    }
  }, [user]);

  return {
    securityStatus,
    isLoading,
    checkAccountSecurity,
    logSecurityEvent
  };
};
