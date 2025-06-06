
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const useNewsData = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 useNewsData: Starting data fetch...');
      
      // Simple authentication check
      if (!isAuthenticated || !user) {
        console.error('❌ useNewsData: User not authenticated');
        throw new Error('Authentication required to access news management');
      }
      
      console.log('🔍 useNewsData: User authenticated:', { 
        userId: user.id, 
        email: user.email 
      });
      
      // For simplified setup, skip admin check and proceed with news articles only
      console.log('✅ useNewsData: Proceeding with simplified data fetch...');
      
      // Fetch only news articles in simplified mode
      console.log('🔍 useNewsData: Fetching articles...');
      const { data: articlesData, error: articlesError } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (articlesError) {
        console.error('❌ useNewsData: Articles fetch error:', articlesError);
        setArticles([]);
      } else {
        console.log('✅ useNewsData: Articles loaded successfully:', articlesData?.length || 0);
        setArticles(articlesData || []);
      }

      // For simplified mode, set empty arrays for subscribers and campaigns
      setSubscribers([]);
      setCampaigns([]);

      console.log('✅ useNewsData: Simplified data fetch completed successfully');

    } catch (error) {
      console.error('💥 useNewsData: Unexpected error during data fetch:', error);
      
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
      console.log('🔄 useNewsData: Authentication detected, starting data fetch...');
      fetchData();
    } else {
      console.log('⏳ useNewsData: User not authenticated, skipping data fetch');
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
