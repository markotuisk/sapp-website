
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AcronymSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AcronymSearch: React.FC<AcronymSearchProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search acronyms..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};

export default AcronymSearch;
