
import { useState, useEffect } from 'react';
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

    // Create default preferences since user_preferences table doesn't exist
    const defaultPrefs: UserPreferences = {
      id: user.id,
      user_id: user.id,
      email_notifications: true,
      document_notifications: true,
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Try to load from localStorage as fallback
    const stored = localStorage.getItem(`user_preferences_${user.id}`);
    if (stored) {
      try {
        const parsedPrefs = JSON.parse(stored);
        setPreferences({ ...defaultPrefs, ...parsedPrefs });
      } catch (error) {
        console.error('Error parsing stored preferences:', error);
        setPreferences(defaultPrefs);
      }
    } else {
      setPreferences(defaultPrefs);
    }

    setIsLoading(false);
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return false;

    try {
      const updatedPrefs = { ...preferences, ...updates, updated_at: new Date().toISOString() };
      
      // Save to localStorage since database table doesn't exist
      localStorage.setItem(`user_preferences_${user.id}`, JSON.stringify(updatedPrefs));
      
      setPreferences(updatedPrefs);
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
