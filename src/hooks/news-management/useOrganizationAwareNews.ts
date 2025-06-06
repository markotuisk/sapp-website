
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNewsArticleOperations } from './useNewsArticleOperations';
import { useNewsletterOperations } from './useNewsletterOperations';
import { useNewsArticleFetch } from './useNewsArticleFetch';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const useOrganizationAwareNews = () => {
  const { isAuthenticated } = useAuth();
  const { fetchArticles, isLoading } = useNewsArticleFetch();
  const { 
    articles, 
    setArticles, 
    createArticle, 
    updateArticle, 
    deleteArticle 
  } = useNewsArticleOperations();
  const { sendNewsletter } = useNewsletterOperations();

  const refetchArticles = async () => {
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error refetching articles:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refetchArticles();
    }
  }, [isAuthenticated]);

  return {
    articles,
    isLoading,
    createArticle,
    updateArticle,
    deleteArticle,
    sendNewsletter,
    refetchArticles,
    setArticles
  };
};
