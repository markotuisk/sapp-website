
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

export const AdminProfileBlock: React.FC = () => {
  const { user } = useAuth();
  const { roles, isAdmin, isLoading } = useRole();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Shield className="h-5 w-5" />
          Admin Profile
        </CardTitle>
        <CardDescription className="text-blue-700">
          Administrative access privileges
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-blue-900">Roles:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {roles.map((role, index) => (
              <Badge key={index} variant="outline" className="border-blue-300 text-blue-800">
                {role.role}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
          <strong>Admin Access:</strong> You have administrative privileges and can manage users, organizations, and system settings.
        </div>
      </CardContent>
    </Card>
  );
};
