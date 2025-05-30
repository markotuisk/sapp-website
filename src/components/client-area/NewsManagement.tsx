
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Users, Mail, BarChart3 } from 'lucide-react';
import { AdminGuard } from '@/components/auth/AdminGuard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewsArticleManagement } from './news-management/NewsArticleManagement';
import { SubscriberManagement } from './news-management/SubscriberManagement';
import { EmailCampaignManagement } from './news-management/EmailCampaignManagement';
import { NewsAnalytics } from './news-management/NewsAnalytics';

interface NewsManagementProps {
  onBack: () => void;
}

export const NewsManagement: React.FC<NewsManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    <AdminGuard fallback={
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">Only SAPP Security administrators can access news management.</p>
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
          <h1 className="text-2xl font-bold">News Management</h1>
          <div></div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <NewsArticleManagement />
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-6">
            <SubscriberManagement />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <EmailCampaignManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <NewsAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
};
