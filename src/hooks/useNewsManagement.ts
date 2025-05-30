
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;
type NewsSubscriber = Tables<'news_subscribers'>;
type EmailCampaign = Tables<'email_campaigns'>;

export const useNewsManagement = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [subscribers, setSubscribers] = useState<NewsSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      const [articlesRes, subscribersRes, campaignsRes] = await Promise.all([
        supabase
          .from('news_articles')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('news_subscribers')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('email_campaigns')
          .select('*, article:news_articles(title)')
          .order('created_at', { ascending: false })
      ]);

      if (articlesRes.error) throw articlesRes.error;
      if (subscribersRes.error) throw subscribersRes.error;
      if (campaignsRes.error) throw campaignsRes.error;

      setArticles(articlesRes.data || []);
      setSubscribers(subscribersRes.data || []);
      setCampaigns(campaignsRes.data || []);
    } catch (error) {
      console.error('Error fetching news data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load news management data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Article management
  const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .insert(articleData)
        .select()
        .single();

      if (error) throw error;

      setArticles(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Article created successfully',
      });
      return data;
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: 'Error',
        description: 'Failed to create article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setArticles(prev => prev.map(article => 
        article.id === id ? data : article
      ));
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
      return data;
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: 'Error',
        description: 'Failed to update article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setArticles(prev => prev.filter(article => article.id !== id));
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Newsletter campaign
  const sendNewsletter = async (articleId: string, subject: string) => {
    try {
      const { data, error } = await supabase
        .rpc('create_newsletter_campaign', {
          article_id_param: articleId,
          subject_param: subject
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Newsletter campaign created successfully',
      });
      
      // Refresh campaigns data
      fetchData();
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

  // Subscriber stats
  const getSubscriberStats = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_subscriber_stats');

      if (error) throw error;
      return data?.[0] || { total_subscribers: 0, active_subscribers: 0, unsubscribed: 0, recent_signups: 0 };
    } catch (error) {
      console.error('Error fetching subscriber stats:', error);
      return { total_subscribers: 0, active_subscribers: 0, unsubscribed: 0, recent_signups: 0 };
    }
  };

  return {
    articles,
    subscribers,
    campaigns,
    isLoading,
    createArticle,
    updateArticle,
    deleteArticle,
    sendNewsletter,
    getSubscriberStats,
    refetchData: fetchData,
  };
};
