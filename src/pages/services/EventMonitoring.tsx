
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import HeroSection from '@/components/services/event-monitoring/HeroSection';
import ThreatAwarenessSection from '@/components/services/event-monitoring/ThreatAwarenessSection';
import ServiceCategoriesSection from '@/components/services/event-monitoring/ServiceCategoriesSection';
import TechnologyShowcaseSection from '@/components/services/event-monitoring/TechnologyShowcaseSection';
import ProcessTimelineSection from '@/components/services/event-monitoring/ProcessTimelineSection';
import ScenarioSection from '@/components/services/event-monitoring/ScenarioSection';
import FAQSection from '@/components/services/event-monitoring/FAQSection';
import CTASection from '@/components/services/event-monitoring/CTASection';
import { NavigationButtons } from '@/components/services/event-monitoring/NavigationButtons';

const EventMonitoring = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Event Monitoring Services | Real-Time Corporate Event Security | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive event monitoring services combining advanced surveillance, device isolation, TSCM sweeping, and secure networks. Protect your corporate events from modern security threats." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/event-monitoring" />
        <meta property="og:title" content="Event Monitoring Services | Real-Time Corporate Event Security | SAPP Security" />
        <meta property="og:description" content="Advanced event monitoring solutions protecting corporate events from espionage, data breaches, and security threats through cutting-edge technology and elite personnel." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sappsecurity.com/services/event-monitoring" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onContactClick={() => setContactDialogOpen(true)} />
        <ThreatAwarenessSection />
        <ServiceCategoriesSection onRequestMonitoring={() => setContactDialogOpen(true)} />
        <TechnologyShowcaseSection />
        <ProcessTimelineSection />
        <ScenarioSection />
        <FAQSection />
        <CTASection onRequestMonitoring={() => setContactDialogOpen(true)} />
        
        <div className="container mx-auto px-4">
          <div className="py-8 border-t border-gray-100">
            <NavigationButtons />
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Event Monitoring services and would like to schedule a site assessment for my upcoming corporate event."
        serviceName="Event Monitoring"
      />
    </div>
  );
};

export default EventMonitoring;
