
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import ContactHeader from '@/components/home/contact/ContactHeader';
import ContactFormSection from '@/components/home/contact/ContactFormSection';
import ContactInfoSection from '@/components/home/contact/ContactInfoSection';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us | SAPP Security</title>
        <meta 
          name="description" 
          content="Get in touch with SAPP Security for professional security consultations and services. Contact our expert team today." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/contact" />
        <meta property="og:title" content="Contact Us | SAPP Security" />
        <meta property="og:description" content="Get in touch with SAPP Security for professional security consultations and services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/contact" />
      </Helmet>
      <PublicLayout>
        <ContactHeader />
        <div className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactFormSection />
              <ContactInfoSection />
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  );
};

export default Contact;
