
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import AboutHero from '@/components/home/about/AboutHero';
import OurStory from '@/components/home/about/OurStory';
import OurApproach from '@/components/home/about/OurApproach';
import FoundingTeam from '@/components/home/FoundingTeam';
import JoinTeam from '@/components/home/about/JoinTeam';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us | SAPP Security</title>
        <meta 
          name="description" 
          content="Learn about SAPP Security's mission, team, and approach to providing world-class security solutions for organisations globally." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/about" />
        <meta property="og:title" content="About Us | SAPP Security" />
        <meta property="og:description" content="Learn about SAPP Security's mission, team, and approach to security solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/about" />
      </Helmet>
      <PublicLayout>
        <AboutHero />
        <OurStory />
        <OurApproach />
        <FoundingTeam />
        <JoinTeam />
      </PublicLayout>
    </div>
  );
};

export default About;
