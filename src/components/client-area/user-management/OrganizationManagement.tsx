
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Plus } from 'lucide-react';

export const OrganizationManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Organizations</h2>
          <p className="text-gray-600">Manage organizations and their settings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Organization Management</h3>
          <p className="text-gray-600">
            This feature is coming soon. You'll be able to create and manage organizations here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
