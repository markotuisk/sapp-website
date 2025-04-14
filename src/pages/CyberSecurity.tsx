
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Lazy load sections to improve initial page load performance
const HeroSection = React.lazy(() => import('@/components/cyber-security/HeroSection'));
const ServicesSection = React.lazy(() => import('@/components/cyber-security/ServicesSection'));
const FeaturesSection = React.lazy(() => import('@/components/cyber-security/FeaturesSection'));
const CTASection = React.lazy(() => import('@/components/cyber-security/CTASection'));

const CyberSecurity = React.memo(() => {
  return (
    <div className="min-h-screen">
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
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
});

CyberSecurity.displayName = 'CyberSecurity';
export default CyberSecurity;
