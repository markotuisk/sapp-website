import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ClientArea = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast.error("Please agree to the terms before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Thank you, ${name}! We'll notify you when our Client Area is ready.`, {
        duration: 5000,
      });
      setIsSubmitting(false);
      
      // Reset form
      setEmail('');
      setName('');
      setAgreedToTerms(false);
      
      // Redirect after a short delay
      setTimeout(() => navigate('/'), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-sapp-dark to-sapp-blue p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Client Area</h1>
                  <p className="text-blue-100 text-lg">Coming Soon</p>
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
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-display font-bold text-sapp-dark mb-4">
                    Our Client Area is Under Construction
                  </h2>
                  <p className="text-sapp-gray mb-4">
                    We're building a secure online environment where you can connect with our team, 
                    schedule meetings, and access our services remotely.
                  </p>
                  <div className="flex items-start gap-3 mb-4 bg-blue-50 p-4 rounded-md">
                    <AlertCircle className="h-6 w-6 text-sapp-blue flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-sapp-dark">
                      Be the first to know when we launch! Sign up for an exclusive invitation to our Client 
                      Area Opening Ceremony.
                    </p>
                  </div>
                </div>
                
                <div className="md:w-1/2 w-full">
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h3 className="text-xl font-medium text-sapp-dark mb-4">Get Notified</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="focus-visible:ring-sapp-blue"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="focus-visible:ring-sapp-blue"
                        />
                      </div>
                      
                      <div className="flex items-start space-x-2 mt-4">
                        <Checkbox 
                          id="terms" 
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => {
                            setAgreedToTerms(checked as boolean);
                          }}
                        />
                        <Label 
                          htmlFor="terms" 
                          className="text-sm leading-tight font-normal text-slate-600"
                        >
                          I agree to receive notifications. My information will not be shared with 
                          third parties or used for advertising purposes, but solely to notify me about 
                          the Client Area Opening Ceremony.
                        </Label>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white mt-2 group relative overflow-hidden"
                      >
                        <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                          {isSubmitting ? 'Processing...' : 'Notify Me'}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-8 p-4 border-t border-gray-100">
                <Shield className="h-5 w-5 text-sapp-blue mr-2" />
                <p className="text-sm text-slate-600">
                  Your privacy is our priority. We will only use your information to notify you about our Client Area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientArea;
