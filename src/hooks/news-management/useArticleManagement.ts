
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

  const validateAuthentication = () => {
    if (!isAuthenticated || !user) {
      throw new Error('You must be signed in to manage articles');
    }
    return true;
  };

  const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating article with data:', articleData);
      
      // Validate authentication first
      validateAuthentication();
      
      // Double-check session is valid
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error('Invalid session. Please sign in again.');
      }
      
      console.log('Session validated, proceeding with article creation...');
      
      const { data, error } = await supabase
        .from('news_articles')
        .insert(articleData)
        .select()
        .single();

      if (error) {
        console.error('Article creation error:', error);
        
        // Provide more specific error messages
        if (error.code === 'RLS_POLICY_VIOLATION' || error.message.includes('policy')) {
          throw new Error('Access denied: Admin privileges required to create articles');
        } else if (error.code === 'PGRST301') {
          throw new Error('Authentication required. Please sign in and try again.');
        } else {
          throw new Error(`Failed to create article: ${error.message}`);
        }
      }

      console.log('Article created successfully:', data);
      setArticles(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Article created successfully',
      });
      return data;
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: 'Error Creating Article',
        description: error instanceof Error ? error.message : 'Failed to create article. Please check your permissions and try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    try {
      console.log('Updating article:', id, updates);
      
      // Validate authentication first
      validateAuthentication();
      
      const { data, error } = await supabase
        .from('news_articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Article update error:', error);
        
        if (error.code === 'RLS_POLICY_VIOLATION' || error.message.includes('policy')) {
          throw new Error('Access denied: Admin privileges required to update articles');
        } else {
          throw new Error(`Failed to update article: ${error.message}`);
        }
      }

      console.log('Article updated successfully:', data);
      setArticles(prev => prev.map(article => 
        article.id === id ? data : article
      ));
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
      return data;
    } catch (error) {
      console.error('Error updating article:', error);
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
      console.log('Deleting article:', id);
      
      // Validate authentication first
      validateAuthentication();
      
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Article deletion error:', error);
        
        if (error.code === 'RLS_POLICY_VIOLATION' || error.message.includes('policy')) {
          throw new Error('Access denied: Admin privileges required to delete articles');
        } else {
          throw new Error(`Failed to delete article: ${error.message}`);
        }
      }

      console.log('Article deleted successfully');
      setArticles(prev => prev.filter(article => article.id !== id));
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting article:', error);
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
