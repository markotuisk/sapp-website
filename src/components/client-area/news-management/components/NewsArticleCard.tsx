
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Send, Eye } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

interface NewsArticleCardProps {
  article: NewsArticle;
  onEdit: (article: NewsArticle) => void;
  onTogglePublish: (article: NewsArticle) => void;
  onSendNewsletter: (article: NewsArticle) => void;
  onDelete: (articleId: string) => void;
}

export const NewsArticleCard: React.FC<NewsArticleCardProps> = ({
  article,
  onEdit,
  onTogglePublish,
  onSendNewsletter,
  onDelete
}) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this article?')) {
      onDelete(article.id);
    }
  };

  return (
    <Card>
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
              onClick={() => onEdit(article)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTogglePublish(article)}
            >
              {article.published ? 'Unpublish' : 'Publish'}
            </Button>
            {article.published && !article.email_sent && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSendNewsletter(article)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Send className="h-4 w-4" />
                Newsletter
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
