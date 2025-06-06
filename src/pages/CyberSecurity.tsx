
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DebugInfo, useComponentLogger, useDebugContext } from '@/utils/debugTools';

// Import components without using React.lazy() to fix the loading issue
import HeroSection from '@/components/cyber-security/HeroSection';
import ServicesSection from '@/components/cyber-security/ServicesSection';
import FeaturesSection from '@/components/cyber-security/FeaturesSection';
import CyberSecurityQuoteSection from '@/components/cyber-security/QuoteSection';
import CTASection from '@/components/cyber-security/CTASection';
import Contact from '@/components/home/contact/Contact';

const CyberSecurity = React.memo(() => {
  const { logEvent } = useComponentLogger('CyberSecurityPage');
  const { isDebugMode } = useDebugContext();

  const content = (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Comprehensive Cyber Security Services | SAPP Security</title>
        <meta 
          name="description" 
          content="Expert cyber security solutions protecting your digital infrastructure. Threat detection, data encryption, and security awareness training for businesses." 
        />
        <meta 
          name="keywords" 
          content="cyber security, digital protection, threat detection, data encryption, security awareness, IoT security" 
        />
        <link rel="canonical" href="https://sappsecurity.com/cyber-security" />
        <meta property="og:title" content="Comprehensive Cyber Security Services | SAPP Security" />
        <meta 
          property="og:description" 
          content="Protect your digital assets with our advanced cyber security solutions. Comprehensive protection against evolving cyber threats." 
        />
        <meta property="og:url" content="https://sappsecurity.com/cyber-security" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow" aria-labelledby="cyber-security-heading">
        <div className="space-y-16 md:space-y-24">
          <HeroSection />
          <ServicesSection />
          <CyberSecurityQuoteSection />
          <FeaturesSection />
          <CTASection />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );

  if (isDebugMode && process.env.NODE_ENV === 'development') {
    return (
      <DebugInfo 
        componentName="CyberSecurityPage"
        data={{
          metaTitle: "Comprehensive Cyber Security Services | SAPP Security",
          route: "/cyber-security"
        }}
      >
        {content}
      </DebugInfo>
    );
  }

  return content;
});

CyberSecurity.displayName = 'CyberSecurity';
export default CyberSecurity;
