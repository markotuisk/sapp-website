import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Code, RefreshCw, Clock, Layers, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useAllVersions, useBuildInfo } from '@/hooks/useVersions';
import { formatVersionDate } from '@/lib/versionTracker';

// Get current date and time formatted nicely
const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    iso: now.toISOString()
  };
};

const VersionInfo = () => {
  const currentDateTime = getCurrentDateTime();
  const { data: versions, isLoading: versionsLoading } = useAllVersions();
  const { buildInfo, isLoading: buildInfoLoading } = useBuildInfo();
  
  const isLoading = versionsLoading || buildInfoLoading;
  
  // Format dates for display
  const buildDate = buildInfo.buildDate ? formatVersionDate(buildInfo.buildDate) : currentDateTime;
  const lastUpdate = buildInfo.lastUpdated ? formatVersionDate(buildInfo.lastUpdated) : currentDateTime;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Version Information | SAPP Security</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      {/* Added proper top padding to fix navigation overlap */}
      <main className="container mx-auto px-4 pt-32 pb-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sapp-blue hover:text-sapp-blue/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mt-4 mb-2">Version Information</h1>
          <p className="text-sapp-gray max-w-3xl">
            Technical information about the SAPP Security website versions and builds.
            <span className="block mt-2 text-sm">
              <Clock className="inline h-4 w-4 mr-1" /> 
              Information collected: {currentDateTime.date} at {currentDateTime.time}
            </span>
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-sapp-blue" />
            <span className="ml-3 text-lg">Loading version information...</span>
          </div>
        ) : (
          <>
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
                  <p className="text-sm text-sapp-gray">
                    Built on {buildDate.date} at {buildDate.time}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-sapp-dark">Technology</CardTitle>
                  <CardDescription>Framework information</CardDescription>
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
                    <div className="flex justify-between">
                      <span className="text-sm text-sapp-gray">Last Updated:</span>
                      <span className="font-medium">{lastUpdate.date} at {lastUpdate.time}</span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-sm text-sapp-gray">Components:</span>
                      <div className="flex items-center">
                        <Layers className="h-4 w-4 mr-1 text-sapp-blue" />
                        <span className="font-medium">{buildInfo.componentCount}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-sapp-gray">Updates:</span>
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-1 text-sapp-blue" />
                        <span className="font-medium">{buildInfo.totalUpdates}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-sapp-dark">Version Tracking</CardTitle>
                  <CardDescription>Implementation status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-sapp-gray">
                    <p className="mb-2">Automated version tracking is now active through the Supabase database.</p>
                    <div className="flex items-center mt-2">
                      <Badge className="bg-green-500">Active</Badge>
                      <span className="ml-2">Database tracking enabled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="components" className="mb-8">
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="history">Update History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="components" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Component Versions</CardTitle>
                    <CardDescription>All tracked components and their current versions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Component</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Updates</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {versions && versions.map((component) => {
                            const lastUpdate = formatVersionDate(component.last_update);
                            return (
                              <TableRow key={component.component_id}>
                                <TableCell className="font-medium">{component.component_name}</TableCell>
                                <TableCell>{component.version}</TableCell>
                                <TableCell>{lastUpdate.date} at {lastUpdate.time}</TableCell>
                                <TableCell className="text-right">{component.update_count}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Update History</CardTitle>
                    <CardDescription>Chronological history of all component updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-6">
                        {versions && versions.map((component) => {
                          const changeLog = Array.isArray(component.change_log) ? component.change_log : [];
                          
                          return changeLog.length > 0 ? (
                            <div key={component.component_id} className="border-b border-gray-100 pb-5 last:border-0">
                              <h3 className="text-lg font-semibold mb-2 flex items-center">
                                {component.component_name}
                                <Badge className="ml-2 bg-sapp-blue">{component.version}</Badge>
                              </h3>
                              
                              <div className="space-y-3 pl-4 border-l-2 border-gray-100">
                                {changeLog.map((entry, idx) => {
                                  const entryDate = formatVersionDate(entry.timestamp);
                                  return (
                                    <div key={idx} className="relative">
                                      <div className="absolute -left-[17px] top-2 w-3 h-3 rounded-full bg-sapp-blue"></div>
                                      <p className="text-xs text-gray-500 mb-1">
                                        {entryDate.date} at {entryDate.time} - Version {entry.version}
                                      </p>
                                      <p className="text-sm">{entry.description}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default VersionInfo;
