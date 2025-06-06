
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, UserPlus, Building2, Shield, Activity } from 'lucide-react';
import { AdminGuard } from '@/components/auth/AdminGuard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UsersList } from './user-management/UsersList';
import { OrganizationManagement } from './user-management/OrganizationManagement';
import { UserInvitations } from './user-management/UserInvitations';
import { AuthenticationLogs } from './user-management/AuthenticationLogs';
import { UserActivityLogs } from './user-management/UserActivityLogs';
import { useOrganizationAwareData } from '@/hooks/useOrganizationAwareData';

interface UserManagementProps {
  onBack: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('users');
  const { canAccessCrossOrganization, organizationId } = useOrganizationAwareData();

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
            {!canAccessCrossOrganization && (
              <Badge variant="outline" className="mt-1">
                Organization Scope
              </Badge>
            )}
          </div>
          <div></div>
        </div>

        {/* Access Level Indicator */}
        {!canAccessCrossOrganization && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Organization-Scoped Access</h3>
                <p className="text-blue-800 text-sm">
                  You can only manage users within your organization. Contact a SAPP Security admin for cross-organization access.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="organizations" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organizations
            </TabsTrigger>
            <TabsTrigger value="invitations" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invitations
            </TabsTrigger>
            <TabsTrigger value="auth-logs" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Auth Logs
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <UsersList />
          </TabsContent>

          <TabsContent value="organizations" className="space-y-6">
            <OrganizationManagement />
          </TabsContent>

          <TabsContent value="invitations" className="space-y-6">
            <UserInvitations />
          </TabsContent>

          <TabsContent value="auth-logs" className="space-y-6">
            <AuthenticationLogs />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <UserActivityLogs />
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
};
