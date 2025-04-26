import { useState, useEffect } from 'react';
import { Button } from './button';

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has been previously given
    const consentStatus = localStorage.getItem('consentStatus');
    if (!consentStatus) {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (granted: boolean) => {
    if (granted) {
      // Update consent state in Google's systems
      window.gtag?.('consent', 'update', {
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
    } else {
      // Keep consent denied
      window.gtag?.('consent', 'update', {
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
      });
    }

    // Save consent choice
    localStorage.setItem('consentStatus', granted ? 'granted' : 'denied');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. 
            By clicking "Accept", you agree to this use of data as described in our{' '}
            <a href="/privacy-policy" className="text-sapp-blue hover:underline">Privacy Policy</a>.
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="min-w-[100px]"
              onClick={() => updateConsent(false)}
            >
              Decline
            </Button>
            <Button
              className="min-w-[100px] bg-sapp-blue hover:bg-sapp-blue/90"
              onClick={() => updateConsent(true)}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
