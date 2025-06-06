
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const useSimpleNewsManagement = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch articles',
          variant: 'destructive',
        });
      } else {
        setArticles(data || []);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch articles',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .insert([articleData])
        .select()
        .single();

      if (error) {
        console.error('Error creating article:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      } else {
        toast({
          title: 'Success',
          description: 'Article created successfully',
        });
        await fetchArticles(); // Refresh the list
        return data;
      }
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  };

  const updateArticle = async (id: string, articleData: Partial<NewsArticle>) => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .update(articleData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating article:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      } else {
        toast({
          title: 'Success',
          description: 'Article updated successfully',
        });
        await fetchArticles(); // Refresh the list
        return data;
      }
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting article:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      } else {
        toast({
          title: 'Success',
          description: 'Article deleted successfully',
        });
        await fetchArticles(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    isLoading,
    createArticle,
    updateArticle,
    deleteArticle,
    refreshArticles: fetchArticles,
  };
};
