
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useContact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitContactForm = async (formData: {
    name: string;
    email: string;
    organization?: string;
    message: string;
    pages_visited?: any;
  }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('submit_contact_form', {
        name_input: formData.name,
        email_input: formData.email,
        organization_input: formData.organization,
        message_input: formData.message,
        pages_visited_input: formData.pages_visited || {}
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Contact form submission error:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitContactForm,
    isLoading
  };
};
