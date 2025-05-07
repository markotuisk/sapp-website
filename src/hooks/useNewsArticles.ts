
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string | null;
  category: string;
  author: string;
  author_title: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  featured: boolean;
  tags: string[] | null;
};

export type NewsQueryParams = {
  limit?: number;
  offset?: number;
  category?: string;
  featured?: boolean;
  searchTerm?: string;
};

// Function to get the total count of news articles matching the query
export const fetchNewsArticlesCount = async (params?: NewsQueryParams): Promise<number> => {
  try {
    const { category, featured, searchTerm } = params || {};

    let query = supabase
      .from("news_articles")
      .select("id", { count: "exact" })
      .eq("published", true);

    if (category) {
      query = query.eq("category", category);
    }

    if (featured !== undefined) {
      query = query.eq("featured", featured);
    }

    if (searchTerm) {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error fetching news articles count:", error);
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error("Error in fetchNewsArticlesCount:", error);
    throw error;
  }
};

// Function to fetch a single news article by slug
export const fetchNewsArticleBySlug = async (slug: string): Promise<NewsArticle | null> => {
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching news article:", error);
    throw error;
  }

  return data as NewsArticle | null;
};

// Function to fetch news articles with filters
export const fetchNewsArticles = async (params?: NewsQueryParams): Promise<NewsArticle[]> => {
  try {
    const { 
      limit = 9, 
      offset = 0, 
      category, 
      featured,
      searchTerm
    } = params || {};

    let query = supabase
      .from("news_articles")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (featured !== undefined) {
      query = query.eq("featured", featured);
    }

    if (searchTerm) {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching news articles:", error);
      throw error;
    }

    return data as NewsArticle[];
  } catch (error) {
    console.error("Error in fetchNewsArticles:", error);
    throw error;
  }
};

// Hook to fetch news articles
export const useNewsArticles = (params?: NewsQueryParams) => {
  return useQuery({
    queryKey: ["news-articles", params],
    queryFn: () => fetchNewsArticles(params),
  });
};

// Hook to fetch the total count of news articles
export const useNewsArticlesCount = (params?: NewsQueryParams) => {
  return useQuery({
    queryKey: ["news-articles-count", params],
    queryFn: () => fetchNewsArticlesCount(params),
  });
};

// Hook to fetch a single news article by slug
export const useNewsArticleBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["news-article", slug],
    queryFn: () => (slug ? fetchNewsArticleBySlug(slug) : Promise.resolve(null)),
    enabled: !!slug,
  });
};
