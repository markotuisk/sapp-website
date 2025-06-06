
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, AlertCircle } from 'lucide-react';
import { AdminGuard } from '@/components/auth/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UserManagementProps {
  onBack: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
  return (
    <AdminGuard fallback={
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">Only SAPP Security administrators can access user management.</p>
        </div>
      </div>
    }>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
          <div></div>
        </div>

        {/* Simplified Content */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Advanced user management features are not available in the simplified client area setup.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              This area would typically contain advanced user management features including:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>User account management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Role and permission assignments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Organization management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>User invitations and onboarding</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Authentication and activity logs</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your current setup uses a simplified client area focused on news management. 
                Advanced user management features would require additional database tables and complex role-based access control.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  );
};
