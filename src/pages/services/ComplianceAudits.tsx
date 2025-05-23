
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import HeroSection from '@/components/services/compliance-audits/HeroSection';
import OverviewSection from '@/components/services/compliance-audits/OverviewSection';
import KeyAreasSection from '@/components/services/compliance-audits/KeyAreasSection';
import AuditProcessSection from '@/components/services/compliance-audits/AuditProcessSection';
import BenefitsSection from '@/components/services/compliance-audits/BenefitsSection';
import WhyChooseSection from '@/components/services/compliance-audits/WhyChooseSection';
import ChallengesSection from '@/components/services/compliance-audits/ChallengesSection';
import FAQSection from '@/components/services/compliance-audits/FAQSection';
import CTASection from '@/components/services/compliance-audits/CTASection';
import NavigationButtons from '@/components/services/compliance-audits/NavigationButtons';

const ComplianceAudits = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ISO 27001 Compliance Audits | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive ISO 27001 compliance audits to ensure your organisation meets international security standards. Expert-led assessments with actionable recommendations for certification success." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/compliance-audits" />
        <meta property="og:title" content="ISO 27001 Compliance Audits | SAPP Security" />
        <meta property="og:description" content="Expert ISO 27001 compliance audits for regulatory excellence and enhanced security posture." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sappsecurity.com/services/compliance-audits" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection onRequestAssessment={() => setContactDialogOpen(true)} />
        <OverviewSection />
        <KeyAreasSection />
        <AuditProcessSection />
        <BenefitsSection />
        <WhyChooseSection />
        <ChallengesSection />
        <FAQSection />
        <CTASection onRequestAssessment={() => setContactDialogOpen(true)} />
        <NavigationButtons />
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your ISO 27001 Compliance Audit services and would like to schedule a readiness assessment."
        serviceName="ISO 27001 Compliance Audit"
      />
    </div>
  );
};

export default ComplianceAudits;
