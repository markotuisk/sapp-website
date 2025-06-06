
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNewsletterOperations = () => {
  const { toast } = useToast();

  const sendNewsletter = async (articleId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('create_newsletter_campaign', {
          article_id_param: articleId,
          subject_param: 'New Security Update from SAPP',
          template_id_param: 'default'
        });

      if (error) throw error;

      toast({
        title: 'Newsletter Sent',
        description: 'Newsletter campaign created successfully',
      });

      return data;
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast({
        title: 'Error',
        description: 'Failed to send newsletter',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    sendNewsletter
  };
};
