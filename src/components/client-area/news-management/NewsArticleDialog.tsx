
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useNewsManagement } from '@/hooks/useNewsManagement';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

interface NewsArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  article?: NewsArticle | null;
}

export const NewsArticleDialog: React.FC<NewsArticleDialogProps> = ({
  isOpen,
  onClose,
  article
}) => {
  const { createArticle, updateArticle } = useNewsManagement();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image: '',
    category: 'Security',
    author: '',
    author_title: '',
    published: false,
    featured: false,
    tags: [] as string[],
    meta_description: '',
    meta_keywords: [] as string[],
    og_image: '',
    twitter_image: '',
    canonical_url: '',
  });
  
  const [tagInput, setTagInput] = useState('');

  // Common categories for security news
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

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        cover_image: article.cover_image || '',
        category: article.category,
        author: article.author,
        author_title: article.author_title || '',
        published: article.published,
        featured: article.featured,
        tags: article.tags || [],
        meta_description: article.meta_description || '',
        meta_keywords: article.meta_keywords || [],
        og_image: article.og_image || '',
        twitter_image: article.twitter_image || '',
        canonical_url: article.canonical_url || '',
      });
    } else {
      // Reset form for new article
      setFormData({
        title: '',
        slug: '',
        summary: '',
        content: '',
        cover_image: '',
        category: 'Security',
        author: '',
        author_title: '',
        published: false,
        featured: false,
        tags: [],
        meta_description: '',
        meta_keywords: [],
        og_image: '',
        twitter_image: '',
        canonical_url: '',
      });
    }
    setTagInput('');
  }, [article, isOpen]);

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !article) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.summary.trim() || !formData.content.trim() || !formData.author.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields (title, summary, content, and author)',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const articleData = {
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        content: formData.content,
        cover_image: formData.cover_image || null,
        category: formData.category,
        author: formData.author,
        author_title: formData.author_title || null,
        published: formData.published,
        featured: formData.featured,
        tags: formData.tags,
        meta_description: formData.meta_description || null,
        meta_keywords: formData.meta_keywords.length > 0 ? formData.meta_keywords : null,
        og_image: formData.og_image || null,
        twitter_image: formData.twitter_image || null,
        canonical_url: formData.canonical_url || null,
        published_at: formData.published ? new Date().toISOString() : null,
        email_sent: false,
        email_sent_at: null,
        reading_time: null,
        view_count: 0,
        scheduled_at: null,
      };

      if (article) {
        await updateArticle(article.id, articleData);
      } else {
        await createArticle(articleData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving article:', error);
      // Error is already handled in the hook
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {article ? 'Edit Article' : 'Create New Article'}
          </DialogTitle>
          <DialogDescription>
            {article ? 'Update the article information below.' : 'Fill in the details to create a new article.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
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
              onChange={(e) => handleInputChange('slug', e.target.value)}
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
              onChange={(e) => handleInputChange('summary', e.target.value)}
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
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Full article content (supports HTML)"
              required
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Image URL</Label>
            <Input
              id="cover_image"
              value={formData.cover_image}
              onChange={(e) => handleInputChange('cover_image', e.target.value)}
              placeholder="URL to the cover image"
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
                onChange={(e) => handleInputChange('category', e.target.value)}
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
                onChange={(e) => handleInputChange('author', e.target.value)}
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
              onChange={(e) => handleInputChange('author_title', e.target.value)}
              placeholder="Author position or title"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => handleInputChange('meta_description', e.target.value)}
              placeholder="SEO meta description"
              className="min-h-[60px]"
            />
          </div>

          {/* Tags */}
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

          {/* Publication Options */}
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
                onCheckedChange={(checked) => handleInputChange('published', checked)}
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
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (article ? 'Update Article' : 'Create Article')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
