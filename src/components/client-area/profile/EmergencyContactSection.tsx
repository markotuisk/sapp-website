
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmergencyContactSectionProps {
  profileData: {
    emergency_contact_name: string;
    emergency_contact_phone: string;
  };
  onProfileDataChange: (field: string, value: string) => void;
}

export const EmergencyContactSection: React.FC<EmergencyContactSectionProps> = ({
  profileData,
  onProfileDataChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contact</CardTitle>
        <CardDescription>
          Emergency contact information for security purposes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergency-name">Contact Name</Label>
            <Input
              id="emergency-name"
              value={profileData.emergency_contact_name}
              onChange={(e) => onProfileDataChange('emergency_contact_name', e.target.value)}
              placeholder="Emergency contact name"
            />
          </div>
          <div>
            <Label htmlFor="emergency-phone">Contact Phone</Label>
            <Input
              id="emergency-phone"
              value={profileData.emergency_contact_phone}
              onChange={(e) => onProfileDataChange('emergency_contact_phone', e.target.value)}
              placeholder="Emergency contact phone"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
