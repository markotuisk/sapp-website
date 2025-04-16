
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, AreaChart, Layers, TrendingUp, TrendingDown, Minus, FileCode, Server, Globe } from 'lucide-react';
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
  
  const getTrendIcon = () => {
    switch (metrics.trend) {
      case 'increasing':
        return <TrendingUp className="text-green-500" />;
      case 'decreasing':
        return <TrendingDown className="text-amber-500" />;
      default:
        return <Minus className="text-sapp-blue" />;
    }
  };
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-6 w-6 text-sapp-blue" />
          Codebase Metrics
        </CardTitle>
        <CardDescription>
          Statistics about the codebase size and change frequency
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
                <p className="text-2xl font-bold">{metrics.totalAPIs}</p>
                <p className="text-sm text-gray-500">Total APIs</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <AreaChart className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
                <p className="text-2xl font-bold">{metrics.totalUpdates}</p>
                <p className="text-sm text-gray-500">Total Updates</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  {getTrendIcon()}
                </div>
                <p className="text-2xl font-bold">{metrics.lastWeekUpdates}</p>
                <p className="text-sm text-gray-500">Updates Last Week</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
                <p className="text-2xl font-bold">{metrics.changeRate}</p>
                <p className="text-sm text-gray-500">Updates Per Component</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="breakdown" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Component Count</TableHead>
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodebaseMetrics;
