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

        // Fetch documents with new columns
        const { data: documentsData, error: documentsError } = await supabase
          .from('client_documents')
          .select(`
            id,
            user_id,
            category_id,
            file_name,
            original_name,
            file_path,
            file_size,
            mime_type,
            description,
            tags,
            is_confidential,
            download_count,
            last_downloaded_at,
            uploaded_by,
            created_at,
            updated_at,
            custom_name,
            document_type,
            external_url,
            category:document_categories(*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (documentsError) {
          console.error('Error fetching documents:', documentsError);
          toast({
            title: 'Error',
            description: 'Failed to fetch documents. Some features may not work properly.',
            variant: 'destructive',
          });
        } else {
          // Type assertion to ensure document_type is properly typed
          const typedDocuments = (documentsData || []).map(doc => ({
            ...doc,
            document_type: (doc.document_type as 'file' | 'link') || 'file'
          })) as ClientDocument[];
          setDocuments(typedDocuments);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        toast({
          title: 'Error',
          description: 'Failed to load documents. Please refresh the page.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

      // Save metadata to database with new columns
      const insertData = {
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
        custom_name: customName || null,
        document_type: 'file' as const,
        external_url: null,
      };

      const { data, error: dbError } = await supabase
        .from('client_documents')
        .insert(insertData)
        .select(`
          id,
          user_id,
          category_id,
          file_name,
          original_name,
          file_path,
          file_size,
          mime_type,
          description,
          tags,
          is_confidential,
          download_count,
          last_downloaded_at,
          uploaded_by,
          created_at,
          updated_at,
          custom_name,
          document_type,
          external_url,
          category:document_categories(*)
        `)
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        toast({
          title: 'Database Error',
          description: 'Failed to save document metadata. Please try again.',
          variant: 'destructive',
        });
        
        // Clean up uploaded file
        await supabase.storage
          .from('client-documents')
          .remove([fileName]);
        
        return false;
      }

      // Type assertion for the returned data
      const typedDocument = {
        ...data,
        document_type: data.document_type as 'file' | 'link'
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
        description: 'Failed to upload document. Please try again.',
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
      const insertData = {
        user_id: user.id,
        category_id: categoryId,
        file_name: name,
        original_name: name,
        file_path: url,
        file_size: 0,
        mime_type: 'text/uri-list',
        description,
        tags,
        is_confidential: isConfidential,
        uploaded_by: user.id,
        custom_name: null,
        document_type: 'link' as const,
        external_url: url,
      };

      const { data, error } = await supabase
        .from('client_documents')
        .insert(insertData)
        .select(`
          id,
          user_id,
          category_id,
          file_name,
          original_name,
          file_path,
          file_size,
          mime_type,
          description,
          tags,
          is_confidential,
          download_count,
          last_downloaded_at,
          uploaded_by,
          created_at,
          updated_at,
          custom_name,
          document_type,
          external_url,
          category:document_categories(*)
        `)
        .single();

      if (error) {
        console.error('Database error:', error);
        toast({
          title: 'Error',
          description: 'Failed to add link document. Please try again.',
          variant: 'destructive',
        });
        return false;
      }

      // Type assertion for the returned data
      const typedDocument = {
        ...data,
        document_type: data.document_type as 'file' | 'link'
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
        description: 'Failed to add link document. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateDocument = async (documentId: string, updates: Partial<ClientDocument>) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('client_documents')
        .update(updates)
        .eq('id', documentId)
        .eq('user_id', user.id)
        .select(`
          id,
          user_id,
          category_id,
          file_name,
          original_name,
          file_path,
          file_size,
          mime_type,
          description,
          tags,
          is_confidential,
          download_count,
          last_downloaded_at,
          uploaded_by,
          created_at,
          updated_at,
          custom_name,
          document_type,
          external_url,
          category:document_categories(*)
        `)
        .single();

      if (error) {
        console.error('Update error:', error);
        toast({
          title: 'Error',
          description: 'Failed to update document. Please try again.',
          variant: 'destructive',
        });
        return false;
      }

      // Type assertion for the returned data
      const typedDocument = {
        ...data,
        document_type: data.document_type as 'file' | 'link'
      } as ClientDocument;

      setDocuments(prev =>
        prev.map(doc => doc.id === documentId ? typedDocument : doc)
      );
      
      toast({
        title: 'Success',
        description: 'Document updated successfully',
      });
      return true;
    } catch (error) {
      console.error('Error updating document:', error);
      toast({
        title: 'Error',
        description: 'Failed to update document. Please try again.',
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

      // Delete from storage only if it's a file (not a link)
      if (doc.document_type !== 'link' && doc.file_path) {
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
      // Handle link documents
      if (doc.document_type === 'link') {
        // For link documents, open the URL stored in external_url
        const linkUrl = doc.external_url || doc.file_path;
        if (linkUrl) {
          window.open(linkUrl, '_blank');
          
          // Update view count
          await supabase
            .from('client_documents')
            .update({
              download_count: doc.download_count + 1,
              last_downloaded_at: new Date().toISOString(),
            })
            .eq('id', doc.id);

          // Update local state
          setDocuments(prev =>
            prev.map(d =>
              d.id === doc.id
                ? { ...d, download_count: d.download_count + 1 }
                : d
            )
          );
        }
        return;
      }

      // Handle file documents
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
    updateDocument,
    deleteDocument,
    downloadDocument,
  };
};
