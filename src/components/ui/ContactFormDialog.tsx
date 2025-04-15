
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ContactFormStep from '@/components/contact-form/ContactFormStep';
import ContactFormReview from '@/components/contact-form/ContactFormReview';
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
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formattedEmail, setFormattedEmail] = useState('');
  const [visitedPages, setVisitedPages] = useState<Record<string, number>>({});
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

      if (emailResponse.error) {
        console.error('Email sending error:', emailResponse.error);
        throw new Error('Failed to send confirmation emails');
      }

      toast({
        title: "Message sent successfully",
        description: `Your inquiry has been received. Reference number: ${submissionData[0].lead_id}`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Comprehensive contact form submission error:', error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again later or contact support if the issue persists.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToEdit = () => {
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Contact Us" : "Review Your Message"}</DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Please provide your details and we'll get back to you soon." 
              : "Please review your message before sending."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <ContactFormStep 
            form={form} 
            onSubmit={handleFormSubmit} 
          />
        ) : (
          <ContactFormReview 
            formattedEmail={formattedEmail}
            onBackToEdit={handleBackToEdit}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
