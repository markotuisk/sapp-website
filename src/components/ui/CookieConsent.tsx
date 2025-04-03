
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const cookieKey = 'sapp-cookie-consent';
  
  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const hasConsented = localStorage.getItem(cookieKey);
    
    if (!hasConsented) {
      // Show the cookie banner if no consent was previously given
      setVisible(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem(cookieKey, 'accepted');
    setVisible(false);
  };
  
  const handleDecline = () => {
    localStorage.setItem(cookieKey, 'declined');
    setVisible(false);
  };
  
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4 mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-shrink-0 items-center justify-center">
          <img 
            src="/lovable-uploads/7873b956-7e24-4ea7-83ea-d00e1007c5cb.png" 
            alt="Cookie" 
            className="w-20 h-20 object-contain"
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">Are you ok with optional cookies?</h3>
          <p className="text-gray-600 text-sm">
            They let us give you a better experience, improve our products, and keep our marketing costs down. We won't turn them on until you accept.{' '}
            <Link to="/privacy-policy" className="text-sapp-blue hover:underline font-medium">
              Learn more in our cookie policy
            </Link>
            .
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border-2 border-gray-800 hover:border-gray-900 hover:bg-gray-50 text-gray-800 min-w-[120px]"
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            className="border-2 border-gray-800 hover:border-gray-900 hover:bg-gray-50 text-gray-800 min-w-[120px]"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
