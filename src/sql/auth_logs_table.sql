
-- This file serves as documentation for the auth_logs table structure
-- Execute this in your Supabase SQL Editor to create the table

CREATE TABLE auth_logs (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  action TEXT NOT NULL,
  success BOOLEAN NOT NULL DEFAULT FALSE,
  ip_address TEXT,
  user_agent TEXT,
  error_message TEXT,
  geolocation TEXT,
  device_fingerprint TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  failed_attempts_count INTEGER,
  
  -- Additional fields that might be useful:
  country TEXT,
  city TEXT,
  browser TEXT,
  os TEXT,
  session_id TEXT,
  connection_type TEXT,
  screen_resolution TEXT,
  timezone TEXT,
  language TEXT,
  is_mobile BOOLEAN,
  battery_level INTEGER,
  
  -- Create an index on email for faster lookups
  CONSTRAINT idx_auth_logs_email_timestamp INDEX (email, timestamp DESC)
);

-- Add Row Level Security policies
ALTER TABLE auth_logs ENABLE ROW LEVEL SECURITY;

-- Allow admins to see all logs
CREATE POLICY "Admins can view all logs" ON auth_logs
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email IN ('admin@example.com') -- Replace with actual admin emails
    )
  );

-- Allow users to see only their own logs
CREATE POLICY "Users can view their own logs" ON auth_logs
  FOR SELECT USING (
    auth.jwt() ->> 'email' = email
  );

-- Only the service can insert logs
CREATE POLICY "Service role can insert logs" ON auth_logs
  FOR INSERT WITH CHECK (true);

-- Set up retention policy if using TimescaleDB extension
-- COMMENT ON TABLE auth_logs IS '@retention_policy 90d';

-- Create function to get recent failed login attempts
CREATE OR REPLACE FUNCTION get_recent_failed_logins(user_email TEXT, minutes INTEGER DEFAULT 30)
RETURNS TABLE (
  count BIGINT,
  first_attempt TIMESTAMPTZ,
  last_attempt TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as count,
    MIN(timestamp) as first_attempt,
    MAX(timestamp) as last_attempt
  FROM auth_logs
  WHERE 
    email = user_email AND
    success = FALSE AND
    action IN ('sign_in_attempt', 'otp_verification') AND
    timestamp > NOW() - (minutes * INTERVAL '1 minute');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
