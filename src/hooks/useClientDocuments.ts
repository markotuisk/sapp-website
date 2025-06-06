
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Simplified ClientDocument interface for compatibility
interface ClientDocument {
  id: string;
  user_id: string;
  file_name: string;
  original_name: string;
  custom_name?: string;
  description?: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  document_type: 'file' | 'link';
  category_id?: string;
  is_confidential: boolean;
  tags: string[];
  uploaded_by: string;
  external_url?: string;
  created_at: string;
  updated_at: string;
}

export const useClientDocuments = () => {
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchDocuments = async () => {
    if (!user) {
      setDocuments([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Client documents feature disabled in simplified mode');
      
      // Return empty array since client_documents table doesn't exist
      setDocuments([]);
      
      toast({
        title: 'Document Management Unavailable',
        description: 'Document management is not available in the simplified client area setup.',
        variant: 'destructive',
      });
    } catch (error) {
      console.error('Document management feature disabled:', error);
      toast({
        title: 'Document Management Unavailable',
        description: 'Document management is not available in the simplified client area setup.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (file: File, metadata: {
    customName?: string;
    description?: string;
    categoryId?: string;
    tags?: string[];
    isConfidential?: boolean;
  }) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    toast({
      title: 'Document Upload Unavailable',
      description: 'Document upload is not available in the simplified client area setup.',
      variant: 'destructive',
    });
    
    throw new Error('Document upload feature not available in simplified mode');
  };

  const addLink = async (metadata: {
    url: string;
    customName: string;
    description?: string;
    categoryId?: string;
    tags?: string[];
  }) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    toast({
      title: 'Link Management Unavailable',
      description: 'Link management is not available in the simplified client area setup.',
      variant: 'destructive',
    });
    
    throw new Error('Link management feature not available in simplified mode');
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  return {
    documents,
    isLoading,
    uploadDocument,
    addLink,
    refetch: fetchDocuments,
  };
};
