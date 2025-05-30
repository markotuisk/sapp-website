
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { AppRole } from '@/types/roles';

const AVAILABLE_ROLES: AppRole[] = ['admin', 'manager', 'support', 'client'];

interface RoleManagementCardProps {
  pendingRoles: AppRole[];
  onRoleToggle: (role: AppRole, checked: boolean) => void;
}

export const RoleManagementCard: React.FC<RoleManagementCardProps> = ({
  pendingRoles,
  onRoleToggle,
}) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      case 'client': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDescription = (role: AppRole) => {
    switch (role) {
      case 'admin': return 'Full system access and user management (SAPP Security only)';
      case 'manager': return 'Manage teams and oversee operations';
      case 'support': return 'Provide customer support and assistance';
      case 'client': return 'Standard client access to services';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Manage Roles</CardTitle>
        <CardDescription>Select which roles this user should have</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {AVAILABLE_ROLES.map(role => (
            <div key={role} className="flex items-center space-x-2">
              <Checkbox
                id={role}
                checked={pendingRoles.includes(role)}
                onCheckedChange={(checked) => onRoleToggle(role, !!checked)}
              />
              <Label htmlFor={role} className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium capitalize">{role}</span>
                    <p className="text-sm text-gray-500">
                      {getRoleDescription(role)}
                    </p>
                  </div>
                  <Badge className={getRoleColor(role)}>
                    {role}
                  </Badge>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
