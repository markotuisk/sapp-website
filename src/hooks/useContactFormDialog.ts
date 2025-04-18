
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast as sonnerToast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormValues, contactFormSchema } from '@/components/home/contact/types';
import { formatEmailPreview } from '@/components/contact-form/utils';

export function useContactFormDialog(
  onOpenChange: (open: boolean) => void,
  defaultMessage: string = '',
  serviceName: string = ''
) {
  const [step, setStep] = useState(1); // 1: form, 2: preview, 3: success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formattedEmail, setFormattedEmail] = useState('');
  const [visitedPages, setVisitedPages] = useState<Record<string, number>>({});
  const [leadId, setLeadId] = useState('');
  const location = useLocation();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      message: defaultMessage,
    },
  });

  useEffect(() => {
    setVisitedPages(prev => {
      const newPages = { ...prev };
      const currentPath = location.pathname;
      newPages[currentPath] = (newPages[currentPath] || 0) + 1;
      return newPages;
    });
  }, [location.pathname]);

  useEffect(() => {
    // Reset form when dialog opens/closes
    setStep(1);
    form.reset({
      name: '',
      email: '',
      organization: '',
      message: defaultMessage,
    });
  }, [form, defaultMessage]);

  const handleFormSubmit = (values: ContactFormValues) => {
    if (step === 1) {
      setFormattedEmail(formatEmailPreview(values, serviceName));
      setStep(2);
    }
  };

  const handleFinalSubmit = async () => {
    const values = form.getValues();
    setIsSubmitting(true);
    
    try {
      // Log the submission attempt with sanitized data
      console.log('Submitting contact form', {
        name: values.name,
        email: values.email,
        hasOrganization: !!values.organization,
        messageLength: values.message.length,
        route: location.pathname
      });

      // First, submit the contact form to the database
      const { data: submissionData, error: submissionError } = await supabase.rpc('submit_contact_form', {
        name_input: values.name,
        email_input: values.email,
        organization_input: values.organization || null,
        message_input: values.message,
        pages_visited_input: visitedPages
      });

      if (submissionError) {
        console.error('Database submission error:', submissionError);
        throw submissionError;
      }

      console.log('Form successfully submitted to database. Lead ID:', submissionData[0].lead_id);

      // Save the lead ID for the success page
      setLeadId(submissionData[0].lead_id);

      // If database submission is successful, send emails via edge function
      const emailResponse = await supabase.functions.invoke('send-contact-confirmation', {
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          organization: values.organization,
          message: values.message,
          leadId: submissionData[0].lead_id,
          route: location.pathname
        })
      });

      // Log the email response for debugging
      console.log('Email service response:', emailResponse);

      // Check if there's an error with sending emails
      if (emailResponse.error) {
        console.warn('Email sending error:', emailResponse.error);
        // We show a success message but also notify about email issues
        sonnerToast("Message received", 
          `Your inquiry has been logged, but there was an issue sending confirmation emails. Our team will contact you soon.`
        );
      }
      
      // Move to success step regardless of email status (as long as DB submission worked)
      setStep(3);
      
    } catch (error) {
      console.error('Comprehensive contact form submission error:', error);
      sonnerToast.error("Failed to send message", 
        "Please try again later or contact support if the issue persists."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    // Only allow closing if not submitting
    if (!isSubmitting) {
      // If we're on success step, reset everything
      if (step === 3) {
        setTimeout(() => {
          setStep(1);
          form.reset();
        }, 300);
      }
      onOpenChange(open);
    }
  };

  const handleBackToEdit = () => {
    setStep(1);
  };

  const handleSuccessClose = () => {
    onOpenChange(false);
  };

  return {
    step,
    form,
    isSubmitting,
    formattedEmail,
    leadId,
    handleFormSubmit,
    handleFinalSubmit,
    handleDialogClose,
    handleBackToEdit,
    handleSuccessClose
  };
}
