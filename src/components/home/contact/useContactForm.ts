
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserMetadata } from './types';

export const useContactForm = () => {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [userMetadata, setUserMetadata] = useState<UserMetadata>({
    datetime: '',
    timezone: '',
    browser: '',
    device: '',
  });
  
  // Get user metadata on initial render
  useEffect(() => {
    // Browser detection
    const getBrowser = () => {
      const userAgent = navigator.userAgent;
      let browserName = "Unknown";
      let browserVersion = "";
      
      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
      } else if (userAgent.match(/msie|trident/i)) {
        browserName = "IE";
      }
      
      // Simple version extraction
      const match = userAgent.match(/(chrome|firefox|safari|opr|edg|msie|rv)\/?\s*([\d.]+)/i);
      if (match) {
        browserVersion = match[2];
      }
      
      return `${browserName} ${browserVersion}`;
    };
    
    // Device detection (simple)
    const getDevice = () => {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
    };
    
    // Format current date/time
    const now = new Date();
    
    setUserMetadata({
      datetime: now.toLocaleString(),
      timezone: `GMT${now.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(now.getTimezoneOffset()/60)}`,
      browser: getBrowser(),
      device: getDevice(),
    });
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      
      toast({
        title: "Copied!",
        description: `${text} has been copied to clipboard`,
        duration: 2000,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return {
    copiedEmail,
    copiedPhone,
    messageLength,
    setMessageLength,
    userMetadata,
    copyToClipboard
  };
};
