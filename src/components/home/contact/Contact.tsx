
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useContactForm } from './useContactForm';
import ContactHeader from './ContactHeader';
import ContactInfoSection from './ContactInfoSection';
import ContactFormSection from './ContactFormSection';
import ContactFormPreview from './ContactFormPreview';
import { ContactFormValues } from './types';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [showPreview, setShowPreview] = useState(false);
  const [submissionData, setSubmissionData] = useState<ContactFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    copiedEmail,
    copiedPhone,
    messageLength,
    setMessageLength,
    userMetadata,
    copyToClipboard
  } = useContactForm();

  const onSubmit = (data: ContactFormValues) => {
    setSubmissionData(data);
    setShowPreview(true);
  };

  const handleConfirmSubmission = async () => {
    if (!submissionData) return;
    
    setIsSubmitting(true);
    
    try {
      // Log the submission attempt with sanitized data
      console.log('Submitting contact form', {
        name: submissionData.name,
        email: submissionData.email,
        hasOrganization: !!submissionData.organization,
        messageLength: submissionData.message.length
      });

      // First, submit the contact form to the database
      const { data, error: submissionError } = await supabase.rpc('submit_contact_form', {
        name_input: submissionData.name,
        email_input: submissionData.email,
        organization_input: submissionData.organization || null,
        message_input: submissionData.message,
        pages_visited_input: {} // Empty object since we're not tracking pages
      });

      if (submissionError) {
        console.error('Database submission error:', submissionError);
        throw submissionError;
      }

      console.log('Form successfully submitted to database. Lead ID:', data[0].lead_id);

      // If database submission is successful, send emails via edge function
      const emailResponse = await supabase.functions.invoke('send-contact-confirmation', {
        body: JSON.stringify({
          name: submissionData.name,
          email: submissionData.email,
          organization: submissionData.organization,
          message: submissionData.message,
          leadId: data[0].lead_id
        })
      });

      // Log the email response for debugging
      console.log('Email service response:', emailResponse);

      // Show success toast
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll be in touch shortly.",
        duration: 3000,
      });
      
      // Close preview and reset form
      setShowPreview(false);
      setSubmissionData(null);
      
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
      copyIcon: true,
      copy: () => copyToClipboard("contact@sappsecurity.com", "email"),
      copied: copiedEmail,
    },
    {
      icon: "phone",
      title: "Phone",
      details: "+44 (0) 2070 888 270",
      copyIcon: true,
      copy: () => copyToClipboard("+442070888270", "phone"),
      copied: copiedPhone,
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

  return (
    <section ref={ref} className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute w-96 h-96 rounded-full bg-sapp-blue/5 -top-48 -left-48 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full bg-sapp-lightBlue/5 bottom-0 right-0 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ContactHeader inView={inView} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <ContactInfoSection 
            contactInfo={contactInfo}
            inView={inView}
          />
        </div>

        <div 
          className={cn(
            "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-xl",
            inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          )}
        >
          <ContactFormSection 
            onSubmit={onSubmit}
            topics={topics}
            messageLength={messageLength}
            setMessageLength={setMessageLength}
          />
        </div>
      </div>

      <ContactFormPreview 
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        submissionData={submissionData}
        userMetadata={userMetadata}
        handleConfirmSubmission={handleConfirmSubmission}
        isSubmitting={isSubmitting}
      />
    </section>
  );
};

export default Contact;
