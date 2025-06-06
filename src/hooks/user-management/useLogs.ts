
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define simple log types for compatibility
type UserActivityLog = {
  id: string;
  user_id: string;
  action: string;
  created_at: string;
};

type AuthLog = {
  id: string;
  user_id: string;
  event_type: string;
  timestamp: string;
};

export const useLogs = () => {
  const [activityLogs, setActivityLogs] = useState<UserActivityLog[]>([]);
  const [authLogs, setAuthLogs] = useState<AuthLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      console.log('useLogs: Logging features disabled in simplified mode');
      
      // Return empty arrays since logging tables don't exist
      setActivityLogs([]);
      setAuthLogs([]);
      
      toast({
        title: 'Logs Unavailable',
        description: 'Activity and authentication logs are not available in the simplified client area setup.',
        variant: 'destructive',
      });
    } catch (err) {
      console.error('Logs fetch failed:', err);
      setActivityLogs([]);
      setAuthLogs([]);
      toast({
        title: 'Error',
        description: 'Failed to load logs',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Don't automatically fetch logs since the feature is disabled
    setIsLoading(false);
  }, []);

  return {
    activityLogs,
    authLogs,
    isLoading,
    refetchLogs: fetchLogs,
  };
};
