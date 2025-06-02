
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
      console.log('useNewsManagement: Starting data fetch...');
      
      // Check authentication first
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('Authentication error:', authError);
        throw new Error('User not authenticated');
      }
      
      console.log('useNewsManagement: User authenticated:', user.id);
      
      // Check if user has admin role
      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
        
      if (roleError) {
        console.error('Error checking user roles:', roleError);
        throw new Error('Failed to verify user permissions');
      }
      
      console.log('useNewsManagement: User roles:', userRoles);
      
      const hasAdminRole = userRoles?.some(r => r.role === 'admin');
      if (!hasAdminRole) {
        throw new Error('Access denied: Admin role required for news management');
      }
      
      console.log('useNewsManagement: Admin role verified, fetching data...');
      
      // Fetch data with better error handling
      const [articlesRes, subscribersRes, campaignsRes] = await Promise.allSettled([
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

      // Handle articles result
      if (articlesRes.status === 'fulfilled' && !articlesRes.value.error) {
        setArticles(articlesRes.value.data || []);
        console.log('useNewsManagement: Articles loaded:', articlesRes.value.data?.length || 0);
      } else {
        console.error('Articles fetch error:', articlesRes.status === 'fulfilled' ? articlesRes.value.error : articlesRes.reason);
        setArticles([]);
      }

      // Handle subscribers result
      if (subscribersRes.status === 'fulfilled' && !subscribersRes.value.error) {
        setSubscribers(subscribersRes.value.data || []);
        console.log('useNewsManagement: Subscribers loaded:', subscribersRes.value.data?.length || 0);
      } else {
        console.error('Subscribers fetch error:', subscribersRes.status === 'fulfilled' ? subscribersRes.value.error : subscribersRes.reason);
        setSubscribers([]);
      }

      // Handle campaigns result
      if (campaignsRes.status === 'fulfilled' && !campaignsRes.value.error) {
        setCampaigns(campaignsRes.value.data || []);
        console.log('useNewsManagement: Campaigns loaded:', campaignsRes.value.data?.length || 0);
      } else {
        console.error('Campaigns fetch error:', campaignsRes.status === 'fulfilled' ? campaignsRes.value.error : campaignsRes.reason);
        setCampaigns([]);
      }

    } catch (error) {
      console.error('Error fetching news data:', error);
      toast({
        title: 'Error Loading News Data',
        description: error instanceof Error ? error.message : 'Failed to load news management data',
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
      console.log('Creating article with data:', articleData);
      
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase
        .from('news_articles')
        .insert(articleData)
        .select()
        .single();

      if (error) {
        console.error('Article creation error:', error);
        throw new Error(`Failed to create article: ${error.message}`);
      }

      console.log('Article created successfully:', data);
      setArticles(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Article created successfully',
      });
      return data;
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: 'Error Creating Article',
        description: error instanceof Error ? error.message : 'Failed to create article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    try {
      console.log('Updating article:', id, updates);
      
      const { data, error } = await supabase
        .from('news_articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Article update error:', error);
        throw new Error(`Failed to update article: ${error.message}`);
      }

      console.log('Article updated successfully:', data);
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
        title: 'Error Updating Article',
        description: error instanceof Error ? error.message : 'Failed to update article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      console.log('Deleting article:', id);
      
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Article deletion error:', error);
        throw new Error(`Failed to delete article: ${error.message}`);
      }

      console.log('Article deleted successfully');
      setArticles(prev => prev.filter(article => article.id !== id));
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: 'Error Deleting Article',
        description: error instanceof Error ? error.message : 'Failed to delete article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Newsletter campaign
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
      fetchData();
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

  // Subscriber stats
  const getSubscriberStats = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_subscriber_stats');

      if (error) {
        console.error('Error fetching subscriber stats:', error);
        throw error;
      }
      
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
