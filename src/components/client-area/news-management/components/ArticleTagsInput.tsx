
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { ArticleFormData } from '../hooks/useArticleForm';

interface ArticleTagsInputProps {
  formData: ArticleFormData;
  onFieldChange: (field: keyof ArticleFormData, value: any) => void;
}

export const ArticleTagsInput: React.FC<ArticleTagsInputProps> = ({
  formData,
  onFieldChange
}) => {
  const [tagInput, setTagInput] = useState('');

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        onFieldChange('tags', [...formData.tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onFieldChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {formData.tags.map((tag) => (
          <div 
            key={tag} 
            className="bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1"
          >
            <span>{tag}</span>
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="text-slate-500 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <Input
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyDown}
        placeholder="Add a tag and press Enter"
      />
    </div>
  );
};
