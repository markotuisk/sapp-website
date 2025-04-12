
import { supabase } from './supabase';

// Interface for auth log entries
export interface AuthLogEntry {
  id?: number;
  email: string;
  action: 'sign_in_attempt' | 'otp_verification' | 'sign_in_success' | 'sign_out' | 'account_locked' | 'password_reset';
  success: boolean;
  ip_address: string | null;
  user_agent: string;
  error_message?: string;
  geolocation?: string;
  device_fingerprint?: string;
  timestamp: string;
  failed_attempts_count?: number;
}

/**
 * Log an authentication event to the Supabase database
 */
export const logAuthEvent = async (logEntry: AuthLogEntry): Promise<{ error: any | null }> => {
  try {
    console.log('Logging auth event:', logEntry.action, 'for', logEntry.email);
    
    // Add additional metadata
    const enhancedLogEntry = {
      ...logEntry,
      device_fingerprint: generateDeviceFingerprint(),
      timestamp: logEntry.timestamp || new Date().toISOString(),
    };
    
    const { error } = await supabase
      .from('auth_logs')
      .insert([enhancedLogEntry]);
    
    if (error) {
      console.error('Failed to log auth event:', error);
      return { error };
    }
    
    return { error: null };
  } catch (error) {
    console.error('Error logging auth event:', error);
    return { error };
  }
};

/**
 * Generate a simple device fingerprint based on available browser data
 * In production, consider using a more sophisticated fingerprinting library
 */
const generateDeviceFingerprint = (): string => {
  const screenData = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const platform = navigator.platform;
  
  // Create a simple hash of the combined data
  let fingerprint = `${screenData}|${timeZone}|${language}|${platform}|${navigator.userAgent}`;
  
  // This is a simple hash function, not cryptographically secure
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return hash.toString(16);
};

/**
 * Check if a user account should be locked based on failed login attempts
 * This is a simple implementation - adjust thresholds as needed
 */
export const checkFailedLoginAttempts = async (email: string): Promise<{ shouldLock: boolean, count: number }> => {
  try {
    // Get timestamp for 30 minutes ago
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    
    // Count failed login attempts in the last 30 minutes
    const { data, error } = await supabase
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
export const getLoginHistory = async (email: string, limit = 10): Promise<{ data: AuthLogEntry[] | null, error: any | null }> => {
  try {
    const { data, error } = await supabase
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
