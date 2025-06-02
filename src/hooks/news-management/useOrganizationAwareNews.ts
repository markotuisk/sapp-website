
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganizationAwareData } from '@/hooks/useOrganizationAwareData';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

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

  const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated]);

  return {
    articles,
    isLoading,
    createArticle,
    refetchArticles: fetchArticles,
    setArticles
  };
};
