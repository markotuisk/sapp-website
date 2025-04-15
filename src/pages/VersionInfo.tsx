
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Code, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

// Version data structure
interface VersionInfo {
  id: string;
  name: string;
  version: string;
  initialDate: string;
  lastUpdate: string;
  updateCount: number;
  changes?: {
    date: string;
    version: string;
    description: string;
  }[];
}

const VersionInfo = () => {
  // Calculate days since last update
  const getDaysSinceUpdate = (dateString: string) => {
    const lastUpdate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastUpdate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Page version information
  const pageVersions: VersionInfo[] = [
    {
      id: "home",
      name: "Home Page",
      version: "1.3.2",
      initialDate: "2025-01-15",
      lastUpdate: "2025-04-05",
      updateCount: 7,
      changes: [
        { date: "2025-01-15", version: "1.0.0", description: "Initial release" },
        { date: "2025-02-10", version: "1.1.0", description: "Added Partners section" },
        { date: "2025-03-22", version: "1.2.0", description: "Updated Hero and improved responsive design" },
        { date: "2025-04-05", version: "1.3.2", description: "Optimized performance and fixed minor issues" }
      ]
    },
    {
      id: "security-audits",
      name: "Security Audits",
      version: "1.2.1",
      initialDate: "2025-01-18",
      lastUpdate: "2025-04-12",
      updateCount: 5,
      changes: [
        { date: "2025-01-18", version: "1.0.0", description: "Initial release" },
        { date: "2025-02-28", version: "1.1.0", description: "Added detailed service cards" },
        { date: "2025-03-15", version: "1.2.0", description: "Implemented independent audits section" },
        { date: "2025-04-12", version: "1.2.1", description: "UI refinements and layout improvements" }
      ]
    },
    {
      id: "event-security",
      name: "Event Security",
      version: "1.1.0",
      initialDate: "2025-01-20",
      lastUpdate: "2025-03-28",
      updateCount: 3
    },
    {
      id: "installations",
      name: "Installations",
      version: "1.0.2",
      initialDate: "2025-01-25",
      lastUpdate: "2025-03-10",
      updateCount: 2
    },
    {
      id: "cyber-security",
      name: "Cyber Security",
      version: "1.1.1",
      initialDate: "2025-02-05",
      lastUpdate: "2025-04-02",
      updateCount: 4
    }
  ];

  // Component version information
  const componentVersions: VersionInfo[] = [
    {
      id: "navbar",
      name: "Navigation",
      version: "1.2.0",
      initialDate: "2025-01-15",
      lastUpdate: "2025-03-20",
      updateCount: 5
    },
    {
      id: "footer",
      name: "Footer",
      version: "1.1.1",
      initialDate: "2025-01-15",
      lastUpdate: "2025-04-15", // Today's date
      updateCount: 4
    },
    {
      id: "service-cards",
      name: "Service Cards",
      version: "1.3.0",
      initialDate: "2025-01-22",
      lastUpdate: "2025-03-25",
      updateCount: 6
    },
    {
      id: "hero-sections",
      name: "Hero Sections",
      version: "1.2.2",
      initialDate: "2025-01-18",
      lastUpdate: "2025-04-08",
      updateCount: 5
    }
  ];

  // Build information
  const buildInfo = {
    currentBuild: "3.4.7",
    buildDate: "2025-04-15", // Today
    frameworkVersion: "React 18.3.1",
    tailwindVersion: "2.5.2",
    totalComponents: 47,
    totalPages: 12
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Version Information | SAPP Security</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sapp-blue hover:text-sapp-blue/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mt-4 mb-2">Version Information</h1>
          <p className="text-sapp-gray max-w-3xl">
            Technical information about the SAPP Security website versions, builds, and component updates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-sapp-dark">Current Build</CardTitle>
              <CardDescription>Overall site version</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Code className="h-5 w-5 text-sapp-blue mr-2" />
                <span className="text-2xl font-semibold">{buildInfo.currentBuild}</span>
              </div>
              <p className="text-sm text-sapp-gray">Built on {buildInfo.buildDate}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-sapp-dark">Components</CardTitle>
              <CardDescription>Site structure information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-sapp-gray">Total Pages:</span>
                  <span className="font-medium">{buildInfo.totalPages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-sapp-gray">Total Components:</span>
                  <span className="font-medium">{buildInfo.totalComponents}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-sapp-dark">Framework</CardTitle>
              <CardDescription>Technology information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-sapp-gray">React:</span>
                  <span className="font-medium">{buildInfo.frameworkVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-sapp-gray">Tailwind:</span>
                  <span className="font-medium">{buildInfo.tailwindVersion}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="pages" className="mb-12">
          <TabsList className="mb-4">
            <TabsTrigger value="pages">Page Versions</TabsTrigger>
            <TabsTrigger value="components">Component Versions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pages">
            <div className="grid gap-4">
              {pageVersions.map((page) => (
                <Card key={page.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-sapp-dark">{page.name}</CardTitle>
                        <CardDescription>Initial release: {page.initialDate}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-sapp-blue/10 text-sapp-blue border-none">
                        v{page.version}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-sapp-gray mr-1" />
                        <span>Last updated: {page.lastUpdate}</span>
                      </div>
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 text-sapp-gray mr-1" />
                        <span>{page.updateCount} updates</span>
                      </div>
                      <div>
                        <span className={`${getDaysSinceUpdate(page.lastUpdate) <= 7 ? "text-green-600" : getDaysSinceUpdate(page.lastUpdate) <= 30 ? "text-amber-600" : "text-red-600"}`}>
                          {getDaysSinceUpdate(page.lastUpdate)} days since last update
                        </span>
                      </div>
                    </div>
                    
                    {page.changes && page.changes.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-semibold mb-2">Recent Changes:</h4>
                        <ScrollArea className="h-28">
                          <ul className="space-y-2">
                            {page.changes.map((change, idx) => (
                              <li key={idx} className="text-sm">
                                <div className="flex items-start">
                                  <Badge variant="outline" className="mr-2 shrink-0">{change.version}</Badge>
                                  <div>
                                    <span className="block text-sapp-gray text-xs">{change.date}</span>
                                    <span>{change.description}</span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="components">
            <div className="grid gap-4">
              {componentVersions.map((component) => (
                <Card key={component.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-sapp-dark">{component.name}</CardTitle>
                        <CardDescription>Initial release: {component.initialDate}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-sapp-blue/10 text-sapp-blue border-none">
                        v{component.version}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-sapp-gray mr-1" />
                        <span>Last updated: {component.lastUpdate}</span>
                      </div>
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 text-sapp-gray mr-1" />
                        <span>{component.updateCount} updates</span>
                      </div>
                      <div>
                        <span className={`${getDaysSinceUpdate(component.lastUpdate) <= 7 ? "text-green-600" : getDaysSinceUpdate(component.lastUpdate) <= 30 ? "text-amber-600" : "text-red-600"}`}>
                          {getDaysSinceUpdate(component.lastUpdate)} days since last update
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default VersionInfo;
