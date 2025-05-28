
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface OTPDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

export const OTPDialog: React.FC<OTPDialogProps> = ({
  isOpen,
  onClose,
  email,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { verifyOTP, isOnline } = useAuth();
  const [otpValue, setOtpValue] = useState('');

  const handleVerifyOTP = async () => {
    if (!isOnline) {
      toast.error("You're offline. Please check your internet connection and try again.");
      return;
    }
    
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await verifyOTP(email, otpValue);
    
    if (!error) {
      onClose();
      toast.success("Welcome to the Client Area!");
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter verification code</DialogTitle>
          <DialogDescription>
            We've sent a 6-digit code to {email}. 
            Enter the code below to verify your identity.
          </DialogDescription>
        </DialogHeader>
        
        {!isOnline && (
          <Alert variant="destructive" className="my-2">
            <WifiOff className="h-4 w-4" />
            <AlertTitle>You're offline</AlertTitle>
            <AlertDescription>
              Code verification requires an internet connection. Please check your connection and try again.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mx-auto">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
                disabled={!isOnline || isSubmitting}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} index={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
          </div>
          <Button
            onClick={handleVerifyOTP}
            className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white"
            disabled={!isOnline || isSubmitting || otpValue.length !== 6}
          >
            {isSubmitting ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
