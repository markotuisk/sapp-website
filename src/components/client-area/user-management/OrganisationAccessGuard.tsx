
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building2, Mail, Users } from 'lucide-react';
import { useRole } from '@/hooks/useRole';

interface OrganisationAccessGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const OrganisationAccessGuard: React.FC<OrganisationAccessGuardProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAdmin, clientData, userProfile, isLoading } = useRole();

  console.log('OrganisationAccessGuard - clientData:', clientData);
  console.log('OrganisationAccessGuard - userProfile:', userProfile);

  // Admin users (SAPP Security) can always access everything
  if (isAdmin()) {
    console.log('OrganisationAccessGuard - User is admin, allowing access');
    return <>{children}</>;
  }

  // While loading, show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  // Check if user has organisation assigned - check both sources
  // clientData.organization_id is the primary source, userProfile doesn't have organization_id
  const organizationId = clientData?.organization_id;
  const hasOrganisation = !!organizationId;
  const isGuestUser = organizationId === '00000000-0000-0000-0000-000000000001';

  console.log('OrganisationAccessGuard - organizationId:', organizationId);
  console.log('OrganisationAccessGuard - hasOrganisation:', hasOrganisation);
  console.log('OrganisationAccessGuard - isGuestUser:', isGuestUser);

  // Special handling for guest users
  if (isGuestUser) {
    return fallback || (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Users className="h-5 w-5" />
            Guest User Access
          </CardTitle>
          <CardDescription>
            You are currently assigned to the guest organisation with limited access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <Building2 className="h-4 w-4" />
            <AlertDescription>
              <strong>Limited Access:</strong> Guest users cannot access document management or other secure areas. 
              You need to be assigned to a proper organisation to access these features.
            </AlertDescription>
          </Alert>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">To gain full access:</h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Contact SAPP Security support for organisation assignment</li>
              <li>Provide your email address: <strong>{userProfile?.email}</strong></li>
              <li>Specify which organisation you should be assigned to</li>
              <li>Wait for an administrator to update your account</li>
            </ol>
          </div>

          <div className="flex items-center justify-center pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Regular check for users without organisation
  if (!hasOrganisation) {
    return fallback || (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            Organisation Assignment Required
          </CardTitle>
          <CardDescription>
            Your account requires organisation assignment to access secure areas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <Building2 className="h-4 w-4" />
            <AlertDescription>
              <strong>Access Restricted:</strong> Your account has not been assigned to an organisation. 
              This is required for security and access control purposes.
            </AlertDescription>
          </Alert>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What you need to do:</h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Contact SAPP Security support to have your account properly configured</li>
              <li>Provide your email address: <strong>{userProfile?.email}</strong></li>
              <li>Specify which organisation you should be assigned to</li>
            </ol>
          </div>

          <div className="flex items-center justify-center pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // User has organisation (and it's not guest), allow access
  console.log('OrganisationAccessGuard - Allowing access, user has valid organisation');
  return <>{children}</>;
};
