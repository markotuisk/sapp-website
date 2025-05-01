
import { useState } from "react";
import { useAcronyms } from "@/hooks/useAcronyms";
import AcronymDialog from "./AcronymDialog";
import AcronymSearch from "./AcronymSearch";
import AcronymFiltersComponent from "./AcronymFilters";
import AcronymsGrid from "./AcronymsGrid";
import AcronymLoadingState from "./AcronymLoadingState";

const AcronymsResource = () => {
  const { 
    acronyms, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters,
    categories,
    languages,
    types,
    incrementLikes,
    incrementDislikes
  } = useAcronyms();
  
  const [selectedAcronym, setSelectedAcronym] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [interactedAcronyms, setInteractedAcronyms] = useState<Record<string, boolean>>({});

  const handleLike = (acronymId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (interactedAcronyms[acronymId]) return;
    
    incrementLikes(acronymId);
    setInteractedAcronyms(prev => ({ ...prev, [acronymId]: true }));
  };

  const handleDislike = (acronymId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (interactedAcronyms[acronymId]) return;
    
    incrementDislikes(acronymId);
    setInteractedAcronyms(prev => ({ ...prev, [acronymId]: true }));
  };

  if (loading) {
    return <AcronymLoadingState />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        Error loading acronyms: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center gap-2 mb-6">
        <AcronymSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <AcronymFiltersComponent 
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          languages={languages}
          types={types}
        />
      </div>

      <AcronymsGrid 
        acronyms={acronyms}
        handleLike={handleLike}
        handleDislike={handleDislike}
        interactedAcronyms={interactedAcronyms}
      />

      <AcronymDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        acronym={selectedAcronym}
      />
    </div>
  );
};

export default AcronymsResource;
