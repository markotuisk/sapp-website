
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;
type NewsSubscriber = Tables<'news_subscribers'>;

export const useNewsData = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [subscribers, setSubscribers] = useState<NewsSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch articles
        const { data: articlesData, error: articlesError } = await supabase
          .from('news_articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (articlesError) throw articlesError;

        // Fetch subscribers
        const { data: subscribersData, error: subscribersError } = await supabase
          .from('news_subscribers')
          .select('*')
          .order('created_at', { ascending: false });

        if (subscribersError) throw subscribersError;

        setArticles(articlesData || []);
        setSubscribers(subscribersData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    articles,
    subscribers,
    isLoading,
    setArticles,
    setSubscribers
  };
};
