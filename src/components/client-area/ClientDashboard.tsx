
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  Newspaper, 
  Settings, 
  User,
  Shield,
  Building2,
  Palette,
  Grid,
  List
} from 'lucide-react';
import { UserManagement } from './UserManagement';
import { DocumentManagement } from './DocumentManagement';
import { NewsArticleManagement } from './news-management/NewsArticleManagement';
import { UserProfile } from './UserProfile';
import { UserSettings } from './UserSettings';
import { SecurityStatusIndicator } from '@/components/security/SecurityStatusIndicator';
import { OrganizationStatusCard } from './user-management/OrganizationStatusCard';
import { DashboardCustomizer } from './dashboard/DashboardCustomizer';
import { ActivityFeedWidget } from './dashboard/widgets/ActivityFeedWidget';
import { RecentDocumentsWidget } from './dashboard/widgets/RecentDocumentsWidget';
import { useRole } from '@/hooks/useRole';
import { useOrganizationData } from '@/hooks/useOrganizationData';
import { useDashboardCustomization } from '@/hooks/useDashboardCustomization';

type DashboardView = 'overview' | 'users' | 'documents' | 'news' | 'profile' | 'settings' | 'customize';

export const ClientDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const { isAdmin } = useRole();
  const { hasOrganization } = useOrganizationData();
  const { 
    dashboardLayout, 
    saveDashboardLayout, 
    getEnabledWidgets,
    isLoading: layoutLoading 
  } = useDashboardCustomization();

  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement onBack={() => setCurrentView('overview')} />;
      case 'documents':
        return <DocumentManagement onBack={() => setCurrentView('overview')} />;
      case 'news':
        return <NewsArticleManagement />;
      case 'profile':
        return <UserProfile onBack={() => setCurrentView('overview')} />;
      case 'settings':
        return <UserSettings onBack={() => setCurrentView('overview')} />;
      case 'customize':
        return (
          <DashboardCustomizer
            currentLayout={dashboardLayout}
            onLayoutChange={saveDashboardLayout}
            onClose={() => setCurrentView('overview')}
          />
        );
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => {
    if (layoutLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    const enabledWidgets = getEnabledWidgets();
    const isGridLayout = dashboardLayout.layout === 'grid';
    const columns = isGridLayout ? dashboardLayout.columns : 1;
    const compact = dashboardLayout.compactMode;

    return (
      <div className="space-y-6">
        {/* Always show security status at top */}
        <SecurityStatusIndicator />
        
        {/* Always show organization status */}
        <OrganizationStatusCard />

        {/* Dashboard customization controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Your Dashboard</h2>
            {isGridLayout ? (
              <Grid className="h-4 w-4 text-gray-500" />
            ) : (
              <List className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('customize')}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Customise Dashboard
          </Button>
        </div>

        {/* Widgets Grid */}
        <div 
          className={`grid gap-6 ${
            isGridLayout 
              ? `grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(columns, 4)}` 
              : 'grid-cols-1'
          }`}
        >
          {/* Render enabled widgets */}
          {enabledWidgets.map((widget) => {
            switch (widget.id) {
              case 'recent-documents':
                return hasOrganization() ? (
                  <RecentDocumentsWidget key={widget.id} compact={compact} />
                ) : null;
              
              case 'activity-feed':
                return <ActivityFeedWidget key={widget.id} compact={compact} />;
              
              default:
                return null;
            }
          })}

          {/* Management Cards */}
          {isAdmin() && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage users, roles, and permissions across organisations
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

          {hasOrganization() && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Management
                </CardTitle>
                <CardDescription>
                  Upload, organise, and share secure documents
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
          )}

          {isAdmin() && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  News Management
                </CardTitle>
                <CardDescription>
                  Create and manage news articles and newsletters
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

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>
                View and update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setCurrentView('profile')} 
                className="w-full"
                variant="outline"
              >
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
              <CardDescription>
                Configure your account preferences and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setCurrentView('settings')} 
                className="w-full"
                variant="outline"
              >
                Open Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Information */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Security Information</h3>
          </div>
          <p className="text-blue-800 text-sm">
            Your account access is controlled by organisation-based security policies. 
            All activities are monitored and logged for security purposes.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Area Dashboard</h1>
        <p className="text-gray-600">Secure access to your organisation's resources</p>
      </div>
      
      {renderContent()}
    </div>
  );
};
