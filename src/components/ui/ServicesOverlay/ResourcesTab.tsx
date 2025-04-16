
import React from 'react';
import { Search } from 'lucide-react';
import CategorySection from './CategorySection';

interface ResourceCategory {
  category: string;
  items: {
    name: string;
    description: string;
    link: string;
  }[];
}

interface ResourcesTabProps {
  filteredResources: ResourceCategory[];
  searchQuery: string;
  onItemClick: () => void;
}

const ResourcesTab = ({ filteredResources, searchQuery, onItemClick }: ResourcesTabProps) => {
  if (searchQuery && filteredResources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
        <Search className="h-12 w-12 mb-4 opacity-20" />
        <p>No resources match your search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
      {filteredResources.map((category) => (
        <CategorySection 
          key={category.category} 
          category={category} 
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default ResourcesTab;
