
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle } from 'lucide-react';
import { NewsArticleCard } from './NewsArticleCard';
import { NewsArticleDialog } from '../NewsArticleDialog';
import { useOrganizationAwareNews } from '@/hooks/news-management/useOrganizationAwareNews';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

interface NewsArticleListProps {
  articles: NewsArticle[];
}

export const NewsArticleList: React.FC<NewsArticleListProps> = ({
  articles
}) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const { updateArticle, deleteArticle, sendNewsletter } = useOrganizationAwareNews();
  const { toast } = useToast();

  const handleEditArticle = (article: NewsArticle) => {
    setEditingArticle(article);
  };

  const handleTogglePublish = async (article: NewsArticle) => {
    try {
      await updateArticle(article.id, { published: !article.published });
      toast({
        title: 'Success',
        description: `Article ${article.published ? 'unpublished' : 'published'} successfully`,
      });
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const handleSendNewsletter = async (article: NewsArticle) => {
    try {
      await sendNewsletter(article.id);
      toast({
        title: 'Success',
        description: 'Newsletter sent successfully',
      });
    } catch (error) {
      console.error('Error sending newsletter:', error);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // No articles at all
  if (articles.length === 0) {
    return (
      <>
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first news article.
            </p>
            <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Create First Article
            </Button>
          </CardContent>
        </Card>

        {showCreateDialog && (
          <NewsArticleDialog
            isOpen={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
          />
        )}
      </>
    );
  }

  // Render articles
  return (
    <>
      <div className="grid gap-4">
        {articles.map(article => (
          <NewsArticleCard
            key={article.id}
            article={article}
            onEdit={handleEditArticle}
            onTogglePublish={handleTogglePublish}
            onSendNewsletter={handleSendNewsletter}
            onDelete={handleDeleteArticle}
          />
        ))}
      </div>

      {editingArticle && (
        <NewsArticleDialog
          isOpen={!!editingArticle}
          onClose={() => setEditingArticle(null)}
          article={editingArticle}
        />
      )}
    </>
  );
};
