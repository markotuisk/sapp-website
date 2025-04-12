
import { createClient } from '@supabase/supabase-js';

// Provide default values for local development if environment variables are not set
// For production, these values should be set in your environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sapp-2503281622.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcHAtMjUwMzI4MTYyMiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA3MDMzMDQyLCJleHAiOjIwMjI2MDkwNDJ9.pRhgnCJPWQrCIIb4SYNuIwFDiJc81Q0JLJ_BJMzDj-I';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anonymous Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
