
import { useUsers } from './user-management/useUsers';
import { useOrganizations } from './user-management/useOrganizations';
import { useUserRoles } from './user-management/useUserRoles';
import { useInvitations } from './user-management/useInvitations';
import { useLogs } from './user-management/useLogs';

export const useUserManagement = () => {
  const { users, isLoading: usersLoading, refetchUsers } = useUsers();
  const { organizations, isLoading: orgsLoading, createOrganization, refetchOrganizations } = useOrganizations();
  const { assignUserRole, removeUserRole } = useUserRoles();
  const { invitations, isLoading: invitationsLoading, createInvitation, refetchInvitations } = useInvitations();
  const { activityLogs, authLogs, isLoading: logsLoading, refetchLogs } = useLogs();

  const isLoading = usersLoading || orgsLoading || invitationsLoading || logsLoading;

  const refetchData = async () => {
    console.log('useUserManagement: Refetching all data...');
    await Promise.all([
      refetchUsers(),
      refetchOrganizations(),
      refetchInvitations(),
      refetchLogs(),
    ]);
    console.log('useUserManagement: All data refetched');
  };

  return {
    users,
    organizations,
    invitations,
    activityLogs,
    authLogs,
    isLoading,
    assignUserRole,
    removeUserRole,
    createOrganization,
    createInvitation,
    refetchData,
  };
};
