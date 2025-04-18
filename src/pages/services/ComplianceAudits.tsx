import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import CTASection from '@/components/services/compliance-audits/CTASection';
import NavigationButtons from '@/components/services/compliance-audits/NavigationButtons';
import HeroSection from '@/components/services/compliance-audits/HeroSection';
import ApproachSection from '@/components/services/compliance-audits/ApproachSection';
import QuoteSection from '@/components/services/compliance-audits/QuoteSection';

const ComplianceAudits = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Compliance Audits | SAPP Security</title>
        <meta 
          name="description" 
          content="ISO27001 certified compliance audits to measure your organization's adherence to industry standards and international regulations." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/compliance-audits" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onRequestAssessment={() => setContactDialogOpen(true)} />
        <ApproachSection />
        <QuoteSection />
        
        <CTASection onRequestAssessment={() => setContactDialogOpen(true)} />
        <NavigationButtons />
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Compliance Audit services."
        serviceName="Compliance Audit"
      />
    </div>
  );
};

export default ComplianceAudits;
