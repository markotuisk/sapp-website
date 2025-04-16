
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

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [showPreview, setShowPreview] = useState(false);
  const [submissionData, setSubmissionData] = useState<ContactFormValues | null>(null);
  
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

  const handleConfirmSubmission = () => {
    // This functionality is handled by ContactFormSection
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
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
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
      />
    </section>
  );
};

export default Contact;
