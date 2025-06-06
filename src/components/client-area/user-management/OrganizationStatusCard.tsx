
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';

export const OrganizationStatusCard: React.FC = () => {
  const { users, organizations } = useUserManagement();

  // Organization analysis
  const usersWithoutOrg = users.filter(user => 
    !user.clientData?.organization_id
  );
  
  const guestUsers = users.filter(user => 
    user.clientData?.organization_id === '00000000-0000-0000-0000-000000000001'
  );

  const orgAssignments = users.reduce((acc, user) => {
    const orgId = user.clientData?.organization_id;
    if (orgId && orgId !== '00000000-0000-0000-0000-000000000001') {
      acc[orgId] = (acc[orgId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalAssigned = Object.values(orgAssignments).reduce((sum, count) => sum + count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Organization Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{organizations.length}</div>
            <div className="text-sm text-gray-600">Organizations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalAssigned}</div>
            <div className="text-sm text-gray-600">Assigned Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{guestUsers.length}</div>
            <div className="text-sm text-gray-600">Guest Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{usersWithoutOrg.length}</div>
            <div className="text-sm text-gray-600">Unassigned</div>
          </div>
        </div>

        {/* Organization Distribution */}
        {organizations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">User Distribution by Organization</h4>
            <div className="space-y-2">
              {organizations.map(org => {
                const userCount = orgAssignments[org.id] || 0;
                return (
                  <div key={org.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">{org.name}</span>
                    <Badge variant="outline">
                      {userCount} user{userCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="space-y-2">
          {usersWithoutOrg.length === 0 && guestUsers.length === 0 ? (
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span>All users have proper organization assignments</span>
            </div>
          ) : (
            <div className="space-y-2">
              {usersWithoutOrg.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {usersWithoutOrg.length} user(s) have no organization assignment and cannot access secure areas.
                  </AlertDescription>
                </Alert>
              )}
              
              {guestUsers.length > 0 && (
                <Alert className="border-amber-200 bg-amber-50">
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    {guestUsers.length} user(s) are in the guest organization with limited access.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
