
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/cyber-security/HeroSection';
import ServicesSection from '@/components/cyber-security/ServicesSection';
import FeaturesSection from '@/components/cyber-security/FeaturesSection';
import CTASection from '@/components/cyber-security/CTASection';

const CyberSecurity = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Comprehensive Cyber Security Services Section */}
        <ServicesSection />

        {/* Features with Images Section */}
        <FeaturesSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default CyberSecurity;
