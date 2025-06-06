
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AppRole } from '@/types/roles';

interface CurrentRolesCardProps {
  roles: AppRole[];
}

export const CurrentRolesCard: React.FC<CurrentRolesCardProps> = ({ roles }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      case 'client': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Roles</CardTitle>
        <CardDescription>User currently has these roles assigned</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {(roles && roles.length > 0) ? (
            roles.map(role => (
              <Badge key={role} className={getRoleColor(role)}>
                {role}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500">No roles assigned</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
