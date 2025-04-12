
// Re-export all auth-related functions and types from the new modular structure
import { AuthLogEntry } from './auth/types';
import { logAuthEvent } from './auth/logging';
import { checkFailedLoginAttempts, getLoginHistory } from './auth/account-security';
import { initAuthLoggingSync } from './auth/sync';

export type { AuthLogEntry };
export { 
  logAuthEvent,
  checkFailedLoginAttempts,
  getLoginHistory,
  initAuthLoggingSync
};
