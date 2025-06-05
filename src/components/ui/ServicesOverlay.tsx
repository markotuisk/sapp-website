
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchBox from './ServicesOverlay/SearchBox';
import ServicesTab from './ServicesOverlay/ServicesTab';
import ResourcesTab from './ServicesOverlay/ResourcesTab';
import AcronymsTab from './ServicesOverlay/AcronymsTab';
import SearchResultsTab from './ServicesOverlay/SearchResultsTab';
import { services, resources, filterItems } from './ServicesOverlay/servicesData';
import { useDisplayMode } from '@/contexts/DisplayModeContext';

interface ServicesOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServicesOverlay = ({ open, onOpenChange }: ServicesOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const { displayMode } = useDisplayMode();

  useEffect(() => {
    if (open) {
      setSearchQuery('');
      setActiveTab('services');
    }
  }, [open]);

  // Switch to search results tab when user starts searching
  useEffect(() => {
    if (searchQuery.trim()) {
      setActiveTab('search-results');
    } else if (activeTab === 'search-results') {
      setActiveTab('services');
    }
  }, [searchQuery]);

  const filteredServices = filterItems(services, searchQuery);
  const filteredResources = filterItems(resources, searchQuery);

  const bgClass = displayMode === "high-contrast" ? "bg-[#1A1F2C] text-white" : "bg-white";
  const borderClass = displayMode === "high-contrast" ? "border-gray-700" : "border-b";
  const tabClass = displayMode === "high-contrast" 
    ? "data-[state=active]:border-white data-[state=active]:text-white data-[state=inactive]:text-gray-400" 
    : "data-[state=active]:border-sapp-blue data-[state=active]:text-sapp-dark data-[state=inactive]:text-gray-500";

  const mobileContentClass =
    "max-h-screen h-screen overflow-y-auto md:max-h-[800px] md:h-auto";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[800px] p-0 gap-0 ${bgClass} ${mobileContentClass}`}>
        <DialogTitle className="sr-only">Explore Our Services</DialogTitle>

        <div className="flex flex-col h-[80vh] max-h-[800px]">
          <header className={`flex items-center justify-between p-4 ${borderClass}`}>
            <h2 className={`text-xl font-semibold ${displayMode === "high-contrast" ? "text-white" : "text-sapp-dark"}`}>
              Explore Our Services
            </h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </header>

          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 pt-3">
              <TabsList className={`w-full justify-start border-b rounded-none bg-transparent p-0 mb-1`}>
                {searchQuery.trim() && (
                  <TabsTrigger
                    value="search-results"
                    className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                  >
                    Search Results
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="services"
                  className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="acronyms"
                  className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                >
                  Acronyms
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              <ScrollArea className="h-full p-4" type="always">
                <TabsContent value="search-results" className="m-0 p-0 h-full data-[state=active]:block">
                  <SearchResultsTab
                    searchQuery={searchQuery}
                    filteredServices={filteredServices}
                    filteredResources={filteredResources}
                    onItemClick={() => onOpenChange(false)}
                  />
                </TabsContent>
                <TabsContent value="services" className="m-0 p-0 h-full data-[state=active]:block">
                  <ServicesTab
                    filteredServices={filteredServices}
                    searchQuery={searchQuery}
                    onItemClick={() => onOpenChange(false)}
                  />
                </TabsContent>
                <TabsContent value="resources" className="m-0 p-0 h-full data-[state=active]:block">
                  <ResourcesTab
                    filteredResources={filteredResources}
                    searchQuery={searchQuery}
                    onItemClick={() => onOpenChange(false)}
                  />
                </TabsContent>
                <TabsContent value="acronyms" className="m-0 p-0 h-full data-[state=active]:block">
                  <AcronymsTab />
                </TabsContent>
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesOverlay;
