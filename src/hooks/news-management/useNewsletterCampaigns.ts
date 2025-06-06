
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNewsletterCampaigns = (refetchData: () => Promise<void>) => {
  const { toast } = useToast();

  const sendNewsletter = async (articleId: string, subject: string) => {
    try {
      console.log('Sending newsletter for article:', articleId, 'with subject:', subject);
      
      const { data, error } = await supabase
        .rpc('create_newsletter_campaign', {
          article_id_param: articleId,
          subject_param: subject
        });

      if (error) {
        console.error('Newsletter creation error:', error);
        throw new Error(`Failed to send newsletter: ${error.message}`);
      }

      console.log('Newsletter campaign created successfully');
      toast({
        title: 'Success',
        description: 'Newsletter campaign created successfully',
      });
      
      // Refresh campaigns data
      await refetchData();
      return data;
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast({
        title: 'Error Sending Newsletter',
        description: error instanceof Error ? error.message : 'Failed to send newsletter',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    sendNewsletter,
  };
};
