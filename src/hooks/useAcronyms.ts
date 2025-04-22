
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

  useEffect(() => {
    const fetchAcronyms = async () => {
      try {
        const { data } = await supabase
          .from("technical_acronyms")
          .select("*")
          .order("acronym");
        
        setAcronyms(data || []);
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
    findAcronym,
  };
};
