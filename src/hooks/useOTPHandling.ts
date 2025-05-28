
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useOTPHandling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOtpFromURL = async () => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      const email = url.searchParams.get('email');
      
      if (token && email) {
        console.log('Found OTP token in URL, attempting verification');
        
        setIsSubmitting(true);
        
        const { error } = await verifyOTP(email, token);
        
        if (error) {
          console.error('Error verifying OTP from URL:', error);
          toast.error("Could not verify your login. Please try signing in again.");
        } else {
          toast.success("Successfully signed in!");
          navigate(location.pathname, { replace: true });
        }
        
        setIsSubmitting(false);
      }
    };
    
    handleOtpFromURL();
  }, [location, navigate, verifyOTP]);

  return { isSubmitting, setIsSubmitting };
};
