
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText } from 'lucide-react';
import { VersionInfo, formatVersionDate } from '@/lib/versionTracker';
import { Button } from '@/components/ui/button';

interface HistoryTabProps {
  versions: VersionInfo[];
}

const HistoryTab = ({ versions }: HistoryTabProps) => {
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({});
  const [timeFilter, setTimeFilter] = useState<string>('all');
  
  // Extract all change logs into a flat array with component info
  const allChangeLogs = versions.flatMap(component => {
    if (!component.change_log) return [];
    
    return component.change_log.map(entry => ({
      componentId: component.component_id,
      componentName: component.component_name,
      ...entry
    }));
  });
  
  // Sort by timestamp, most recent first
  allChangeLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Filter based on time
  const now = new Date();
  const filteredLogs = allChangeLogs.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    switch (timeFilter) {
      case 'today':
        return entryDate.toDateString() === now.toDateString();
      case 'week':
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= oneWeekAgo;
      case 'month':
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return entryDate >= oneMonthAgo;
      default:
        return true;
    }
  });
  
  const toggleComponent = (componentId: string) => {
    setExpandedComponents(prev => ({
      ...prev,
      [componentId]: !prev[componentId]
    }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update History</CardTitle>
        <CardDescription>Chronological history of all component updates</CardDescription>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Button 
            variant={timeFilter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('all')}
          >
            All Time
          </Button>
          <Button 
            variant={timeFilter === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('month')}
          >
            Last 30 Days
          </Button>
          <Button 
            variant={timeFilter === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('week')}
          >
            Last 7 Days
          </Button>
          <Button 
            variant={timeFilter === 'today' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('today')}
          >
            Today
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No updates found for the selected time period.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredLogs.map((entry, index) => {
                const entryDate = formatVersionDate(entry.timestamp);
                return (
                  <div key={`${entry.componentId}-${index}`} className="border-b border-gray-100 pb-5 last:border-0">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleComponent(entry.componentId)}
                    >
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        {entry.componentName}
                        <Badge className="ml-2 bg-sapp-blue">{entry.version}</Badge>
                      </h3>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {entryDate.date}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {entryDate.time}
                      </span>
                    </div>
                    
                    <div className="pl-4 mt-2 border-l-2 border-gray-100">
                      <div className="relative">
                        <div className="absolute -left-[17px] top-2 w-3 h-3 rounded-full bg-sapp-blue"></div>
                        <div className="flex items-start">
                          <FileText className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-sm">{entry.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
