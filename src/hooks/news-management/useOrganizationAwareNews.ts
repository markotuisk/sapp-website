
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganizationAwareData } from '@/hooks/useOrganizationAwareData';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;
type NewsArticleInsert = Omit<NewsArticle, 'id' | 'created_at' | 'updated_at' | 'organization_id'>;

export const useOrganizationAwareNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { getOrganizationSpecificQuery, addOrganizationContext } = useOrganizationAwareData();

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 useOrganizationAwareNews: Starting organization-aware fetch...');
      
      if (!isAuthenticated || !user) {
        throw new Error('Authentication required');
      }
      
      // Check admin role
      const { data: isAdmin, error: adminCheckError } = await supabase
        .rpc('current_user_is_admin');
        
      if (adminCheckError) {
        throw new Error(`Failed to verify admin permissions: ${adminCheckError.message}`);
      }
      
      if (!isAdmin) {
        throw new Error('Access denied: Admin role required for news management');
      }
      
      // Base query for news articles
      const baseQuery = supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply organization-aware filtering
      const query = getOrganizationSpecificQuery(baseQuery, 'news_articles');
      const { data, error } = await query;

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

  const sendNewsletter = async (articleId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('create_newsletter_campaign', {
          article_id_param: articleId,
          subject_param: 'New Security Update from SAPP',
          template_id_param: 'default'
        });

      if (error) throw error;

      toast({
        title: 'Newsletter Sent',
        description: 'Newsletter campaign created successfully',
      });

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
