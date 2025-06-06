
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugToggle } from '@/components/debug';
import CounterSurveillanceHero from '@/components/installations/counter-surveillance/CounterSurveillanceHero';
import ThreatLandscapeSection from '@/components/installations/counter-surveillance/ThreatLandscapeSection';
import VulnerabilityZonesSection from '@/components/installations/counter-surveillance/VulnerabilityZonesSection';
import PrivacySolutionsShowcase from '@/components/installations/counter-surveillance/PrivacySolutionsShowcase';
import ExecutiveProtectionSection from '@/components/installations/counter-surveillance/ExecutiveProtectionSection';
import TechnologyDeepDive from '@/components/installations/counter-surveillance/TechnologyDeepDive';
import PrivacyIdeologySection from '@/components/installations/counter-surveillance/PrivacyIdeologySection';
import CounterSurveillanceCTA from '@/components/installations/counter-surveillance/CounterSurveillanceCTA';

const CounterSurveillance = () => {
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Helmet>
        <title>Counter-Surveillance & Privacy Assurance | SAPP Security</title>
        <meta name="description" content="Protect your privacy from modern surveillance threats. Interactive solutions for executives, corporations, and individuals. Privacy films, RF detection, acoustic masking, and more." />
        <meta name="keywords" content="counter-surveillance, privacy protection, executive security, corporate espionage, RF detection, acoustic masking, privacy films" />
      </Helmet>
      <Navbar />
      <DebugToggle />
      
      <main className="pt-20">
        {/* Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Speech Privacy
              </Button>
            </Link>
            <Link to="/installations/network-infrastructure">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Network Infrastructure
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <CounterSurveillanceHero />
        
        {/* Modern Threat Landscape */}
        <ThreatLandscapeSection />
        
        {/* Vulnerability Zones Interactive Map */}
        <VulnerabilityZonesSection />
        
        {/* Privacy Solutions Showcase */}
        <PrivacySolutionsShowcase />
        
        {/* Executive Protection Focus */}
        <ExecutiveProtectionSection />
        
        {/* Technology Deep Dive */}
        <TechnologyDeepDive />
        
        {/* Privacy Ideology */}
        <PrivacyIdeologySection />
        
        {/* Call to Action */}
        <CounterSurveillanceCTA />

        {/* Bottom Navigation */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Speech Privacy
              </Button>
            </Link>
            <Link to="/installations/network-infrastructure">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Network Infrastructure
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CounterSurveillance;
