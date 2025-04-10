
import { useState, useEffect } from 'react';
import { X, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandInput } from '@/components/ui/command';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ServicesOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServicesOverlay = ({ open, onOpenChange }: ServicesOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reset search when dialog opens
  useEffect(() => {
    if (open) {
      setSearchQuery('');
    }
  }, [open]);

  const services = [
    {
      category: 'Event Security',
      items: [
        { name: 'Venue Security Audits', description: 'Pre-event security assessment and planning', link: '/services/venue-security-audits' },
        { name: 'Event Monitoring', description: 'Real-time surveillance during high-profile events', link: '/services/event-monitoring' },
        { name: 'Secure Technology', description: 'Secure communications for event organizers', link: '/services/secure-technology' },
        { name: 'Close Protection', description: 'VIP security and personal protection', link: '/services/close-protection' }
      ]
    },
    {
      category: 'Security Audits',
      items: [
        { name: 'Physical Security Assessments', description: 'Comprehensive evaluation of security measures', link: '/security-audits#physical' },
        { name: 'Compliance Audits', description: 'ISO27001 and regulatory compliance checks', link: '/security-audits#compliance' },
        { name: 'TSCM Inspections', description: 'Technical surveillance countermeasures', link: '/security-audits#tscm' },
        { name: 'Penetration Tests', description: 'Identifying vulnerabilities in your security', link: '/security-audits#penetration' }
      ]
    },
    {
      category: 'Installations',
      items: [
        { name: 'CCTV & Access Control', description: 'Modern surveillance and access systems', link: '/installations/cctv-access' },
        { name: 'Speech Privacy Systems', description: 'Protecting sensitive conversations', link: '/installations/speech-privacy' },
        { name: 'Counter-Surveillance', description: 'Protection against unwanted monitoring', link: '/installations/counter-surveillance' },
        { name: 'Network Infrastructure', description: 'Secure network design and deployment', link: '/installations/network-infrastructure' }
      ]
    },
    {
      category: 'Cyber Security',
      items: [
        { name: 'Threat Detection', description: 'Identification of digital security risks', link: '/cyber-security#threat-detection' },
        { name: 'Network Security', description: 'Protection for your digital infrastructure', link: '/cyber-security#network' },
        { name: 'IoT Device Protection', description: 'Securing connected devices', link: '/cyber-security#iot' },
        { name: 'Data Protection', description: 'Safeguarding sensitive information', link: '/cyber-security#data' }
      ]
    }
  ];

  // Future resources section (placeholder for now)
  const resources = [
    {
      category: 'Knowledge Base',
      items: [
        { name: 'Security Guides', description: 'Best practices and implementation guides', link: '#' },
        { name: 'Industry Standards', description: 'Overview of relevant security standards', link: '#' }
      ]
    },
    {
      category: 'Media',
      items: [
        { name: 'Case Studies', description: 'Real-world security implementation examples', link: '#' },
        { name: 'Articles', description: 'Insights on security trends and technologies', link: '#' }
      ]
    }
  ];

  // Filter items based on search query
  const filteredServices = searchQuery ? 
    services.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0) : 
    services;

  const filteredResources = searchQuery ? 
    resources.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0) : 
    resources;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0 bg-white">
        {/* Hidden DialogTitle for accessibility */}
        <DialogTitle className="sr-only">Explore Our Services</DialogTitle>
        
        <div className="flex flex-col h-[80vh] max-h-[800px]">
          <header className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-sapp-dark">Explore Our Services</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </header>
          
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
                  {searchQuery && filteredServices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
                      <Search className="h-12 w-12 mb-4 opacity-20" />
                      <p>No services match your search</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                      {filteredServices.map((category) => (
                        <div key={category.category} className={cn(
                          "bg-slate-50 rounded-lg overflow-hidden",
                          category.items.length === 0 && "hidden"
                        )}>
                          <div className="bg-sapp-blue/10 px-4 py-2">
                            <h3 className="font-medium text-sapp-blue">{category.category}</h3>
                          </div>
                          <div className="divide-y">
                            {category.items.map((item) => (
                              <Link 
                                key={item.name} 
                                to={item.link}
                                onClick={() => onOpenChange(false)}
                                className="flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors"
                              >
                                <div>
                                  <h4 className="font-medium text-sapp-dark">{item.name}</h4>
                                  <p className="text-sm text-sapp-gray">{item.description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="resources" className="m-0 p-0 h-full data-[state=active]:block">
                  {searchQuery && filteredResources.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
                      <Search className="h-12 w-12 mb-4 opacity-20" />
                      <p>No resources match your search</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                      {filteredResources.map((category) => (
                        <div key={category.category} className={cn(
                          "bg-slate-50 rounded-lg overflow-hidden",
                          category.items.length === 0 && "hidden"
                        )}>
                          <div className="bg-sapp-blue/10 px-4 py-2">
                            <h3 className="font-medium text-sapp-blue">{category.category}</h3>
                          </div>
                          <div className="divide-y">
                            {category.items.map((item) => (
                              <Link 
                                key={item.name} 
                                to={item.link}
                                onClick={() => onOpenChange(false)}
                                className="flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors"
                              >
                                <div>
                                  <h4 className="font-medium text-sapp-dark">{item.name}</h4>
                                  <p className="text-sm text-sapp-gray">{item.description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
