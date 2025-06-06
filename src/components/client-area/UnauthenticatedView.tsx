
import React from 'react';
import { AlertCircle, WifiOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from './LoginForm';

interface UnauthenticatedViewProps {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  onOTPRequired: (email: string) => void;
}

export const UnauthenticatedView: React.FC<UnauthenticatedViewProps> = ({
  isSubmitting,
  setIsSubmitting,
  onOTPRequired,
}) => {
  const { isOnline } = useAuth();

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
      <div className="md:w-1/2">
        <h2 className="text-2xl font-display font-bold text-sapp-dark mb-4">
          Secure Client Portal
        </h2>
        <p className="text-sapp-gray mb-4">
          Welcome to our secure client portal where you can access confidential information,
          schedule meetings, and communicate with our team in a secure environment.
        </p>
        <div className="flex items-start gap-3 mb-4 bg-blue-50 p-4 rounded-md">
          <AlertCircle className="h-6 w-6 text-sapp-blue flex-shrink-0 mt-0.5" />
          <p className="text-sm text-sapp-dark">
            For enhanced security, we use two-factor authentication. Enter your email to receive a 6-digit code.
          </p>
        </div>
        
        {!isOnline && (
          <div className="flex items-start gap-3 mb-4 bg-red-50 p-4 rounded-md">
            <WifiOff className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">
              You appear to be offline. Authentication requires an internet connection. Please check your network and try again.
            </p>
          </div>
        )}
      </div>
      
      <div className="md:w-1/2 w-full">
        <LoginForm
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          onOTPRequired={onOTPRequired}
        />
      </div>
    </div>
  );
};
