
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building2, Mail, Users, Shield, Loader2 } from 'lucide-react';
import { useOrganizationData } from '@/hooks/useOrganizationData';
import { useRole } from '@/hooks/useRole';

interface OrganisationAccessGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const OrganisationAccessGuard: React.FC<OrganisationAccessGuardProps> = ({ 
  children, 
  fallback 
}) => {
  const { 
    hasOrganization, 
    isGuestUser, 
    canAccessCrossOrganization, 
    currentOrganization,
    isLoading: orgDataLoading 
  } = useOrganizationData();
  
  const { isLoading: roleLoading, isAdmin } = useRole();

  // Enhanced debug logging
  const debugInfo = {
    orgDataLoading,
    roleLoading,
    hasOrganization: hasOrganization(),
    isGuestUser: isGuestUser(),
    canAccessCrossOrganization: canAccessCrossOrganization(),
    isAdmin: isAdmin(),
    currentOrganization: currentOrganization?.name,
    timestamp: new Date().toISOString()
  };

  console.log('OrganisationAccessGuard: Enhanced debug info', debugInfo);

  // Wait for BOTH organization data AND role data to load completely
  const isStillLoading = orgDataLoading || roleLoading;
  
  if (isStillLoading) {
    console.log('OrganisationAccessGuard: Still loading, showing loading state');
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <div>
            <div className="font-medium">Loading access permissions...</div>
            <div className="text-sm text-gray-600">
              Verifying organization assignment and user roles
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin users (SAPP Security) can always access everything - this should now work correctly
  if (isAdmin() || canAccessCrossOrganization()) {
    console.log('OrganisationAccessGuard: Allowing access for admin user', { 
      isAdmin: isAdmin(), 
      canAccessCrossOrganization: canAccessCrossOrganization() 
    });
    return <>{children}</>;
  }

  // Special handling for guest users
  if (isGuestUser()) {
    console.log('OrganisationAccessGuard: Blocking access for guest user');
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
  if (!hasOrganization()) {
    console.log('OrganisationAccessGuard: Blocking access for user without organization');
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
              <li>Specify which organisation you should be assigned to</li>
            </ol>
          </div>

          <div className="flex items-center justify-center pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
          
          {/* Debug information in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
              <strong>Debug Info:</strong> {JSON.stringify(debugInfo, null, 2)}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // User has organisation (and it's not guest), allow access
  console.log('OrganisationAccessGuard: Allowing access for user with organization:', currentOrganization?.name);
  return <>{children}</>;
};
