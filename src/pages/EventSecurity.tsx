
import React, { useState } from 'react';
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
      description: "Venues for sensitive and high-profile events typically have weak security. Our audits ensure minimum security measures are in place and your organisation's information remains protected.",
      href: "/services/venue-security-audits",
      imagePath: "/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
    },
    {
      title: "Event Monitoring",
      description: "Real-time technical and physical monitoring for confidential meetings, with incident management to handle potential security breaches swiftly and professionally.",
      href: "/services/event-monitoring",
      imagePath: "/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
    },
    {
      title: "Secure Technology",
      description: "Comprehensive audit of all technology used at sensitive meetings with recommendations for more secure alternatives to protect against cyber and espionage attacks.",
      href: "/services/secure-technology",
      imagePath: "/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
    },
    {
      title: "Close Protection",
      description: "Professional close protection services for larger restricted events like AGMs and high-profile executives, especially at venues without on-site security.",
      href: "/services/close-protection",
      imagePath: "/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
    }
  ];

  const handleServiceLearnMore = (serviceTitle: string) => {
    setOpenDialog(serviceTitle);
    setDialogStep('form');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection setServicesOpen={setServicesOpen} />
        
        {/* Corporate Event Security */}
        <InfoSection setServicesOpen={setServicesOpen} />

        {/* Our Event Security Services */}
        <ServicesSection 
          serviceDetails={serviceDetails} 
          onLearnMore={handleServiceLearnMore} 
        />

        {/* Quote Section */}
        <QuoteSection />

        {/* How We Secure Your Events */}
        <SecurityProcessSection />

        {/* CTA Section */}
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
