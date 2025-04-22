
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/security-audits/HeroSection';
import WhyIndependentAudits from '@/components/security-audits/WhyIndependentAudits';
import QuoteSection from '@/components/security-audits/QuoteSection';
import ServiceCardsSection from '@/components/security-audits/ServiceCardsSection';
import ImageBannerSection from '@/components/security-audits/ImageBannerSection';
import CTASection from '@/components/security-audits/CTASection';
import AcronymEnhancer from '@/components/resources/AcronymEnhancer';

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
          content="SAPP Security offers comprehensive physical security audits to help organisations identify vulnerabilities and enhance their security posture. ISO27001 certified." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/security-audits" />
        <meta property="og:title" content="Security Audits | SAPP Security" />
        <meta property="og:description" content="Comprehensive physical security audits to help organisations identify vulnerabilities and enhance their security posture." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/security-audits" />
      </Helmet>
      <Navbar />
      <main>
        <section className="relative">
          <div className="container mx-auto px-4">
            <div className="text-center pt-8 md:pt-16">
              <HeroSection />
            </div>
          </div>
        </section>
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
