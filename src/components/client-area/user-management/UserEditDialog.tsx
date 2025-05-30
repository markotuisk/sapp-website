
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';
import type { UserWithProfile, AppRole } from '@/types/roles';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const { assignUserRole, removeUserRole, refetchData, organizations, isLoading } = useUserManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingRoles, setPendingRoles] = useState<AppRole[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<string>('none');
  const [dialogError, setDialogError] = useState<string | null>(null);
  const { toast } = useToast();

  // Debug logging
  console.log('UserEditDialog render - user:', user);
  console.log('UserEditDialog render - isOpen:', isOpen);
  console.log('UserEditDialog render - isLoading:', isLoading);
  console.log('UserEditDialog render - organizations:', organizations);

  useEffect(() => {
    console.log('UserEditDialog useEffect triggered - user:', user, 'isOpen:', isOpen);
    
    if (user && isOpen) {
      try {
        setDialogError(null);
        
        // Safely handle roles array - ensure it's always an array
        const userRoles = Array.isArray(user.roles) ? user.roles : [];
        setPendingRoles(userRoles);
        console.log('UserEditDialog - Set pending roles:', userRoles);
        
        // Get organization ID from client data, safely handling undefined
        const orgId = user.clientData?.organization_id || 'none';
        setSelectedOrganization(orgId);
        console.log('UserEditDialog - Set organization ID:', orgId);
      } catch (error) {
        console.error('Error setting up user data:', error);
        setDialogError('Failed to load user data');
      }
    } else {
      // Reset state when dialog closes or user is null
      setPendingRoles([]);
      setSelectedOrganization('none');
      setDialogError(null);
    }
  }, [user, isOpen]);

  const handleRoleToggle = (role: AppRole, checked: boolean) => {
    console.log('Role toggle:', role, checked);
    if (checked) {
      setPendingRoles(prev => [...prev, role]);
    } else {
      setPendingRoles(prev => prev.filter(r => r !== role));
    }
  };

  const handleSaveRoles = async () => {
    if (!user) {
      console.log('No user to save roles for');
      return;
    }

    setIsSubmitting(true);
    try {
      const currentRoles = user.roles || [];
      const rolesToAdd = pendingRoles.filter(role => !currentRoles.includes(role));
      const rolesToRemove = currentRoles.filter(role => !pendingRoles.includes(role));

      console.log('Current roles:', currentRoles);
      console.log('Roles to add:', rolesToAdd);
      console.log('Roles to remove:', rolesToRemove);

      // Add new roles
      for (const role of rolesToAdd) {
        console.log(`Assigning role ${role} to user ${user.id}`);
        await assignUserRole(user.id, role);
      }

      // Remove roles
      for (const role of rolesToRemove) {
        console.log(`Removing role ${role} from user ${user.id}`);
        await removeUserRole(user.id, role);
      }

      await refetchData();
      
      toast({
        title: 'Success',
        description: 'User roles updated successfully',
      });
      
      onClose();
    } catch (error) {
      console.error('Error updating roles:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user roles',
        variant: 'destructive',
      });
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

  // Early return if dialog is not open
  if (!isOpen) {
    console.log('UserEditDialog - Not open, returning null');
    return null;
  }

  // Show error state if there's a dialog error
  if (dialogError) {
    console.log('UserEditDialog - Showing error state:', dialogError);
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>Unable to load user management dialog</DialogDescription>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{dialogError}</AlertDescription>
          </Alert>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Show error state if user is null
  if (!user) {
    console.log('UserEditDialog - No user provided');
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>No user data available</DialogDescription>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Unable to load user information. Please try again.</AlertDescription>
          </Alert>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Find organization name from the selected organization ID
  const selectedOrgName = selectedOrganization === 'none' 
    ? 'No organisation' 
    : organizations.find(org => org.id === selectedOrganization)?.name || 'No organisation';

  console.log('UserEditDialog - Rendering with user:', user.email);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage User</DialogTitle>
          <DialogDescription>
            Update roles and organization for {user.email}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading user data...</span>
          </div>
        ) : (
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
                    <Input value={user.email || ''} disabled />
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
                    <Label>Current Organization</Label>
                    <Input value={selectedOrgName} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Organization Assignment</CardTitle>
                <CardDescription>Assign user to an organisation for proper access control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="organization">Select Organisation</Label>
                    <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an organisation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No organisation</SelectItem>
                        {organizations.map(org => (
                          <SelectItem key={org.id} value={org.id}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {organizations.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No organisations available. Create an organisation first in the Organisations tab.
                    </p>
                  )}
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
                  {(user.roles && user.roles.length > 0) ? (
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
          <Button onClick={handleSaveRoles} disabled={isSubmitting || isLoading}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
