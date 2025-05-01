
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Animated } from "@/components/ui/AnimatedElements";

const AcronymLoadingState: React.FC = () => {
  return (
    <Animated animation="fade-up" delay={100}>
      <Card className="shadow-lg transition-all duration-300">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32 animate-pulse" />
              <Skeleton className="h-5 w-48 animate-pulse" />
            </div>
            <Skeleton className="h-6 w-24 animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full animate-pulse" />
            <Skeleton className="h-4 w-full animate-pulse" />
            <Skeleton className="h-4 w-3/4 animate-pulse" />
          </div>
          
          <Skeleton className="h-px w-full animate-pulse" />
          
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-5 w-32 animate-pulse" />
            <Skeleton className="h-5 w-32 animate-pulse" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-28 animate-pulse" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-16 animate-pulse" />
            <Skeleton className="h-10 w-16 animate-pulse" />
          </div>
        </CardFooter>
      </Card>
    </Animated>
  );
};

export default AcronymLoadingState;
