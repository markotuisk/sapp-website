
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, ArrowLeft } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface UserSettingsProps {
  onBack: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ onBack }) => {
  const { preferences, updatePreferences } = useUserPreferences();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your account preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Notifications</h4>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={preferences?.email_notifications ?? true}
                onCheckedChange={(checked) => updatePreferences({ email_notifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="document-notifications">Document Notifications</Label>
              <Switch
                id="document-notifications"
                checked={preferences?.document_notifications ?? true}
                onCheckedChange={(checked) => updatePreferences({ document_notifications: checked })}
              />
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Appearance</h4>
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={preferences?.theme ?? 'light'}
                onValueChange={(value) => updatePreferences({ theme: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Language and Timezone */}
          <div className="space-y-4">
            <h4 className="font-medium">Localization</h4>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={preferences?.language ?? 'en'}
                onValueChange={(value) => updatePreferences({ language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={preferences?.timezone ?? 'UTC'}
                onValueChange={(value) => updatePreferences({ timezone: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
