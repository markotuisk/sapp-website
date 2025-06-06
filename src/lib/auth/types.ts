
/**
 * Interface for auth log entries
 */
export interface AuthLogEntry {
  id?: number;
  email: string;
  action: 'sign_in_attempt' | 'otp_verification' | 'sign_in_success' | 'sign_out' | 'account_locked' | 'password_reset';
  success: boolean;
  ip_address?: string | null;
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
  connection_type?: string;
  screen_resolution?: string;
  timezone?: string;
  language?: string;
  is_mobile?: boolean;
  battery_level?: number;
}
