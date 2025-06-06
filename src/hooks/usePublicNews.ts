
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const usePublicNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublicArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching public articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicArticles();
  }, []);

  return {
    articles,
    isLoading
  };
};
