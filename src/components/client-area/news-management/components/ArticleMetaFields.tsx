
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ArticleFormData } from '../hooks/useArticleForm';

interface ArticleMetaFieldsProps {
  formData: ArticleFormData;
  onFieldChange: (field: keyof ArticleFormData, value: any) => void;
}

export const ArticleMetaFields: React.FC<ArticleMetaFieldsProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <div className="space-y-6">
      {/* Meta Description */}
      <div className="space-y-2">
        <Label htmlFor="meta_description">Meta Description</Label>
        <Textarea
          id="meta_description"
          value={formData.meta_description}
          onChange={(e) => onFieldChange('meta_description', e.target.value)}
          placeholder="SEO meta description"
          className="min-h-[60px]"
        />
      </div>

      {/* Canonical URL */}
      <div className="space-y-2">
        <Label htmlFor="canonical_url">Canonical URL</Label>
        <Input
          id="canonical_url"
          value={formData.canonical_url}
          onChange={(e) => onFieldChange('canonical_url', e.target.value)}
          placeholder="Canonical URL for SEO"
        />
      </div>
    </div>
  );
};
