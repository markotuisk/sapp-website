
import { useState } from 'react';
import { AcronymFilters } from '@/types/acronyms';

export const useAcronymFilters = () => {
  const [filters, setFilters] = useState<AcronymFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const resetFilters = () => {
    setFilters({});
  };

  const updateCategory = (category?: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const updateLanguage = (language?: string) => {
    setFilters(prev => ({ ...prev, language }));
  };

  const updateType = (type?: string) => {
    setFilters(prev => ({ ...prev, type }));
  };

  return {
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    resetFilters,
    updateCategory,
    updateLanguage,
    updateType
  };
};
