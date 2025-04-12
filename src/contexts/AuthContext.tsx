
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logAuthEvent, checkFailedLoginAttempts, initAuthLoggingSync } from '@/lib/auth-logging';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, WifiOff } from 'lucide-react';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isOnline: boolean;
  signIn: (email: string) => Promise<{ error: any | null }>;
  verifyOTP: (email: string, token: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      console.log('App is online');
      setIsOnline(true);
      toast({
        title: "You're back online",
        description: "Connection to the server has been restored.",
      });
    };

    const handleOffline = () => {
      console.log('App is offline');
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Some features may be unavailable until connection is restored.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    initAuthLoggingSync();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  useEffect(() => {
    console.log('Initializing Supabase authentication...');
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session check complete:', session ? 'User logged in' : 'No active session');
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error getting session:', error);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          logAuthEvent({
            email: session?.user?.email || 'unknown',
            action: 'sign_in_success',
            success: true,
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString(),
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string) => {
    try {
      if (!navigator.onLine) {
        console.error('Cannot sign in while offline');
        toast({
          title: "You're offline",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
        return { error: new Error("Cannot sign in while offline") };
      }

      console.log('Attempting to sign in with email:', email);
      
      const { shouldLock, count } = await checkFailedLoginAttempts(email);
      
      if (shouldLock) {
        console.warn(`Account lockout triggered for ${email} after ${count} failed attempts`);
        
        await logAuthEvent({
          email,
          action: 'account_locked',
          success: true,
          user_agent: navigator.userAgent,
          failed_attempts_count: count,
          timestamp: new Date().toISOString(),
        });
        
        toast({
          title: "Account temporarily locked",
          description: "Too many failed attempts. Please try again later or contact support.",
          variant: "destructive",
        });
        
        return { error: new Error("Account temporarily locked due to too many failed attempts") };
      }
      
      await logAuthEvent({
        email,
        action: 'sign_in_attempt',
        success: false,
        user_agent: navigator.userAgent,
        failed_attempts_count: count,
        timestamp: new Date().toISOString(),
      });
      
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: window.location.origin + '/client-area',
          }
        });
        
        if (error) {
          console.error('Sign in error:', error);
          
          await logAuthEvent({
            email,
            action: 'sign_in_attempt',
            success: false,
            user_agent: navigator.userAgent,
            error_message: error.message,
            timestamp: new Date().toISOString(),
          });
          
          toast({
            title: "Authentication error",
            description: error.message,
            variant: "destructive",
          });
          return { error };
        }
        
        console.log('OTP email sent successfully');
        
        await logAuthEvent({
          email,
          action: 'sign_in_attempt',
          success: true,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
        
        toast({
          title: "Verification email sent",
          description: "Please check your email for the login code.",
        });
        
        return { error: null };
      } catch (fetchError) {
        console.error('Network error during sign in:', fetchError);
        toast({
          title: "Network error",
          description: "Unable to connect to authentication service. Please check your connection and try again.",
          variant: "destructive",
        });
        return { error: fetchError };
      }
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      
      await logAuthEvent({
        email,
        action: 'sign_in_attempt',
        success: false,
        user_agent: navigator.userAgent,
        error_message: error.message,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      if (!navigator.onLine) {
        console.error('Cannot verify OTP while offline');
        toast({
          title: "You're offline",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
        return { error: new Error("Cannot verify OTP while offline") };
      }

      console.log('Attempting to verify OTP for email:', email);
      
      await logAuthEvent({
        email,
        action: 'otp_verification',
        success: false,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
      
      try {
        const { error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email',
        });

        if (error) {
          console.error('OTP verification error:', error);
          
          await logAuthEvent({
            email,
            action: 'otp_verification',
            success: false,
            user_agent: navigator.userAgent,
            error_message: error.message,
            timestamp: new Date().toISOString(),
          });
          
          toast({
            title: "Verification error",
            description: error.message,
            variant: "destructive",
          });
          return { error };
        }
        
        console.log('OTP verification successful');
        
        await logAuthEvent({
          email,
          action: 'otp_verification',
          success: true,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
        
        toast({
          title: "Success!",
          description: "You've been successfully authenticated.",
        });
        
        return { error: null };
      } catch (fetchError) {
        console.error('Network error during OTP verification:', fetchError);
        toast({
          title: "Network error",
          description: "Unable to connect to authentication service. Please check your connection and try again.",
          variant: "destructive",
        });
        return { error: fetchError };
      }
    } catch (error: any) {
      console.error('Unexpected OTP verification error:', error);
      
      await logAuthEvent({
        email,
        action: 'otp_verification',
        success: false,
        user_agent: navigator.userAgent,
        error_message: error.message,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: "Verification error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    console.log('Signing out user');
    
    const email = user?.email || 'unknown';
    
    await supabase.auth.signOut();
    
    await logAuthEvent({
      email,
      action: 'sign_out',
      success: true,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
    
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  if (!isOnline) {
    console.log('Rendering offline warning');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isOnline,
        signIn,
        verifyOTP,
        signOut,
      }}
    >
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-50 max-w-md">
          <Alert variant="destructive">
            <WifiOff className="h-4 w-4" />
            <AlertTitle>You're offline</AlertTitle>
            <AlertDescription>
              Your internet connection appears to be offline. 
              Some features may be unavailable until connection is restored.
            </AlertDescription>
          </Alert>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
