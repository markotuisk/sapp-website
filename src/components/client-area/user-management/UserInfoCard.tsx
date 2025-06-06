
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, Building2, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
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
  successMessage
}) => {
  const getInitials = (user: UserWithProfile) => {
    const first = user.profile?.first_name?.charAt(0) || '';
    const last = user.profile?.last_name?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email.charAt(0).toUpperCase();
  };

  const getDisplayName = (user: UserWithProfile) => {
    if (user.profile?.first_name && user.profile?.last_name) {
      return `${user.profile.first_name} ${user.profile.last_name}`;
    }
    return user.email;
  };

  const isGuest = user.clientData?.organization_id === '00000000-0000-0000-0000-000000000001';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profile?.avatar_url} />
            <AvatarFallback className="bg-sapp-blue text-white text-lg">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{getDisplayName(user)}</h3>
              <div className="flex items-center gap-1 text-gray-600">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1 text-gray-600">
                <Building2 className="h-4 w-4" />
                <span>Current Organization: </span>
                <span className="font-medium">
                  {successMessage ? selectedOrgName : (hasOrganisation ? selectedOrgName : 'None')}
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Joined: {new Date(user.profile?.created_at || '').toLocaleDateString()}</span>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex flex-wrap gap-2">
              {!hasOrganisation && !successMessage && (
                <Badge variant="destructive">No Organization</Badge>
              )}
              {isGuest && (
                <Badge variant="outline" className="border-amber-400 text-amber-700">
                  Guest User
                </Badge>
              )}
              {successMessage && (
                <Badge className="bg-green-100 text-green-800">Updated</Badge>
              )}
            </div>

            {/* Warnings */}
            {!hasOrganisation && !successMessage && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This user cannot access secure areas without an organization assignment.
                </AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  User successfully updated with organization: {selectedOrgName}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
