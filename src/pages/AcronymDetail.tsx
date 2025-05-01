
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAcronyms } from "@/hooks/useAcronyms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Copy, Globe, Tag, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Acronym } from "@/types/acronyms";
import AcronymLoadingState from "@/components/resources/AcronymLoadingState";

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
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
              <p className="text-gray-600 mb-6">The acronym you're looking for could not be found.</p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
          ) : acronym && (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl font-bold text-sapp-blue">
                        {acronym.acronym}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium mt-1">
                        {acronym.full_name}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                      {acronym.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-gray-700 leading-relaxed">
                    {acronym.description}
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {acronym.type && (
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Type:</span>
                        <span>{acronym.type}</span>
                      </div>
                    )}
                    
                    {acronym.source_country && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Source:</span>
                        <span>{acronym.source_country}</span>
                      </div>
                    )}
                    
                    {acronym.language && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Language:</span>
                        <span>{acronym.language}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1",
                        userInteracted && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={handleLike}
                      disabled={userInteracted}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{acronym.likes || 0}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1",
                        userInteracted && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={handleDislike}
                      disabled={userInteracted}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>{acronym.dislikes || 0}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AcronymDetail;
