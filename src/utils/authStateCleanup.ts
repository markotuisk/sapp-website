
/**
 * Utility functions for cleaning up authentication state
 * Useful for debugging authentication issues and clearing stale data
 */

export const cleanupAuthState = () => {
  console.log('Cleaning up authentication state...');
  
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log(`Removing localStorage key: ${key}`);
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log(`Removing sessionStorage key: ${key}`);
      sessionStorage.removeItem(key);
    }
  });
  
  console.log('Authentication state cleanup complete');
};

export const debugAuthState = () => {
  console.log('=== AUTH STATE DEBUG ===');
  
  // Log all localStorage keys that might be auth-related
  const authKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('supabase') || key.includes('auth') || key.includes('sb-')
  );
  
  console.log('Auth-related localStorage keys:', authKeys);
  
  authKeys.forEach(key => {
    try {
      const value = localStorage.getItem(key);
      console.log(`${key}:`, value ? JSON.parse(value) : value);
    } catch (e) {
      console.log(`${key}:`, localStorage.getItem(key));
    }
  });
  
  console.log('=== END AUTH DEBUG ===');
};

// Make these available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).cleanupAuthState = cleanupAuthState;
  (window as any).debugAuthState = debugAuthState;
  console.log('Auth debug utilities available: cleanupAuthState(), debugAuthState()');
}
