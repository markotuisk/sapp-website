import React from 'react';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CategorySection from './CategorySection';

interface ServiceCategory {
  category: string;
  items: {
    name: string;
    description: string;
    link: string;
  }[];
}

interface ServicesTabProps {
  filteredServices: ServiceCategory[];
  searchQuery: string;
  onItemClick: () => void;
}

const ServicesTab = ({ filteredServices, searchQuery, onItemClick }: ServicesTabProps) => {
  if (searchQuery && filteredServices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
        <Search className="h-12 w-12 mb-4 opacity-20" />
        <p>No services match your search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
      {filteredServices.map((category) => (
        <CategorySection 
          key={category.category} 
          category={category} 
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default ServicesTab;
