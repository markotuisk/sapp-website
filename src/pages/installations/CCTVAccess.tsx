
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugToggle } from '@/components/debug';
import CCTVHeroSection from '@/components/installations/cctv/CCTVHeroSection';
import EraEvolutionSection from '@/components/installations/cctv/EraEvolutionSection';
import ArchitectureDecisionSection from '@/components/installations/cctv/ArchitectureDecisionSection';
import VerkadaUbiquitiComparison from '@/components/installations/cctv/VerkadaUbiquitiComparison';
import SecurityCalculatorSection from '@/components/installations/cctv/SecurityCalculatorSection';
import CCTVCTASection from '@/components/installations/cctv/CCTVCTASection';

const CCTVAccess = () => {
  const { isDebugMode } = useDebugContext();
  const [currentSection, setCurrentSection] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Helmet>
        <title>CCTV & Access Control Systems | SAPP Security</title>
        <meta name="description" content="Interactive guide to modern CCTV and access control systems. Compare cloud vs on-premise solutions, explore Verkada vs Ubiquiti, and calculate your security investment." />
      </Helmet>
      <Navbar />
      <DebugToggle />
      
      <main className="pt-20">
        {/* Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Installations
              </Button>
            </Link>
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Speech Privacy & Sound Masking
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <CCTVHeroSection />
        
        {/* Era Evolution Section */}
        <EraEvolutionSection />
        
        {/* Architecture Decision Framework */}
        <ArchitectureDecisionSection />
        
        {/* Verkada vs Ubiquiti Comparison */}
        <VerkadaUbiquitiComparison />
        
        {/* Security Calculator */}
        <SecurityCalculatorSection />
        
        {/* Call to Action */}
        <CCTVCTASection />

        {/* Bottom Navigation */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Installations
              </Button>
            </Link>
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Speech Privacy & Sound Masking
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

export default CCTVAccess;
