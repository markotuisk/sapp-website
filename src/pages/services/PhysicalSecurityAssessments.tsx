
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';
import { useComponentLogger, useDebugContext, DebugInfo } from '@/utils/debugTools';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

// Import new components
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

  const content = (
    <div className="min-h-screen">
      <Helmet>
        <title>Physical Security Assessments | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive physical security assessments to identify vulnerabilities and strengthen your organization's security posture." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/physical-security-assessments" />
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
        defaultMessage="I'm interested in learning more about your Physical Security Assessment services."
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
          sections: ['Hero', 'Features', 'Quote', 'CTA'],
          animations: ['fade-up', 'scale-in', 'slide-in'],
        }}
      >
        {content}
      </DebugInfo>
    );
  }

  return content;
};

export default PhysicalSecurityAssessments;
