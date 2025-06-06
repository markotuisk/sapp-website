
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ArticleFormData } from '../hooks/useArticleForm';

interface ArticleFormFieldsProps {
  formData: ArticleFormData;
  onFieldChange: (field: keyof ArticleFormData, value: any) => void;
}

const categories = [
  'Security',
  'Cyber Security',
  'Physical Security',
  'Technology',
  'Company News',
  'Events',
  'Tutorials',
  'Case Studies'
];

export const ArticleFormFields: React.FC<ArticleFormFieldsProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          placeholder="Enter article title"
          required
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">
          Slug <span className="text-red-500">*</span>
        </Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => onFieldChange('slug', e.target.value)}
          placeholder="URL-friendly slug"
          required
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          This will be used in the URL: /news/{formData.slug}
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">
          Summary <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => onFieldChange('summary', e.target.value)}
          placeholder="Brief summary of the article"
          required
          className="min-h-[80px]"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Content <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => onFieldChange('content', e.target.value)}
          placeholder="Full article content (supports HTML)"
          required
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      {/* Category & Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-red-500">*</span>
          </Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => onFieldChange('category', e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">
            Author <span className="text-red-500">*</span>
          </Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => onFieldChange('author', e.target.value)}
            placeholder="Author name"
            required
          />
        </div>
      </div>

      {/* Author Title */}
      <div className="space-y-2">
        <Label htmlFor="author_title">Author Title</Label>
        <Input
          id="author_title"
          value={formData.author_title}
          onChange={(e) => onFieldChange('author_title', e.target.value)}
          placeholder="Author position or title"
        />
      </div>
    </div>
  );
};
