
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBox from '@/components/ui/ServicesOverlay/SearchBox';
import ServicesTab from '@/components/ui/ServicesOverlay/ServicesTab';
import ResourcesTab from '@/components/ui/ServicesOverlay/ResourcesTab';
import AcronymsTab from '@/components/ui/ServicesOverlay/AcronymsTab';
import SearchResultsTab from '@/components/ui/ServicesOverlay/SearchResultsTab';
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

  const tabClass = displayMode === "high-contrast" 
    ? "data-[state=active]:border-white data-[state=active]:text-white data-[state=inactive]:text-gray-400" 
    : "data-[state=active]:border-sapp-blue data-[state=active]:text-sapp-dark data-[state=inactive]:text-gray-500";

  // SEO titles and descriptions for each tab
  const titles = {
    'services': 'Security Services Directory | SAPP Security',
    'resources': 'Security Resources Hub | SAPP Security',
    'acronyms': 'Technical Security Acronyms Database | SAPP Security',
    'search-results': 'Search Results | SAPP Security'
  };

  const descriptions = {
    'services': 'Browse our comprehensive directory of security services including event security, technical surveillance countermeasures, physical security, and cyber protection services.',
    'resources': 'Access our collection of security resources, guides, tools and documentation for security professionals and interested clients.',
    'acronyms': 'Explore our extensive database of technical security acronyms and terminology used throughout the security industry.',
    'search-results': 'Search results across all services, resources and technical acronyms.'
  };

  const getTitle = () => {
    if (searchQuery.trim()) {
      return `Search Results for "${searchQuery}" | SAPP Security`;
    }
    return titles[activeTab as keyof typeof titles];
  };

  const getDescription = () => {
    if (searchQuery.trim()) {
      return `Search results for "${searchQuery}" across security services, resources and technical acronyms.`;
    }
    return descriptions[activeTab as keyof typeof descriptions];
  };

  return (
    <>
      <Helmet>
        <title>{getTitle()}</title>
        <meta name="description" content={getDescription()} />
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
              {searchQuery.trim() ? `Search Results` : 
               activeTab === 'services' ? 'Security Services Directory' :
               activeTab === 'resources' ? 'Security Resources Hub' :
               'Technical Security Acronyms Database'}
            </h1>
            <p 
              className={cn(
                "text-sapp-gray transition-all duration-500 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {searchQuery.trim() ? `Results for "${searchQuery}" across all content` :
               activeTab === 'services' ? 'Explore our comprehensive range of security services tailored to meet your specific needs.' :
               activeTab === 'resources' ? 'Access our collection of security resources, guides and documentation.' :
               'Understand technical security terminology with our comprehensive acronym database.'}
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
                  {searchQuery.trim() && (
                    <TabsTrigger
                      value="search-results"
                      className={`data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent ${tabClass}`}
                    >
                      Search Results
                    </TabsTrigger>
                  )}
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
                <TabsContent value="search-results" className="m-0 p-0 data-[state=active]:block">
                  <SearchResultsTab
                    searchQuery={searchQuery}
                    filteredServices={filteredServices}
                    filteredResources={filteredResources}
                    onItemClick={() => {}}
                  />
                </TabsContent>
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
