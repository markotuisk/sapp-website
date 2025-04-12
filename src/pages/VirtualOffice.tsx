
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, X, Mail, Lock, WifiOff, Info } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ClientArea = () => {
  const navigate = useNavigate();
  const { user, signIn, verifyOTP, signOut, isOnline } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otpValue, setOtpValue] = useState('');

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
      setShowOTPDialog(true);
    }
    
    setIsSubmitting(false);
  };

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
    
    const { error } = await verifyOTP(loginEmail, otpValue);
    
    if (!error) {
      setShowOTPDialog(false);
      // Navigate to dashboard or refresh the page
      toast.success("Welcome to the Client Area!");
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleSignOut = async () => {
    await signOut();
    setLoginEmail('');
    setAgreedToTerms(false);
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
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-sapp-dark to-sapp-blue p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Client Area</h1>
                  {user ? (
                    <p className="text-blue-100 text-lg">Welcome back, {user.email}</p>
                  ) : (
                    <p className="text-blue-100 text-lg">Secure Access Portal</p>
                  )}
                </div>
                <img 
                  src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png" 
                  alt="SAPP Security Logo" 
                  className="h-32 w-32 mt-4 md:mt-0 transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              {user ? (
                // Logged in state
                <div className="flex flex-col items-center gap-8 mb-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-display font-bold text-sapp-dark mb-4">
                      Welcome to Your Secure Client Portal
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-sapp-gray mb-6">
                      <Mail className="h-5 w-5 text-sapp-blue" />
                      <span>{user.email}</span>
                    </div>
                    <p className="text-sapp-gray mb-8">
                      You have successfully authenticated to your secure client portal. Here you can access confidential information and communicate with our team.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                        <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Your Services</h3>
                        <p className="text-sm text-slate-600">View your active services and subscriptions</p>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                        <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Documents</h3>
                        <p className="text-sm text-slate-600">Access your reports and confidential documents</p>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                        <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Schedule Meeting</h3>
                        <p className="text-sm text-slate-600">Book an appointment with our team</p>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                        <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Support</h3>
                        <p className="text-sm text-slate-600">Contact our support team for assistance</p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                // Not logged in state
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
                  </div>
                </div>
              )}
              
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
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter verification code</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit code to {loginEmail}. 
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
      
      <Footer />
    </div>
  );
};

export default ClientArea;
