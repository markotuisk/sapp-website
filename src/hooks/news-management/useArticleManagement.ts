
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const useArticleManagement = (
  setArticles: React.Dispatch<React.SetStateAction<NewsArticle[]>>
) => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const validateAuthentication = async () => {
    console.log('🔍 validateAuthentication: Starting validation...');
    
    if (!isAuthenticated || !user) {
      console.error('❌ validateAuthentication: User not authenticated');
      throw new Error('You must be signed in to manage articles');
    }
    
    console.log('✅ validateAuthentication: User authenticated:', user.id);
    
    // Get current session with detailed logging
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('🔍 validateAuthentication: Session check result:', { 
      hasSession: !!session, 
      sessionError, 
      userId: session?.user?.id,
      userEmail: session?.user?.email 
    });
    
    if (sessionError || !session) {
      console.error('❌ validateAuthentication: Invalid session:', sessionError);
      throw new Error('Invalid session. Please sign in again.');
    }
    
    // Test if we can call our security definer function
    console.log('🔍 validateAuthentication: Testing admin check function...');
    const { data: isAdminResult, error: adminError } = await supabase.rpc('is_admin_user');
    console.log('🔍 validateAuthentication: Admin check result:', { isAdminResult, adminError });
    
    if (adminError) {
      console.error('❌ validateAuthentication: Error checking admin status:', adminError);
      throw new Error(`Admin check failed: ${adminError.message}`);
    }
    
    if (!isAdminResult) {
      console.error('❌ validateAuthentication: User is not admin');
      throw new Error('Admin privileges required');
    }
    
    console.log('✅ validateAuthentication: All checks passed');
    return true;
  };

  const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('🚀 createArticle: Starting article creation...');
      console.log('📝 createArticle: Article data:', articleData);
      
      // Enhanced authentication validation
      await validateAuthentication();
      
      console.log('🔍 createArticle: Testing basic database connectivity...');
      
      // Test basic connectivity first
      const { data: testData, error: testError } = await supabase
        .from('user_roles')
        .select('count')
        .limit(1);
        
      console.log('🔍 createArticle: Database connectivity test:', { testData, testError });
      
      if (testError) {
        console.error('❌ createArticle: Database connectivity failed:', testError);
        throw new Error(`Database connectivity issue: ${testError.message}`);
      }
      
      console.log('🔍 createArticle: Attempting to insert article...');
      
      // Attempt the actual insert with detailed error logging
      const { data, error } = await supabase
        .from('news_articles')
        .insert(articleData)
        .select()
        .single();

      if (error) {
        console.error('❌ createArticle: Insert failed with error:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        // Enhanced error categorization
        if (error.code === 'RLS_POLICY_VIOLATION' || error.message.includes('policy')) {
          throw new Error('Access denied: Admin privileges required to create articles');
        } else if (error.code === 'PGRST301') {
          throw new Error('Authentication required. Please sign in and try again.');
        } else if (error.message.includes('permission denied')) {
          throw new Error(`Database permission error: ${error.message}. Please contact support.`);
        } else {
          throw new Error(`Failed to create article: ${error.message}`);
        }
      }

      console.log('✅ createArticle: Article created successfully:', data);
      setArticles(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Article created successfully',
      });
      return data;
    } catch (error) {
      console.error('💥 createArticle: Unexpected error:', error);
      
      // Enhanced error reporting
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.log('🔍 createArticle: Error details for debugging:', {
        errorType: typeof error,
        errorConstructor: error?.constructor?.name,
        errorMessage,
        userAuthenticated: isAuthenticated,
        userId: user?.id,
        userEmail: user?.email
      });
      
      toast({
        title: 'Error Creating Article',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    try {
      console.log('🔄 updateArticle: Starting update for article:', id);
      
      await validateAuthentication();
      
      const { data, error } = await supabase
        .from('news_articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ updateArticle: Update failed:', error);
        
        if (error.code === 'RLS_POLICY_VIOLATION' || error.message.includes('policy')) {
          throw new Error('Access denied: Admin privileges required to update articles');
        } else {
          throw new Error(`Failed to update article: ${error.message}`);
        }
      }

      console.log('✅ updateArticle: Article updated successfully:', data);
      setArticles(prev => prev.map(article => 
        article.id === id ? data : article
      ));
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
      return data;
    } catch (error) {
      console.error('💥 updateArticle: Error:', error);
      toast({
        title: 'Error Updating Article',
        description: error instanceof Error ? error.message : 'Failed to update article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      console.log('🗑️ deleteArticle: Starting deletion for article:', id);
      
      await validateAuthentication();
      
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ deleteArticle: Deletion failed:', error);
        
        if (error.code === 'RLS_POLICY_VIOLATION' || error.message.includes('policy')) {
          throw new Error('Access denied: Admin privileges required to delete articles');
        } else {
          throw new Error(`Failed to delete article: ${error.message}`);
        }
      }

      console.log('✅ deleteArticle: Article deleted successfully');
      setArticles(prev => prev.filter(article => article.id !== id));
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    } catch (error) {
      console.error('💥 deleteArticle: Error:', error);
      toast({
        title: 'Error Deleting Article',
        description: error instanceof Error ? error.message : 'Failed to delete article',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    createArticle,
    updateArticle,
    deleteArticle,
  };
};
