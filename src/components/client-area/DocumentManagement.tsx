
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Construction } from 'lucide-react';

export const DocumentManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Document Management</h1>
      </div>

      <Alert>
        <Construction className="h-4 w-4" />
        <AlertDescription>
          Document management features have been temporarily disabled. Please contact support if you need access to specific documents.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Access
          </CardTitle>
          <CardDescription>
            Manage your organization's documents and files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Document management functionality is currently under maintenance.
            Please contact your administrator for document access requests.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
