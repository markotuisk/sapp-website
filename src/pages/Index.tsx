
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Partners from '@/components/home/Partners';
import Contact from '@/components/home/contact/Contact';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>SAPP Security | Professional Security Solutions</title>
        <meta 
          name="description" 
          content="SAPP Security provides comprehensive security solutions including audits, event security, installations, and cyber security services for organisations worldwide." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/" />
        <meta property="og:title" content="SAPP Security | Professional Security Solutions" />
        <meta property="og:description" content="Comprehensive security solutions including audits, event security, installations, and cyber security services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/" />
      </Helmet>
      <PublicLayout>
        <Hero />
        <About />
        <Services />
        <Partners />
        <Contact />
      </PublicLayout>
    </div>
  );
};

export default Index;
