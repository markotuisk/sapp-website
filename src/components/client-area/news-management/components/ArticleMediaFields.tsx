
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { ArticleFormData } from '../hooks/useArticleForm';

interface ArticleMediaFieldsProps {
  formData: ArticleFormData;
  onFieldChange: (field: keyof ArticleFormData, value: any) => void;
}

export const ArticleMediaFields: React.FC<ArticleMediaFieldsProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="space-y-2">
        <Label htmlFor="cover_image">Cover Image URL</Label>
        <Input
          id="cover_image"
          value={formData.cover_image}
          onChange={(e) => onFieldChange('cover_image', e.target.value)}
          placeholder="URL to the cover image"
        />
      </div>

      {/* Open Graph Image */}
      <div className="space-y-2">
        <Label htmlFor="og_image">Open Graph Image URL</Label>
        <Input
          id="og_image"
          value={formData.og_image}
          onChange={(e) => onFieldChange('og_image', e.target.value)}
          placeholder="URL for social media sharing"
        />
      </div>

      {/* Twitter Image */}
      <div className="space-y-2">
        <Label htmlFor="twitter_image">Twitter Image URL</Label>
        <Input
          id="twitter_image"
          value={formData.twitter_image}
          onChange={(e) => onFieldChange('twitter_image', e.target.value)}
          placeholder="URL for Twitter card image"
        />
      </div>
    </div>
  );
};
