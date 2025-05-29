
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { DocumentSharingDialog } from './DocumentSharingDialog';
import { DocumentUploadForm } from './document-management/DocumentUploadForm';
import { DocumentSearchFilter } from './document-management/DocumentSearchFilter';
import { DocumentsList } from './document-management/DocumentsList';
import { DocumentEditDialog } from './document-management/DocumentEditDialog';
import type { ClientDocument } from '@/types/profile';

interface DocumentManagementProps {
  onBack: () => void;
}

export const DocumentManagement: React.FC<DocumentManagementProps> = ({ onBack }) => {
  const { documents, categories, isLoading, uploadDocument, addLinkDocument, deleteDocument, downloadDocument, updateDocument } = useDocuments();
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<ClientDocument | null>(null);
  const [showSharingDialog, setShowSharingDialog] = useState(false);
  const [editingDocument, setEditingDocument] = useState<ClientDocument | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const filteredDocuments = documents.filter(doc => {
    const displayName = doc.custom_name || doc.original_name;
    const matchesSearch = displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (file.size > 50 * 1024 * 1024) {
      return;
    }

    const success = await uploadDocument(file);

    if (success) {
      setShowUpload(false);
    }
  };

  const handleLinkAdd = async () => {
    // This will be handled by the DocumentUploadForm component
    const success = await addLinkDocument('', '');

    if (success) {
      setShowUpload(false);
    }
  };

  const getCategoryColor = (categoryId?: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#6B7280';
  };

  const handleShareDocument = (document: ClientDocument) => {
    setSelectedDocument(document);
    setShowSharingDialog(true);
  };

  const handleEditDocument = (document: ClientDocument) => {
    setEditingDocument(document);
    setShowEditDialog(true);
  };

  const handleSaveDocument = async (documentId: string, updates: Partial<ClientDocument>) => {
    await updateDocument(documentId, updates);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Document
        </Button>
      </div>

      {/* Upload Form */}
      <DocumentUploadForm
        isVisible={showUpload}
        onClose={() => setShowUpload(false)}
        categories={categories}
        onFileUpload={handleFileUpload}
        onLinkAdd={handleLinkAdd}
      />

      {/* Search and Filter */}
      <DocumentSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Documents List */}
      <DocumentsList
        documents={filteredDocuments}
        onShare={handleShareDocument}
        onDownload={downloadDocument}
        onDelete={deleteDocument}
        onEdit={handleEditDocument}
        getCategoryColor={getCategoryColor}
      />

      <DocumentSharingDialog
        isOpen={showSharingDialog}
        onClose={() => setShowSharingDialog(false)}
        document={selectedDocument}
      />

      <DocumentEditDialog
        document={editingDocument}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        categories={categories}
        onSave={handleSaveDocument}
      />
    </div>
  );
};
