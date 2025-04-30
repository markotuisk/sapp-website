
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/tscm/HeroSection';
import ServicesSection from '@/components/tscm/ServicesSection';
import AboutSection from '@/components/tscm/AboutSection';
import BenefitsSection from '@/components/tscm/BenefitsSection';
import HowItWorksSection from '@/components/tscm/HowItWorksSection';
import FAQSection from '@/components/tscm/FAQSection';
import TestimonialsSection from '@/components/tscm/TestimonialsSection';
import ContactCTASection from '@/components/tscm/ContactCTASection';

const TSCM = () => {
  return (
    <>
      <Helmet>
        <title>TSCM Inspection Services | SAPP Security</title>
        <meta 
          name="description" 
          content="Professional bug sweeping and TSCM inspections for business and private clients. Protect your conversations and data with our discreet detection services."
        />
        <meta 
          name="keywords" 
          content="TSCM, bug sweeping, surveillance detection, corporate security, technical surveillance countermeasures"
        />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <ServicesSection />
        <TestimonialsSection />
        <AboutSection />
        <FAQSection />
        <ContactCTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default TSCM;
