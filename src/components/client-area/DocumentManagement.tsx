
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Search, Filter } from 'lucide-react';
import { DocumentsList } from './document-management/DocumentsList';
import { DocumentUploadForm } from './document-management/DocumentUploadForm';
import { DocumentSearchFilter } from './document-management/DocumentSearchFilter';
import { OrganisationAccessGuard } from './user-management/OrganisationAccessGuard';
import { useDocumentCategories } from '@/hooks/useDocumentCategories';
import { useClientDocuments } from '@/hooks/useClientDocuments';

interface DocumentManagementProps {
  onBack: () => void;
}

export const DocumentManagement: React.FC<DocumentManagementProps> = ({ onBack }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const { categories, isLoading: categoriesLoading } = useDocumentCategories();
  const { documents, isLoading: documentsLoading, uploadDocument, addLink, refetch } = useClientDocuments();

  // Filter documents based on search and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchTerm || 
      doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.custom_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || doc.category_id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoryId?: string) => {
    if (!categoryId) return '#3B82F6';
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#3B82F6';
  };

  const handleShare = (document: any) => {
    // Implement sharing logic
    console.log('Sharing document:', document);
  };

  const handleDownload = (document: any) => {
    // Implement download logic
    console.log('Downloading document:', document);
  };

  const handleDelete = (documentId: string) => {
    // Implement delete logic
    console.log('Deleting document:', documentId);
  };

  const handleEdit = (document: any) => {
    // Implement edit logic
    console.log('Editing document:', document);
  };

  return (
    <OrganisationAccessGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Document Management</h1>
          <div></div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          <Button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {showFilters && (
          <DocumentSearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        )}

        {showUploadForm && (
          <DocumentUploadForm 
            isVisible={showUploadForm}
            onClose={() => setShowUploadForm(false)}
            categories={categories}
            onFileUpload={uploadDocument}
            onLinkAdd={addLink}
          />
        )}

        <DocumentsList 
          documents={filteredDocuments}
          onShare={handleShare}
          onDownload={handleDownload}
          onDelete={handleDelete}
          onEdit={handleEdit}
          getCategoryColor={getCategoryColor}
        />
      </div>
    </OrganisationAccessGuard>
  );
};
