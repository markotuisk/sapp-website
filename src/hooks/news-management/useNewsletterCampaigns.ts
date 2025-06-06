
import { useToast } from '@/hooks/use-toast';

export const useNewsletterCampaigns = (refetchData: () => Promise<void>) => {
  const { toast } = useToast();

  const sendNewsletter = async (articleId: string, subject: string) => {
    try {
      console.log('Newsletter functionality disabled in simplified mode');
      
      toast({
        title: 'Newsletter Feature Unavailable',
        description: 'Newsletter sending is not available in the simplified client area setup.',
        variant: 'destructive',
      });
      
      // Return a mock successful response
      return { success: false, message: 'Feature not available' };
    } catch (error) {
      console.error('Newsletter feature disabled:', error);
      toast({
        title: 'Newsletter Feature Unavailable',
        description: 'Newsletter sending is not available in the simplified client area setup.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    sendNewsletter,
  };
};
