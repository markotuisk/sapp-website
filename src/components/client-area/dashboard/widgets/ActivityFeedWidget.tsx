
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  FileText, 
  Users, 
  Shield, 
  Clock,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  category: 'document' | 'security' | 'user' | 'system';
  metadata?: Record<string, any>;
}

interface ActivityFeedWidgetProps {
  compact?: boolean;
  maxItems?: number;
}

export const ActivityFeedWidget: React.FC<ActivityFeedWidgetProps> = ({
  compact = false,
  maxItems = 10
}) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      
      // Fetch user activity logs
      const { data: userLogs, error: userError } = await supabase
        .from('user_activity_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(maxItems);

      if (userError) throw userError;

      // Transform the data into activity items
      const activityItems: ActivityItem[] = (userLogs || []).map(log => ({
        id: log.id,
        action: log.action,
        description: getActivityDescription(log.action, log.changes),
        timestamp: log.created_at,
        category: getActivityCategory(log.action),
        metadata: log.changes
      }));

      setActivities(activityItems);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityDescription = (action: string, changes: any): string => {
    switch (action) {
      case 'login':
        return 'Signed in to the platform';
      case 'logout':
        return 'Signed out of the platform';
      case 'document_upload':
        return `Uploaded document: ${changes?.filename || 'Unknown'}`;
      case 'document_download':
        return `Downloaded document: ${changes?.filename || 'Unknown'}`;
      case 'profile_update':
        return 'Updated profile information';
      case 'password_change':
        return 'Changed account password';
      case 'assign_role':
        return `Assigned role: ${changes?.role || 'Unknown'}`;
      case 'remove_role':
        return `Removed role: ${changes?.role || 'Unknown'}`;
      default:
        return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const getActivityCategory = (action: string): ActivityItem['category'] => {
    if (action.includes('document')) return 'document';
    if (action.includes('security') || action.includes('password') || action.includes('login')) return 'security';
    if (action.includes('role') || action.includes('user')) return 'user';
    return 'system';
  };

  const getActivityIcon = (category: ActivityItem['category']) => {
    switch (category) {
      case 'document':
        return FileText;
      case 'security':
        return Shield;
      case 'user':
        return Users;
      case 'system':
        return Activity;
      default:
        return Activity;
    }
  };

  const getCategoryColor = (category: ActivityItem['category']) => {
    switch (category) {
      case 'document':
        return 'bg-blue-100 text-blue-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={`flex items-center gap-2 ${compact ? "text-lg" : ""}`}>
              <Activity className="h-5 w-5" />
              Activity Feed
            </CardTitle>
            {!compact && (
              <CardDescription>
                Recent activities and system events
              </CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchActivities}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={compact ? "pt-0" : ""}>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activities</p>
            <p className="text-sm">Activities will appear here as you use the platform</p>
          </div>
        ) : (
          <ScrollArea className={compact ? "h-48" : "h-64"}>
            <div className="space-y-3">
              {activities.map((activity) => {
                const IconComponent = getActivityIcon(activity.category);
                
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className={`p-1 rounded-full ${getCategoryColor(activity.category)}`}>
                      <IconComponent className="h-3 w-3" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`${compact ? 'text-sm' : ''} font-medium text-gray-900`}>
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
        
        {!compact && activities.length > 0 && (
          <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-gray-500">
            <span>Last updated: {formatDistanceToNow(lastRefresh, { addSuffix: true })}</span>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              View All Activities
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
