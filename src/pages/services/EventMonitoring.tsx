
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import HeroSection from '@/components/services/event-monitoring/HeroSection';
import ApproachSection from '@/components/services/event-monitoring/ApproachSection';
import FeaturesSection from '@/components/services/event-monitoring/FeaturesSection';
import { NavigationButtons } from '@/components/services/event-monitoring/NavigationButtons';
import CTASection from '@/components/services/event-monitoring/CTASection';

const EventMonitoring = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Event Monitoring | SAPP Security</title>
        <meta 
          name="description" 
          content="Real-time technical and physical monitoring for sensitive corporate meetings and events." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/event-monitoring" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onContactClick={() => setContactDialogOpen(true)} />
        <ApproachSection />
        <div className="container mx-auto px-4">
          <FeaturesSection onContactClick={() => setContactDialogOpen(true)} />
        </div>
        
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
        defaultMessage="I'm interested in learning more about your Event Monitoring services."
        serviceName="Event Monitoring"
      />
    </div>
  );
};

export default EventMonitoring;

