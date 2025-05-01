
import { useState, useEffect, useCallback } from 'react';
import { Acronym } from '@/types/acronyms';
import { useAcronymFilters } from './useAcronymFilters';
import { useAcronymFeedback } from './useAcronymFeedback';
import { 
  fetchAcronymsFromApi, 
  fetchDistinctValuesFromApi,
  findAcronymBySlugFromApi 
} from '@/api/acronymsApi';

export const useAcronyms = () => {
  const [acronyms, setAcronyms] = useState<Acronym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  
  const { 
    filters, 
    setFilters, 
    searchQuery, 
    setSearchQuery 
  } = useAcronymFilters();

  // Create a callback to update local acronym data
  const updateLocalAcronym = useCallback((acronymId: string, changes: Partial<Acronym>) => {
    setAcronyms(prevAcronyms => 
      prevAcronyms.map(acronym => 
        acronym.id === acronymId 
          ? { 
              ...acronym,
              // If the value is undefined, increment it, otherwise use the provided value
              likes: changes.likes === undefined ? (acronym.likes || 0) + 1 : changes.likes,
              dislikes: changes.dislikes === undefined ? (acronym.dislikes || 0) + 1 : changes.dislikes,
              ...Object.entries(changes)
                .filter(([_, value]) => value !== undefined)
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
            } 
          : acronym
      )
    );
  }, []);
  
  const { 
    interactedAcronyms,
    incrementLikes, 
    incrementDislikes 
  } = useAcronymFeedback(updateLocalAcronym);

  const fetchAcronyms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchAcronymsFromApi(searchQuery, filters);
      setAcronyms(data);
      
      // If this is the first load, fetch distinct values for filters
      if (!categories.length) {
        fetchDistinctValues();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load acronyms");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, categories.length]);

  const fetchDistinctValues = async () => {
    try {
      const { categories: newCategories, languages: newLanguages, types: newTypes } = 
        await fetchDistinctValuesFromApi();
      
      setCategories(newCategories);
      setLanguages(newLanguages);
      setTypes(newTypes);
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
    return findAcronymBySlugFromApi(slug);
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
    interactedAcronyms,
    refetch: fetchAcronyms
  };
};
