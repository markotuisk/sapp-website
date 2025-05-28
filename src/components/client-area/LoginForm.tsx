
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LoginFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  onOTPRequired: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isSubmitting,
  setIsSubmitting,
  onOTPRequired,
}) => {
  const { signIn, isOnline } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOnline) {
      toast.error("You're offline. Please check your internet connection and try again.");
      return;
    }
    
    if (!agreedToTerms) {
      toast.error("Please agree to the terms before submitting.");
      return;
    }
    
    if (!loginEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    
    setIsSubmitting(true);
    
    const { error } = await signIn(loginEmail);
    
    if (!error) {
      onOTPRequired(loginEmail);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
      <h3 className="text-xl font-medium text-sapp-dark mb-4">Sign In</h3>
      
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email"
            type="email"
            placeholder="your@email.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            className="focus-visible:ring-sapp-blue"
            disabled={!isOnline || isSubmitting}
          />
        </div>
        
        <div className="flex items-start space-x-2 mt-4">
          <Checkbox 
            id="terms" 
            checked={agreedToTerms}
            onCheckedChange={(checked) => {
              setAgreedToTerms(checked as boolean);
            }}
            disabled={!isOnline || isSubmitting}
          />
          <Label 
            htmlFor="terms" 
            className="text-sm leading-tight font-normal text-slate-600"
          >
            I consent to the processing of my personal information in accordance with the 
            Terms of Service and Privacy Policy.
          </Label>
        </div>
        
        <Button 
          type="submit" 
          disabled={!isOnline || isSubmitting}
          className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white mt-2 group relative overflow-hidden"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {isSubmitting ? 'Processing...' : 'Sign In with Email'}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </Button>
      </form>
    </div>
  );
};
