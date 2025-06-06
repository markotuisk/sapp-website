
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import ContactHeader from '@/components/home/contact/ContactHeader';
import ContactFormSection from '@/components/home/contact/ContactFormSection';
import ContactInfoSection from '@/components/home/contact/ContactInfoSection';
import { useInView } from 'react-intersection-observer';
import { ContactFormValues } from '@/components/home/contact/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [messageLength, setMessageLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: "mapPin",
      title: "Offices",
      details: "United Kingdom (HQ) and Estonia (Engineering)",
    },
    {
      icon: "mail", 
      title: "Email",
      details: "contact@sappsecurity.com",
    },
    {
      icon: "phone",
      title: "Phone", 
      details: "+44 (0) 2070 888 270",
    },
  ];

  const topics = [
    "Event Security",
    "Security Audits", 
    "Installations",
    "Counter-Surveillance",
    "Executive Protection",
    "Cyber Security",
    "General Enquiry"
  ];

  const handleSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.rpc('submit_contact_form', {
        name_input: data.name,
        email_input: data.email,
        organization_input: data.organization || null,
        message_input: data.message,
        pages_visited_input: {}
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll be in touch shortly.",
        duration: 3000,
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Failed to send message", 
        description: "Please try again later or contact support if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" ref={ref}>
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
        <ContactHeader inView={inView} />
        <div className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
        </div>
      </PublicLayout>
    </div>
  );
};

export default Contact;
