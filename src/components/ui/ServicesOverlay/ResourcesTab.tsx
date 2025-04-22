
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CategorySection from './CategorySection';
import { supabase } from "@/integrations/supabase/client";
import AcronymDialog from "@/components/resources/AcronymDialog";

interface Acronym {
  id: string;
  acronym: string;
  full_name: string;
  description: string;
  category: string;
}

interface ResourceCategory {
  category: string;
  items: {
    name: string;
    description: string;
    link: string;
  }[];
}

interface ResourcesTabProps {
  filteredResources: ResourceCategory[];
  searchQuery: string;
  onItemClick: () => void;
}

const ResourcesTab = ({ filteredResources, searchQuery, onItemClick }: ResourcesTabProps) => {
  const [acronyms, setAcronyms] = useState<Acronym[]>([]);
  const [selectedAcronym, setSelectedAcronym] = useState<Acronym | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcronyms = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("technical_acronyms")
          .select("*")
          .order("acronym");

        if (fetchError) throw new Error(fetchError.message);
        setAcronyms(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load acronyms");
      } finally {
        setLoading(false);
      }
    };

    fetchAcronyms();
  }, []);

  const handleAcronymClick = (acronym: Acronym) => {
    setSelectedAcronym(acronym);
    setDialogOpen(true);
  };

  // Filter acronyms based on search query
  const filteredAcronyms = searchQuery 
    ? acronyms.filter(acronym => 
        acronym.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acronym.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acronym.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : acronyms;

  // Group acronyms by category
  const acronymsByCategory: Record<string, Acronym[]> = {};
  filteredAcronyms.forEach(acronym => {
    if (!acronymsByCategory[acronym.category]) {
      acronymsByCategory[acronym.category] = [];
    }
    acronymsByCategory[acronym.category].push(acronym);
  });

  if (searchQuery && filteredAcronyms.length === 0 && filteredResources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
        <Search className="h-12 w-12 mb-4 opacity-20" />
        <p>No resources match your search</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sapp-blue"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Regular resources */}
      {filteredResources.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 mb-6">
          {filteredResources.map((category) => (
            <CategorySection 
              key={category.category} 
              category={category} 
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}

      {/* Technical Acronyms */}
      {Object.keys(acronymsByCategory).length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Technical Acronyms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(acronymsByCategory).map(([category, acronymsInCategory]) => (
              <div key={category} className="bg-slate-50 rounded-lg overflow-hidden">
                <div className="bg-sapp-blue/10 px-4 py-2">
                  <h3 className="font-medium text-sapp-blue">{category}</h3>
                </div>
                <div className="divide-y">
                  {acronymsInCategory.map((acronym) => (
                    <div 
                      key={acronym.id} 
                      className="flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors cursor-pointer"
                      onClick={() => handleAcronymClick(acronym)}
                    >
                      <div className="pr-2">
                        <h4 className="font-medium text-sapp-dark">{acronym.acronym}</h4>
                        <p className="text-sm text-sapp-gray line-clamp-2">{acronym.full_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AcronymDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        acronym={selectedAcronym}
      />
    </div>
  );
};

export default ResourcesTab;
