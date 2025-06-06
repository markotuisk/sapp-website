
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganizationAwareQueries } from './utils/organizationAwareQueries';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;
type NewsArticleInsert = Omit<NewsArticle, 'id' | 'created_at' | 'updated_at' | 'organization_id'>;

export const useNewsArticleOperations = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { addOrganizationContext } = useOrganizationAwareQueries();

  const createArticle = async (articleData: NewsArticleInsert) => {
    try {
      console.log('🚀 createArticle: Starting organization-aware creation...');
      
      if (!isAuthenticated || !user) {
        throw new Error('You must be signed in to create articles');
      }
      
      // Add organization context to the article
      const articleWithOrg = addOrganizationContext(articleData);
      console.log('📝 createArticle: Article with org context:', articleWithOrg);
      
      const { data, error } = await supabase
        .from('news_articles')
        .insert(articleWithOrg)
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

  return {
    articles,
    setArticles,
    createArticle,
    updateArticle,
    deleteArticle
  };
};
