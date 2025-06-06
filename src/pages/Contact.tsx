
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactHeader } from '@/components/home/contact/ContactHeader';
import { ContactFormSection } from '@/components/home/contact/ContactFormSection';
import { ContactInfoSection } from '@/components/home/contact/ContactInfoSection';

const Contact = () => {
  const { ref: headerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [messageLength, setMessageLength] = useState(0);

  const handleSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
    // Handle form submission logic here
  };

  const topics = [
    'General Enquiry',
    'Security Assessment',
    'TSCM Services',
    'Installation Services',
    'Training Requirements',
    'Partnership Opportunities'
  ];

  const contactInfo = {
    phone: '+44 (0) 203 740 7200',
    email: 'info@sappsecurity.com',
    address: {
      line1: 'SAPP Security Ltd',
      line2: '123 Security House',
      line3: 'London, UK',
      postcode: 'SW1A 1AA'
    },
    hours: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: 'Emergency Only'
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact SAPP Security - Get Expert Security Consultation</title>
        <meta name="description" content="Contact SAPP Security for professional security services, TSCM inspections, and security assessments. Expert consultation available." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        
        <main className="pt-20">
          <div ref={headerRef}>
            <ContactHeader inView={inView} />
          </div>
          
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactFormSection 
                onSubmit={handleSubmit}
                topics={topics}
                messageLength={messageLength}
                setMessageLength={setMessageLength}
              />
              <ContactInfoSection 
                contactInfo={contactInfo}
                inView={inView}
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
