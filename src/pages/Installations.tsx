
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import QuoteSection from '@/components/installations/QuoteSection';
import HeroSection from '@/components/installations/HeroSection';
import SolutionsSection from '@/components/installations/SolutionsSection';
import CapabilitiesSection from '@/components/installations/CapabilitiesSection';
import DeploymentSection from '@/components/installations/DeploymentSection';
import DeploymentConsultationSection from '@/components/installations/DeploymentConsultationSection';
import CTASection from '@/components/installations/CTASection';

const Installations = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content - Why Choose Our Solutions */}
        <SolutionsSection />

        {/* Industry Leader Opinion Section */}
        <QuoteSection />

        {/* Installation Capabilities Section */}
        <CapabilitiesSection />

        {/* How We Deploy Section */}
        <DeploymentSection />

        {/* Deployment Consultation Section */}
        <DeploymentConsultationSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Installations;
