
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('document_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching document categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load document categories',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    refetch: fetchCategories,
  };
};
