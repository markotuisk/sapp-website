
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Send, Eye, Calendar, AlertCircle } from 'lucide-react';
import { useNewsManagement } from '@/hooks/useNewsManagement';
import { NewsArticleDialog } from './NewsArticleDialog';
import { NewsletterDialog } from './NewsletterDialog';
import { NewsManagementErrorBoundary } from './NewsManagementErrorBoundary';
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
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(articleId);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Article
        </Button>
      </div>

      {/* Error Handling for Empty States */}
      {!isLoading && articles.length === 0 && (
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
      )}

      {/* Articles List */}
      {filteredArticles.length === 0 && articles.length > 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No articles match your search criteria.</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredArticles.map(article => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <div className="flex gap-1">
                      <Badge variant={article.published ? "default" : "secondary"}>
                        {article.published ? 'Published' : 'Draft'}
                      </Badge>
                      {article.featured && (
                        <Badge variant="destructive">Featured</Badge>
                      )}
                      {article.email_sent && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Newsletter Sent
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {article.summary}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    {article.view_count && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.view_count} views
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingArticle(article)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublish(article)}
                  >
                    {article.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  {article.published && !article.email_sent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setNewsletterArticle(article)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <Send className="h-4 w-4" />
                      Newsletter
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

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
