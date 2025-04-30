
import { useEffect, lazy, Suspense, useState, useTransition, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DebugInfo, useComponentLogger, useDebugContext } from '@/utils/debugTools';

// Lazy load components
const AboutHero = lazy(() => import('@/components/home/about/AboutHero'));
const OurStory = lazy(() => import('@/components/home/about/OurStory'));
const OurApproach = lazy(() => import('@/components/home/about/OurApproach'));
const JoinTeam = lazy(() => import('@/components/home/about/JoinTeam'));
const FoundingTeam = lazy(() => import('@/components/home/FoundingTeam'));
const VisionMission = lazy(() => import('@/components/home/VisionMission'));
const Contact = lazy(() => import('@/components/home/contact/Contact'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-12">
    <div className="w-8 h-8 border-4 border-sapp-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const About = () => {
  const location = useLocation();
  const { logEvent } = useComponentLogger('AboutPage');
  const { isDebugMode } = useDebugContext();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    logEvent('PageMount', { path: location.pathname });
    
    // Handle initial scroll position - use setTimeout to ensure DOM is ready
    setTimeout(() => {
      if (location.hash) {
        const id = location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (pageRef.current) {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      }
    }, 100);
    
    // Use startTransition to prevent suspension during initial render
    startTransition(() => {
      setMounted(true);
    });
    
    return () => {
      logEvent('PageUnmount', { path: location.pathname });
    };
  }, [location, logEvent]);

  // Handle hash changes after initial load
  useEffect(() => {
    const handleHashChange = () => {
      if (location.hash) {
        setTimeout(() => {
          const id = location.hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location.hash]);

  const content = (
    <div className="flex flex-col min-h-screen" ref={pageRef}>
      <Navbar />
      <main className="flex-grow" aria-labelledby="about-heading">
        <Suspense fallback={<LoadingFallback />}>
          {mounted && <AboutHero />}
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          {mounted && (
            <>
              <OurStory />
              <FoundingTeam />
              <OurApproach />
              <VisionMission />
              <JoinTeam />
              <div id="contact">
                <Contact />
              </div>
            </>
          )}
        </Suspense>
      </main>
      <Footer />
    </div>
  );

  if (isDebugMode && process.env.NODE_ENV === 'development') {
    return (
      <DebugInfo 
        componentName="AboutPage" 
        data={{
          path: location.pathname,
          sections: [
            'AboutHero',
            'OurStory',
            'FoundingTeam',
            'OurApproach',
            'VisionMission',
            'JoinTeam',
            'Contact'
          ]
        }}
      >
        {content}
      </DebugInfo>
    );
  }

  return content;
};

export default About;
