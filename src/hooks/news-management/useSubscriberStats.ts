
import { supabase } from '@/integrations/supabase/client';

export const useSubscriberStats = () => {
  const getSubscriberStats = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_subscriber_stats');

      if (error) {
        console.error('Error fetching subscriber stats:', error);
        throw error;
      }
      
      return data?.[0] || { total_subscribers: 0, active_subscribers: 0, unsubscribed: 0, recent_signups: 0 };
    } catch (error) {
      console.error('Error fetching subscriber stats:', error);
      return { total_subscribers: 0, active_subscribers: 0, unsubscribed: 0, recent_signups: 0 };
    }
  };

  return {
    getSubscriberStats,
  };
};
