
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServicesOverlay from '@/components/ui/ServicesOverlay';
import HeroSection from '@/components/event-security/HeroSection';
import InfoSection from '@/components/event-security/InfoSection';
import ServicesSection from '@/components/event-security/ServicesSection';
import QuoteSection from '@/components/event-security/QuoteSection';
import SecurityProcessSection from '@/components/event-security/SecurityProcessSection';
import CTASection from '@/components/event-security/CTASection';

const EventSecurity = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection setServicesOpen={setServicesOpen} />
        <InfoSection setServicesOpen={setServicesOpen} />
        <QuoteSection />
        <ServicesSection />
        <SecurityProcessSection />
        <CTASection />
        <ServicesOverlay 
          open={servicesOpen}
          onOpenChange={setServicesOpen}
        />
      </main>
      <Footer />
    </div>
  );
};

export default EventSecurity;
