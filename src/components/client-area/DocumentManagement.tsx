
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Search, Filter } from 'lucide-react';
import { DocumentsList } from './document-management/DocumentsList';
import { DocumentUploadForm } from './document-management/DocumentUploadForm';
import { DocumentSearchFilter } from './document-management/DocumentSearchFilter';
import { OrganisationAccessGuard } from './user-management/OrganisationAccessGuard';

interface DocumentManagementProps {
  onBack: () => void;
}

export const DocumentManagement: React.FC<DocumentManagementProps> = ({ onBack }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

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
          />
        )}

        {showUploadForm && (
          <DocumentUploadForm onClose={() => setShowUploadForm(false)} />
        )}

        <DocumentsList 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </div>
    </OrganisationAccessGuard>
  );
};
