
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link, X } from 'lucide-react';
import { DocumentCategory } from '@/hooks/useDocumentCategories';

interface DocumentUploadFormProps {
  isVisible: boolean;
  onClose: () => void;
  categories: DocumentCategory[];
  onFileUpload: (file: File, metadata: {
    customName?: string;
    description?: string;
    categoryId?: string;
    tags?: string[];
    isConfidential?: boolean;
  }) => Promise<any>;
  onLinkAdd: (metadata: {
    url: string;
    customName: string;
    description?: string;
    categoryId?: string;
    tags?: string[];
  }) => Promise<any>;
}

export const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  isVisible,
  onClose,
  categories,
  onFileUpload,
  onLinkAdd,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [customName, setCustomName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  if (!isVisible) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!customName) {
        setCustomName(file.name);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await onFileUpload(selectedFile, {
        customName,
        description,
        categoryId: selectedCategory || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        isConfidential,
      });
      
      // Reset form
      setSelectedFile(null);
      setCustomName('');
      setDescription('');
      setSelectedCategory('');
      setTags('');
      setIsConfidential(false);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLinkAdd = async () => {
    if (!linkUrl || !customName) return;

    setIsUploading(true);
    try {
      await onLinkAdd({
        url: linkUrl,
        customName,
        description,
        categoryId: selectedCategory || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      
      // Reset form
      setLinkUrl('');
      setCustomName('');
      setDescription('');
      setSelectedCategory('');
      setTags('');
      onClose();
    } catch (error) {
      console.error('Link add failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Add Document</CardTitle>
          <CardDescription>Upload a file or add a link to your documents</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="link">Add Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Select File</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileSelect}
                className="mt-1"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="custom-name">Custom Name</Label>
              <Input
                id="custom-name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter a custom name for this document"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description (optional)"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category (optional)" />
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
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confidential"
                checked={isConfidential}
                onCheckedChange={setIsConfidential}
              />
              <Label htmlFor="confidential">Mark as confidential</Label>
            </div>
            
            <Button 
              onClick={handleFileUpload} 
              disabled={!selectedFile || isUploading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </TabsContent>
          
          <TabsContent value="link" className="space-y-4">
            <div>
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="link-name">Name</Label>
              <Input
                id="link-name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter a name for this link"
              />
            </div>
            
            <div>
              <Label htmlFor="link-description">Description</Label>
              <Textarea
                id="link-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description (optional)"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="link-category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category (optional)" />
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
              <Label htmlFor="link-tags">Tags</Label>
              <Input
                id="link-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas"
              />
            </div>
            
            <Button 
              onClick={handleLinkAdd} 
              disabled={!linkUrl || !customName || isUploading}
              className="w-full"
            >
              <Link className="h-4 w-4 mr-2" />
              {isUploading ? 'Adding...' : 'Add Link'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
