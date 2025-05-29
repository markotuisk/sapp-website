
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

        // Fetch documents with all required fields
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
          // Type cast to ensure compatibility with new columns
          const typedDocuments = (documentsData || []).map(doc => ({
            ...doc,
            document_type: (doc as any).document_type || 'file',
            custom_name: (doc as any).custom_name || null,
            external_url: (doc as any).external_url || null,
          })) as ClientDocument[];
          setDocuments(typedDocuments);
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
    isConfidential = false,
    customName?: string
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
          custom_name: customName,
          document_type: 'file',
        } as any)
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

      // Type cast the returned data with safe property access
      const typedDocument = {
        ...data,
        document_type: (data as any).document_type || 'file',
        custom_name: (data as any).custom_name || null,
        external_url: (data as any).external_url || null,
      } as ClientDocument;

      setDocuments(prev => [typedDocument, ...prev]);
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

  const addLinkDocument = async (
    url: string,
    name: string,
    categoryId?: string,
    description?: string,
    tags?: string[],
    isConfidential = false
  ) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('client_documents')
        .insert({
          user_id: user.id,
          category_id: categoryId,
          file_name: name,
          original_name: name,
          file_path: '',
          file_size: 0,
          mime_type: 'text/uri-list',
          description,
          tags,
          is_confidential: isConfidential,
          uploaded_by: user.id,
          custom_name: name,
          document_type: 'link',
          external_url: url,
        } as any)
        .select(`
          *,
          category:document_categories(*)
        `)
        .single();

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      // Type cast the returned data with safe property access
      const typedDocument = {
        ...data,
        document_type: (data as any).document_type || 'link',
        custom_name: (data as any).custom_name || null,
        external_url: (data as any).external_url || null,
      } as ClientDocument;

      setDocuments(prev => [typedDocument, ...prev]);
      toast({
        title: 'Success',
        description: 'Link document added successfully',
      });
      return true;
    } catch (error) {
      console.error('Error adding link document:', error);
      toast({
        title: 'Error',
        description: 'Failed to add link document',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteDocument = async (documentId: string) => {
    if (!user) return false;

    try {
      const doc = documents.find(d => d.id === documentId);
      if (!doc) return false;

      // Delete from storage only if it's a file
      if (doc.document_type === 'file' && doc.file_path) {
        const { error: storageError } = await supabase.storage
          .from('client-documents')
          .remove([doc.file_path]);

        if (storageError) {
          console.error('Storage deletion error:', storageError);
        }
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

  const downloadDocument = async (doc: ClientDocument) => {
    if (!user) return;

    try {
      if (doc.document_type === 'link' && doc.external_url) {
        // Open link in new tab
        window.open(doc.external_url, '_blank');
        
        // Log activity using type assertion
        await (supabase as any)
          .from('document_activity')
          .insert({
            document_id: doc.id,
            user_id: user.id,
            activity_type: 'view',
          });

        return;
      }

      const { data, error } = await supabase.storage
        .from('client-documents')
        .download(doc.file_path);

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
          download_count: doc.download_count + 1,
          last_downloaded_at: new Date().toISOString(),
        })
        .eq('id', doc.id);

      // Log activity using type assertion
      await (supabase as any)
        .from('document_activity')
        .insert({
          document_id: doc.id,
          user_id: user.id,
          activity_type: 'download',
        });

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.custom_name || doc.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Update local state
      setDocuments(prev =>
        prev.map(d =>
          d.id === doc.id
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
    addLinkDocument,
    deleteDocument,
    downloadDocument,
  };
};
