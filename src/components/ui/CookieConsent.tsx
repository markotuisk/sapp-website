
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-4">
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Cookie Preferences</h3>
          <p className="text-gray-600 text-sm">
            We use optional cookies to improve your experience and analyze site traffic.{' '}
            <Link to="/privacy-policy" className="text-sapp-blue hover:underline font-medium">
              Learn more about our cookie policy
            </Link>
            .
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border-sapp-blue text-sapp-blue hover:bg-sapp-blue/10 min-w-[120px]"
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            className="border-gray-500 text-gray-700 hover:bg-gray-100 min-w-[120px]"
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
