
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Animated } from "@/components/ui/AnimatedElements";

interface AcronymErrorStateProps {
  error: string;
}

const AcronymErrorState: React.FC<AcronymErrorStateProps> = ({ error }) => {
  return (
    <Animated 
      animation="fade-up" 
      delay={300} 
      className="text-center max-w-2xl mx-auto"
    >
      <Card className={cn(
        "p-6 transition-all duration-300",
        "border-red-100 shadow-md"
      )}>
        <CardContent className="space-y-6 pt-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
          <p className="text-gray-600 mb-6">The acronym you're looking for could not be found.</p>
          <Button 
            onClick={() => window.history.back()}
            className="transition-all duration-300 hover:bg-red-600"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Animated>
  );
};

export default AcronymErrorState;
