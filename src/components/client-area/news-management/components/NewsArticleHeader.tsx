
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';

interface NewsArticleHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export const NewsArticleHeader: React.FC<NewsArticleHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onCreateClick
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Button onClick={onCreateClick} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Create Article
      </Button>
    </div>
  );
};
