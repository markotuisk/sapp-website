
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { logAuthEvent, checkFailedLoginAttempts, AuthLogEntry } from '@/lib/auth-logging';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string) => Promise<{ error: any | null }>;
  verifyOTP: (email: string, token: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Initializing Supabase authentication...');
    
    // Check for active session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session check complete:', session ? 'User logged in' : 'No active session');
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error getting session:', error);
      setIsLoading(false);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Log successful authentication events
        if (event === 'SIGNED_IN') {
          logAuthEvent({
            email: session?.user?.email || 'unknown',
            action: 'sign_in_success',
            success: true,
            ip_address: null, // Will be captured on server side
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
      console.log('Attempting to sign in with email:', email);
      
      // Check for too many failed login attempts
      const { shouldLock, count } = await checkFailedLoginAttempts(email);
      
      if (shouldLock) {
        console.warn(`Account lockout triggered for ${email} after ${count} failed attempts`);
        
        // Log the lockout event
        await logAuthEvent({
          email,
          action: 'account_locked',
          success: true,
          ip_address: null,
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
      
      // Log the sign-in attempt
      await logAuthEvent({
        email,
        action: 'sign_in_attempt',
        success: false, // Will update to true if successful
        ip_address: null,
        user_agent: navigator.userAgent,
        failed_attempts_count: count,
        timestamp: new Date().toISOString(),
      });
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin + '/client-area',
        }
      });
      
      if (error) {
        console.error('Sign in error:', error);
        
        // Log failed sign-in
        await logAuthEvent({
          email,
          action: 'sign_in_attempt',
          success: false,
          ip_address: null,
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
      
      // Log successful OTP email sending
      await logAuthEvent({
        email,
        action: 'sign_in_attempt',
        success: true,
        ip_address: null,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: "Verification email sent",
        description: "Please check your email for the login code.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      
      // Log unexpected error
      await logAuthEvent({
        email,
        action: 'sign_in_attempt',
        success: false,
        ip_address: null,
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
      console.log('Attempting to verify OTP for email:', email);
      
      // Log the OTP verification attempt
      await logAuthEvent({
        email,
        action: 'otp_verification',
        success: false, // Will update to true if successful
        ip_address: null,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
      
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (error) {
        console.error('OTP verification error:', error);
        
        // Log failed OTP verification
        await logAuthEvent({
          email,
          action: 'otp_verification',
          success: false,
          ip_address: null,
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
      
      // Log successful OTP verification
      await logAuthEvent({
        email,
        action: 'otp_verification',
        success: true,
        ip_address: null,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: "Success!",
        description: "You've been successfully authenticated.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected OTP verification error:', error);
      
      // Log unexpected OTP verification error
      await logAuthEvent({
        email,
        action: 'otp_verification',
        success: false,
        ip_address: null,
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
    
    // Get email before signing out
    const email = user?.email || 'unknown';
    
    await supabase.auth.signOut();
    
    // Log sign out event
    await logAuthEvent({
      email,
      action: 'sign_out',
      success: true,
      ip_address: null,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
    
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        verifyOTP,
        signOut,
      }}
    >
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
