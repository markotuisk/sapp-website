
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Partners from '@/components/home/Partners';
import Contact from '@/components/home/contact/Contact';
import AboutSAPP from '@/components/home/AboutSAPP';
import QuoteSection from '@/components/home/QuoteSection';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when navigating to this page
    window.scrollTo(0, 0);
    
    // Handle hash navigation if present
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  }, [location]);
  
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
        <Services />
        <QuoteSection />
        <AboutSAPP />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
