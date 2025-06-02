
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { ArticleFormData } from '../hooks/useArticleForm';

interface ArticlePublishingOptionsProps {
  formData: ArticleFormData;
  onFieldChange: (field: keyof ArticleFormData, value: any) => void;
}

export const ArticlePublishingOptions: React.FC<ArticlePublishingOptionsProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center justify-between">
        <div>
          <Label>Publish Article</Label>
          <p className="text-sm text-muted-foreground">
            Make this article visible to the public
          </p>
        </div>
        <Switch
          checked={formData.published}
          onCheckedChange={(checked) => onFieldChange('published', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Featured Article</Label>
          <p className="text-sm text-muted-foreground">
            Display prominently on the news page
          </p>
        </div>
        <Switch
          checked={formData.featured}
          onCheckedChange={(checked) => onFieldChange('featured', checked)}
        />
      </div>
    </div>
  );
};
