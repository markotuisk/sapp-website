
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, WifiOff, Construction } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const VirtualOffice = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative">
            <div className="bg-gradient-to-r from-sapp-dark to-sapp-blue p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Virtual Office</h1>
                  <p className="text-blue-100 text-lg">Secure Portal Services</p>
                </div>
                
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <img 
                    src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png" 
                    alt="SAPP Security Logo" 
                    className="h-32 w-32 transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Construction className="h-6 w-6" />
                    Service Temporarily Unavailable
                  </CardTitle>
                  <CardDescription className="text-amber-700">
                    The Virtual Office client portal is currently undergoing maintenance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-amber-800">
                    We're working to improve our services and will have the portal back online soon. 
                    In the meantime, please contact us directly for any urgent matters.
                  </p>
                  
                  <div className="bg-white border border-amber-200 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-900 mb-2">Alternative Contact Methods:</h3>
                    <ul className="space-y-1 text-amber-800 text-sm">
                      <li>• Email: info@sappsecurity.co.uk</li>
                      <li>• Phone: Contact us through our main website</li>
                      <li>• Emergency Services: Available 24/7</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
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
      
      <Footer />
    </div>
  );
};

export default VirtualOffice;
