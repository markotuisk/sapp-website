
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated, AnimatedCount } from '@/components/ui/AnimatedElements';
import { DebugInfo } from '@/components/debug/DebugInfo';
import Hero from '@/components/services/venue-security-audits/Hero';
import MethodologySection from '@/components/services/venue-security-audits/MethodologySection';
import QuoteSection from '@/components/services/venue-security-audits/QuoteSection';
import BenefitsSection from '@/components/services/venue-security-audits/BenefitsSection';
import CTASection from '@/components/services/venue-security-audits/CTASection';
import NavigationButtons from '@/components/services/venue-security-audits/NavigationButtons';

const VenueSecurityAudits = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Venue Security Audits | SAPP Security</title>
        <meta 
          name="description" 
          content="Professional venue security audits for corporate events and executive meetings. Ensure your event venue meets security standards." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/venue-security-audits" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <Hero onRequestAudit={() => setContactDialogOpen(true)} />
        <MethodologySection />
        <QuoteSection />
        <BenefitsSection onRequestAudit={() => setContactDialogOpen(true)} />
        <CTASection onRequestAudit={() => setContactDialogOpen(true)} />
        <NavigationButtons />
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Venue Security Audit services."
        serviceName="Venue Security Audit"
      />
    </div>
  );
};

export default VenueSecurityAudits;
