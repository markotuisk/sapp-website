import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DebugInfo, useComponentLogger, useDebugContext } from '@/utils/debugTools';

const HeroSection = React.lazy(() => import('@/components/cyber-security/HeroSection'));
const ServicesSection = React.lazy(() => import('@/components/cyber-security/ServicesSection'));
const FeaturesSection = React.lazy(() => import('@/components/cyber-security/FeaturesSection'));
const QuoteSection = React.lazy(() => import('@/components/cyber-security/QuoteSection'));
const CTASection = React.lazy(() => import('@/components/cyber-security/CTASection'));
const Contact = React.lazy(() => import('@/components/home/contact/Contact'));

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
      <main className="flex-grow">
        <Suspense fallback={
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-pulse text-sapp-gray">Loading...</div>
          </div>
        }>
          <div className="space-y-16 md:space-y-24">
            <HeroSection />
            <ServicesSection />
            <QuoteSection />
            <FeaturesSection />
            <CTASection />
            <Contact />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );

  if (isDebugMode && process.env.NODE_ENV === 'development') {
    return (
      <DebugInfo 
        componentName="CyberSecurityPage"
        data={{
          lazyLoadedSections: [
            'HeroSection',
            'ServicesSection',
            'FeaturesSection',
            'QuoteSection',
            'CTASection',
            'Contact'
          ],
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
