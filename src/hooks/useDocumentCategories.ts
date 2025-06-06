
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  created_at: string;
}

export const useDocumentCategories = () => {
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      console.log('Document categories feature disabled in simplified mode');
      
      // Return empty array since document_categories table doesn't exist
      setCategories([]);
      
      toast({
        title: 'Document Categories Unavailable',
        description: 'Document categories are not available in the simplified client area setup.',
        variant: 'destructive',
      });
    } catch (error) {
      console.error('Document categories feature disabled:', error);
      toast({
        title: 'Document Categories Unavailable',
        description: 'Document categories are not available in the simplified client area setup.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Don't fetch categories automatically since the feature is disabled
    setIsLoading(false);
  }, []);

  return {
    categories,
    isLoading,
    refetch: fetchCategories,
  };
};
