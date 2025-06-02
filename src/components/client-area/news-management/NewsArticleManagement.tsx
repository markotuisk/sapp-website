
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
import { AlertTriangle, Loader2, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

const NewsArticleManagementContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isAdmin, isLoading: roleLoading, error: roleError } = useRole();
  const { articles, isLoading, updateArticle, deleteArticle, sendNewsletter } = useNewsManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [newsletterArticle, setNewsletterArticle] = useState<NewsArticle | null>(null);

  // Pre-flight authentication checks
  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Shield className="h-5 w-5" />
            Authentication Required
          </CardTitle>
          <CardDescription>
            You must be signed in to access news management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to continue. Only authenticated administrators can manage news articles.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
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

  if (roleError) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Permission Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {roleError}. Please refresh the page or contact support if the issue persists.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!isAdmin()) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Shield className="h-5 w-5" />
            Administrator Access Required
          </CardTitle>
          <CardDescription>
            Only SAPP Security administrators can manage news articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You do not have administrator privileges. Contact SAPP Security support to request admin access.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
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
      // Error handling is already done in the hook
    }
  };

  const handleDelete = async (articleId: string) => {
    try {
      console.log('Deleting article:', articleId);
      await deleteArticle(articleId);
    } catch (error) {
      console.error('Error deleting article:', error);
      // Error handling is already done in the hook
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
