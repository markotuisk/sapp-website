
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
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

interface ServiceNavigatorProps {
  defaultTab?: 'services' | 'resources' | 'acronyms';
}

const ServiceNavigatorPage = ({ defaultTab = 'services' }: ServiceNavigatorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const { displayMode } = useDisplayMode();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const location = useLocation();

  // Update active tab based on URL when component mounts
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  useEffect(() => {
    // This will handle cases when user navigates using browser's back/forward buttons
    if (location.pathname.includes('/services')) {
      setActiveTab('services');
    } else if (location.pathname.includes('/resources')) {
      setActiveTab('resources');
    } else if (location.pathname.includes('/acronyms')) {
      setActiveTab('acronyms');
    }
  }, [location.pathname]);

  const filteredServices = filterItems(services, searchQuery);
  const filteredResources = filterItems(resources, searchQuery);

  const tabClass = displayMode === "high-contrast" 
    ? "data-[state=active]:border-white data-[state=active]:text-white data-[state=inactive]:text-gray-400" 
    : "data-[state=active]:border-sapp-blue data-[state=active]:text-sapp-dark data-[state=inactive]:text-gray-500";

  // SEO titles and descriptions for each tab
  const titles = {
    'services': 'Security Services Directory | SAPP Security',
    'resources': 'Security Resources Hub | SAPP Security',
    'acronyms': 'Technical Security Acronyms Database | SAPP Security'
  };

  const descriptions = {
    'services': 'Browse our comprehensive directory of security services including event security, technical surveillance countermeasures, physical security, and cyber protection services.',
    'resources': 'Access our collection of security resources, guides, tools and documentation for security professionals and interested clients.',
    'acronyms': 'Explore our extensive database of technical security acronyms and terminology used throughout the security industry.'
  };

  return (
    <>
      <Helmet>
        <title>{titles[activeTab as keyof typeof titles]}</title>
        <meta 
          name="description" 
          content={descriptions[activeTab as keyof typeof descriptions]} 
        />
        <link rel="canonical" href={`https://sappsecurity.com/service-navigator/${activeTab !== 'services' ? activeTab : ''}`} />
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
              {activeTab === 'services' && 'Security Services Directory'}
              {activeTab === 'resources' && 'Security Resources Hub'}
              {activeTab === 'acronyms' && 'Technical Security Acronyms Database'}
            </h1>
            <p 
              className={cn(
                "text-sapp-gray transition-all duration-500 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {activeTab === 'services' && 'Explore our comprehensive range of security services tailored to meet your specific needs.'}
              {activeTab === 'resources' && 'Access our collection of security resources, guides and documentation.'}
              {activeTab === 'acronyms' && 'Understand technical security terminology with our comprehensive acronym database.'}
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
                  <Link to="/service-navigator/services">
                    <TabsTrigger
                      value="services"
                      className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                    >
                      Services
                    </TabsTrigger>
                  </Link>
                  <Link to="/service-navigator/resources">
                    <TabsTrigger
                      value="resources"
                      className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                    >
                      Resources
                    </TabsTrigger>
                  </Link>
                  <Link to="/service-navigator/acronyms">
                    <TabsTrigger
                      value="acronyms"
                      className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                    >
                      Acronyms
                    </TabsTrigger>
                  </Link>
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
