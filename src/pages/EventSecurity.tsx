
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import HeroSection from '@/components/event-security/HeroSection';
import ServicesSection from '@/components/event-security/ServicesSection';
import SecurityProcessSection from '@/components/event-security/SecurityProcessSection';
import QuoteSection from '@/components/event-security/QuoteSection';
import InfoSection from '@/components/event-security/InfoSection';
import CTASection from '@/components/event-security/CTASection';

const EventSecurity = () => {
  const [servicesOpen, setServicesOpen] = useState(false);

  const serviceDetails = [
    {
      title: "Venue Security Assessment",
      description: "Comprehensive evaluation of event venues to identify potential security vulnerabilities and develop mitigation strategies.",
      href: "/services/venue-security-audits",
      imagePath: "/lovable-uploads/venue-security.jpg"
    },
    {
      title: "Executive Protection", 
      description: "Professional close protection services for high-profile attendees and VIP guests at corporate events.",
      href: "/services/close-protection",
      imagePath: "/lovable-uploads/executive-protection.jpg"
    },
    {
      title: "Event Monitoring",
      description: "Real-time surveillance and monitoring services to ensure event security throughout the duration.",
      href: "/services/event-monitoring", 
      imagePath: "/lovable-uploads/event-monitoring.jpg"
    },
    {
      title: "TSCM Inspections",
      description: "Technical surveillance countermeasures to detect and neutralise electronic eavesdropping devices.",
      href: "/services/tscm-inspections",
      imagePath: "/lovable-uploads/tscm-inspections.jpg"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Event Security Services | SAPP Security</title>
        <meta 
          name="description" 
          content="Professional event security services for corporate events, conferences, and executive gatherings. Comprehensive security planning and execution." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/event-security" />
        <meta property="og:title" content="Event Security Services | SAPP Security" />
        <meta property="og:description" content="Professional event security services for corporate events and executive gatherings." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/event-security" />
      </Helmet>
      <PublicLayout>
        <HeroSection setServicesOpen={setServicesOpen} />
        <ServicesSection serviceDetails={serviceDetails} />
        <SecurityProcessSection />
        <QuoteSection />
        <InfoSection setServicesOpen={setServicesOpen} />
        <CTASection />
      </PublicLayout>
    </div>
  );
};

export default EventSecurity;
