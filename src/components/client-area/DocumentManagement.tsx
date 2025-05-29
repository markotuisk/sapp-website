import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Search, 
  ArrowLeft,
  Filter,
  Plus,
  Link,
  Users,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { DocumentSharingDialog } from './DocumentSharingDialog';
import { format } from 'date-fns';

interface DocumentManagementProps {
  onBack: () => void;
}

export const DocumentManagement: React.FC<DocumentManagementProps> = ({ onBack }) => {
  const { documents, categories, isLoading, uploadDocument, addLinkDocument, deleteDocument, downloadDocument } = useDocuments();
  const [showUpload, setShowUpload] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showSharingDialog, setShowSharingDialog] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    categoryId: '',
    description: '',
    tags: '',
    isConfidential: false,
    customName: '',
    linkUrl: '',
    linkName: '',
  });
  const [dragActive, setDragActive] = useState(false);

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
    
    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return;
    }

    const success = await uploadDocument(
      file,
      uploadForm.categoryId || undefined,
      uploadForm.description || undefined,
      uploadForm.tags ? uploadForm.tags.split(',').map(tag => tag.trim()) : undefined,
      uploadForm.isConfidential,
      uploadForm.customName || undefined
    );

    if (success) {
      setShowUpload(false);
      resetForm();
    }
  };

  const handleLinkAdd = async () => {
    if (!uploadForm.linkUrl || !uploadForm.linkName) return;

    const success = await addLinkDocument(
      uploadForm.linkUrl,
      uploadForm.linkName,
      uploadForm.categoryId || undefined,
      uploadForm.description || undefined,
      uploadForm.tags ? uploadForm.tags.split(',').map(tag => tag.trim()) : undefined,
      uploadForm.isConfidential
    );

    if (success) {
      setShowUpload(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setUploadForm({
      categoryId: '',
      description: '',
      tags: '',
      isConfidential: false,
      customName: '',
      linkUrl: '',
      linkName: '',
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (categoryId?: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#6B7280';
  };

  const handleShareDocument = (document: any) => {
    setSelectedDocument(document);
    setShowSharingDialog(true);
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

      {/* Upload Section */}
      {showUpload && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Add Document
            </CardTitle>
            <CardDescription>
              Upload a file or add a link to your secure document storage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={uploadType} onValueChange={(value: 'file' | 'link') => setUploadType(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="link" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Add Link
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="space-y-4">
                {/* Drag and Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Maximum file size: 50MB. Supported formats: PDF, Images, Documents
                  </p>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.txt,.doc,.docx,.xls,.xlsx"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
                
                {/* Custom Name for Files */}
                <div>
                  <Label htmlFor="file-custom-name">Custom Display Name (optional)</Label>
                  <Input
                    id="file-custom-name"
                    value={uploadForm.customName}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, customName: e.target.value }))}
                    placeholder="e.g., Q4 Financial Report"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to use the original filename</p>
                </div>
              </TabsContent>

              <TabsContent value="link" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="link-url">Document URL *</Label>
                    <Input
                      id="link-url"
                      type="url"
                      value={uploadForm.linkUrl}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, linkUrl: e.target.value }))}
                      placeholder="https://example.com/document.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="link-display-name">Document Name *</Label>
                    <Input
                      id="link-display-name"
                      value={uploadForm.linkName}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, linkName: e.target.value }))}
                      placeholder="e.g., Important Contract"
                    />
                    <p className="text-xs text-gray-500 mt-1">This name will be displayed in your document list</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Common Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={uploadForm.categoryId}
                  onValueChange={(value) => setUploadForm(prev => ({ ...prev, categoryId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="urgent, contract, 2024"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={uploadForm.description}
                onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the document"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="confidential"
                  checked={uploadForm.isConfidential}
                  onCheckedChange={(checked) => setUploadForm(prev => ({ ...prev, isConfidential: checked }))}
                />
                <Label htmlFor="confidential">Mark as confidential</Label>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowUpload(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                {uploadType === 'link' && (
                  <Button
                    onClick={handleLinkAdd}
                    disabled={!uploadForm.linkUrl || !uploadForm.linkName}
                  >
                    Add Link
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Documents ({filteredDocuments.length})</CardTitle>
          <CardDescription>
            Manage your uploaded documents and links
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">No documents found</p>
              <p className="text-gray-500">
                {documents.length === 0 
                  ? "Add your first document to get started"
                  : "Try adjusting your search or filter criteria"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocuments.map(document => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {document.document_type === 'link' ? (
                        <ExternalLink className="h-8 w-8 text-blue-500" />
                      ) : (
                        <FileText className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">
                          {document.custom_name || document.original_name}
                        </h4>
                        {document.document_type === 'link' && (
                          <Badge variant="outline" className="text-xs">
                            Link
                          </Badge>
                        )}
                        {document.is_confidential && (
                          <Badge variant="destructive" className="text-xs">
                            Confidential
                          </Badge>
                        )}
                        {document.category && (
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{ borderColor: getCategoryColor(document.category_id) }}
                          >
                            {document.category.name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {document.document_type === 'file' ? (
                          <>
                            {formatFileSize(document.file_size)} • 
                            Uploaded {format(new Date(document.created_at), 'MMM d, yyyy')} • 
                            Downloaded {document.download_count} times
                          </>
                        ) : (
                          <>
                            Added {format(new Date(document.created_at), 'MMM d, yyyy')} • 
                            Viewed {document.download_count} times
                          </>
                        )}
                      </p>
                      {document.description && (
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {document.description}
                        </p>
                      )}
                      {document.tags && document.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {document.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={() => handleShareDocument(document)}
                      size="sm"
                      variant="outline"
                      title="Share document"
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => downloadDocument(document)}
                      size="sm"
                      variant="outline"
                      title={document.document_type === 'link' ? 'Open link' : 'Download'}
                    >
                      {document.document_type === 'link' ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => deleteDocument(document.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <DocumentSharingDialog
        isOpen={showSharingDialog}
        onClose={() => setShowSharingDialog(false)}
        document={selectedDocument}
      />
    </div>
  );
};
