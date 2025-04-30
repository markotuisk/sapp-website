
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
    
    // Handle scrolling to the top when the page loads
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
    
    // Use startTransition to prevent suspension during initial render
    startTransition(() => {
      setMounted(true);
    });
    
    // Handle any URL hash for scrolling to sections
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    return () => {
      logEvent('PageUnmount', { path: location.pathname });
    };
  }, [location, logEvent]);

  const content = (
    <div className="min-h-screen" ref={pageRef}>
      <Navbar />
      <main aria-labelledby="about-heading">
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
