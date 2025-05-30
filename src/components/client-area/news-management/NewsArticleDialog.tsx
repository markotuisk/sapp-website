
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Eye } from 'lucide-react';
import { useNewsManagement } from '@/hooks/useNewsManagement';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

interface NewsArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
}

export const NewsArticleDialog: React.FC<NewsArticleDialogProps> = ({
  isOpen,
  onClose,
  article,
}) => {
  const { createArticle, updateArticle } = useNewsManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    author: '',
    author_title: '',
    category: '',
    tags: '',
    cover_image: '',
    meta_description: '',
    meta_keywords: '',
    og_image: '',
    twitter_image: '',
    canonical_url: '',
    featured: false,
    published: false,
  });

  useEffect(() => {
    if (article && isOpen) {
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        summary: article.summary || '',
        content: article.content || '',
        author: article.author || '',
        author_title: article.author_title || '',
        category: article.category || '',
        tags: article.tags ? article.tags.join(', ') : '',
        cover_image: article.cover_image || '',
        meta_description: article.meta_description || '',
        meta_keywords: article.meta_keywords ? article.meta_keywords.join(', ') : '',
        og_image: article.og_image || '',
        twitter_image: article.twitter_image || '',
        canonical_url: article.canonical_url || '',
        featured: article.featured || false,
        published: article.published || false,
      });
    } else if (isOpen) {
      // Reset form for new article
      setFormData({
        title: '',
        slug: '',
        summary: '',
        content: '',
        author: '',
        author_title: '',
        category: '',
        tags: '',
        cover_image: '',
        meta_description: '',
        meta_keywords: '',
        og_image: '',
        twitter_image: '',
        canonical_url: '',
        featured: false,
        published: false,
      });
    }
  }, [article, isOpen]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.summary || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const articleData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(keyword => keyword.trim()).filter(Boolean) : [],
        published_at: formData.published ? new Date().toISOString() : null,
        reading_time: Math.ceil(formData.content.split(' ').length / 200), // Estimate reading time
      };

      if (article) {
        await updateArticle(article.id, articleData);
      } else {
        await createArticle(articleData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
    setFormData(prev => ({ ...prev, tags: updatedTags.join(', ') }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {article ? 'Edit Article' : 'Create New Article'}
          </DialogTitle>
          <DialogDescription>
            {article ? 'Update your news article' : 'Create a new news article with SEO optimization'}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Article title"
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="article-url-slug"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Brief article summary"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Article content (Markdown supported)"
                rows={10}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>
              <div>
                <Label htmlFor="author_title">Author Title</Label>
                <Input
                  id="author_title"
                  value={formData.author_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, author_title: e.target.value }))}
                  placeholder="Author title/position"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Security, Company News"
                />
              </div>
              <div>
                <Label htmlFor="cover_image">Cover Image URL</Label>
                <Input
                  id="cover_image"
                  value={formData.cover_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="security, cybersecurity, SAPP"
              />
              {formData.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
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
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                placeholder="Brief description for search engines (150-160 characters)"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.meta_description.length}/160 characters
              </p>
            </div>

            <div>
              <Label htmlFor="meta_keywords">Meta Keywords</Label>
              <Input
                id="meta_keywords"
                value={formData.meta_keywords}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_keywords: e.target.value }))}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div>
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input
                id="canonical_url"
                value={formData.canonical_url}
                onChange={(e) => setFormData(prev => ({ ...prev, canonical_url: e.target.value }))}
                placeholder="https://sapp-security.com/news/article-slug"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="og_image">Open Graph Image</Label>
                <Input
                  id="og_image"
                  value={formData.og_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, og_image: e.target.value }))}
                  placeholder="https://example.com/og-image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="twitter_image">Twitter Card Image</Label>
                <Input
                  id="twitter_image"
                  value={formData.twitter_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter_image: e.target.value }))}
                  placeholder="https://example.com/twitter-image.jpg"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured">Featured Article</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              />
              <Label htmlFor="published">Publish Article</Label>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (article ? 'Update Article' : 'Create Article')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
