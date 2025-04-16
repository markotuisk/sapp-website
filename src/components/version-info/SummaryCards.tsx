
import React from 'react';
import { Code, Layers, Calendar, FileCode, Server, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SummaryCardsProps {
  buildInfo: {
    currentBuild: string;
    buildDate: string;
    lastUpdated: string;
    frameworkVersion: string;
    tailwindVersion: string;
    componentCount: number;
    totalPages: number;
    totalServices: number;
    supportedLanguages: number;
  };
  buildDate: {
    date: string;
    time: string;
    iso: string;
  };
  lastUpdate: {
    date: string;
    time: string;
    iso: string;
  };
}

const SummaryCards = ({ buildInfo, buildDate, lastUpdate }: SummaryCardsProps) => {
  return (
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
              <span className="text-sm text-sapp-gray">Pages:</span>
              <div className="flex items-center">
                <FileCode className="h-4 w-4 mr-1 text-sapp-blue" />
                <span className="font-medium">{buildInfo.totalPages}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-sapp-gray">Services:</span>
              <div className="flex items-center">
                <Server className="h-4 w-4 mr-1 text-sapp-blue" />
                <span className="font-medium">{buildInfo.totalServices}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-sapp-gray">Languages:</span>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1 text-sapp-blue" />
                <span className="font-medium">{buildInfo.supportedLanguages}</span>
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
  );
};

export default SummaryCards;
