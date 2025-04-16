
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchBox from './ServicesOverlay/SearchBox';
import ServicesTab from './ServicesOverlay/ServicesTab';
import ResourcesTab from './ServicesOverlay/ResourcesTab';
import { services, resources, filterItems } from './ServicesOverlay/servicesData';

interface ServicesOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServicesOverlay = ({ open, onOpenChange }: ServicesOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (open) {
      setSearchQuery('');
    }
  }, [open]);

  const filteredServices = filterItems(services, searchQuery);
  const filteredResources = filterItems(resources, searchQuery);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] p-0 gap-0 bg-white">
        <DialogTitle className="sr-only">Explore Our Services</DialogTitle>
        
        <div className="flex flex-col h-[80vh] max-h-[800px]">
          <header className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-sapp-dark">Explore Our Services</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </header>
          
          <SearchBox 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <Tabs defaultValue="services" className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 pt-3">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-1">
                <TabsTrigger 
                  value="services" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-sapp-blue data-[state=active]:text-sapp-dark data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent data-[state=inactive]:text-gray-500"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-sapp-blue data-[state=active]:text-sapp-dark data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent data-[state=inactive]:text-gray-500"
                >
                  Resources
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 min-h-0 overflow-hidden">
              <ScrollArea className="h-full p-4" type="always">
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
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesOverlay;
