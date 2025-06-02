
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;
type NewsSubscriber = Tables<'news_subscribers'>;
type EmailCampaign = Tables<'email_campaigns'>;

export const useNewsData = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [subscribers, setSubscribers] = useState<NewsSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('useNewsData: Starting data fetch...');
      
      // Check authentication first
      if (!isAuthenticated || !user) {
        console.error('User not authenticated');
        throw new Error('Authentication required to access news management');
      }
      
      console.log('useNewsData: User authenticated:', user.id);
      
      // Validate session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error('Session validation error:', sessionError);
        throw new Error('Invalid session. Please sign in again.');
      }
      
      // Check if user has admin role using the new security definer function
      const { data: isAdmin, error: adminCheckError } = await supabase
        .rpc('is_admin_user');
        
      if (adminCheckError) {
        console.error('Error checking admin role:', adminCheckError);
        throw new Error('Failed to verify admin permissions');
      }
      
      console.log('useNewsData: Admin check result:', isAdmin);
      
      if (!isAdmin) {
        throw new Error('Access denied: Admin role required for news management');
      }
      
      console.log('useNewsData: Admin role verified, fetching data...');
      
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
        console.log('useNewsData: Articles loaded:', articlesRes.value.data?.length || 0);
      } else {
        console.error('Articles fetch error:', articlesRes.status === 'fulfilled' ? articlesRes.value.error : articlesRes.reason);
        setArticles([]);
      }

      // Handle subscribers result
      if (subscribersRes.status === 'fulfilled' && !subscribersRes.value.error) {
        setSubscribers(subscribersRes.value.data || []);
        console.log('useNewsData: Subscribers loaded:', subscribersRes.value.data?.length || 0);
      } else {
        console.error('Subscribers fetch error:', subscribersRes.status === 'fulfilled' ? subscribersRes.value.error : subscribersRes.reason);
        setSubscribers([]);
      }

      // Handle campaigns result
      if (campaignsRes.status === 'fulfilled' && !campaignsRes.value.error) {
        setCampaigns(campaignsRes.value.data || []);
        console.log('useNewsData: Campaigns loaded:', campaignsRes.value.data?.length || 0);
      } else {
        console.error('Campaigns fetch error:', campaignsRes.status === 'fulfilled' ? campaignsRes.value.error : campaignsRes.reason);
        setCampaigns([]);
      }

    } catch (error) {
      console.error('Error fetching news data:', error);
      toast({
        title: 'Error Loading News Data',
        description: error instanceof Error ? error.message : 'Failed to load news management data. Please check your permissions and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    articles,
    subscribers,
    campaigns,
    isLoading,
    setArticles,
    setSubscribers,
    setCampaigns,
    refetchData: fetchData,
  };
};
