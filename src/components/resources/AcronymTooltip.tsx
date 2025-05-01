
import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ThumbsUp, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AcronymTooltipProps {
  acronym: string;
  fullName: string;
  description: string;
  onClick: () => void;
  category?: string;
  likes?: number;
}

const AcronymTooltip = ({ 
  acronym, 
  fullName, 
  description, 
  onClick,
  category,
  likes = 0
}: AcronymTooltipProps) => {
  return (
    <TooltipProvider>
      <HoverCard>
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverCardTrigger asChild>
              <button 
                onClick={onClick}
                className="inline-flex items-center gap-0.5 text-sapp-blue hover:text-sapp-dark transition-colors border-b border-dotted border-sapp-blue/30 px-0.5"
              >
                {acronym}
                <Info className="w-3 h-3 ml-0.5 opacity-50" />
              </button>
            </HoverCardTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click for more details</p>
          </TooltipContent>
        </Tooltip>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-semibold">{fullName}</h4>
              {category && (
                <Badge variant="outline" className="text-[0.65rem] h-5 bg-blue-50 text-blue-800 border-blue-200">
                  {category}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button 
                onClick={onClick}
                className="text-xs underline hover:text-foreground transition-colors"
              >
                View details
              </button>
              
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{likes}</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </TooltipProvider>
  );
};

export default AcronymTooltip;
