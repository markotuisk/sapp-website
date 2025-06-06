
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
  
  // Handle initial page load and scrolling
  useEffect(() => {
    logEvent('PageMount', { path: location.pathname });
    
    // Set mounted state to trigger component rendering
    startTransition(() => {
      setMounted(true);
    });
    
    // Handle initial scroll position with a slight delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          // Use scrollIntoView for hash navigation
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log(`Scrolled to element with id: ${id}`);
        } else {
          console.log(`Element with id ${id} not found`);
        }
      } else {
        // No hash, scroll to top of page
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
        console.log('Scrolled to top of page');
      }
    }, 300); // Increased delay to ensure components are loaded
    
    return () => {
      clearTimeout(timer);
      logEvent('PageUnmount', { path: location.pathname });
    };
  }, [location.pathname, logEvent]);

  // Handle hash changes after initial load
  useEffect(() => {
    const handleHashChange = () => {
      if (location.hash) {
        // Wait for DOM updates to complete
        setTimeout(() => {
          const id = location.hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log(`Hash changed: Scrolled to ${id}`);
          }
        }, 300);
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
      <main className="flex-grow pt-16" aria-labelledby="about-heading">
        <Suspense fallback={<LoadingFallback />}>
          {mounted && <AboutHero />}
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          {mounted && (
            <>
              <div id="our-story">
                <OurStory />
              </div>
              <FoundingTeam />
              <div id="our-approach">
                <OurApproach />
              </div>
              <VisionMission />
              <div id="join-team">
                <JoinTeam />
              </div>
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
          hash: location.hash,
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
