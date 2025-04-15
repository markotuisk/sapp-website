
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VersionInfo, formatVersionDate } from '@/lib/versionTracker';

interface ComponentsTabProps {
  versions: VersionInfo[];
}

const ComponentsTab = ({ versions }: ComponentsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Versions</CardTitle>
        <CardDescription>All tracked components and their current versions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Updates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions && versions.map((component) => {
                const lastUpdate = formatVersionDate(component.last_update);
                return (
                  <TableRow key={component.component_id}>
                    <TableCell className="font-medium">{component.component_name}</TableCell>
                    <TableCell>{component.version}</TableCell>
                    <TableCell>{lastUpdate.date} at {lastUpdate.time}</TableCell>
                    <TableCell className="text-right">{component.update_count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ComponentsTab;
