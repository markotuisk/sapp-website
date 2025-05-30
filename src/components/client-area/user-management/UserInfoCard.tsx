
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserWithProfile } from '@/types/roles';

interface UserInfoCardProps {
  user: UserWithProfile;
  selectedOrgName: string;
  hasOrganisation: boolean;
  successMessage: string | null;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({
  user,
  selectedOrgName,
  hasOrganisation,
  successMessage,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">User Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input value={user.email || ''} disabled />
          </div>
          <div>
            <Label>First Name</Label>
            <Input value={user.profile?.first_name || ''} disabled />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input value={user.profile?.last_name || ''} disabled />
          </div>
          <div>
            <Label>Current Organisation</Label>
            <Input 
              value={selectedOrgName} 
              disabled 
              className={!hasOrganisation && !successMessage ? 'border-red-300 bg-red-50' : ''}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
