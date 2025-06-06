
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useOrganizationData } from '@/hooks/useOrganizationData';

export const OrganizationStatusCard: React.FC = () => {
  const { 
    currentOrganization, 
    organizationId, 
    hasOrganization, 
    isGuestUser, 
    canAccessCrossOrganization,
    getOrganizationName 
  } = useOrganizationData();

  const getStatusIcon = () => {
    if (canAccessCrossOrganization()) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (hasOrganization()) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (isGuestUser()) return <Users className="h-4 w-4 text-amber-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = () => {
    if (canAccessCrossOrganization()) {
      return <Badge className="bg-purple-100 text-purple-800">Admin Access</Badge>;
    }
    if (hasOrganization()) {
      return <Badge className="bg-green-100 text-green-800">Organization Member</Badge>;
    }
    if (isGuestUser()) {
      return <Badge className="bg-amber-100 text-amber-800">Guest User</Badge>;
    }
    return <Badge variant="destructive">No Organization</Badge>;
  };

  const getStatusMessage = () => {
    if (canAccessCrossOrganization()) {
      return "You have administrator access to all organizations and users.";
    }
    if (hasOrganization()) {
      return `You are a member of ${getOrganizationName(organizationId)} and can access organization resources.`;
    }
    if (isGuestUser()) {
      return "You are assigned to the guest organization with limited access. Contact support to be assigned to a proper organization.";
    }
    return "You are not assigned to any organization and cannot access secure areas. Contact support for organization assignment.";
  };

  const getAlertVariant = () => {
    if (canAccessCrossOrganization() || hasOrganization()) return "default";
    if (isGuestUser()) return "default";
    return "destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Organization Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">Access Level</span>
          </div>
          {getStatusBadge()}
        </div>

        {currentOrganization && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-900">{currentOrganization.name}</h4>
            {currentOrganization.description && (
              <p className="text-sm text-blue-700 mt-1">{currentOrganization.description}</p>
            )}
            <div className="text-xs text-blue-600 mt-2">
              Organization ID: {organizationId}
            </div>
          </div>
        )}

        <Alert variant={getAlertVariant()}>
          <AlertDescription>{getStatusMessage()}</AlertDescription>
        </Alert>

        {canAccessCrossOrganization() && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-900">Administrator Privileges</h4>
            <ul className="text-sm text-purple-700 mt-1 space-y-1">
              <li>• View and manage all users across organizations</li>
              <li>• Assign and remove roles for any user</li>
              <li>• Access all organizational data and documents</li>
              <li>• Create and manage organizations</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
