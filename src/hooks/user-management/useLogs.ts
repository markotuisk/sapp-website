
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type UserActivityLog = Tables<'user_activity_logs'>;
type AuthLog = Tables<'auth_logs'>;

export const useLogs = () => {
  const [activityLogs, setActivityLogs] = useState<UserActivityLog[]>([]);
  const [authLogs, setAuthLogs] = useState<AuthLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      
      // Fetch activity logs
      const { data: activityData, error: activityError } = await supabase
        .from('user_activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (activityError) {
        console.error('Error fetching activity logs:', activityError);
      } else {
        console.log('useLogs: Fetched activity logs:', activityData?.length || 0);
        setActivityLogs(activityData || []);
      }

      // Fetch auth logs
      const { data: authData, error: authError } = await supabase
        .from('auth_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (authError) {
        console.error('Error fetching auth logs:', authError);
      } else {
        console.log('useLogs: Fetched auth logs:', authData?.length || 0);
        setAuthLogs(authData || []);
      }

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
    fetchLogs();
  }, []);

  return {
    activityLogs,
    authLogs,
    isLoading,
    refetchLogs: fetchLogs,
  };
};
