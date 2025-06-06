
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (email: string, name?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('subscribe_to_newsletter', {
        subscriber_email: email,
        subscriber_name: name
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async (token: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('unsubscribe_newsletter', {
        unsubscribe_token_param: token
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    unsubscribe,
    isLoading
  };
};
