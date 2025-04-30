
import React, { useState, useEffect, lazy, Suspense, useTransition } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection from '@/components/installations/HeroSection';

// Lazy load components
const QuoteSection = lazy(() => import('@/components/installations/QuoteSection'));
const SolutionsSection = lazy(() => import('@/components/installations/SolutionsSection'));
const CapabilitiesSection = lazy(() => import('@/components/installations/CapabilitiesSection'));
const DeploymentSection = lazy(() => import('@/components/installations/DeploymentSection'));
const DeploymentConsultationSection = lazy(() => import('@/components/installations/DeploymentConsultationSection'));
const CTASection = lazy(() => import('@/components/installations/CTASection'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-8">
    <div className="w-6 h-6 border-3 border-sapp-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Installations = () => {
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Use startTransition to prevent suspension during initial render
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main aria-labelledby="installations-heading">
        <HeroSection />
        <Suspense fallback={<LoadingFallback />}>
          {mounted && (
            <>
              <SolutionsSection />
              <QuoteSection />
              <CapabilitiesSection />
              <DeploymentSection />
              <DeploymentConsultationSection />
              <CTASection />
            </>
          )}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Installations;
