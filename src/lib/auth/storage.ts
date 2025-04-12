
import { AuthLogEntry } from './types';

/**
 * Store a log entry in localStorage for later syncing when back online
 */
export const storeLogForLaterSync = (logEntry: AuthLogEntry): void => {
  try {
    // Get existing pending logs
    const pendingLogsString = localStorage.getItem('pendingAuthLogs');
    const pendingLogs = pendingLogsString ? JSON.parse(pendingLogsString) : [];
    
    // Add the new log
    pendingLogs.push(logEntry);
    
    // Store back in localStorage
    localStorage.setItem('pendingAuthLogs', JSON.stringify(pendingLogs));
    console.log('Stored auth log in localStorage for later sync');
  } catch (e) {
    console.error('Failed to store auth log in localStorage:', e);
  }
};

/**
 * Get pending logs from localStorage
 */
export const getPendingLogs = (): AuthLogEntry[] => {
  try {
    const pendingLogsString = localStorage.getItem('pendingAuthLogs');
    if (!pendingLogsString) return [];
    
    return JSON.parse(pendingLogsString);
  } catch (e) {
    console.error('Failed to get pending logs from localStorage:', e);
    return [];
  }
};

/**
 * Clear pending logs from localStorage
 */
export const clearPendingLogs = (): void => {
  localStorage.removeItem('pendingAuthLogs');
  console.log('Successfully cleared pending auth logs');
};
