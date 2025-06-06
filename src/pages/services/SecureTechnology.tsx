
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import HeroSection from '@/components/services/secure-technology/HeroSection';
import ThreatAwarenessSection from '@/components/services/secure-technology/ThreatAwarenessSection';
import SecurityLevelSelector from '@/components/services/secure-technology/SecurityLevelSelector';
import ServiceDetailsSection from '@/components/services/secure-technology/ServiceDetailsSection';
import ProcessTimelineSection from '@/components/services/secure-technology/ProcessTimelineSection';
import ROICalculatorSection from '@/components/services/secure-technology/ROICalculatorSection';
import FAQSection from '@/components/services/secure-technology/FAQSection';
import CTASection from '@/components/services/secure-technology/CTASection';
import NavigationButtons from '@/components/services/secure-technology/NavigationButtons';

const SecureTechnology = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Secure Technology Services | Event Communication Security | SAPP Security</title>
        <meta 
          name="description" 
          content="Advanced secure communication services for events. Encrypted networks, secure radios, TSCM sweeps, and comprehensive communication protection for corporate events and high-profile gatherings." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/secure-technology" />
        <meta property="og:title" content="Secure Technology Services | Event Communication Security | SAPP Security" />
        <meta property="og:description" content="Professional secure communication solutions protecting event organizers from eavesdropping, data breaches, and unauthorized surveillance through advanced technology and expert personnel." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sappsecurity.com/services/secure-technology" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onContactClick={() => setContactDialogOpen(true)} />
        <ThreatAwarenessSection />
        <SecurityLevelSelector />
        <ServiceDetailsSection />
        <ProcessTimelineSection />
        <ROICalculatorSection />
        <FAQSection />
        <CTASection onRequestAssessment={() => setContactDialogOpen(true)} />
        
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
        defaultMessage="I'm interested in learning more about your Secure Technology services and would like to schedule a consultation to discuss my event's communication security needs."
        serviceName="Secure Technology"
      />
    </div>
  );
};

export default SecureTechnology;
