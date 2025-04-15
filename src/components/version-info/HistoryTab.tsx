
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { VersionInfo, formatVersionDate } from '@/lib/versionTracker';

interface HistoryTabProps {
  versions: VersionInfo[];
}

const HistoryTab = ({ versions }: HistoryTabProps) => {
  return (
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
  );
};

export default HistoryTab;
