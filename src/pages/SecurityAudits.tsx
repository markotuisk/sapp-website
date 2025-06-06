
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import HeroSection from '@/components/security-audits/HeroSection';
import ServiceCardsSection from '@/components/security-audits/ServiceCardsSection';
import ServiceDetailsSection from '@/components/security-audits/ServiceDetailsSection';
import WhyIndependentAudits from '@/components/security-audits/WhyIndependentAudits';
import QuoteSection from '@/components/security-audits/QuoteSection';
import ImageBannerSection from '@/components/security-audits/ImageBannerSection';
import CTASection from '@/components/security-audits/CTASection';

const SecurityAudits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Security Audits | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive security audits and assessments for organisations. Professional security consulting and vulnerability assessments." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/security-audits" />
        <meta property="og:title" content="Security Audits | SAPP Security" />
        <meta property="og:description" content="Comprehensive security audits and assessments for organisations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/security-audits" />
      </Helmet>
      <PublicLayout>
        <HeroSection />
        <ServiceCardsSection />
        <ServiceDetailsSection />
        <WhyIndependentAudits />
        <QuoteSection />
        <ImageBannerSection />
        <CTASection />
      </PublicLayout>
    </div>
  );
};

export default SecurityAudits;
