
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBox from '@/components/ui/ServicesOverlay/SearchBox';
import ServicesTab from '@/components/ui/ServicesOverlay/ServicesTab';
import ResourcesTab from '@/components/ui/ServicesOverlay/ResourcesTab';
import AcronymsTab from '@/components/ui/ServicesOverlay/AcronymsTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { services, resources, filterItems } from '@/components/ui/ServicesOverlay/servicesData';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { Card } from '@/components/ui/card';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const ServiceNavigatorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const { displayMode } = useDisplayMode();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredServices = filterItems(services, searchQuery);
  const filteredResources = filterItems(resources, searchQuery);

  const tabClass = displayMode === "high-contrast" 
    ? "data-[state=active]:border-white data-[state=active]:text-white data-[state=inactive]:text-gray-400" 
    : "data-[state=active]:border-sapp-blue data-[state=active]:text-sapp-dark data-[state=inactive]:text-gray-500";

  return (
    <>
      <Helmet>
        <title>Rapid Service Navigator | SAPP Security</title>
        <meta 
          name="description" 
          content="Quickly find and explore SAPP Security services, resources and technical security terminology." 
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-24">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto mb-8 text-center" ref={ref}>
            <h1 
              className={cn(
                "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4 transition-all duration-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Rapid Service Navigator
            </h1>
            <p 
              className={cn(
                "text-sapp-gray transition-all duration-500 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Find exactly what you're looking for across our security services, 
              resources and technical terminology with our quick navigation tool.
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto shadow-md">
            <div className="p-4 border-b">
              <SearchBox 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-4 pt-3">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-1">
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

              <div className="p-4">
                <TabsContent value="services" className="m-0 p-0 data-[state=active]:block">
                  <ServicesTab
                    filteredServices={filteredServices}
                    searchQuery={searchQuery}
                    onItemClick={() => {}}
                  />
                </TabsContent>
                <TabsContent value="resources" className="m-0 p-0 data-[state=active]:block">
                  <ResourcesTab
                    filteredResources={filteredResources}
                    searchQuery={searchQuery}
                    onItemClick={() => {}}
                  />
                </TabsContent>
                <TabsContent value="acronyms" className="m-0 p-0 data-[state=active]:block">
                  <AcronymsTab />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceNavigatorPage;
