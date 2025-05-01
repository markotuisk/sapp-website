
import React from 'react';
import { cn } from '@/lib/utils';
import ServiceItem from './ServiceItem';

interface CategorySectionProps {
  category: {
    category: string;
    items: {
      name: string;
      description: string;
      link: string;
      isActive?: boolean;
    }[];
  };
  onItemClick: () => void;
}

const CategorySection = ({ category, onItemClick }: CategorySectionProps) => {
  if (category.items.length === 0) {
    return null;
  }

  // Check if any items in this category are active
  const hasActiveItems = category.items.some(item => item.isActive);

  return (
    <div className={cn(
      "bg-slate-50 rounded-lg overflow-hidden",
      !hasActiveItems && "opacity-80"
    )}>
      <div className={cn(
        "px-4 py-2",
        hasActiveItems ? "bg-sapp-blue/10" : "bg-slate-200/50"
      )}>
        <h3 className={cn(
          "font-medium",
          hasActiveItems ? "text-sapp-blue" : "text-sapp-dark/70"
        )}>
          {category.category}
        </h3>
      </div>
      <div className="divide-y">
        {category.items.map((item) => (
          <ServiceItem
            key={item.name}
            name={item.name}
            description={item.description}
            link={item.link}
            onItemClick={onItemClick}
            isActive={item.isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
