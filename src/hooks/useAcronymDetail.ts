import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Acronym } from "@/types/acronyms";
import { useAcronyms } from "@/hooks/useAcronyms";
import { toast } from "sonner";

export const useAcronymDetail = (slug: string | undefined) => {
  const location = useLocation();
  const [acronym, setAcronym] = useState<Acronym | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const { findAcronymBySlug, incrementLikes, incrementDislikes } = useAcronyms();

  // Use passed state if available to avoid flashing
  const passedAcronymData = location.state?.acronymData;

  useEffect(() => {
    // Reset state when slug changes
    setLoading(true);
    setError(null);
    
    // If we have data passed via router state, use it immediately
    if (passedAcronymData) {
      console.log("Using passed acronym data", passedAcronymData);
      setAcronym(passedAcronymData);
      setLoading(false);
      return;
    }
    
    const loadAcronym = async () => {
      if (!slug) {
        setError("No acronym specified");
        setLoading(false);
        return;
      }
      
      try {
        console.log("Loading acronym data for slug:", slug);
        
        // Clean the slug by removing any 'what-is-' prefixes
        const cleanedSlug = slug.replace(/^(what-is-)+/i, "");
        console.log("Cleaned slug:", cleanedSlug);
        
        // Important: Use the full cleaned slug (including any descriptive parts)
        // This allows URLs like "bs-bespoke-sweep" to work correctly
        const acronymData = await findAcronymBySlug(cleanedSlug);
        
        if (!acronymData) {
          console.error("Acronym not found for slug:", cleanedSlug);
          
          // If the full slug doesn't work, try just the first part (the acronym itself)
          if (cleanedSlug.includes("-")) {
            const acronymPart = cleanedSlug.split("-")[0];
            console.log("Trying with just the acronym part:", acronymPart);
            
            const fallbackData = await findAcronymBySlug(acronymPart);
            
            if (!fallbackData) {
              setError("Acronym not found");
            } else {
              console.log("Found acronym using fallback:", fallbackData.acronym);
              setAcronym(fallbackData);
            }
          } else {
            setError("Acronym not found");
          }
        } else {
          console.log("Acronym data loaded successfully:", acronymData.acronym);
          setAcronym(acronymData);
        }
      } catch (err) {
        console.error("Error loading acronym:", err);
        setError("Failed to load acronym details");
      } finally {
        setLoading(false);
      }
    };
    
    loadAcronym();
  }, [slug, findAcronymBySlug, passedAcronymData]);

  const handleCopyLink = () => {
    try {
      // Create a stable URL path that won't cause recursion
      const baseUrl = window.location.origin;
      
      // If we have an acronym, use its acronym property (lowercase) for a consistent URL
      // Otherwise fall back to the current slug
      let linkSlug;
      
      if (acronym) {
        // Use just the acronym for a clean, consistent URL
        linkSlug = acronym.acronym.toLowerCase();
      } else {
        // Fall back to current slug, cleaned of any prefixes
        const cleanSlug = slug?.replace(/^(what-is-)+/i, "") || "";
        linkSlug = cleanSlug;
      }
      
      const url = `${baseUrl}/acronyms/what-is-${linkSlug}`;
      
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy to clipboard:", err);
          toast.error("Could not copy link");
        });
    } catch (err) {
      console.error("Error generating link:", err);
    }
  };

  const handleLike = () => {
    if (userInteracted || !acronym) return;
    incrementLikes(acronym.id);
    setUserInteracted(true);
    // Update local state
    setAcronym({...acronym, likes: (acronym.likes || 0) + 1});
    toast.success("Thanks for your feedback!");
  };

  const handleDislike = () => {
    if (userInteracted || !acronym) return;
    incrementDislikes(acronym.id);
    setUserInteracted(true);
    // Update local state
    setAcronym({...acronym, dislikes: (acronym.dislikes || 0) + 1});
    toast.success("Thanks for your feedback!");
  };

  return {
    acronym,
    loading,
    error,
    userInteracted,
    handleCopyLink,
    handleLike,
    handleDislike
  };
};
