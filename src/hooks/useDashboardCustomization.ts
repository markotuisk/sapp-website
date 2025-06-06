
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DashboardWidget {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  order: number;
  category: 'security' | 'documents' | 'activity' | 'analytics';
}

interface DashboardLayout {
  layout: 'grid' | 'list';
  columns: number;
  compactMode: boolean;
  widgets: DashboardWidget[];
}

const defaultLayout: DashboardLayout = {
  layout: 'grid',
  columns: 3,
  compactMode: false,
  widgets: [
    {
      id: 'security-status',
      name: 'Security Status',
      description: 'Current security alerts and status',
      enabled: true,
      order: 1,
      category: 'security'
    },
    {
      id: 'organization-status',
      name: 'Organisation Status',
      description: 'Organisation membership and details',
      enabled: true,
      order: 2,
      category: 'activity'
    },
    {
      id: 'recent-documents',
      name: 'Recent Documents',
      description: 'Recently accessed documents',
      enabled: true,
      order: 3,
      category: 'documents'
    },
    {
      id: 'activity-feed',
      name: 'Activity Feed',
      description: 'Recent user activities',
      enabled: false,
      order: 4,
      category: 'activity'
    },
    {
      id: 'usage-analytics',
      name: 'Usage Analytics',
      description: 'Personal usage statistics',
      enabled: false,
      order: 5,
      category: 'analytics'
    }
  ]
};

export const useDashboardCustomization = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dashboardLayout, setDashboardLayout] = useState<DashboardLayout>(defaultLayout);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardLayout();
    }
  }, [user]);

  const loadDashboardLayout = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('dashboard_layout')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data?.dashboard_layout) {
        setDashboardLayout(data.dashboard_layout as DashboardLayout);
      } else {
        // No saved layout, use default
        setDashboardLayout(defaultLayout);
      }
    } catch (error) {
      console.error('Error loading dashboard layout:', error);
      setDashboardLayout(defaultLayout);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDashboardLayout = async (newLayout: DashboardLayout) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          dashboard_layout: newLayout,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setDashboardLayout(newLayout);
      
      toast({
        title: 'Success',
        description: 'Dashboard layout saved successfully',
      });
      
      return true;
    } catch (error) {
      console.error('Error saving dashboard layout:', error);
      toast({
        title: 'Error',
        description: 'Failed to save dashboard layout',
        variant: 'destructive',
      });
      return false;
    }
  };

  const resetToDefault = async () => {
    return await saveDashboardLayout(defaultLayout);
  };

  const getEnabledWidgets = () => {
    return dashboardLayout.widgets
      .filter(widget => widget.enabled)
      .sort((a, b) => a.order - b.order);
  };

  return {
    dashboardLayout,
    setDashboardLayout,
    saveDashboardLayout,
    resetToDefault,
    getEnabledWidgets,
    isLoading
  };
};
