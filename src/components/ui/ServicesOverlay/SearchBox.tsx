
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  instructionText?: string;
}

const SearchBox = ({ searchQuery, setSearchQuery, instructionText }: SearchBoxProps) => {
  return (
    <div className="p-4 border-b">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search security services, resources, and acronyms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 rounded-lg border shadow-sm"
        />
      </div>
      {instructionText && (
        <p className="text-xs text-muted-foreground mt-2 px-1">
          {instructionText}
        </p>
      )}
    </div>
  );
};

export default SearchBox;
