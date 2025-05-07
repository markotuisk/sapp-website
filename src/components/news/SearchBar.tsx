
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
  className?: string;
}

const SearchBar = ({ onSearch, initialValue = "", className }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("flex w-full max-w-sm items-center space-x-2", className)}
    >
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={t("searchNews")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-8"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" variant="default" size="icon">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
