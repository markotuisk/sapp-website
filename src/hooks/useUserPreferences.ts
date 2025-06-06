
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { UserPreferences } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPreferences(null);
      setIsLoading(false);
      return;
    }

    const fetchPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching preferences:', error);
          return;
        }

        if (data) {
          setPreferences(data);
        } else {
          // Create default preferences if none exist
          const { data: newPrefs, error: createError } = await supabase
            .from('user_preferences')
            .insert({
              user_id: user.id,
              email_notifications: true,
              document_notifications: true,
              theme: 'light',
              language: 'en',
              timezone: 'UTC'
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating preferences:', createError);
          } else {
            setPreferences(newPrefs);
          }
        }
      } catch (error) {
        console.error('Error in fetchPreferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return false;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update preferences',
          variant: 'destructive',
        });
        return false;
      }

      setPreferences(data);
      toast({
        title: 'Success',
        description: 'Preferences updated successfully',
      });
      return true;
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to update preferences',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    preferences,
    isLoading,
    updatePreferences,
  };
};
