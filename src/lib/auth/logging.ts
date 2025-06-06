
import { supabase } from '@/integrations/supabase/client';
import { AuthLogEntry } from './types';
import { extractBrowserAndOS, getConnectionInfo, getBatteryLevel, generateSessionId } from './device-info';
import { generateDeviceFingerprint } from './fingerprinting';
import { getGeolocation } from './geolocation';
import { storeLogForLaterSync } from './storage';

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
    
    // Extract browser and OS information
    const { browser, os } = extractBrowserAndOS(logEntry.user_agent);
    
    // Get geolocation data if IP is available
    const geoData = await getGeolocation(null);
    
    // Get connection information
    const connectionInfo = getConnectionInfo();
    
    // Get battery level
    const batteryLevel = await getBatteryLevel();
    
    // Get screen resolution
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    
    // Get timezone and language
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    // Detect if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Add additional metadata
    const enhancedLogEntry = {
      ...logEntry,
      device_fingerprint: logEntry.device_fingerprint || generateDeviceFingerprint(),
      timestamp: logEntry.timestamp || new Date().toISOString(),
      browser: browser,
      os: os,
      country: geoData?.country || logEntry.country,
      city: geoData?.city || logEntry.city,
      geolocation: geoData?.geolocation || logEntry.geolocation,
      connection_type: connectionInfo.type !== 'unknown' ? connectionInfo.type : undefined,
      screen_resolution: screenResolution,
      timezone: timezone,
      language: language,
      is_mobile: isMobile,
      battery_level: batteryLevel,
      session_id: logEntry.session_id || generateSessionId()
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
