
import React, { useState } from 'react';
import { useNewsManagement } from '@/hooks/useNewsManagement';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { NewsArticleDialog } from './NewsArticleDialog';
import { NewsletterDialog } from './NewsletterDialog';
import { NewsManagementErrorBoundary } from './NewsManagementErrorBoundary';
import { NewsArticleHeader } from './components/NewsArticleHeader';
import { NewsArticleList } from './components/NewsArticleList';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

const NewsArticleManagementContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useRole();
  const { articles, isLoading, updateArticle, deleteArticle, sendNewsletter } = useNewsManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [newsletterArticle, setNewsletterArticle] = useState<NewsArticle | null>(null);

  // Pre-flight authentication checks
  if (!isAuthenticated) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          You must be signed in to access news management. Please sign in and try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p>Verifying admin privileges...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Administrator privileges required. Only SAPP Security administrators can manage news articles.
        </AlertDescription>
      </Alert>
    );
  }

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePublish = async (article: NewsArticle) => {
    try {
      console.log('Toggling publish status for article:', article.id);
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
      console.log('Deleting article:', articleId);
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
