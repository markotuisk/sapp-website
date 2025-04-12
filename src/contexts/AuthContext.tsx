
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

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
    // Debug: Log that we're initializing Supabase auth
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
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string) => {
    try {
      console.log('Attempting to sign in with email:', email);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin + '/client-area',
        }
      });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      console.log('OTP email sent successfully');
      toast({
        title: "Verification email sent",
        description: "Please check your email for the login code.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
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
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (error) {
        console.error('OTP verification error:', error);
        toast({
          title: "Verification error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      console.log('OTP verification successful');
      toast({
        title: "Success!",
        description: "You've been successfully authenticated.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected OTP verification error:', error);
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
    await supabase.auth.signOut();
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
