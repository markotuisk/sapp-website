
import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SubmitButtonProps {
  isValid: boolean;
}

const SubmitButton = ({ isValid }: SubmitButtonProps) => {
  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative inline-block">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 group relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
                disabled={!isValid}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-110">Submit Message</span>
                <span className="absolute inset-x-0 -bottom-1 h-1 bg-sapp-dark scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Button>
            </div>
          </TooltipTrigger>
          {!isValid && (
            <TooltipContent>
              <p>Please complete all required fields before submitting</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SubmitButton;
