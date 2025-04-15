
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, AreaChart, Layers, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { VersionInfo } from '@/lib/versionTracker';
import { calculateCodebaseMetrics } from './VersionInfoUtils';

interface CodebaseMetricsProps {
  versions: VersionInfo[];
}

const CodebaseMetrics = ({ versions }: CodebaseMetricsProps) => {
  const metrics = calculateCodebaseMetrics(versions);
  
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Layers className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
            <p className="text-2xl font-bold">{metrics.totalComponents}</p>
            <p className="text-sm text-gray-500">Total Components</p>
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
      </CardContent>
    </Card>
  );
};

export default CodebaseMetrics;
