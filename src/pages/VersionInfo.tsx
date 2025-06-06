
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllVersions, useBuildInfo } from '@/hooks/useVersions';
import { getCurrentDateTime } from '@/components/version-info/utils';
import LoadingState from '@/components/version-info/LoadingState';
import VersionInfoHeader from '@/components/version-info/VersionInfoHeader';
import SummaryCards from '@/components/version-info/SummaryCards';
import CodebaseMetrics from '@/components/version-info/CodebaseMetrics';
import { Toaster } from 'sonner';
import TicketsBacklog from '@/components/tickets/TicketsBacklog';
import CompletedTickets from '@/components/tickets/CompletedTickets';

const VersionInfo = () => {
  const currentDateTime = getCurrentDateTime();
  const { buildInfo, isLoading: buildInfoLoading } = useBuildInfo();
  const { data: versions = [] } = useAllVersions();
  const isLoading = buildInfoLoading;

  // Create the required date objects for the SummaryCards component
  const buildDate = {
    date: new Date(buildInfo.buildDate).toLocaleDateString('en-GB'),
    time: new Date(buildInfo.buildDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    iso: buildInfo.buildDate
  };

  const lastUpdate = {
    date: new Date(buildInfo.lastUpdated).toLocaleDateString('en-GB'),
    time: new Date(buildInfo.lastUpdated).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    iso: buildInfo.lastUpdated
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Issue Tracker | SAPP Security</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-8">
        <VersionInfoHeader currentDateTime={currentDateTime} />
        
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            <h1 id="version-info-heading" className="text-3xl font-bold text-sapp-dark mb-6 sr-only">
              Version Information and Issue Tracker
            </h1>
            <SummaryCards buildInfo={buildInfo} buildDate={buildDate} lastUpdate={lastUpdate} />
            <CodebaseMetrics versions={versions} />
            
            <Tabs defaultValue="backlog" className="mb-8">
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                <TabsTrigger value="backlog">Backlog</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="backlog" className="mt-4">
                <TicketsBacklog />
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <CompletedTickets />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default VersionInfo;
