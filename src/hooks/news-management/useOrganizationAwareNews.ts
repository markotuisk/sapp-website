
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;
type NewsArticleInsert = Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>;

export const useOrganizationAwareNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 useOrganizationAwareNews: Starting simplified fetch...');
      
      if (!isAuthenticated || !user) {
        throw new Error('Authentication required');
      }
      
      console.log('✅ User authenticated, proceeding with simplified fetch...');
      
      // Simple query without organization filtering or admin checks
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ useOrganizationAwareNews: Fetch error:', error);
        throw error;
      }

      console.log('✅ useOrganizationAwareNews: Articles loaded:', data?.length || 0);
      setArticles(data || []);

    } catch (error) {
      console.error('💥 useOrganizationAwareNews: Error:', error);
      toast({
        title: 'Error Loading News Data',
        description: error instanceof Error ? error.message : 'Failed to load news articles',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createArticle = async (articleData: NewsArticleInsert) => {
    try {
      console.log('🚀 createArticle: Starting article creation...');
      
      if (!isAuthenticated || !user) {
        throw new Error('You must be signed in to create articles');
      }
      
      const { data, error } = await supabase
        .from('news_articles')
        .insert(articleData)
        .select()
        .single();

      if (error) {
        console.error('❌ createArticle: Insert failed:', error);
        throw new Error(`Failed to create article: ${error.message}`);
      }

      console.log('✅ createArticle: Article created successfully:', data);
      setArticles(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Article created successfully',
      });
      return data;
    } catch (error) {
      console.error('💥 createArticle: Error:', error);
      toast({
        title: 'Error Creating Article',
        description: error instanceof Error ? error.message : 'Failed to create article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateArticle = async (articleId: string, updates: Partial<NewsArticle>) => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .update(updates)
        .eq('id', articleId)
        .select()
        .single();

      if (error) throw error;

      setArticles(prev => prev.map(article => 
        article.id === articleId ? data : article
      ));

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

  const deleteArticle = async (articleId: string) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;

      setArticles(prev => prev.filter(article => article.id !== articleId));
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

  const sendNewsletter = async (articleId: string) => {
    try {
      console.log('Newsletter functionality disabled in simplified mode');
      
      toast({
        title: 'Newsletter Feature Unavailable',
        description: 'Newsletter sending is not available in the simplified client area setup.',
        variant: 'destructive',
      });

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated]);

  return {
    articles,
    isLoading,
    createArticle,
    updateArticle,
    deleteArticle,
    sendNewsletter,
    refetchArticles: fetchArticles,
    setArticles
  };
};
