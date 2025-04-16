import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VersionInfo, formatVersionDate } from '@/lib/versionTracker';
import { groupComponents } from './utils';

interface ComponentsTabProps {
  versions: VersionInfo[];
}

const ComponentsTab = ({ versions }: ComponentsTabProps) => {
  const groupedComponents = groupComponents(versions);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredVersions = versions.filter(component => 
    component.component_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.component_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Versions</CardTitle>
        <CardDescription>All tracked components and their current versions</CardDescription>
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search components..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {searchTerm ? (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Updates</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVersions.map((component) => {
                  const lastUpdate = formatVersionDate(component.last_update);
                  return (
                    <TableRow key={component.component_id}>
                      <TableCell className="font-medium">{component.component_name}</TableCell>
                      <TableCell className="text-sm text-gray-500">{component.component_id}</TableCell>
                      <TableCell>{component.version}</TableCell>
                      <TableCell>{lastUpdate.date} at {lastUpdate.time}</TableCell>
                      <TableCell className="text-right">{component.update_count}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <Tabs defaultValue="Core">
            <TabsList className="mb-4">
              {Object.keys(groupedComponents).map(group => (
                <TabsTrigger value={group} key={group}>
                  {group} ({groupedComponents[group].length})
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(groupedComponents).map(([group, components]) => (
              <TabsContent value={group} key={group}>
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Updates</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {components.map((component) => {
                        const lastUpdate = formatVersionDate(component.last_update);
                        return (
                          <TableRow key={component.component_id}>
                            <TableCell className="font-medium">{component.component_name}</TableCell>
                            <TableCell className="text-sm text-gray-500">{component.component_id}</TableCell>
                            <TableCell>{component.version}</TableCell>
                            <TableCell>{lastUpdate.date} at {lastUpdate.time}</TableCell>
                            <TableCell className="text-right">{component.update_count}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ComponentsTab;
