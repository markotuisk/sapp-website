
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import HeroSection from '@/components/installations/HeroSection';
import SolutionsSection from '@/components/installations/SolutionsSection';
import CapabilitiesSection from '@/components/installations/CapabilitiesSection';
import DeploymentSection from '@/components/installations/DeploymentSection';
import QuoteSection from '@/components/installations/QuoteSection';
import DeploymentConsultationSection from '@/components/installations/DeploymentConsultationSection';
import CTASection from '@/components/installations/CTASection';

const Installations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Security Installations | SAPP Security</title>
        <meta 
          name="description" 
          content="Professional security system installations including CCTV, access control, and surveillance systems. Expert deployment and maintenance services." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/installations" />
        <meta property="og:title" content="Security Installations | SAPP Security" />
        <meta property="og:description" content="Professional security system installations including CCTV, access control, and surveillance systems." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/installations" />
      </Helmet>
      <PublicLayout>
        <HeroSection />
        <SolutionsSection />
        <CapabilitiesSection />
        <DeploymentSection />
        <QuoteSection />
        <DeploymentConsultationSection />
        <CTASection />
      </PublicLayout>
    </div>
  );
};

export default Installations;
