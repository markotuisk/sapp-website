
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
import ServiceDialog from '@/components/event-security/ServiceDialog';

const EventSecurity = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [dialogStep, setDialogStep] = useState<'form' | 'preview'>('form');
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to the top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);
  
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    notes: ''
  });

  const serviceDetails = [
    {
      title: "Venue Security Audits",
      description: "Security audits at an event venue prior to sensitive meetings ensure baseline security as most such public venues have weak security and are highly vulnerable to security attacks.",
      href: "/services/venue-security-audits",
      imagePath: "/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
    },
    {
      title: "Event Monitoring",
      description: "Real-time technical and physical monitoring should be a standard business process at any confidential, restricted or sensitive meeting. Event monitoring also includes the incident management service avoiding a potential crisis and reputational damage.",
      href: "/services/event-monitoring",
      imagePath: "/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
    },
    {
      title: "Secure Technology",
      description: "All communications technology used at corporate events should be audited, tested and security cleared with recommendations for more secure alternatives as and where required.",
      href: "/services/secure-technology",
      imagePath: "/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
    },
    {
      title: "Close Protection",
      description: "For larger restricted events such as AGMs, for high-profile executives, as well as at venues where there is no on-site security, we work with trusted partners to provide professional close protection services.",
      href: "/services/close-protection",
      imagePath: "/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection setServicesOpen={setServicesOpen} />
        
        {/* Corporate Event Security */}
        <InfoSection setServicesOpen={setServicesOpen} />

        {/* Quote Section - Industry Leader Opinion */}
        <QuoteSection />
        
        {/* Security Solutions */}
        <ServicesSection serviceDetails={serviceDetails} />

        {/* Security Process */}
        <SecurityProcessSection />

        {/* Get Started - CTA Section */}
        <CTASection />

        {/* Services Overlay */}
        <ServicesOverlay 
          open={servicesOpen}
          onOpenChange={setServicesOpen}
        />

        {/* Service Dialog */}
        <ServiceDialog 
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          formData={formData}
          setFormData={setFormData}
          dialogStep={dialogStep}
          setDialogStep={setDialogStep}
        />
      </main>
      <Footer />
    </div>
  );
};

export default EventSecurity;
