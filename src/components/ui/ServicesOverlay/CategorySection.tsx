
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
    }[];
  };
  onItemClick: () => void;
}

const CategorySection = ({ category, onItemClick }: CategorySectionProps) => {
  if (category.items.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-lg overflow-hidden">
      <div className="bg-sapp-blue/10 px-4 py-2">
        <h3 className="font-medium text-sapp-blue">{category.category}</h3>
      </div>
      <div className="divide-y">
        {category.items.map((item) => (
          <ServiceItem
            key={item.name}
            name={item.name}
            description={item.description}
            link={item.link}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
