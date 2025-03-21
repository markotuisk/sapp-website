
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import { EventSecurity, SecurityAudits, TechnologyInstallations, CyberSecurity } from '@/components/home/ServiceDetail';
import Partners from '@/components/home/Partners';
import Contact from '@/components/home/Contact';
import { useEffect } from 'react';

const Index = () => {
  // Apply smooth scrolling behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <EventSecurity />
        <SecurityAudits />
        <TechnologyInstallations />
        <CyberSecurity />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
