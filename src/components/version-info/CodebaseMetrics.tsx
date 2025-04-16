
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Layers, FileCode, Server, Globe } from 'lucide-react';
import { VersionInfo } from '@/lib/versionTracker';
import { calculateCodebaseMetrics, groupComponents } from './VersionInfoUtils';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CodebaseMetricsProps {
  versions: VersionInfo[];
}

const CodebaseMetrics = ({ versions }: CodebaseMetricsProps) => {
  const metrics = calculateCodebaseMetrics(versions);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    description: string;
    items: string[];
    icon: JSX.Element;
  }>({
    title: '',
    description: '',
    items: [],
    icon: <></>,
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
          title: 'Services',
          description: `${metrics.totalServices} total services offered`,
          items: versions
            .filter(component => {
              const id = component.component_id.toLowerCase();
              return id.includes('service') || 
                id.includes('feature') || 
                id.includes('capabilities') ||
                id.includes('solution');
            })
            .map(v => v.component_name || v.component_id),
          icon: <Server className="h-6 w-6 text-sapp-blue" />
        });
        break;
      case 'languages':
        setDialogContent({
          title: 'Supported Languages',
          description: 'Languages supported in the application',
          items: ['English (UK)', 'German', 'Dutch', 'French'],
          icon: <Globe className="h-6 w-6 text-sapp-blue" />
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
            <p className="text-sm text-gray-500">Total Services</p>
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

        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {dialogContent.icon}
                {dialogContent.title}
              </DialogTitle>
              <DialogDescription>
                {dialogContent.description}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[50vh] overflow-y-auto mt-4">
              {dialogContent.items.length > 0 ? (
                <ul className="space-y-2">
                  {dialogContent.items.map((item, index) => (
                    <li key={index} className="p-2 bg-gray-50 rounded-md">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No items found</p>
              )}
              
              {dialogContent.title === 'Supported Languages' && (
                <div className="flex justify-center gap-4 mt-4">
                  <span title="English" className="text-2xl">🇬🇧</span>
                  <span title="German" className="text-2xl">🇩🇪</span>
                  <span title="Dutch" className="text-2xl">🇳🇱</span>
                  <span title="French" className="text-2xl">🇫🇷</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CodebaseMetrics;
