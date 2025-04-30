
import { useEffect, lazy, Suspense } from 'react';
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
  
  useEffect(() => {
    logEvent('PageMount', { path: location.pathname });
    window.scrollTo(0, 0);
    
    return () => {
      logEvent('PageUnmount', { path: location.pathname });
    };
  }, [location, logEvent]);

  const content = (
    <div className="min-h-screen">
      <Navbar />
      <main aria-labelledby="about-heading">
        <AboutHero />
        <Suspense fallback={<LoadingFallback />}>
          <OurStory />
          <FoundingTeam />
          <OurApproach />
          <VisionMission />
          <JoinTeam />
          <div id="contact">
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
