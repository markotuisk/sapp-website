
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Acronym {
  id: string;
  acronym: string;
  full_name: string;
  description: string;
  category: string;
  url_slug?: string;
  likes?: number;
  dislikes?: number;
  type?: string;
  source_country?: string;
  language?: string;
}

interface AcronymFilters {
  category?: string;
  language?: string;
  type?: string;
}

export const useAcronyms = () => {
  const [acronyms, setAcronyms] = useState<Acronym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AcronymFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const fetchAcronyms = useCallback(async () => {
    try {
      setLoading(true);
      
      // Use the search_acronyms function we created in the migration
      const { data, error: fetchError } = await supabase
        .rpc('search_acronyms', {
          search_query: searchQuery,
          category_filter: filters.category,
          language_filter: filters.language,
          type_filter: filters.type
        });
      
      if (fetchError) {
        throw new Error(fetchError.message);
      }
      
      console.log("Acronyms fetched:", data?.length || 0);
      setAcronyms(data || []);
      
      // If this is the first load, fetch distinct values for filters
      if (!categories.length) {
        fetchDistinctValues();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load acronyms");
      console.error("Error fetching acronyms:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, categories.length]);

  const fetchDistinctValues = async () => {
    try {
      // Fetch categories - using GROUP BY instead of distinct()
      const { data: categoryData, error: categoryError } = await supabase
        .from("technical_acronyms")
        .select("category")
        .order('category');
      
      if (categoryError) throw categoryError;
      
      // Fetch languages - using GROUP BY instead of distinct()
      const { data: languageData, error: languageError } = await supabase
        .from("technical_acronyms")
        .select("language")
        .order('language');
      
      if (languageError) throw languageError;
      
      // Fetch types - using GROUP BY instead of distinct()
      const { data: typeData, error: typeError } = await supabase
        .from("technical_acronyms")
        .select("type")
        .order('type');
      
      if (typeError) throw typeError;
      
      // Extract unique values using Set
      if (categoryData) {
        const uniqueCategories = [...new Set(categoryData.map(item => item.category))].filter(Boolean);
        setCategories(uniqueCategories);
      }
      
      if (languageData) {
        const uniqueLanguages = [...new Set(languageData.map(item => item.language))].filter(Boolean);
        setLanguages(uniqueLanguages);
      }
      
      if (typeData) {
        const uniqueTypes = [...new Set(typeData.map(item => item.type))].filter(Boolean);
        setTypes(uniqueTypes);
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  useEffect(() => {
    fetchAcronyms();
  }, [fetchAcronyms]);

  const findAcronym = (text: string): Acronym | undefined => {
    return acronyms.find(a => a.acronym.toLowerCase() === text.toLowerCase());
  };

  const findAcronymBySlug = async (slug: string): Promise<Acronym | null> => {
    try {
      const { data, error } = await supabase
        .from("technical_acronyms")
        .select("*")
        .eq("url_slug", slug)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error finding acronym by slug:", error);
      return null;
    }
  };

  const incrementLikes = async (acronymId: string) => {
    try {
      const { error } = await supabase
        .rpc('increment_acronym_likes', { acronym_id: acronymId });
      
      if (error) {
        throw error;
      }
      
      // Update the local state
      setAcronyms(prevAcronyms => 
        prevAcronyms.map(acronym => 
          acronym.id === acronymId 
            ? { ...acronym, likes: (acronym.likes || 0) + 1 } 
            : acronym
        )
      );
      
      toast.success("Thanks for your feedback!");
    } catch (error) {
      console.error("Error incrementing likes:", error);
      toast.error("Failed to record your feedback");
    }
  };

  const incrementDislikes = async (acronymId: string) => {
    try {
      const { error } = await supabase
        .rpc('increment_acronym_dislikes', { acronym_id: acronymId });
      
      if (error) {
        throw error;
      }
      
      // Update the local state
      setAcronyms(prevAcronyms => 
        prevAcronyms.map(acronym => 
          acronym.id === acronymId 
            ? { ...acronym, dislikes: (acronym.dislikes || 0) + 1 } 
            : acronym
        )
      );
      
      toast.success("Thanks for your feedback!");
    } catch (error) {
      console.error("Error incrementing dislikes:", error);
      toast.error("Failed to record your feedback");
    }
  };

  return {
    acronyms,
    loading,
    error,
    findAcronym,
    findAcronymBySlug,
    incrementLikes,
    incrementDislikes,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    categories,
    languages,
    types,
    refetch: fetchAcronyms
  };
};
