
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const useNewsArticleOperations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createArticle = async (articleData: Partial<NewsArticle>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .insert([articleData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating article:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const updateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating article:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting article:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createArticle,
    updateArticle,
    deleteArticle,
    isLoading
  };
};
