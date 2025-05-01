
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Copy, Globe, Tag, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Acronym } from "@/types/acronyms";
import { Animated } from "@/components/ui/AnimatedElements";

interface AcronymDetailCardProps {
  acronym: Acronym;
  userInteracted: boolean;
  handleCopyLink: () => void;
  handleLike: () => void;
  handleDislike: () => void;
}

const AcronymDetailCard: React.FC<AcronymDetailCardProps> = ({
  acronym,
  userInteracted,
  handleCopyLink,
  handleLike,
  handleDislike,
}) => {
  return (
    <Animated animation="fade-up" delay={200} className="w-full">
      <Card className="shadow-md transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <Animated animation="fade-right" delay={300}>
                <CardTitle className="text-3xl font-bold text-sapp-blue">
                  {acronym.acronym}
                </CardTitle>
              </Animated>
              <Animated animation="fade-right" delay={400}>
                <CardDescription className="text-lg font-medium mt-1">
                  {acronym.full_name}
                </CardDescription>
              </Animated>
            </div>
            <Animated animation="fade-left" delay={300}>
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                {acronym.category}
              </Badge>
            </Animated>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Animated animation="fade-up" delay={500}>
            <div className="text-gray-700 leading-relaxed">
              {acronym.description}
            </div>
          </Animated>
          
          <Separator />
          
          <Animated animation="fade-up" delay={600} className="grid grid-cols-2 gap-4 text-sm">
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
          </Animated>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Animated animation="fade-right" delay={700}>
            <Button variant="outline" onClick={handleCopyLink} className="transition-all duration-300">
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </Animated>
          
          <Animated animation="fade-left" delay={700} className="flex items-center gap-4">
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-1 transition-all duration-300",
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
                "flex items-center gap-1 transition-all duration-300",
                userInteracted && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleDislike}
              disabled={userInteracted}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{acronym.dislikes || 0}</span>
            </Button>
          </Animated>
        </CardFooter>
      </Card>
    </Animated>
  );
};

export default AcronymDetailCard;
