
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useOrganizationAwareNews } from '@/hooks/news-management/useOrganizationAwareNews';
import type { Tables } from '@/integrations/supabase/types';

// Import the smaller components
import { useArticleForm } from './hooks/useArticleForm';
import { ArticleFormFields } from './components/ArticleFormFields';
import { ArticleMediaFields } from './components/ArticleMediaFields';
import { ArticleTagsInput } from './components/ArticleTagsInput';
import { ArticleMetaFields } from './components/ArticleMetaFields';
import { ArticlePublishingOptions } from './components/ArticlePublishingOptions';

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
  const { createArticle } = useOrganizationAwareNews();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { formData, updateField, validateForm } = useArticleForm(article);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields (title, summary, content, and author)',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create article data without organization_id - the hook will add it
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
      } as Omit<NewsArticle, 'id' | 'created_at' | 'updated_at' | 'organization_id'>;

      await createArticle(articleData);
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
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="publishing">Publishing</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <ArticleFormFields 
                formData={formData} 
                onFieldChange={updateField} 
              />
              <ArticleTagsInput 
                formData={formData} 
                onFieldChange={updateField} 
              />
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <ArticleMediaFields 
                formData={formData} 
                onFieldChange={updateField} 
              />
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <ArticleMetaFields 
                formData={formData} 
                onFieldChange={updateField} 
              />
            </TabsContent>

            <TabsContent value="publishing" className="space-y-6">
              <ArticlePublishingOptions 
                formData={formData} 
                onFieldChange={updateField} 
              />
            </TabsContent>
          </Tabs>

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
