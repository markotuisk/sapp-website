
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePublicNews } from '@/hooks/usePublicNews';
import { Calendar, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const PublicNews: React.FC = () => {
  const { articles, isLoading } = usePublicNews();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No published articles available at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <Card key={article.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                <CardDescription className="text-base mb-3">
                  {article.summary}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {article.published_at && formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                  </div>
                  {article.reading_time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.reading_time} min read
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant="outline">{article.category}</Badge>
                {article.featured && <Badge>Featured</Badge>}
              </div>
            </div>
          </CardHeader>
          {article.cover_image && (
            <div className="px-6">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          <CardContent className="pt-4">
            <div 
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ 
                __html: article.content.substring(0, 300) + (article.content.length > 300 ? '...' : '')
              }}
            />
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
