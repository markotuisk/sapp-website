
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle } from 'lucide-react';
import { NewsArticleCard } from './NewsArticleCard';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

interface NewsArticleListProps {
  articles: NewsArticle[];
  filteredArticles: NewsArticle[];
  isLoading: boolean;
  onCreateClick: () => void;
  onEditArticle: (article: NewsArticle) => void;
  onTogglePublish: (article: NewsArticle) => void;
  onSendNewsletter: (article: NewsArticle) => void;
  onDeleteArticle: (articleId: string) => void;
}

export const NewsArticleList: React.FC<NewsArticleListProps> = ({
  articles,
  filteredArticles,
  isLoading,
  onCreateClick,
  onEditArticle,
  onTogglePublish,
  onSendNewsletter,
  onDeleteArticle
}) => {
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

  // No articles at all
  if (!isLoading && articles.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-4">
            Get started by creating your first news article.
          </p>
          <Button onClick={onCreateClick} className="flex items-center gap-2 mx-auto">
            <Plus className="h-4 w-4" />
            Create First Article
          </Button>
        </CardContent>
      </Card>
    );
  }

  // No filtered results
  if (filteredArticles.length === 0 && articles.length > 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No articles match your search criteria.</p>
        </CardContent>
      </Card>
    );
  }

  // Render articles
  return (
    <div className="grid gap-4">
      {filteredArticles.map(article => (
        <NewsArticleCard
          key={article.id}
          article={article}
          onEdit={onEditArticle}
          onTogglePublish={onTogglePublish}
          onSendNewsletter={onSendNewsletter}
          onDelete={onDeleteArticle}
        />
      ))}
    </div>
  );
};
