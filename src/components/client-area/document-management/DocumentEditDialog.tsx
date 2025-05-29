
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { ClientDocument, DocumentCategory } from '@/types/profile';

interface DocumentEditDialogProps {
  document: ClientDocument | null;
  isOpen: boolean;
  onClose: () => void;
  categories: DocumentCategory[];
  onSave: (documentId: string, updates: Partial<ClientDocument>) => Promise<void>;
}

export const DocumentEditDialog: React.FC<DocumentEditDialogProps> = ({
  document,
  isOpen,
  onClose,
  categories,
  onSave,
}) => {
  const [editForm, setEditForm] = useState({
    custom_name: '',
    description: '',
    category_id: '',
    tags: '',
    is_confidential: false,
    external_url: '',
  });

  // Initialize form when document changes
  useEffect(() => {
    if (document && isOpen) {
      console.log('DocumentEditDialog: Initializing form with document:', document);
      setEditForm({
        custom_name: document.custom_name || '',
        description: document.description || '',
        category_id: document.category_id || '',
        tags: document.tags ? document.tags.join(', ') : '',
        is_confidential: document.is_confidential || false,
        external_url: document.external_url || '',
      });
    }
  }, [document, isOpen]);

  const handleSave = async () => {
    if (!document) return;

    const updates: Partial<ClientDocument> = {
      custom_name: editForm.custom_name || null,
      description: editForm.description || null,
      category_id: editForm.category_id || null,
      tags: editForm.tags ? editForm.tags.split(',').map(tag => tag.trim()).filter(Boolean) : null,
      is_confidential: editForm.is_confidential,
    };

    // Only include external_url for link documents
    if (document.document_type === 'link') {
      updates.external_url = editForm.external_url || null;
    }

    console.log('DocumentEditDialog: Saving updates:', updates);
    await onSave(document.id, updates);
    onClose();
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = editForm.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
    setEditForm(prev => ({ ...prev, tags: updatedTags.join(', ') }));
  };

  if (!document) return null;

  const isLinkDocument = document.document_type === 'link';
  const displayName = document.custom_name || document.original_name || 'Untitled Document';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogDescription>
            Update the details for "{displayName}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Badge variant="outline" className={isLinkDocument ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"}>
              {isLinkDocument ? 'Link' : 'File'}
            </Badge>
            {document.is_confidential && (
              <Badge variant="destructive">Confidential</Badge>
            )}
          </div>

          <div>
            <Label htmlFor="custom_name">Display Name</Label>
            <Input
              id="custom_name"
              value={editForm.custom_name}
              onChange={(e) => setEditForm(prev => ({ ...prev, custom_name: e.target.value }))}
              placeholder={document.original_name}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to use original name: "{document.original_name}"
            </p>
          </div>

          {isLinkDocument && (
            <div>
              <Label htmlFor="external_url">Link URL</Label>
              <Input
                id="external_url"
                type="url"
                value={editForm.external_url}
                onChange={(e) => setEditForm(prev => ({ ...prev, external_url: e.target.value }))}
                placeholder="https://example.com/document"
              />
            </div>
          )}

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editForm.description}
              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the document"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={editForm.category_id}
              onValueChange={(value) => setEditForm(prev => ({ ...prev, category_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Category</SelectItem>
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
              value={editForm.tags}
              onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="urgent, contract, 2024"
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            {editForm.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {editForm.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="confidential"
              checked={editForm.is_confidential}
              onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, is_confidential: checked }))}
            />
            <Label htmlFor="confidential">Mark as confidential</Label>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
