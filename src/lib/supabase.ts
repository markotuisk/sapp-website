
import { createClient } from '@supabase/supabase-js';

// In production, these values should be set in your environment
// For local development, we'll use fallbacks if not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sapp-2503281622.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcHAtMjUwMzI4MTYyMiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA3MDMzMDQyLCJleHAiOjIwMjI2MDkwNDJ9.pRhgnCJPWQrCIIb4SYNuIwFDiJc81Q0JLJ_BJMzDj-I';

// Validate that we have necessary credentials
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anonymous Key is missing. Please check your environment variables.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
