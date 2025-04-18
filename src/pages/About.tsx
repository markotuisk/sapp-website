
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/home/about/AboutHero';
import OurStory from '@/components/home/about/OurStory';
import OurApproach from '@/components/home/about/OurApproach';
import TeamAdvisors from '@/components/home/about/TeamAdvisors';
import JoinTeam from '@/components/home/about/JoinTeam';
import FoundingTeam from '@/components/home/FoundingTeam';
import VisionMission from '@/components/home/VisionMission';
import Contact from '@/components/home/contact/Contact';
import { DebugInfo, useComponentLogger } from '@/utils/debugTools';

const About = () => {
  const location = useLocation();
  const { logEvent } = useComponentLogger('AboutPage');
  
  useEffect(() => {
    logEvent('PageMount', { path: location.pathname });
    window.scrollTo(0, 0);
    
    return () => {
      logEvent('PageUnmount', { path: location.pathname });
    };
  }, [location, logEvent]);

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
          'TeamAdvisors',
          'VisionMission',
          'JoinTeam',
          'Contact'
        ]
      }}
    >
      <div className="min-h-screen">
        <Navbar />
        <main>
          <AboutHero />
          <OurStory />
          <FoundingTeam />
          <OurApproach />
          <TeamAdvisors />
          <VisionMission />
          <JoinTeam />
          <div id="contact">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </DebugInfo>
  );
};

export default About;
