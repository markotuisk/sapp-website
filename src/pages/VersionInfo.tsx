
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllVersions, useBuildInfo } from '@/hooks/useVersions';
import { formatVersionDate } from '@/lib/versionTracker';

import { getCurrentDateTime } from '@/components/version-info/VersionInfoUtils';
import LoadingState from '@/components/version-info/LoadingState';
import VersionInfoHeader from '@/components/version-info/VersionInfoHeader';
import SummaryCards from '@/components/version-info/SummaryCards';
import ComponentsTab from '@/components/version-info/ComponentsTab';
import HistoryTab from '@/components/version-info/HistoryTab';
import CodebaseMetrics from '@/components/version-info/CodebaseMetrics';
import { RegisterComponents } from '@/components/version-info/RegisterComponents';
import { Toaster } from 'sonner';

const VersionInfo = () => {
  const currentDateTime = getCurrentDateTime();
  const { data: versions = [], isLoading: versionsLoading, refetch } = useAllVersions();
  const { buildInfo, isLoading: buildInfoLoading } = useBuildInfo();
  
  const isLoading = versionsLoading || buildInfoLoading;
  
  const buildDate = buildInfo.buildDate ? formatVersionDate(buildInfo.buildDate) : currentDateTime;
  const lastUpdate = buildInfo.lastUpdated ? formatVersionDate(buildInfo.lastUpdated) : currentDateTime;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Version Information | SAPP Security</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-8">
        <VersionInfoHeader currentDateTime={currentDateTime} />
        
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            <RegisterComponents />
            
            <SummaryCards 
              buildInfo={buildInfo} 
              buildDate={buildDate} 
              lastUpdate={lastUpdate} 
            />
            
            <CodebaseMetrics versions={versions} />
            
            <Tabs defaultValue="components" className="mb-8">
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="history">Update History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="components" className="mt-4">
                <ComponentsTab versions={versions} />
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <HistoryTab versions={versions} />
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
