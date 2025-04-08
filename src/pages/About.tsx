
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutContent from '@/components/home/About';
import FoundingTeam from '@/components/home/FoundingTeam';
import InsightQuote from '@/components/home/InsightQuote';
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when navigating to this page
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AboutContent />
        <InsightQuote />
        <FoundingTeam />
      </main>
      <Footer />
    </div>
  );
};

export default About;
