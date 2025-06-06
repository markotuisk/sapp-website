
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Grid, List, Eye, EyeOff, Save } from 'lucide-react';
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

interface DashboardCustomizerProps {
  currentLayout: DashboardLayout;
  onLayoutChange: (layout: DashboardLayout) => void;
  onClose: () => void;
}

const defaultWidgets: DashboardWidget[] = [
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
];

export const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({
  currentLayout,
  onLayoutChange,
  onClose
}) => {
  const [layout, setLayout] = useState<DashboardLayout>(currentLayout);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isChanged = JSON.stringify(layout) !== JSON.stringify(currentLayout);
    setHasChanges(isChanged);
  }, [layout, currentLayout]);

  const handleWidgetToggle = (widgetId: string, enabled: boolean) => {
    setLayout(prev => ({
      ...prev,
      widgets: prev.widgets.map(widget =>
        widget.id === widgetId ? { ...widget, enabled } : widget
      )
    }));
  };

  const handleLayoutTypeChange = (layoutType: 'grid' | 'list') => {
    setLayout(prev => ({ ...prev, layout: layoutType }));
  };

  const handleColumnsChange = (columns: string) => {
    setLayout(prev => ({ ...prev, columns: parseInt(columns) }));
  };

  const handleCompactModeToggle = (compactMode: boolean) => {
    setLayout(prev => ({ ...prev, compactMode }));
  };

  const handleSave = () => {
    onLayoutChange(layout);
    toast({
      title: 'Success',
      description: 'Dashboard layout saved successfully',
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    const resetLayout: DashboardLayout = {
      layout: 'grid',
      columns: 3,
      compactMode: false,
      widgets: [...defaultWidgets]
    };
    setLayout(resetLayout);
  };

  const enabledWidgets = layout.widgets.filter(w => w.enabled);
  const disabledWidgets = layout.widgets.filter(w => w.enabled === false);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Dashboard Customisation
        </CardTitle>
        <CardDescription>
          Personalise your dashboard layout and choose which widgets to display
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Layout Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Layout Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="layout-type">Layout Type</Label>
              <Select value={layout.layout} onValueChange={handleLayoutTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">
                    <div className="flex items-center gap-2">
                      <Grid className="h-4 w-4" />
                      Grid Layout
                    </div>
                  </SelectItem>
                  <SelectItem value="list">
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4" />
                      List Layout
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {layout.layout === 'grid' && (
              <div className="space-y-2">
                <Label htmlFor="columns">Columns</Label>
                <Select value={layout.columns.toString()} onValueChange={handleColumnsChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Column</SelectItem>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="compact-mode">Compact Mode</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="compact-mode"
                  checked={layout.compactMode}
                  onCheckedChange={handleCompactModeToggle}
                />
                <Label htmlFor="compact-mode" className="text-sm text-gray-600">
                  Reduce spacing and padding
                </Label>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Widget Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dashboard Widgets</h3>
          
          {/* Enabled Widgets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-green-600">Active Widgets ({enabledWidgets.length})</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {enabledWidgets.map((widget) => (
                <Card key={widget.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium">{widget.name}</h5>
                          <Badge variant="secondary" className="text-xs">
                            {widget.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{widget.description}</p>
                      </div>
                      <Switch
                        checked={widget.enabled}
                        onCheckedChange={(enabled) => handleWidgetToggle(widget.id, enabled)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Disabled Widgets */}
          {disabledWidgets.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-gray-500" />
                <h4 className="font-medium text-gray-500">Available Widgets ({disabledWidgets.length})</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {disabledWidgets.map((widget) => (
                  <Card key={widget.id} className="border-gray-200 bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-gray-700">{widget.name}</h5>
                            <Badge variant="outline" className="text-xs">
                              {widget.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{widget.description}</p>
                        </div>
                        <Switch
                          checked={widget.enabled}
                          onCheckedChange={(enabled) => handleWidgetToggle(widget.id, enabled)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
