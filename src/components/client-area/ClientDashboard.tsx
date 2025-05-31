
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Settings, Shield, Newspaper, UserCog, ScanLine } from 'lucide-react';
import { DocumentManagement } from './DocumentManagement';
import { ProfileManagement } from './ProfileManagement';
import { UserSettings } from './UserSettings';
import { NewsManagement } from './NewsManagement';
import { UserManagement } from './UserManagement';
import { IDVerification } from './IDVerification';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

export const ClientDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const { user } = useAuth();
  const { isAdmin } = useRole();

  if (currentView === 'documents') {
    return <DocumentManagement onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'profile') {
    return <ProfileManagement onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'settings') {
    return <UserSettings onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'news') {
    return <NewsManagement onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'users') {
    return <UserManagement onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'id-verification') {
    return <IDVerification onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-600">Welcome to your secure client area</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* ID Verification */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanLine className="h-5 w-5" />
              ID Verification
            </CardTitle>
            <CardDescription>
              Scan and verify team member digital IDs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setCurrentView('id-verification')} 
              className="w-full"
            >
              Verify Team IDs
            </Button>
          </CardContent>
        </Card>

        {/* Document Management */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Management
            </CardTitle>
            <CardDescription>
              Upload, organise, and share your secure documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setCurrentView('documents')} 
              className="w-full"
            >
              Manage Documents
            </Button>
          </CardContent>
        </Card>

        {/* User Management - Admin Only */}
        {isAdmin && (
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage users, roles, organizations, and invitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setCurrentView('users')} 
                className="w-full"
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>
        )}

        {/* News Management - Admin Only */}
        {isAdmin && (
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                News Management
              </CardTitle>
              <CardDescription>
                Create, edit, and manage news articles and newsletters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setCurrentView('news')} 
                className="w-full"
              >
                Manage News
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Profile Management */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Profile Management
            </CardTitle>
            <CardDescription>
              Update your personal and professional information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setCurrentView('profile')} 
              className="w-full"
            >
              Manage Profile
            </Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Configure notifications, security, and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setCurrentView('settings')} 
              className="w-full"
            >
              Manage Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Overview */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Overview
            </CardTitle>
            <CardDescription>
              Monitor account security and recent activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Security
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Debug info for admin users */}
      {isAdmin && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            ✓ Admin access detected for: {user?.email}
          </p>
        </div>
      )}
    </div>
  );
};
