
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;
type NewsSubscriber = Tables<'news_subscribers'>;
type EmailCampaign = Tables<'email_campaigns'>;

export const useNewsData = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [subscribers, setSubscribers] = useState<NewsSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 useNewsData: Starting comprehensive data fetch...');
      
      // Enhanced authentication checks
      if (!isAuthenticated || !user) {
        console.error('❌ useNewsData: User not authenticated');
        throw new Error('Authentication required to access news management');
      }
      
      console.log('🔍 useNewsData: User authenticated:', { 
        userId: user.id, 
        email: user.email 
      });
      
      // Validate session with detailed logging
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('🔍 useNewsData: Session validation:', { 
        hasSession: !!session, 
        sessionError,
        sessionUserId: session?.user?.id 
      });
      
      if (sessionError || !session) {
        console.error('❌ useNewsData: Session validation failed:', sessionError);
        throw new Error('Invalid session. Please sign in again.');
      }
      
      // Test database connectivity and permissions
      console.log('🔍 useNewsData: Testing database connectivity...');
      const { data: connectivityTest, error: connectivityError } = await supabase
        .from('user_roles')
        .select('count')
        .limit(1);
        
      console.log('🔍 useNewsData: Connectivity test result:', { 
        connectivityTest, 
        connectivityError 
      });
      
      if (connectivityError) {
        console.error('❌ useNewsData: Database connectivity failed:', connectivityError);
        throw new Error(`Database connectivity issue: ${connectivityError.message}`);
      }
      
      // Check admin role using the security definer function
      console.log('🔍 useNewsData: Checking admin role...');
      const { data: isAdmin, error: adminCheckError } = await supabase
        .rpc('is_admin_user');
        
      console.log('🔍 useNewsData: Admin check result:', { 
        isAdmin, 
        adminCheckError 
      });
      
      if (adminCheckError) {
        console.error('❌ useNewsData: Admin check failed:', adminCheckError);
        throw new Error(`Failed to verify admin permissions: ${adminCheckError.message}`);
      }
      
      if (!isAdmin) {
        console.error('❌ useNewsData: User is not admin');
        throw new Error('Access denied: Admin role required for news management');
      }
      
      console.log('✅ useNewsData: Admin role verified, proceeding with data fetch...');
      
      // Fetch data with individual error handling and detailed logging
      console.log('🔍 useNewsData: Fetching articles...');
      const articlesPromise = supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('🔍 useNewsData: Fetching subscribers...');
      const subscribersPromise = supabase
        .from('news_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('🔍 useNewsData: Fetching campaigns...');
      const campaignsPromise = supabase
        .from('email_campaigns')
        .select('*, article:news_articles(title)')
        .order('created_at', { ascending: false });

      const [articlesRes, subscribersRes, campaignsRes] = await Promise.allSettled([
        articlesPromise,
        subscribersPromise,
        campaignsPromise
      ]);

      // Handle articles result with detailed logging
      if (articlesRes.status === 'fulfilled') {
        if (articlesRes.value.error) {
          console.error('❌ useNewsData: Articles fetch error:', articlesRes.value.error);
          setArticles([]);
        } else {
          console.log('✅ useNewsData: Articles loaded successfully:', articlesRes.value.data?.length || 0);
          setArticles(articlesRes.value.data || []);
        }
      } else {
        console.error('❌ useNewsData: Articles fetch rejected:', articlesRes.reason);
        setArticles([]);
      }

      // Handle subscribers result with detailed logging
      if (subscribersRes.status === 'fulfilled') {
        if (subscribersRes.value.error) {
          console.error('❌ useNewsData: Subscribers fetch error:', subscribersRes.value.error);
          setSubscribers([]);
        } else {
          console.log('✅ useNewsData: Subscribers loaded successfully:', subscribersRes.value.data?.length || 0);
          setSubscribers(subscribersRes.value.data || []);
        }
      } else {
        console.error('❌ useNewsData: Subscribers fetch rejected:', subscribersRes.reason);
        setSubscribers([]);
      }

      // Handle campaigns result with detailed logging
      if (campaignsRes.status === 'fulfilled') {
        if (campaignsRes.value.error) {
          console.error('❌ useNewsData: Campaigns fetch error:', campaignsRes.value.error);
          setCampaigns([]);
        } else {
          console.log('✅ useNewsData: Campaigns loaded successfully:', campaignsRes.value.data?.length || 0);
          setCampaigns(campaignsRes.value.data || []);
        }
      } else {
        console.error('❌ useNewsData: Campaigns fetch rejected:', campaignsRes.reason);
        setCampaigns([]);
      }

      console.log('✅ useNewsData: Data fetch completed successfully');

    } catch (error) {
      console.error('💥 useNewsData: Unexpected error during data fetch:', error);
      
      // Enhanced error logging for debugging
      console.log('🔍 useNewsData: Error debugging info:', {
        errorType: typeof error,
        errorConstructor: error?.constructor?.name,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        userAuthenticated: isAuthenticated,
        userId: user?.id,
        userEmail: user?.email,
        timestamp: new Date().toISOString()
      });
      
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
