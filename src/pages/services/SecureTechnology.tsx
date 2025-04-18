
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import HeroSection from '@/components/services/secure-technology/HeroSection';
import FeaturesSection from '@/components/services/secure-technology/FeaturesSection';
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
        <title>Secure Technology | SAPP Security</title>
        <meta 
          name="description" 
          content="Secure communications technology for corporate events and executive meetings." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/secure-technology" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onContactClick={() => setContactDialogOpen(true)} />
        <FeaturesSection onContactClick={() => setContactDialogOpen(true)} />
        <CTASection onRequestAssessment={() => setContactDialogOpen(true)} />
        
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 border-t border-gray-100">
            <NavigationButtons />
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Secure Technology services."
        serviceName="Secure Technology"
      />
    </div>
  );
};

export default SecureTechnology;
