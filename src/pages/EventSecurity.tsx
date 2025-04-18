
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

  const eventSecurityServices = [
    {
      title: "Venue Security Audits",
      description: "Pre-event vulnerability assessment and security planning to identify and mitigate risks before your corporate event begins.",
      href: "/services/venue-security-audits",
      imagePath: "/lovable-uploads/a42f51ed-4188-4c54-a444-9294e06fd3eb.png"
    },
    {
      title: "Event Monitoring",
      description: "Real-time surveillance and protection throughout your event, ensuring immediate response to any security concerns.",
      href: "/services/event-monitoring",
      imagePath: "/lovable-uploads/b4eb5728-fc18-4139-aac1-a88d01053ca3.png"
    },
    {
      title: "Secure Technology",
      description: "Hardened communications and data protection solutions specifically designed for sensitive corporate events.",
      href: "/services/secure-technology",
      imagePath: "/lovable-uploads/e1b5532f-5840-4688-b9df-ae2e2926945d.png"
    },
    {
      title: "Close Protection",
      description: "Personal security services for VIPs and executives during high-profile events and sensitive meetings.",
      href: "/services/close-protection",
      imagePath: "/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection setServicesOpen={setServicesOpen} />
        <InfoSection setServicesOpen={setServicesOpen} />
        <QuoteSection />
        <ServicesSection serviceDetails={eventSecurityServices} />
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
