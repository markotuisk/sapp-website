
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, WifiOff } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useOTPHandling } from '@/hooks/useOTPHandling';
import { ClientAreaHeader } from '@/components/client-area/ClientAreaHeader';
import { ClientDashboard } from '@/components/client-area/ClientDashboard';
import { UnauthenticatedView } from '@/components/client-area/UnauthenticatedView';
import { OTPDialog } from '@/components/client-area/OTPDialog';
import { AuthGuard } from '@/components/auth/AuthGuard';

const VirtualOffice = () => {
  const navigate = useNavigate();
  const { isOnline, isAuthenticated } = useAuth();
  const { isSubmitting, setIsSubmitting } = useOTPHandling();
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');

  const handleClose = () => {
    navigate('/');
  };

  const handleOTPRequired = (email: string) => {
    setOtpEmail(email);
    setShowOTPDialog(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          {!isOnline && (
            <Alert variant="destructive" className="mb-6">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>No Internet Connection</AlertTitle>
              <AlertDescription>
                You appear to be offline. Authentication services require an internet connection.
                Please check your connection and try again.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative">
            <ClientAreaHeader />
            
            <div className="p-8">
              <AuthGuard 
                requireAuth={false}
                fallback={
                  <UnauthenticatedView
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    onOTPRequired={handleOTPRequired}
                  />
                }
              >
                {isAuthenticated ? (
                  <ClientDashboard />
                ) : (
                  <UnauthenticatedView
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    onOTPRequired={handleOTPRequired}
                  />
                )}
              </AuthGuard>
              
              {/* Only show Close button for unauthenticated users */}
              {!isAuthenticated && (
                <div className="flex items-center justify-between mt-8 p-4 border-t border-gray-100">
                  <Button 
                    onClick={handleClose}
                    variant="outline"
                    className="ml-auto flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    size="sm"
                  >
                    Close
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <OTPDialog
        isOpen={showOTPDialog}
        onClose={() => setShowOTPDialog(false)}
        email={otpEmail}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
      
      <Footer />
    </div>
  );
};

export default VirtualOffice;
