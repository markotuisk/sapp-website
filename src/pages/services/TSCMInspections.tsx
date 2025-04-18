import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';
import { useComponentLogger, useDebugContext, DebugInfo } from '@/utils/debugTools';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

import HeroSection from '@/components/services/tscm-inspections/HeroSection';
import ApproachSection from '@/components/services/tscm-inspections/ApproachSection';
import QuoteSection from '@/components/services/tscm-inspections/QuoteSection';
import CTASection from '@/components/services/tscm-inspections/CTASection';
import NavigationButtons from '@/components/services/tscm-inspections/NavigationButtons';

const TSCMInspections = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  const { logEvent } = useComponentLogger('TSCMInspections');
  const { isDebugMode } = useDebugContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const content = (
    <div className="min-h-screen">
      <Helmet>
        <title>TSCM Inspections | SAPP Security</title>
        <meta 
          name="description" 
          content="Technical surveillance countermeasures inspections to detect and prevent unauthorized surveillance devices." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/tscm-inspections" />
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
        defaultMessage="I'm interested in learning more about your TSCM Inspection services."
        serviceName="TSCM Inspection"
      />
    </div>
  );

  if (isDebugMode) {
    return (
      <div className="min-h-screen">
        <Helmet>
          <title>TSCM Inspections | SAPP Security</title>
          <meta 
            name="description" 
            content="Technical surveillance countermeasures inspections to detect and prevent unauthorized surveillance devices." 
          />
          <link rel="canonical" href="https://sappsecurity.com/services/tscm-inspections" />
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
          defaultMessage="I'm interested in learning more about your TSCM Inspection services."
          serviceName="TSCM Inspection"
        />
        
        <DebugInfo />
      </div>
    );
  }

  return content;
};

export default TSCMInspections;
