
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Building2, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { useOrganizationData } from '@/hooks/useOrganizationData';

export const AdminProfileBlock: React.FC = () => {
  const { userProfile, clientData, userRoles, isAdmin } = useRole();
  const { 
    organizationId, 
    currentOrganization, 
    hasOrganization, 
    isGuestUser,
    canAccessCrossOrganization,
    getOrganizationName 
  } = useOrganizationData();

  if (!isAdmin()) {
    return null;
  }

  const profileOrgId = userProfile?.organization_id;
  const clientOrgId = clientData?.organization_id;
  const effectiveOrgId = organizationId;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Shield className="h-5 w-5" />
          Administrator Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Profile Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-900">Email</h4>
            <p className="text-blue-800">{userProfile?.email}</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Name</h4>
            <p className="text-blue-800">
              {userProfile?.first_name && userProfile?.last_name 
                ? `${userProfile.first_name} ${userProfile.last_name}`
                : 'Not set'
              }
            </p>
          </div>
        </div>

        {/* Roles */}
        <div>
          <h4 className="font-semibold text-blue-900 mb-2">Assigned Roles</h4>
          <div className="flex gap-2 flex-wrap">
            {userRoles.map(role => (
              <Badge key={role} className="bg-red-100 text-red-800">
                {role}
              </Badge>
            ))}
          </div>
        </div>

        {/* Organization Assignment Details */}
        <div className="space-y-3">
          <h4 className="font-semibold text-blue-900">Organization Assignment</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white p-3 rounded border">
              <div className="font-medium text-gray-700">Profile Organization</div>
              <div className="text-gray-600">
                {profileOrgId ? getOrganizationName(profileOrgId) : 'None'}
              </div>
              <div className="text-xs text-gray-500">{profileOrgId || 'No ID'}</div>
            </div>

            <div className="bg-white p-3 rounded border">
              <div className="font-medium text-gray-700">Client Data Organization</div>
              <div className="text-gray-600">
                {clientOrgId ? getOrganizationName(clientOrgId) : 'None'}
              </div>
              <div className="text-xs text-gray-500">{clientOrgId || 'No ID'}</div>
            </div>

            <div className="bg-white p-3 rounded border">
              <div className="font-medium text-gray-700">Effective Organization</div>
              <div className="text-gray-600">
                {effectiveOrgId ? getOrganizationName(effectiveOrgId) : 'None'}
              </div>
              <div className="text-xs text-gray-500">{effectiveOrgId || 'No ID'}</div>
            </div>
          </div>
        </div>

        {/* Access Level */}
        <div>
          <h4 className="font-semibold text-blue-900 mb-2">Access Level</h4>
          <div className="flex items-center gap-2">
            {canAccessCrossOrganization() ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700">Cross-Organization Access (Admin)</span>
              </>
            ) : (
              <>
                <Building2 className="h-4 w-4 text-blue-600" />
                <span className="text-blue-700">Single Organization Access</span>
              </>
            )}
          </div>
        </div>

        {/* Status Checks */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {hasOrganization() ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700">Has organization assignment</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-red-700">No organization assignment</span>
              </>
            )}
          </div>

          {isGuestUser() && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span className="text-amber-700">Assigned to guest organization</span>
            </div>
          )}
        </div>

        {/* Warnings */}
        {!hasOrganization() && !canAccessCrossOrganization() && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Warning: No organization assigned. This may cause access issues for non-admin features.
            </AlertDescription>
          </Alert>
        )}

        {profileOrgId !== clientOrgId && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Notice: Profile and client data have different organization assignments. 
              The system uses client data as the primary source.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
