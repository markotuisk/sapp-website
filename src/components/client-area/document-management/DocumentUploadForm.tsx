
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link, Plus } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import type { DocumentCategory } from '@/types/profile';

interface DocumentUploadFormProps {
  isVisible: boolean;
  onClose: () => void;
  categories: DocumentCategory[];
  onFileUpload: (files: FileList | null) => Promise<void>;
  onLinkAdd: () => Promise<void>;
}

interface UploadFormData {
  categoryId: string;
  description: string;
  tags: string;
  isConfidential: boolean;
  customName: string;
  linkUrl: string;
  linkName: string;
}

export const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  isVisible,
  onClose,
  categories,
}) => {
  const { uploadDocument, addLinkDocument } = useDocuments();
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadForm, setUploadForm] = useState<UploadFormData>({
    categoryId: '',
    description: '',
    tags: '',
    isConfidential: false,
    customName: '',
    linkUrl: '',
    linkName: '',
  });

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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (file.size > 50 * 1024 * 1024) {
      return;
    }

    setIsSubmitting(true);
    try {
      const tags = uploadForm.tags ? uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean) : undefined;
      
      const success = await uploadDocument(
        file,
        uploadForm.categoryId || undefined,
        uploadForm.description || undefined,
        tags,
        uploadForm.isConfidential,
        uploadForm.customName || undefined
      );

      if (success) {
        resetForm();
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkSubmit = async () => {
    if (!uploadForm.linkUrl || !uploadForm.linkName) return;

    setIsSubmitting(true);
    try {
      const tags = uploadForm.tags ? uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean) : undefined;
      
      const success = await addLinkDocument(
        uploadForm.linkUrl,
        uploadForm.linkName,
        uploadForm.categoryId || undefined,
        uploadForm.description || undefined,
        tags,
        uploadForm.isConfidential
      );

      if (success) {
        resetForm();
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
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
                disabled={isSubmitting}
              />
              <Button asChild variant="outline" disabled={isSubmitting}>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
            </div>
            
            <div>
              <Label htmlFor="file-custom-name">Custom Display Name (optional)</Label>
              <Input
                id="file-custom-name"
                value={uploadForm.customName}
                onChange={(e) => setUploadForm(prev => ({ ...prev, customName: e.target.value }))}
                placeholder="e.g., Q4 Financial Report"
                disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="link-name">Document Name *</Label>
                <Input
                  id="link-name"
                  value={uploadForm.linkName}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, linkName: e.target.value }))}
                  placeholder="e.g., Important Contract"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">This name will be displayed in your document list</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={uploadForm.categoryId}
              onValueChange={(value) => setUploadForm(prev => ({ ...prev, categoryId: value }))}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="confidential"
              checked={uploadForm.isConfidential}
              onCheckedChange={(checked) => setUploadForm(prev => ({ ...prev, isConfidential: checked }))}
              disabled={isSubmitting}
            />
            <Label htmlFor="confidential">Mark as confidential</Label>
          </div>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
            {uploadType === 'link' && (
              <Button
                onClick={handleLinkSubmit}
                disabled={!uploadForm.linkUrl || !uploadForm.linkName || isSubmitting}
              >
                <Plus className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Adding...' : 'Add Link'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
