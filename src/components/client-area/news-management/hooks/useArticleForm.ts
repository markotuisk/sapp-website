
import { useState, useEffect } from 'react';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export interface ArticleFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  author_title: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  meta_description: string;
  meta_keywords: string[];
  og_image: string;
  twitter_image: string;
  canonical_url: string;
}

export const useArticleForm = (article?: NewsArticle | null) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image: '',
    category: 'Security',
    author: '',
    author_title: '',
    published: false,
    featured: false,
    tags: [],
    meta_description: '',
    meta_keywords: [],
    og_image: '',
    twitter_image: '',
    canonical_url: '',
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        cover_image: article.cover_image || '',
        category: article.category,
        author: article.author,
        author_title: article.author_title || '',
        published: article.published,
        featured: article.featured,
        tags: article.tags || [],
        meta_description: article.meta_description || '',
        meta_keywords: article.meta_keywords || [],
        og_image: article.og_image || '',
        twitter_image: article.twitter_image || '',
        canonical_url: article.canonical_url || '',
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        summary: '',
        content: '',
        cover_image: '',
        category: 'Security',
        author: '',
        author_title: '',
        published: false,
        featured: false,
        tags: [],
        meta_description: '',
        meta_keywords: [],
        og_image: '',
        twitter_image: '',
        canonical_url: '',
      });
    }
  }, [article]);

  // Generate slug from title for new articles
  useEffect(() => {
    if (formData.title && !article) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  const updateField = (field: keyof ArticleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    return !!(formData.title.trim() && formData.summary.trim() && formData.content.trim() && formData.author.trim());
  };

  return {
    formData,
    updateField,
    validateForm,
  };
};
