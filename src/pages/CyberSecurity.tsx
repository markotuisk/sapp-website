
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import HeroSection from '@/components/cyber-security/HeroSection';
import FeaturesSection from '@/components/cyber-security/FeaturesSection';
import ServicesSection from '@/components/cyber-security/ServicesSection';
import StorySection from '@/components/cyber-security/StorySection';
import QuoteSection from '@/components/cyber-security/QuoteSection';
import CTASection from '@/components/cyber-security/CTASection';

const CyberSecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Cyber Security Services | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive cyber security services including threat assessment, security audits, and digital protection solutions for organisations." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/cyber-security" />
        <meta property="og:title" content="Cyber Security Services | SAPP Security" />
        <meta property="og:description" content="Comprehensive cyber security services including threat assessment and digital protection solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/cyber-security" />
      </Helmet>
      <PublicLayout>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <StorySection />
        <QuoteSection />
        <CTASection />
      </PublicLayout>
    </div>
  );
};

export default CyberSecurity;
