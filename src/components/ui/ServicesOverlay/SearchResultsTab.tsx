
import React from 'react';
import { Search, FileText, Book, Hash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAcronyms } from '@/hooks/useAcronyms';
import CategorySection from './CategorySection';

interface ServiceCategory {
  category: string;
  items: {
    name: string;
    description: string;
    link: string;
  }[];
}

interface SearchResultsTabProps {
  searchQuery: string;
  filteredServices: ServiceCategory[];
  filteredResources: ServiceCategory[];
  onItemClick: () => void;
}

const SearchResultsTab = ({ 
  searchQuery, 
  filteredServices, 
  filteredResources, 
  onItemClick 
}: SearchResultsTabProps) => {
  const { acronyms } = useAcronyms();
  
  // Filter acronyms based on search query
  const filteredAcronyms = searchQuery.trim() 
    ? acronyms.filter(acronym => 
        acronym.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acronym.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acronym.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acronym.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Calculate total results
  const serviceResults = filteredServices.reduce((total, category) => total + category.items.length, 0);
  const resourceResults = filteredResources.reduce((total, category) => total + category.items.length, 0);
  const acronymResults = filteredAcronyms.length;
  const totalResults = serviceResults + resourceResults + acronymResults;

  if (!searchQuery.trim()) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
        <Search className="h-12 w-12 mb-4 opacity-20" />
        <p>Start typing to search across all content</p>
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
        <Search className="h-12 w-12 mb-4 opacity-20" />
        <p>No results found for "{searchQuery}"</p>
        <p className="text-sm mt-2">Try different keywords or check spelling</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span>Found {totalResults} results for "{searchQuery}"</span>
      </div>

      {/* Services Results */}
      {serviceResults > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-sapp-blue" />
            <h3 className="text-lg font-semibold text-sapp-dark">Services</h3>
            <Badge variant="secondary">{serviceResults}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((category) => (
              <CategorySection 
                key={`service-${category.category}`} 
                category={category} 
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resources Results */}
      {resourceResults > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-sapp-blue" />
            <h3 className="text-lg font-semibold text-sapp-dark">Resources</h3>
            <Badge variant="secondary">{resourceResults}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((category) => (
              <CategorySection 
                key={`resource-${category.category}`} 
                category={category} 
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Acronyms Results */}
      {acronymResults > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-sapp-blue" />
            <h3 className="text-lg font-semibold text-sapp-dark">Acronyms</h3>
            <Badge variant="secondary">{acronymResults}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAcronyms.slice(0, 12).map((acronym) => (
              <Card key={acronym.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sapp-blue">{acronym.acronym}</span>
                    <Badge variant="outline" className="text-xs">
                      {acronym.category}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{acronym.full_name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {acronym.description}
                  </p>
                </div>
              </Card>
            ))}
            {filteredAcronyms.length > 12 && (
              <Card className="p-3 flex items-center justify-center text-sm text-muted-foreground">
                +{filteredAcronyms.length - 12} more acronyms...
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsTab;
