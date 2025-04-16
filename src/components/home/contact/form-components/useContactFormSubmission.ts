
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ContactFormValues } from '../types';

interface UseContactFormSubmissionProps {
  onSubmit: (data: ContactFormValues) => void;
  resetForm: () => void;
  setMessageLength: (length: number) => void;
}

export function useContactFormSubmission({
  onSubmit,
  resetForm,
  setMessageLength
}: UseContactFormSubmissionProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Submit the form data
    onSubmit(data);
    
    // Show success toast
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll be in touch shortly.",
      duration: 3000,
    });
    
    // Reset form
    resetForm();
    setMessageLength(0);
    setIsSubmitting(false);
  };
  
  return {
    isSubmitting,
    handleSubmit
  };
}
