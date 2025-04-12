
import { supabase } from '@/integrations/supabase/client';
import { getPendingLogs, clearPendingLogs } from './storage';

/**
 * Sync any pending logs stored in localStorage when coming back online
 */
export const syncPendingLogs = async (): Promise<void> => {
  try {
    const pendingLogs = getPendingLogs();
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
    clearPendingLogs();
    console.log('Successfully synced pending auth logs');
  } catch (e) {
    console.error('Error syncing pending auth logs:', e);
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
