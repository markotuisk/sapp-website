
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';
import { useComponentLogger, useDebugContext } from '@/utils/debugTools';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { DebugInfo } from '@/components/debug';

// Import components
import HeroSection from '@/components/services/physical-security/HeroSection';
import ApproachSection from '@/components/services/physical-security/ApproachSection';
import QuoteSection from '@/components/services/physical-security/QuoteSection';
import CTASection from '@/components/services/physical-security/CTASection';
import NavigationButtons from '@/components/services/physical-security/NavigationButtons';

const PhysicalSecurityAssessments = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  const { logEvent } = useComponentLogger('PhysicalSecurityAssessments');
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    logEvent('page_view', { page: 'physical_security_assessments' });
  }, [logEvent]);

  const handleContactRequest = () => {
    logEvent('contact_request', { service: 'physical_security_assessment' });
    setContactDialogOpen(true);
  };

  const content = (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Physical Security Assessments | Find Vulnerabilities Before Others Do | SAPP Security</title>
        <meta 
          name="description" 
          content="Our comprehensive physical security assessments identify vulnerabilities in your security infrastructure before they can be exploited. Expert analysis and actionable recommendations." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/physical-security-assessments" />
        <meta property="og:title" content="Physical Security Assessments | SAPP Security" />
        <meta property="og:description" content="Professional security assessments to identify vulnerabilities before they can be exploited." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sappsecurity.com/services/physical-security-assessments" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Physical Security Assessments | SAPP Security" />
        <meta name="twitter:description" content="Professional security assessments to identify vulnerabilities before they can be exploited." />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onRequestAssessment={handleContactRequest} />
        <ApproachSection />
        <QuoteSection />
        <CTASection onRequestAssessment={handleContactRequest} />
        <NavigationButtons />
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in a Physical Security Assessment for my organization."
        serviceName="Physical Security Assessment"
      />
    </div>
  );

  if (isDebugMode && process.env.NODE_ENV === 'development') {
    return (
      <DebugInfo 
        componentName="PhysicalSecurityAssessments"
        data={{
          route: "/services/physical-security-assessments",
          sections: ['Hero', 'Approach', 'Quote', 'CTA', 'Navigation'],
          contactForm: { open: contactDialogOpen },
          themingUsed: ['framer-motion', 'tailwind', 'SAPP branding'],
        }}
      >
        {content}
      </DebugInfo>
    );
  }

  return content;
};

export default PhysicalSecurityAssessments;
