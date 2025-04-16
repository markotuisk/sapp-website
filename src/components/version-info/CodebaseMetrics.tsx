
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Layers, FileCode, Server, Globe } from 'lucide-react';
import { VersionInfo } from '@/lib/versionTracker';
import { calculateCodebaseMetrics, groupComponents } from './VersionInfoUtils';
import MetricsDetailsDialog from './MetricsDetailsDialog';

interface CodebaseMetricsProps {
  versions: VersionInfo[];
}

type DialogContentType = {
  title: string;
  description: string;
  items: string[];
  icon: JSX.Element;
  showFlags?: boolean;
};

const CodebaseMetrics = ({ versions }: CodebaseMetricsProps) => {
  const metrics = calculateCodebaseMetrics(versions);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContentType>({
    title: '',
    description: '',
    items: [],
    icon: <></>,
    showFlags: false
  });
  
  const openDetailsDialog = (type: 'components' | 'pages' | 'services' | 'languages') => {
    const groups = groupComponents(versions);
    
    switch(type) {
      case 'components':
        setDialogContent({
          title: 'All Components',
          description: `${metrics.totalComponents} total components in the codebase`,
          items: versions.map(v => v.component_name || v.component_id),
          icon: <Layers className="h-6 w-6 text-sapp-blue" />
        });
        break;
      case 'pages':
        setDialogContent({
          title: 'Site Pages',
          description: `${metrics.totalPages} total pages in the application`,
          items: versions
            .filter(component => {
              const id = component.component_id.toLowerCase();
              return id.includes('page') || 
                id.includes('index') || 
                id.endsWith('-hero') || 
                id.includes('audit-') ||
                id.includes('cyber-') || 
                id.includes('event-') || 
                id.includes('install-');
            })
            .map(v => v.component_name || v.component_id),
          icon: <FileCode className="h-6 w-6 text-sapp-blue" />
        });
        break;
      case 'services':
        setDialogContent({
          title: 'Technical Services',
          description: `${metrics.totalServices} technical services powering the application`,
          items: metrics.technicalServices.map(service => `${service.name} - ${service.description}`),
          icon: <Server className="h-6 w-6 text-sapp-blue" />
        });
        break;
      case 'languages':
        setDialogContent({
          title: 'Supported Languages',
          description: 'Languages supported in the application',
          items: ['English (UK)', 'German', 'Dutch', 'French'],
          icon: <Globe className="h-6 w-6 text-sapp-blue" />,
          showFlags: true
        });
        break;
    }
    
    setShowDetailsDialog(true);
  };
  
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => openDetailsDialog('components')}
          >
            <Layers className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
            <p className="text-2xl font-bold">{metrics.totalComponents}</p>
            <p className="text-sm text-gray-500">Total Components</p>
          </div>
          
          <div 
            className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => openDetailsDialog('pages')}
          >
            <FileCode className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
            <p className="text-2xl font-bold">{metrics.totalPages}</p>
            <p className="text-sm text-gray-500">Total Pages</p>
          </div>
          
          <div 
            className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => openDetailsDialog('services')}
          >
            <Server className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
            <p className="text-2xl font-bold">{metrics.totalServices}</p>
            <p className="text-sm text-gray-500">Technical Services</p>
          </div>
          
          <div 
            className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => openDetailsDialog('languages')}
          >
            <Globe className="h-8 w-8 mx-auto mb-2 text-sapp-blue" />
            <p className="text-2xl font-bold">{metrics.supportedLanguages}</p>
            <p className="text-sm text-gray-500">Supported Languages</p>
          </div>
        </div>

        <MetricsDetailsDialog
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
          title={dialogContent.title}
          description={dialogContent.description}
          items={dialogContent.items}
          icon={dialogContent.icon}
          showFlags={dialogContent.showFlags}
        />
      </CardContent>
    </Card>
  );
};

export default CodebaseMetrics;
