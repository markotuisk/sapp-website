
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Layers, FileCode, Server, Globe } from 'lucide-react';
import { VersionInfo } from '@/lib/versionTracker';
import { calculateCodebaseMetrics } from './VersionInfoUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CodebaseMetricsProps {
  versions: VersionInfo[];
}

const CodebaseMetrics = ({ versions }: CodebaseMetricsProps) => {
  const metrics = calculateCodebaseMetrics(versions);
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-6 w-6 text-sapp-blue" />
          Codebase Metrics
        </CardTitle>
        <CardDescription>
          Statistics about the codebase composition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Layers className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
                <p className="text-2xl font-bold">{metrics.totalComponents}</p>
                <p className="text-sm text-gray-500">Total Components</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <FileCode className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
                <p className="text-2xl font-bold">{metrics.totalPages}</p>
                <p className="text-sm text-gray-500">Total Pages</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Server className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
                <p className="text-2xl font-bold">{metrics.totalServices}</p>
                <p className="text-sm text-gray-500">Total Services</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
                <p className="text-2xl font-bold">{metrics.supportedLanguages}</p>
                <p className="text-sm text-gray-500">Supported Languages</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="breakdown" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-center">Components</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(metrics.componentBreakdown || {}).map(([category, count]) => (
                      <TableRow key={category}>
                        <TableCell className="font-medium">{category}</TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-center">Pages</h3>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <FileCode className="h-10 w-10 mx-auto mb-3 text-sapp-blue" />
                  <div className="text-3xl font-bold mb-1">{metrics.totalPages}</div>
                  <p className="text-sm text-gray-500">Total site pages</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-center">Services</h3>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Server className="h-10 w-10 mx-auto mb-3 text-sapp-blue" />
                  <div className="text-3xl font-bold mb-1">{metrics.totalServices}</div>
                  <p className="text-sm text-gray-500">Total services</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-center">Languages</h3>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Globe className="h-10 w-10 mx-auto mb-3 text-sapp-blue" />
                  <div className="text-3xl font-bold mb-1">{metrics.supportedLanguages}</div>
                  <div className="flex justify-center gap-2 mt-3">
                    <span title="English">🇬🇧</span>
                    <span title="German">🇩🇪</span>
                    <span title="Dutch">🇳🇱</span>
                    <span title="French">🇫🇷</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodebaseMetrics;
