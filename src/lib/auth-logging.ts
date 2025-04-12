import { supabase } from '@/integrations/supabase/client';

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
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  session_id?: string;
}

/**
 * Extract browser and OS information from user agent string
 */
const extractBrowserAndOS = (userAgent: string): { browser: string; os: string } => {
  let browser = 'Unknown';
  let os = 'Unknown';
  
  // Basic OS detection
  if (userAgent.includes('Windows')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac OS')) {
    os = 'macOS';
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  }
  
  // Basic browser detection
  if (userAgent.includes('Firefox/')) {
    browser = 'Firefox';
  } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
    browser = 'Safari';
  } else if (userAgent.includes('Edg/')) {
    browser = 'Edge';
  } else if (userAgent.includes('OPR/') || userAgent.includes('Opera/')) {
    browser = 'Opera';
  }
  
  return { browser, os };
};

/**
 * Get IP-based geolocation data
 * This is a mock implementation - in production, you would use a real geolocation API
 */
const getGeolocation = async (ip: string | null): Promise<{ country: string; city: string; geolocation: string } | null> => {
  if (!ip || ip === 'localhost' || ip.startsWith('127.0.0.') || ip.startsWith('::1')) {
    return { country: 'Unknown', city: 'Unknown', geolocation: 'Unknown' };
  }
  
  // In a real implementation, you would call a geolocation API here
  // For example: const response = await fetch(`https://ipapi.co/${ip}/json/`);
  
  // Returning mock data for now
  return {
    country: 'United Kingdom',
    city: 'London',
    geolocation: 'United Kingdom, London'
  };
};

/**
 * Get client IP address
 * In a real implementation, this would extract from request headers
 */
const getClientIP = (): string | null => {
  // In a browser environment, we can't reliably get the client IP
  // This would typically be handled by your backend
  return null;
};

/**
 * Log an authentication event to the Supabase database
 * If offline, will store in localStorage for syncing later
 */
export const logAuthEvent = async (logEntry: AuthLogEntry): Promise<{ error: any | null }> => {
  try {
    console.log('Logging auth event:', logEntry.action, 'for', logEntry.email);
    
    // Check if we're online
    if (!navigator.onLine) {
      console.warn('Currently offline, storing auth log in localStorage for later sync');
      storeLogForLaterSync(logEntry);
      return { error: null }; // Don't treat being offline as an error
    }
    
    // Get client IP if not provided
    const ip = logEntry.ip_address || getClientIP();
    
    // Extract browser and OS information
    const { browser, os } = extractBrowserAndOS(logEntry.user_agent);
    
    // Get geolocation data if IP is available
    const geoData = await getGeolocation(ip);
    
    // Add additional metadata
    const enhancedLogEntry = {
      ...logEntry,
      ip_address: ip,
      device_fingerprint: logEntry.device_fingerprint || generateDeviceFingerprint(),
      timestamp: logEntry.timestamp || new Date().toISOString(),
      browser: browser,
      os: os,
      country: geoData?.country || logEntry.country,
      city: geoData?.city || logEntry.city,
      geolocation: geoData?.geolocation || logEntry.geolocation
    };
    
    // Use the Supabase client with type assertion to bypass TypeScript errors
    // This works because the table exists in the database, even if TypeScript doesn't know about it
    const { error } = await (supabase as any)
      .from('auth_logs')
      .insert([enhancedLogEntry]);
    
    if (error) {
      console.error('Failed to log auth event:', error);
      // Store in localStorage for later sync
      storeLogForLaterSync(enhancedLogEntry);
      return { error };
    }
    
    return { error: null };
  } catch (error) {
    console.error('Error logging auth event:', error);
    // Store in localStorage for later sync
    storeLogForLaterSync(logEntry);
    return { error };
  }
};

/**
 * Store a log entry in localStorage for later syncing when back online
 */
const storeLogForLaterSync = (logEntry: AuthLogEntry): void => {
  try {
    // Get existing pending logs
    const pendingLogsString = localStorage.getItem('pendingAuthLogs');
    const pendingLogs = pendingLogsString ? JSON.parse(pendingLogsString) : [];
    
    // Add the new log
    pendingLogs.push({
      ...logEntry,
      device_fingerprint: logEntry.device_fingerprint || generateDeviceFingerprint(),
      timestamp: logEntry.timestamp || new Date().toISOString(),
    });
    
    // Store back in localStorage
    localStorage.setItem('pendingAuthLogs', JSON.stringify(pendingLogs));
    console.log('Stored auth log in localStorage for later sync');
  } catch (e) {
    console.error('Failed to store auth log in localStorage:', e);
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
export const getLoginHistory = async (email: string, limit = 10): Promise<{ data: AuthLogEntry[] | null, error: any | null }> => {
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

/**
 * Initialize online/offline event listeners to sync pending logs
 * Call this at app startup
 */
export const initAuthLoggingSync = (): void => {
  // Try to sync logs when coming back online
  window.addEventListener('online', syncPendingLogs);
  
  // Also try to sync on app initialization, just in case
  if (navigator.onLine) {
    syncPendingLogs();
  }
};

/**
 * Sync any pending logs stored in localStorage when coming back online
 */
const syncPendingLogs = async (): Promise<void> => {
  try {
    const pendingLogsString = localStorage.getItem('pendingAuthLogs');
    if (!pendingLogsString) return;
    
    const pendingLogs = JSON.parse(pendingLogsString);
    if (!pendingLogs || !pendingLogs.length) return;
    
    console.log(`Attempting to sync ${pendingLogs.length} pending auth logs`);
    
    // Try to insert all pending logs
    // Use type assertion to bypass TypeScript errors
    const { error } = await (supabase as any)
      .from('auth_logs')
      .insert(pendingLogs);
    
    if (error) {
      console.error('Failed to sync pending auth logs:', error);
      return;
    }
    
    // Clear pending logs if successful
    localStorage.removeItem('pendingAuthLogs');
    console.log('Successfully synced pending auth logs');
  } catch (e) {
    console.error('Error syncing pending auth logs:', e);
  }
};
