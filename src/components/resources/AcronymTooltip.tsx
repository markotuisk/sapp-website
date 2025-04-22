
import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AcronymTooltipProps {
  acronym: string;
  fullName: string;
  description: string;
  onClick: () => void;
}

const AcronymTooltip = ({ acronym, fullName, description, onClick }: AcronymTooltipProps) => {
  return (
    <TooltipProvider>
      <HoverCard>
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverCardTrigger asChild>
              <button 
                onClick={onClick}
                className="inline-flex items-center gap-0.5 text-sapp-blue hover:text-sapp-dark transition-colors"
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
            <h4 className="text-sm font-semibold">{fullName}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </TooltipProvider>
  );
};

export default AcronymTooltip;
