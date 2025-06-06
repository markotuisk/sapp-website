
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NewsArticleDialog } from './NewsArticleDialog';
import { NewsArticleList } from './components/NewsArticleList';
import { useOrganizationAwareNews } from '@/hooks/news-management/useOrganizationAwareNews';
import { useOrganizationAwareData } from '@/hooks/useOrganizationAwareData';

export const NewsArticleManagement: React.FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { articles, isLoading } = useOrganizationAwareNews();
  const { organizationId, canAccessCrossOrganization } = useOrganizationAwareData();

  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(articles.map(article => article.category))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                News Article Management
                {!canAccessCrossOrganization && (
                  <Badge variant="outline" className="ml-2">
                    Organization Scope
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {canAccessCrossOrganization 
                  ? 'Manage news articles across all organizations'
                  : 'Manage news articles for your organization'
                }
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Article
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredArticles.length} of {articles.length} articles</span>
            {organizationId && !canAccessCrossOrganization && (
              <Badge variant="secondary">
                Organization-specific view
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <NewsArticleList articles={filteredArticles} />

      {showCreateDialog && (
        <NewsArticleDialog
          isOpen={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
        />
      )}
    </div>
  );
};
