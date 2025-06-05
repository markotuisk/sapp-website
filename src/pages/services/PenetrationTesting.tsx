
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import HeroSection from '@/components/services/penetration-testing/HeroSection';
import MethodsSection from '@/components/services/penetration-testing/MethodsSection';
import TypesSection from '@/components/services/penetration-testing/TypesSection';
import ProcessSection from '@/components/services/penetration-testing/ProcessSection';
import BenefitsSection from '@/components/services/penetration-testing/BenefitsSection';
import CTASection from '@/components/services/penetration-testing/CTASection';
import NavigationButtons from '@/components/services/penetration-testing/NavigationButtons';
import FAQSection from '@/components/services/penetration-testing/FAQSection';
import { useState } from 'react';

const PenetrationTesting = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Add a small delay to ensure proper scroll behavior
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Physical Security Penetration Testing | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive physical security penetration testing to identify vulnerabilities in your organization's physical security measures through real-world attack simulations." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/penetration-testing" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onRequestService={() => setContactDialogOpen(true)} />
        <MethodsSection />
        <TypesSection />
        <ProcessSection />
        <BenefitsSection />
        <FAQSection />
        <CTASection onRequestService={() => setContactDialogOpen(true)} />
        <NavigationButtons />
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Physical Security Penetration Testing services."
        serviceName="Physical Security Penetration Testing"
      />
    </div>
  );
};

export default PenetrationTesting;
