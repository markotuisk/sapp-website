
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { ClientDocument, DocumentCategory } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

export const useDocuments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setDocuments([]);
      setCategories([]);
      setIsLoading(false);
      return;
    }

    const showFeatureUnavailable = () => {
      console.log('Document management feature disabled in simplified mode');
      toast({
        title: 'Document Management Unavailable',
        description: 'Document management is not available in the simplified client area setup.',
        variant: 'destructive',
      });
      setIsLoading(false);
    };

    showFeatureUnavailable();
  }, [user, toast]);

  const uploadDocument = async (
    file: File,
    categoryId?: string,
    description?: string,
    tags?: string[],
    isConfidential = false,
    customName?: string
  ) => {
    if (!user) return false;

    toast({
      title: 'Document Upload Unavailable',
      description: 'Document upload is not available in the simplified client area setup.',
      variant: 'destructive',
    });
    
    return false;
  };

  const addLinkDocument = async (
    url: string,
    name: string,
    categoryId?: string,
    description?: string,
    tags?: string[],
    isConfidential = false
  ) => {
    if (!user) return false;

    toast({
      title: 'Link Document Unavailable',
      description: 'Link document management is not available in the simplified client area setup.',
      variant: 'destructive',
    });
    
    return false;
  };

  const updateDocument = async (documentId: string, updates: Partial<ClientDocument>) => {
    if (!user) return false;

    toast({
      title: 'Document Update Unavailable',
      description: 'Document updates are not available in the simplified client area setup.',
      variant: 'destructive',
    });
    
    return false;
  };

  const deleteDocument = async (documentId: string) => {
    if (!user) return false;

    toast({
      title: 'Document Delete Unavailable',
      description: 'Document deletion is not available in the simplified client area setup.',
      variant: 'destructive',
    });
    
    return false;
  };

  const downloadDocument = async (doc: ClientDocument) => {
    if (!user) return;

    toast({
      title: 'Document Download Unavailable',
      description: 'Document download is not available in the simplified client area setup.',
      variant: 'destructive',
    });
  };

  return {
    documents,
    categories,
    isLoading,
    uploadDocument,
    addLinkDocument,
    updateDocument,
    deleteDocument,
    downloadDocument,
  };
};
