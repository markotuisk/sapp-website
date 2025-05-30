
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';
import type { UserWithProfile, AppRole } from '@/types/roles';

const AVAILABLE_ROLES: AppRole[] = ['admin', 'manager', 'support', 'client'];

interface UserEditDialogProps {
  user: UserWithProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserEditDialog: React.FC<UserEditDialogProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const { assignUserRole, removeUserRole, refetchData } = useUserManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingRoles, setPendingRoles] = useState<AppRole[]>([]);

  useEffect(() => {
    if (user && isOpen) {
      setPendingRoles(user.roles || []);
    }
  }, [user, isOpen]);

  const handleRoleToggle = (role: AppRole, checked: boolean) => {
    if (checked) {
      setPendingRoles(prev => [...prev, role]);
    } else {
      setPendingRoles(prev => prev.filter(r => r !== role));
    }
  };

  const handleSaveRoles = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const currentRoles = user.roles || [];
      const rolesToAdd = pendingRoles.filter(role => !currentRoles.includes(role));
      const rolesToRemove = currentRoles.filter(role => !pendingRoles.includes(role));

      // Add new roles
      for (const role of rolesToAdd) {
        await assignUserRole(user.id, role);
      }

      // Remove roles
      for (const role of rolesToRemove) {
        await removeUserRole(user.id, role);
      }

      await refetchData();
      onClose();
    } catch (error) {
      console.error('Error updating roles:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {user ? 'Manage User' : 'Add New User'}
          </DialogTitle>
          <DialogDescription>
            {user ? `Update roles and permissions for ${user.email}` : 'Create a new user account'}
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>
                  <div>
                    <Label>First Name</Label>
                    <Input value={user.profile?.first_name || ''} disabled />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input value={user.profile?.last_name || ''} disabled />
                  </div>
                  <div>
                    <Label>Organization</Label>
                    <Input value={user.profile?.organization || ''} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Roles</CardTitle>
                <CardDescription>User currently has these roles assigned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.roles.length > 0 ? (
                    user.roles.map(role => (
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

            {/* Role Management */}
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
                        onCheckedChange={(checked) => handleRoleToggle(role, !!checked)}
                      />
                      <Label htmlFor={role} className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium capitalize">{role}</span>
                            <p className="text-sm text-gray-500">
                              {role === 'admin' && 'Full system access and user management'}
                              {role === 'manager' && 'Manage teams and oversee operations'}
                              {role === 'support' && 'Provide customer support and assistance'}
                              {role === 'client' && 'Standard client access to services'}
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
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
          {user && (
            <Button onClick={handleSaveRoles} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
