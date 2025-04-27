
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface Acronym {
  id: string;
  acronym: string;
  full_name: string;
  description: string;
  category: string;
}

export const useAcronyms = () => {
  const [acronyms, setAcronyms] = useState<Acronym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcronyms = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("technical_acronyms")
          .select("*")
          .order("acronym");
        
        if (fetchError) {
          throw new Error(fetchError.message);
        }
        
        setAcronyms(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load acronyms");
        console.error("Error fetching acronyms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcronyms();
  }, []);

  const findAcronym = (text: string): Acronym | undefined => {
    return acronyms.find(a => a.acronym.toLowerCase() === text.toLowerCase());
  };

  return {
    acronyms,
    loading,
    error,
    findAcronym,
  };
};
