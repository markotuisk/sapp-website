
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import HeroSection from '@/components/event-security/HeroSection';
import ServicesSection from '@/components/event-security/ServicesSection';
import SecurityProcessSection from '@/components/event-security/SecurityProcessSection';
import QuoteSection from '@/components/event-security/QuoteSection';
import InfoSection from '@/components/event-security/InfoSection';
import CTASection from '@/components/event-security/CTASection';

const EventSecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Event Security Services | SAPP Security</title>
        <meta 
          name="description" 
          content="Professional event security services for corporate events, conferences, and executive gatherings. Comprehensive security planning and execution." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/event-security" />
        <meta property="og:title" content="Event Security Services | SAPP Security" />
        <meta property="og:description" content="Professional event security services for corporate events and executive gatherings." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/event-security" />
      </Helmet>
      <PublicLayout>
        <HeroSection />
        <ServicesSection />
        <SecurityProcessSection />
        <QuoteSection />
        <InfoSection />
        <CTASection />
      </PublicLayout>
    </div>
  );
};

export default EventSecurity;
