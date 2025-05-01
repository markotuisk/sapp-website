
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Globe, Copy, Tag, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAcronyms } from "@/hooks/useAcronyms";
import { cn } from "@/lib/utils";
import { Acronym } from "@/types/acronyms";
import { useNavigate } from "react-router-dom";

interface AcronymDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  acronym: Acronym | null;
}

const AcronymDialog: React.FC<AcronymDialogProps> = ({ open, onOpenChange, acronym }) => {
  const { incrementLikes, incrementDislikes } = useAcronyms();
  const [userInteracted, setUserInteracted] = useState(false);
  const navigate = useNavigate();
  
  if (!acronym) return null;

  // Generate a stable URL path
  const acronymPath = `/acronyms/${acronym.url_slug || acronym.id}`;

  const handleViewDetails = () => {
    // Close dialog first to prevent UI issues
    onOpenChange(false);
    
    // Use a small timeout to ensure dialog closes first
    setTimeout(() => {
      navigate(acronymPath, { 
        state: { acronymData: acronym }
      });
    }, 50);
  };

  const handleCopyLink = () => {
    try {
      // Create the URL path reliably
      const fullUrl = `${window.location.origin}${acronymPath}`;
      
      // Copy to clipboard with error handling
      navigator.clipboard.writeText(fullUrl)
        .then(() => {
          toast.success("Link copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy link:", err);
          toast.error("Failed to copy link");
        });
    } catch (err) {
      console.error("Error generating link:", err);
      toast.error("Failed to generate link");
    }
  };

  const handleLike = () => {
    if (userInteracted) return;
    incrementLikes(acronym.id);
    setUserInteracted(true);
  };

  const handleDislike = () => {
    if (userInteracted) return;
    incrementDislikes(acronym.id);
    setUserInteracted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {acronym.acronym}
              </DialogTitle>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {acronym.full_name}
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
              {acronym.category}
            </Badge>
          </div>
        </DialogHeader>
        
        <DialogDescription className="text-base leading-relaxed">
          {acronym.description}
        </DialogDescription>
        
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
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="default" size="sm" onClick={handleViewDetails}>
              View Details
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
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
              size="sm"
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcronymDialog;
