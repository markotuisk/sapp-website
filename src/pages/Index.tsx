import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import { EventSecurity, SecurityAudits, TechnologyInstallations, CyberSecurity } from '@/components/home/ServiceDetail';
import Partners from '@/components/home/Partners';
import Contact from '@/components/home/Contact';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';

const Index = () => {
  const { t } = useLanguage();
  
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
        
        <div className="container mx-auto py-8 text-center bg-gray-50 rounded-lg my-8">
          <h2 className="text-2xl font-bold mb-4">Translation Example</h2>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="font-semibold">Menu Item:</div>
            <div><TranslatedText textKey="home" /></div>
            
            <div className="font-semibold">Section:</div>
            <div><TranslatedText textKey="services" /></div>
            
            <div className="font-semibold">Action:</div>
            <div><TranslatedText textKey="learnMore" /></div>
            
            <div className="font-semibold">Button:</div>
            <div><TranslatedText textKey="contactUs" /></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
