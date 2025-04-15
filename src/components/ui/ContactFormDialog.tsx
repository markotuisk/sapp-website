
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ContactFormStep from '@/components/contact-form/ContactFormStep';
import ContactFormReview from '@/components/contact-form/ContactFormReview';
import ContactFormSuccess from '@/components/contact-form/ContactFormSuccess';
import { ContactFormValues, contactFormSchema } from '@/components/contact-form/types';
import { formatEmailPreview } from '@/components/contact-form/utils';

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMessage?: string;
  serviceName?: string;
}

export default function ContactFormDialog({ 
  open, 
  onOpenChange, 
  defaultMessage = '',
  serviceName
}: ContactFormDialogProps) {
  const [step, setStep] = useState(1); // 1: form, 2: preview, 3: success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formattedEmail, setFormattedEmail] = useState('');
  const [visitedPages, setVisitedPages] = useState<Record<string, number>>({});
  const [leadId, setLeadId] = useState('');
  const navigate = useNavigate();
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
    if (open) {
      setStep(1);
      form.reset({
        name: '',
        email: '',
        organization: '',
        message: defaultMessage,
      });
    }
  }, [open, form, defaultMessage]);

  const handleFormSubmit = (values: ContactFormValues) => {
    if (step === 1) {
      setFormattedEmail(formatEmailPreview(values, serviceName));
      setStep(2);
      return;
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
        toast({
          title: "Message received",
          description: `Your inquiry has been logged, but there was an issue sending confirmation emails. Our team will contact you soon.`,
        });
      }
      
      // Move to success step regardless of email status (as long as DB submission worked)
      setStep(3);
      
    } catch (error) {
      console.error('Comprehensive contact form submission error:', error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again later or contact support if the issue persists.",
      });
      setIsSubmitting(false);
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

  // Determine dialog content classes based on step
  const getDialogContentClass = () => {
    switch(step) {
      case 3: return "sm:max-w-md"; // Success view is more compact
      default: return "sm:max-w-[525px]"; // Default width for form and preview
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className={`bg-gradient-to-b from-white to-slate-50 ${getDialogContentClass()}`}>
        {step < 3 && (
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-sapp-dark">{step === 1 ? "Contact Us" : "Review Your Message"}</DialogTitle>
              <div className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${step === 1 ? 'bg-sapp-blue' : 'bg-slate-200'}`}></span>
                <span className={`h-2.5 w-2.5 rounded-full ${step === 2 ? 'bg-sapp-blue' : 'bg-slate-200'}`}></span>
              </div>
            </div>
            <DialogDescription>
              {step === 1 
                ? "Please provide your details and we'll get back to you soon." 
                : "Please review your message before sending."}
            </DialogDescription>
          </DialogHeader>
        )}

        {step === 1 ? (
          <ContactFormStep 
            form={form} 
            onSubmit={handleFormSubmit} 
          />
        ) : step === 2 ? (
          <ContactFormReview 
            formattedEmail={formattedEmail}
            onBackToEdit={handleBackToEdit}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <ContactFormSuccess 
            leadId={leadId} 
            onClose={handleSuccessClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
