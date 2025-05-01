
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AcronymEmptyStateProps {
  message?: string;
  showBackButton?: boolean;
}

const AcronymEmptyState: React.FC<AcronymEmptyStateProps> = ({ 
  message = "No acronyms found matching your search criteria.", 
  showBackButton = false 
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="text-center py-8 px-4">
      <CardContent className="flex flex-col items-center">
        <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground max-w-md mx-auto">
          {message}
        </p>
      </CardContent>
      
      {showBackButton && (
        <CardFooter className="flex justify-center pt-2">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AcronymEmptyState;
