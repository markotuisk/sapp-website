
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { NewsArticleDialog } from './NewsArticleDialog';
import { NewsArticleList } from './components/NewsArticleList';
import { useNewsArticleFetch } from '@/hooks/news-management/useNewsArticleFetch';
import { useNewsArticleOperations } from '@/hooks/news-management/useNewsArticleOperations';
import { useRole } from '@/hooks/useRole';

export const NewsArticleManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  
  const { isAdmin } = useRole();
  const { articles, isLoading, refetch } = useNewsArticleFetch();
  const { createArticle, updateArticle, deleteArticle } = useNewsArticleOperations();

  const handleCreateArticle = async (articleData: any) => {
    try {
      await createArticle(articleData);
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  const handleUpdateArticle = async (articleData: any) => {
    if (!editingArticle) return;
    
    try {
      await updateArticle(editingArticle.id, articleData);
      setIsDialogOpen(false);
      setEditingArticle(null);
      refetch();
    } catch (error) {
      console.error('Failed to update article:', error);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      refetch();
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  const handleEditArticle = (article: any) => {
    setEditingArticle(article);
    setIsDialogOpen(true);
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You don't have permission to manage news articles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Articles</h2>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Article
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <NewsArticleList
          articles={articles}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
        />
      )}

      <NewsArticleDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingArticle(null);
          }
        }}
        article={editingArticle}
        onSubmit={editingArticle ? handleUpdateArticle : handleCreateArticle}
      />
    </div>
  );
};
