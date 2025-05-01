
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Filter, Search, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useAcronyms } from "@/hooks/useAcronyms";
import AcronymDialog from "./AcronymDialog";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const AcronymsResource = () => {
  const { 
    acronyms, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters,
    categories,
    languages,
    types,
    incrementLikes,
    incrementDislikes
  } = useAcronyms();
  
  const [selectedAcronym, setSelectedAcronym] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [interactedAcronyms, setInteractedAcronyms] = useState<Record<string, boolean>>({});

  const handleViewDetails = (acronym: any) => {
    setSelectedAcronym(acronym);
    setDialogOpen(true);
  };

  const handleCopyLink = (acronym: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/acronyms/${acronym.url_slug || acronym.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const handleLike = (acronymId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (interactedAcronyms[acronymId]) return;
    
    incrementLikes(acronymId);
    setInteractedAcronyms(prev => ({ ...prev, [acronymId]: true }));
  };

  const handleDislike = (acronymId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (interactedAcronyms[acronymId]) return;
    
    incrementDislikes(acronymId);
    setInteractedAcronyms(prev => ({ ...prev, [acronymId]: true }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sapp-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        Error loading acronyms: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search acronyms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter by</h4>
                <Separator />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={filters.category || ""}
                  onValueChange={(value) => setFilters({ ...filters, category: value || undefined })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={filters.language || ""}
                  onValueChange={(value) => setFilters({ ...filters, language: value || undefined })}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Languages</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label>Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {types.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type}`}
                        checked={filters.type === type}
                        onCheckedChange={(checked) => 
                          setFilters({ ...filters, type: checked ? type : undefined })
                        }
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setFilters({})}
              >
                Reset Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {acronyms.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-muted-foreground">
            No acronyms found matching your search criteria.
          </div>
        ) : (
          acronyms.map((acronym) => (
            <Card 
              key={acronym.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewDetails(acronym)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">{acronym.acronym}</CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                    {acronym.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{acronym.full_name}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {acronym.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleCopyLink(acronym, e)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Link
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "px-2",
                      interactedAcronyms[acronym.id] && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={(e) => handleLike(acronym.id, e)}
                    disabled={interactedAcronyms[acronym.id]}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{acronym.likes || 0}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "px-2",
                      interactedAcronyms[acronym.id] && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={(e) => handleDislike(acronym.id, e)}
                    disabled={interactedAcronyms[acronym.id]}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>{acronym.dislikes || 0}</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <AcronymDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        acronym={selectedAcronym}
      />
    </div>
  );
};

export default AcronymsResource;
