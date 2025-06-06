
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Construction } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

export const ProfileManagement: React.FC = () => {
  const { user } = useAuth();
  const { roles, isLoading } = useRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile Management</h1>
      </div>

      <Alert>
        <Construction className="h-4 w-4" />
        <AlertDescription>
          Profile management features are currently under maintenance. Basic profile information is shown below.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription>
            Your current profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="text-sm text-gray-900">{user?.email}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Roles</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {roles.map((role, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {role.role}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Member Since</label>
            <p className="text-sm text-gray-900">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
