
import React, { useState } from 'react';
import { useNewsManagement } from '@/hooks/useNewsManagement';
import { NewsArticleDialog } from './NewsArticleDialog';
import { NewsletterDialog } from './NewsletterDialog';
import { NewsManagementErrorBoundary } from './NewsManagementErrorBoundary';
import { NewsArticleHeader } from './components/NewsArticleHeader';
import { NewsArticleList } from './components/NewsArticleList';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

const NewsArticleManagementContent: React.FC = () => {
  const { articles, isLoading, updateArticle, deleteArticle, sendNewsletter } = useNewsManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [newsletterArticle, setNewsletterArticle] = useState<NewsArticle | null>(null);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePublish = async (article: NewsArticle) => {
    try {
      await updateArticle(article.id, {
        published: !article.published,
        published_at: !article.published ? new Date().toISOString() : null
      });
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const handleDelete = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className="space-y-6">
      <NewsArticleHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={() => setShowCreateDialog(true)}
      />

      <NewsArticleList
        articles={articles}
        filteredArticles={filteredArticles}
        isLoading={isLoading}
        onCreateClick={() => setShowCreateDialog(true)}
        onEditArticle={setEditingArticle}
        onTogglePublish={togglePublish}
        onSendNewsletter={setNewsletterArticle}
        onDeleteArticle={handleDelete}
      />

      {/* Dialogs */}
      <NewsArticleDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        article={null}
      />

      <NewsArticleDialog
        isOpen={!!editingArticle}
        onClose={() => setEditingArticle(null)}
        article={editingArticle}
      />

      <NewsletterDialog
        isOpen={!!newsletterArticle}
        onClose={() => setNewsletterArticle(null)}
        article={newsletterArticle}
        onSend={sendNewsletter}
      />
    </div>
  );
};

export const NewsArticleManagement: React.FC = () => {
  return (
    <NewsManagementErrorBoundary>
      <NewsArticleManagementContent />
    </NewsManagementErrorBoundary>
  );
};
