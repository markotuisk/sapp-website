
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Shield, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersList } from './user-management/UsersList';
import { OrganizationManagement } from './user-management/OrganizationManagement';
import { DataMigrationUtility } from './user-management/DataMigrationUtility';
import { AccountUnlockCard } from './user-management/AccountUnlockCard';
import { useRole } from '@/hooks/useRole';

interface UserManagementProps {
  onBack: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('users');
  const { isAdmin, isLoading } = useRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Access Denied</h2>
        <p className="text-gray-500">You need administrator privileges to access user management.</p>
      </div>
    );
  }

  return (
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
        <h1 className="text-2xl font-bold">User Management</h1>
        <div></div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="organizations" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Organizations
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="migration" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Migration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UsersList />
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          <OrganizationManagement />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <AccountUnlockCard />
        </TabsContent>

        <TabsContent value="migration" className="space-y-6">
          <DataMigrationUtility />
        </TabsContent>
      </Tabs>
    </div>
  );
};
