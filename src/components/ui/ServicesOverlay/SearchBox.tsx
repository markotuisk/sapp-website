
import React from 'react';
import { Command, CommandInput } from '@/components/ui/command';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBox = ({ searchQuery, setSearchQuery }: SearchBoxProps) => {
  return (
    <div className="p-4 border-b">
      <Command className="rounded-lg border shadow-sm">
        <CommandInput 
          placeholder="SAPP AI | Search Services, Media and Resources - feature under testing ..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="h-11"
        />
      </Command>
    </div>
  );
};

export default SearchBox;
