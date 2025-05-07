
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  className?: string;
}

const LoadMoreButton = ({
  onClick,
  loading,
  disabled,
  className,
}: LoadMoreButtonProps) => {
  return (
    <div className={cn("flex justify-center", className)}>
      <Button
        variant="outline"
        size="lg"
        onClick={onClick}
        disabled={disabled || loading}
        className="min-w-[200px]"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          "Load More"
        )}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
