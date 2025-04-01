
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
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
        <Partners />
        <Contact />
        
        <div className="py-16 relative bg-sapp-dark overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ 
              backgroundImage: "url('/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png')",
              backgroundBlendMode: "overlay"
            }}
          ></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Protecting what matters most
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              From physical security to cyber defense, SAPP Security delivers comprehensive protection for your organization's most valuable assets.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
