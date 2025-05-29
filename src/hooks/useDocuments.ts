
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { ClientDocument, DocumentCategory } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

export const useDocuments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setDocuments([]);
      setCategories([]);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('document_categories')
          .select('*')
          .order('name');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
        } else {
          setCategories(categoriesData || []);
        }

        // Fetch documents
        const { data: documentsData, error: documentsError } = await supabase
          .from('client_documents')
          .select(`
            *,
            category:document_categories(*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (documentsError) {
          console.error('Error fetching documents:', documentsError);
        } else {
          setDocuments(documentsData || []);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const uploadDocument = async (
    file: File,
    categoryId?: string,
    description?: string,
    tags?: string[],
    isConfidential = false
  ) => {
    if (!user) return false;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('client-documents')
        .upload(fileName, file);

      if (uploadError) {
        toast({
          title: 'Upload Error',
          description: uploadError.message,
          variant: 'destructive',
        });
        return false;
      }

      // Save metadata to database
      const { data, error: dbError } = await supabase
        .from('client_documents')
        .insert({
          user_id: user.id,
          category_id: categoryId,
          file_name: fileName,
          original_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
          description,
          tags,
          is_confidential: isConfidential,
          uploaded_by: user.id,
        })
        .select(`
          *,
          category:document_categories(*)
        `)
        .single();

      if (dbError) {
        toast({
          title: 'Database Error',
          description: dbError.message,
          variant: 'destructive',
        });
        return false;
      }

      setDocuments(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Document uploaded successfully',
      });
      return true;
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload document',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteDocument = async (documentId: string) => {
    if (!user) return false;

    try {
      const document = documents.find(d => d.id === documentId);
      if (!document) return false;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('client-documents')
        .remove([document.file_path]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('client_documents')
        .delete()
        .eq('id', documentId);

      if (dbError) {
        toast({
          title: 'Error',
          description: dbError.message,
          variant: 'destructive',
        });
        return false;
      }

      setDocuments(prev => prev.filter(d => d.id !== documentId));
      toast({
        title: 'Success',
        description: 'Document deleted successfully',
      });
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete document',
        variant: 'destructive',
      });
      return false;
    }
  };

  const downloadDocument = async (document: ClientDocument) => {
    try {
      const { data, error } = await supabase.storage
        .from('client-documents')
        .download(document.file_path);

      if (error) {
        toast({
          title: 'Download Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Update download count
      await supabase
        .from('client_documents')
        .update({
          download_count: document.download_count + 1,
          last_downloaded_at: new Date().toISOString(),
        })
        .eq('id', document.id);

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = document.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Update local state
      setDocuments(prev =>
        prev.map(d =>
          d.id === document.id
            ? { ...d, download_count: d.download_count + 1 }
            : d
        )
      );
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: 'Error',
        description: 'Failed to download document',
        variant: 'destructive',
      });
    }
  };

  return {
    documents,
    categories,
    isLoading,
    uploadDocument,
    deleteDocument,
    downloadDocument,
  };
};
