
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  className?: string;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory(null)}
        className={cn(
          selectedCategory === null ? "bg-sapp-blue text-white" : "text-sapp-dark"
        )}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={cn(
            selectedCategory === category ? "bg-sapp-blue text-white" : "text-sapp-dark"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
