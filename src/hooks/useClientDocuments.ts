
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { ClientDocument } from '@/types/profile';

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
      const { data, error } = await supabase
        .from('client_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        throw error;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching client documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load documents',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

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

    try {
      // For now, we'll create a document record without actual file upload
      // In a real implementation, you'd upload to Supabase Storage first
      const { data, error } = await supabase
        .from('client_documents')
        .insert({
          user_id: user.id,
          file_name: file.name,
          original_name: file.name,
          custom_name: metadata.customName,
          description: metadata.description,
          file_path: `/uploads/${file.name}`, // Placeholder path
          mime_type: file.type,
          file_size: file.size,
          document_type: 'file' as const,
          category_id: metadata.categoryId,
          is_confidential: metadata.isConfidential || false,
          tags: metadata.tags || [],
          uploaded_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setDocuments(prev => [data, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Document uploaded successfully',
      });

      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload document',
        variant: 'destructive',
      });
      throw error;
    }
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

    try {
      const { data, error } = await supabase
        .from('client_documents')
        .insert({
          user_id: user.id,
          file_name: metadata.customName,
          original_name: metadata.customName,
          custom_name: metadata.customName,
          description: metadata.description,
          file_path: metadata.url,
          mime_type: 'text/html',
          file_size: 0,
          document_type: 'link' as const,
          external_url: metadata.url,
          category_id: metadata.categoryId,
          tags: metadata.tags || [],
          uploaded_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setDocuments(prev => [data, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Link added successfully',
      });

      return data;
    } catch (error) {
      console.error('Error adding link:', error);
      toast({
        title: 'Error',
        description: 'Failed to add link',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    documents,
    isLoading,
    uploadDocument,
    addLink,
    refetch: fetchDocuments,
  };
};
