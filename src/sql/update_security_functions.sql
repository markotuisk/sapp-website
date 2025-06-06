
-- Update the check_failed_login_attempts function to exclude admins and increase thresholds
CREATE OR REPLACE FUNCTION public.check_failed_login_attempts(user_email text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  recent_failures INTEGER;
  last_failure TIMESTAMPTZ;
  lockout_duration INTEGER := 30; -- minutes
  max_attempts INTEGER := 15; -- Increased from 5 to 15
  result JSONB;
  is_admin BOOLEAN := false;
  user_id UUID;
BEGIN
  -- Get user ID and check if they're an admin
  SELECT p.id INTO user_id
  FROM public.profiles p
  WHERE p.email = user_email;
  
  -- Check if user is an admin (admins are exempt from lockouts)
  IF user_id IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = user_id AND ur.role = 'admin'
    ) INTO is_admin;
  END IF;
  
  -- If user is admin, always return unlocked status
  IF is_admin THEN
    result := jsonb_build_object(
      'is_locked', false,
      'failed_attempts', 0,
      'message', 'Admin users are exempt from account lockouts',
      'is_admin', true
    );
    RETURN result;
  END IF;
  
  -- Count failed attempts in last 30 minutes for non-admin users
  SELECT COUNT(*), MAX(timestamp)
  INTO recent_failures, last_failure
  FROM public.auth_logs
  WHERE email = user_email 
    AND success = false 
    AND action IN ('sign_in_attempt', 'otp_verification')
    AND timestamp > NOW() - INTERVAL '30 minutes';
    
  -- Check if account should be locked (only for non-admin users)
  IF recent_failures >= max_attempts THEN
    result := jsonb_build_object(
      'is_locked', true,
      'failed_attempts', recent_failures,
      'lockout_until', last_failure + (lockout_duration * INTERVAL '1 minute'),
      'remaining_minutes', EXTRACT(EPOCH FROM (last_failure + (lockout_duration * INTERVAL '1 minute') - NOW())) / 60,
      'message', format('Account temporarily locked due to %s failed attempts. Try again in %s minutes.', 
                       recent_failures, 
                       CEIL(EXTRACT(EPOCH FROM (last_failure + (lockout_duration * INTERVAL '1 minute') - NOW())) / 60))
    );
  ELSE
    result := jsonb_build_object(
      'is_locked', false,
      'failed_attempts', recent_failures,
      'remaining_attempts', max_attempts - recent_failures,
      'message', format('Account is not locked. %s attempts remaining.', max_attempts - recent_failures)
    );
  END IF;
  
  RETURN result;
END;
$function$;

-- Create a function to manually unlock user accounts (admin only)
CREATE OR REPLACE FUNCTION public.unlock_user_account(target_email text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  result JSONB;
  calling_user_id UUID := auth.uid();
  is_admin BOOLEAN := false;
  deleted_count INTEGER;
BEGIN
  -- Check if calling user is admin
  SELECT public.current_user_is_admin() INTO is_admin;
  
  IF NOT is_admin THEN
    result := jsonb_build_object(
      'success', false,
      'message', 'Access denied: Only administrators can unlock accounts'
    );
    RETURN result;
  END IF;
  
  -- Delete failed login attempts for the target user
  DELETE FROM public.auth_logs
  WHERE email = target_email 
    AND success = false 
    AND action IN ('sign_in_attempt', 'otp_verification')
    AND timestamp > NOW() - INTERVAL '30 minutes';
    
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Log the unlock action
  INSERT INTO public.auth_logs (
    email, action, success, error_message
  ) VALUES (
    target_email, 'account_unlocked', true, 
    format('Account unlocked by admin user %s', calling_user_id::text)
  );
  
  result := jsonb_build_object(
    'success', true,
    'message', format('Account %s has been unlocked. Cleared %s failed attempts.', target_email, deleted_count),
    'cleared_attempts', deleted_count
  );
  
  RETURN result;
END;
$function$;

-- Create a function to get lockout status for any user (admin only)
CREATE OR REPLACE FUNCTION public.get_user_lockout_status(target_email text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  calling_user_id UUID := auth.uid();
  is_admin BOOLEAN := false;
BEGIN
  -- Check if calling user is admin
  SELECT public.current_user_is_admin() INTO is_admin;
  
  IF NOT is_admin THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Access denied: Only administrators can check lockout status'
    );
  END IF;
  
  -- Return the lockout status for the target user
  RETURN public.check_failed_login_attempts(target_email);
END;
$function$;
