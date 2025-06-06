
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { supabase } from '@/integrations/supabase/client';
import type { UserWithProfile, AppRole } from '@/types/roles';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserInfoCard } from './UserInfoCard';
import { OrganizationAssignmentCard } from './OrganizationAssignmentCard';
import { CurrentRolesCard } from './CurrentRolesCard';
import { RoleManagementCard } from './RoleManagementCard';

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
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { toast } = useToast();

  console.log('UserEditDialog render - user:', user);
  console.log('UserEditDialog render - isOpen:', isOpen);

  useEffect(() => {
    console.log('UserEditDialog useEffect triggered - user:', user, 'isOpen:', isOpen);
    
    if (user && isOpen) {
      try {
        setDialogError(null);
        setSuccessMessage(null);
        
        const userRoles = Array.isArray(user.roles) ? user.roles : [];
        setPendingRoles(userRoles);
        console.log('UserEditDialog - Set pending roles:', userRoles);
        
        const clientOrgId = user.clientData?.organization_id;
        const orgId = clientOrgId || '';
        
        setSelectedOrganization(orgId);
        console.log('UserEditDialog - Organization sources:', {
          clientOrgId,
          finalOrgId: orgId
        });
        
      } catch (error) {
        console.error('Error setting up user data:', error);
        setDialogError('Failed to load user data');
      }
    } else {
      setPendingRoles([]);
      setSelectedOrganization('');
      setDialogError(null);
      setSuccessMessage(null);
    }
  }, [user, isOpen]);

  const handleRoleToggle = (role: AppRole, checked: boolean) => {
    console.log('Role toggle:', role, checked);
    setSuccessMessage(null);
    if (checked) {
      setPendingRoles(prev => [...prev, role]);
    } else {
      setPendingRoles(prev => prev.filter(r => r !== role));
    }
  };

  const handleOrganizationChange = (value: string) => {
    setSelectedOrganization(value);
    setSuccessMessage(null);
  };

  const updateUserOrganisation = async (userId: string, organizationId: string) => {
    console.log('Updating user organisation:', userId, 'to org:', organizationId);
    
    try {
      const { data: existingClientData, error: checkError } = await supabase
        .from('client_data')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing client data:', checkError);
        throw new Error(`Failed to check existing client data: ${checkError.message}`);
      }

      if (existingClientData) {
        console.log('Updating existing client_data:', existingClientData.id);
        const { error: updateError } = await supabase
          .from('client_data')
          .update({ organization_id: organizationId })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error updating client data organisation:', updateError);
          throw new Error(`Failed to update organization: ${updateError.message}`);
        }
        console.log('Successfully updated existing client_data organisation');
      } else {
        console.log('Creating new client_data record for user:', userId);
        const { error: insertError } = await supabase
          .from('client_data')
          .insert({
            user_id: userId,
            organization_id: organizationId
          });

        if (insertError) {
          console.error('Error creating client data:', insertError);
          if (insertError.message.includes('row-level security')) {
            throw new Error('Permission denied: Unable to create organization assignment. Please contact an administrator.');
          }
          throw new Error(`Failed to create organization assignment: ${insertError.message}`);
        }
        console.log('Successfully created new client_data organisation');
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ organization_id: organizationId })
        .eq('id', userId);

      if (profileError) {
        console.warn('Warning updating profile organisation (non-critical):', profileError);
      } else {
        console.log('Successfully synced profile organisation');
      }

      return true;
    } catch (error) {
      console.error('Failed to update user organisation:', error);
      throw error;
    }
  };

  const handleSaveChanges = async () => {
    if (!user) {
      console.log('No user to save changes for');
      return;
    }

    if (!selectedOrganization) {
      setDialogError('Organisation assignment is required');
      toast({
        title: 'Organisation Required',
        description: 'User must be assigned to an organisation before accessing the system.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setDialogError(null);
    setSuccessMessage(null);
    console.log('Saving changes for user:', user.id);
    console.log('Current roles:', user.roles);
    console.log('Pending roles:', pendingRoles);
    console.log('Selected organisation:', selectedOrganization);
    
    try {
      console.log('Step 1: Updating organisation assignment...');
      await updateUserOrganisation(user.id, selectedOrganization);
      console.log('✓ Organisation assignment completed successfully');

      console.log('Step 2: Processing role changes...');
      const currentRoles = user.roles || [];
      const rolesToAdd = pendingRoles.filter(role => !currentRoles.includes(role));
      const rolesToRemove = currentRoles.filter(role => !pendingRoles.includes(role));

      console.log('Roles to add:', rolesToAdd);
      console.log('Roles to remove:', rolesToRemove);

      for (const role of rolesToRemove) {
        try {
          console.log(`Removing role ${role} from user ${user.id}`);
          await removeUserRole(user.id, role);
          console.log(`✓ Successfully removed role ${role}`);
        } catch (error) {
          console.error(`Failed to remove role ${role}:`, error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          if (errorMessage.includes('row-level security')) {
            throw new Error(`Permission denied: Unable to remove role ${role}. Please contact an administrator.`);
          }
          throw new Error(`Failed to remove role ${role}: ${errorMessage}`);
        }
      }

      for (const role of rolesToAdd) {
        try {
          console.log(`Assigning role ${role} to user ${user.id}`);
          await assignUserRole(user.id, role);
          console.log(`✓ Successfully assigned role ${role}`);
        } catch (error) {
          console.error(`Failed to assign role ${role}:`, error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          if (errorMessage.includes('row-level security')) {
            throw new Error(`Permission denied: Unable to assign role ${role}. Please contact an administrator.`);
          }
          throw new Error(`Failed to assign role ${role}: ${errorMessage}`);
        }
      }

      console.log('✓ All role changes completed successfully');

      console.log('Step 3: Refreshing user data...');
      await refetchData();
      console.log('✓ Data refresh completed');
      
      setSuccessMessage('User updated successfully! All changes have been saved.');
      toast({
        title: 'Success',
        description: 'User updated successfully. Organization assignment and roles have been saved.',
      });
      
      console.log('✓ User update completed successfully');
      
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setDialogError(errorMessage);
      toast({
        title: 'Error',
        description: `Failed to update user: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  if (dialogError && !user) {
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

  if (!user) {
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

  const clientOrgId = user.clientData?.organization_id;
  const hasOrganisation = !!clientOrgId;
  const selectedOrgName = selectedOrganization 
    ? organizations.find(org => org.id === selectedOrganization)?.name || 'Unknown Organisation'
    : 'No organisation assigned';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage User</DialogTitle>
          <DialogDescription>
            Update roles and organisation for {user.email}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading user data...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {successMessage && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
              </Alert>
            )}

            {dialogError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{dialogError}</AlertDescription>
              </Alert>
            )}

            {!hasOrganisation && !successMessage && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Security Warning:</strong> This user has no organisation assigned and cannot access any secure documents or areas. 
                  An organisation must be assigned before the user can use the system.
                </AlertDescription>
              </Alert>
            )}

            <UserInfoCard 
              user={user}
              selectedOrgName={selectedOrgName}
              hasOrganisation={hasOrganisation}
              successMessage={successMessage}
            />

            <OrganizationAssignmentCard 
              selectedOrganization={selectedOrganization}
              onOrganizationChange={handleOrganizationChange}
              organizations={organizations}
            />

            <CurrentRolesCard roles={user.roles || []} />

            <RoleManagementCard 
              pendingRoles={pendingRoles}
              onRoleToggle={handleRoleToggle}
            />
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isSubmitting}>
            {successMessage ? 'Close' : 'Cancel'}
          </Button>
          {!successMessage && (
            <Button 
              onClick={handleSaveChanges} 
              disabled={isSubmitting || isLoading || !selectedOrganization}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
