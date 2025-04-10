
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/security-audits/HeroSection';
import WhyIndependentAudits from '@/components/security-audits/WhyIndependentAudits';
import QuoteSection from '@/components/security-audits/QuoteSection';
import ServiceDetailsSection from '@/components/security-audits/ServiceDetailsSection';
import ServiceCardsSection from '@/components/security-audits/ServiceCardsSection';
import ImageBannerSection from '@/components/security-audits/ImageBannerSection';
import CTASection from '@/components/security-audits/CTASection';

const SecurityAudits = () => {
  useEffect(() => {
    // Scroll to top when navigating to this page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Independent Audits Matter */}
        <WhyIndependentAudits />

        {/* Quote Section - slightly reduced spacing */}
        <QuoteSection />

        {/* Main Content - Comprehensive Services */}
        <ServiceDetailsSection />

        {/* Security Audit Services Cards */}
        <ServiceCardsSection />

        {/* Image Banner Section - adjusted spacing */}
        <ImageBannerSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default SecurityAudits;
