
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Acronym } from "@/types/acronyms";

interface AcronymCardProps {
  acronym: Acronym;
  handleLike: (acronymId: string, e: React.MouseEvent) => void;
  handleDislike: (acronymId: string, e: React.MouseEvent) => void;
  interacted: boolean;
}

const AcronymCard: React.FC<AcronymCardProps> = ({
  acronym,
  handleLike,
  handleDislike,
  interacted,
}) => {
  // Generate a stable URL path with the new "what-is-" prefix
  const acronymPath = `/acronyms/what-is-${acronym.url_slug || acronym.id}`;
  
  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent any navigation issues
    
    try {
      // Create URL path consistently using window.location.origin
      const fullUrl = `${window.location.origin}${acronymPath}`;
      
      // Copy with error handling
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

  return (
    <Card className="cursor-pointer shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Link
            to={acronymPath}
            className="hover:underline"
            state={{ acronymData: acronym }} // Pass the data through router state for immediate rendering
          >
            <CardTitle className="text-xl font-bold">{acronym.acronym}</CardTitle>
          </Link>
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
            {acronym.category}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{acronym.full_name}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 line-clamp-2">
          {acronym.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy Link
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "px-2",
              interacted && "opacity-50 cursor-not-allowed"
            )}
            onClick={(e) => handleLike(acronym.id, e)}
            disabled={interacted}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{acronym.likes || 0}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "px-2",
              interacted && "opacity-50 cursor-not-allowed"
            )}
            onClick={(e) => handleDislike(acronym.id, e)}
            disabled={interacted}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span>{acronym.dislikes || 0}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AcronymCard;
