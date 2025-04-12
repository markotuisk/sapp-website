
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if a user account should be locked based on failed login attempts
 * This is a simple implementation - adjust thresholds as needed
 */
export const checkFailedLoginAttempts = async (email: string): Promise<{ shouldLock: boolean, count: number }> => {
  try {
    // Check if we're online
    if (!navigator.onLine) {
      console.warn('Currently offline, skipping failed login attempt check');
      return { shouldLock: false, count: 0 };
    }
    
    // Get timestamp for 30 minutes ago
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    
    // Count failed login attempts in the last 30 minutes
    // Use type assertion to bypass TypeScript errors
    const { data, error } = await (supabase as any)
      .from('auth_logs')
      .select('*')
      .eq('email', email)
      .eq('success', false)
      .gte('timestamp', thirtyMinutesAgo);
    
    if (error) {
      console.error('Error checking failed login attempts:', error);
      return { shouldLock: false, count: 0 };
    }
    
    const count = data?.length || 0;
    
    // Lock account after 5 failed attempts in 30 minutes
    // This threshold can be adjusted based on security requirements
    return { shouldLock: count >= 5, count };
  } catch (error) {
    console.error('Error in checkFailedLoginAttempts:', error);
    return { shouldLock: false, count: 0 };
  }
};

/**
 * Get login history for an email address
 */
export const getLoginHistory = async (email: string, limit = 10): Promise<{ data: any[] | null, error: any | null }> => {
  try {
    // Check if we're online
    if (!navigator.onLine) {
      console.warn('Currently offline, cannot fetch login history');
      return { data: null, error: new Error('Cannot fetch login history while offline') };
    }
    
    // Use type assertion to bypass TypeScript errors
    const { data, error } = await (supabase as any)
      .from('auth_logs')
      .select('*')
      .eq('email', email)
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching login history:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error in getLoginHistory:', error);
    return { data: null, error };
  }
};
