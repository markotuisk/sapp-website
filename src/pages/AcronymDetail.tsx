
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAcronyms } from "@/hooks/useAcronyms";
import { Acronym } from "@/types/acronyms";
import { toast } from "sonner";
import AcronymLoadingState from "@/components/resources/AcronymLoadingState";
import AcronymErrorState from "@/components/resources/AcronymErrorState";
import AcronymDetailCard from "@/components/resources/AcronymDetailCard";

const AcronymDetail = () => {
  const { slug } = useParams<{ slug: string }>();
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

  return (
    <>
      <Helmet>
        <title>
          {acronym ? `${acronym.acronym} - ${acronym.full_name}` : loading ? "Loading..." : "Acronym Details"} | SAPP Security
        </title>
        <meta 
          name="description" 
          content={acronym ? `Learn about ${acronym.acronym} (${acronym.full_name}) in the security industry` : "Technical acronym details"} 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="max-w-2xl mx-auto">
              <AcronymLoadingState />
            </div>
          ) : error ? (
            <AcronymErrorState error={error} />
          ) : acronym && (
            <div className="max-w-2xl mx-auto">
              <AcronymDetailCard
                acronym={acronym}
                userInteracted={userInteracted}
                handleCopyLink={handleCopyLink}
                handleLike={handleLike}
                handleDislike={handleDislike}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AcronymDetail;
