
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

interface DigitalIDCardProps {
  onRequestDownload?: () => void;
}

export const DigitalIDCard: React.FC<DigitalIDCardProps> = ({ onRequestDownload }) => {
  const { user } = useAuth();
  const { roles, isLoading } = useRole();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Digital ID</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-md">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Digital Identity Card
        </CardTitle>
        <CardDescription className="text-blue-100">
          SAPP Security - Verified Identity
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user?.email}</h3>
            <p className="text-sm text-gray-600">Verified User</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Member since: </span>
            <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Roles</label>
          <div className="flex flex-wrap gap-1">
            {roles.length > 0 ? (
              roles.map((role, index) => (
                <Badge key={index} variant="secondary">
                  {role.role}
                </Badge>
              ))
            ) : (
              <Badge variant="outline">No roles assigned</Badge>
            )}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            This digital ID verifies your identity within the SAPP Security platform
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
