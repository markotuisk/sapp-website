
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

        // Fetch documents - using basic fields that definitely exist
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
          // Safely handle documents without assuming new columns exist
          const processedDocuments = (documentsData || []).map(doc => ({
            ...doc,
            // Provide defaults for potentially missing columns
            document_type: 'file' as const,
            custom_name: null,
            external_url: null,
          })) as ClientDocument[];
          setDocuments(processedDocuments);
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

      // Save metadata to database - only use fields that definitely exist
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
      };

      // Add custom_name if provided (this might fail if column doesn't exist)
      if (customName) {
        (insertData as any).custom_name = customName;
      }

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

      // Create document object with safe defaults
      const newDocument: ClientDocument = {
        ...data,
        document_type: 'file',
        custom_name: customName || null,
        external_url: null,
      };

      setDocuments(prev => [newDocument, ...prev]);
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
      // For now, store link documents as regular documents with a special mime type
      // This allows the feature to work even without new schema columns
      const insertData = {
        user_id: user.id,
        category_id: categoryId,
        file_name: name,
        original_name: name,
        file_path: url, // Store URL in file_path for now
        file_size: 0,
        mime_type: 'text/uri-list',
        description,
        tags,
        is_confidential: isConfidential,
        uploaded_by: user.id,
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

      // Create document object with link-specific properties
      const newDocument: ClientDocument = {
        ...data,
        document_type: 'link',
        custom_name: name,
        external_url: url,
      };

      setDocuments(prev => [newDocument, ...prev]);
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

  const deleteDocument = async (documentId: string) => {
    if (!user) return false;

    try {
      const doc = documents.find(d => d.id === documentId);
      if (!doc) return false;

      // Delete from storage only if it's a file (not a link)
      if (doc.mime_type !== 'text/uri-list' && doc.file_path) {
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
      if (doc.mime_type === 'text/uri-list' || doc.document_type === 'link') {
        // For link documents, open the URL stored in file_path or external_url
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
    deleteDocument,
    downloadDocument,
  };
};
