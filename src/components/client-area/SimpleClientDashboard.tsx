
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, User, LogOut } from 'lucide-react';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { supabase } from '@/integrations/supabase/client';
import { NewsArticleManagement } from './news-management/NewsArticleManagement';
import { SimpleProfileManagement } from './SimpleProfileManagement';

type ViewMode = 'dashboard' | 'news' | 'profile';

export const SimpleClientDashboard: React.FC = () => {
  const { user, profile } = useSimpleAuth();
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.email || 'User';
  };

  if (currentView === 'news') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">News Management</h1>
          <Button 
            onClick={() => setCurrentView('dashboard')} 
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>
        <NewsArticleManagement />
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <SimpleProfileManagement onBack={() => setCurrentView('dashboard')} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {getDisplayName()}</h1>
          <p className="text-gray-600">Manage your news articles and profile</p>
        </div>
        <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('news')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-blue-600" />
              News Management
            </CardTitle>
            <CardDescription>
              Create, edit, and publish news articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Manage Articles
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('profile')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information and avatar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
