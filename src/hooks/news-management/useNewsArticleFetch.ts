
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganizationAwareQueries } from './utils/organizationAwareQueries';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const useNewsArticleFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { getOrganizationSpecificQuery } = useOrganizationAwareQueries();

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 useOrganizationAwareNews: Starting organization-aware fetch...');
      
      if (!isAuthenticated || !user) {
        throw new Error('Authentication required');
      }
      
      // Check admin role using the improved function
      const { data: isAdmin, error: adminCheckError } = await supabase
        .rpc('current_user_is_admin');
        
      if (adminCheckError) {
        console.error('❌ Admin check failed:', adminCheckError);
        throw new Error(`Failed to verify admin permissions: ${adminCheckError.message}`);
      }
      
      if (!isAdmin) {
        console.warn('⚠️ User is not admin, access denied');
        throw new Error('Access denied: Admin role required for news management');
      }

      console.log('✅ Admin verification successful, proceeding with fetch...');
      
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
      return data || [];

    } catch (error) {
      console.error('💥 useOrganizationAwareNews: Error:', error);
      toast({
        title: 'Error Loading News Data',
        description: error instanceof Error ? error.message : 'Failed to load news articles',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchArticles,
    isLoading,
    setIsLoading
  };
};
