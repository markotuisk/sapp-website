
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/security-audits/HeroSection';
import WhyIndependentAudits from '@/components/security-audits/WhyIndependentAudits';
import QuoteSection from '@/components/security-audits/QuoteSection';
import ServiceCardsSection from '@/components/security-audits/ServiceCardsSection';
import ImageBannerSection from '@/components/security-audits/ImageBannerSection';
import CTASection from '@/components/security-audits/CTASection';

const SecurityAudits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WhyIndependentAudits />
        <QuoteSection />
        <ServiceCardsSection />
        <ImageBannerSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default SecurityAudits;
