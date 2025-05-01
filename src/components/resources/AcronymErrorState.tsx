
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AcronymErrorStateProps {
  error: string;
}

const AcronymErrorState: React.FC<AcronymErrorStateProps> = ({ error }) => {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <Card className="p-6">
        <CardContent className="space-y-6 pt-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
          <p className="text-gray-600 mb-6">The acronym you're looking for could not be found.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcronymErrorState;
