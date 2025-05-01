
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
        // Handle the "what-is-" prefix in slugs
        const cleanSlug = slug.startsWith("what-is-") ? slug.replace("what-is-", "") : slug;
        const acronymData = await findAcronymBySlug(cleanSlug);
        
        if (!acronymData) {
          console.error("Acronym not found for slug:", cleanSlug);
          setError("Acronym not found");
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
      // Create a stable URL path with current page URL
      const url = window.location.href;
      
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
