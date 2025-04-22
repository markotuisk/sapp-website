
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AcronymDialog from "./AcronymDialog";

interface Acronym {
  id: string;
  acronym: string;
  full_name: string;
  description: string;
  category: string;
}

const AcronymsResource = () => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sapp-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        Error loading acronyms: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Technical Acronyms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {acronyms.map((acronym) => (
          <Card 
            key={acronym.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAcronymClick(acronym)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-start">
                <span className="text-xl font-bold">{acronym.acronym}</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {acronym.category}
                </span>
              </CardTitle>
              <p className="text-sm text-gray-600">{acronym.full_name}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">
                {acronym.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AcronymDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        acronym={selectedAcronym}
      />
    </div>
  );
};

export default AcronymsResource;
