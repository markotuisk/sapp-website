
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Settings, 
  User, 
  Users, 
  Newspaper, 
  LogOut,
  Shield,
  Activity,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { UserProfile } from './UserProfile';
import { DocumentManagement } from './DocumentManagement';
import { UserSettings } from './UserSettings';
import { NewsManagement } from './NewsManagement';
import { OrganisationAccessGuard } from './user-management/OrganisationAccessGuard';
import { AdminGuard } from '@/components/auth/AdminGuard';
import { AdminProfileBlock } from './AdminProfileBlock';

export const ClientDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const { userProfile, isAdmin } = useRole();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleBackToProfile = () => {
    setActiveTab('profile');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = userProfile?.first_name 
    ? `${userProfile.first_name} ${userProfile.last_name || ''}`.trim()
    : userProfile?.email || 'User';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {displayName}!
          </h1>
          <p className="text-gray-600">Welcome to your secure client area</p>
        </div>
        <div className="flex items-center gap-4">
          {isAdmin() && (
            <Badge className="bg-red-100 text-red-800">
              <Shield className="h-3 w-3 mr-1" />
              Administrator
            </Badge>
          )}
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Admin Profile Block */}
      {isAdmin() && (
        <AdminProfileBlock />
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            News
          </TabsTrigger>
          <TabsTrigger value="user-management" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <UserProfile onBack={handleBackToProfile} />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <OrganisationAccessGuard>
            <DocumentManagement onBack={handleBackToProfile} />
          </OrganisationAccessGuard>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <UserSettings onBack={handleBackToProfile} />
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <AdminGuard fallback={
            <Card>
              <CardHeader>
                <CardTitle>News Management</CardTitle>
                <CardDescription>Access restricted to administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Only administrators can manage news articles and newsletters.
                </p>
              </CardContent>
            </Card>
          }>
            <NewsManagement onBack={handleBackToProfile} />
          </AdminGuard>
        </TabsContent>

        <TabsContent value="user-management" className="space-y-6">
          <UserManagement onBack={() => setActiveTab('profile')} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Log
              </CardTitle>
              <CardDescription>Your recent account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Activity logging feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
