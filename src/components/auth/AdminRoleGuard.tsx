
import React from 'react';
import { useRole } from '@/hooks/useRole';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2, Mail, AlertTriangle, RefreshCw } from 'lucide-react';

interface AdminRoleGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AdminRoleGuard: React.FC<AdminRoleGuardProps> = ({
  children,
  fallback,
}) => {
  const { isAdmin, isLoading, userProfile, error, refreshUserData, userRoles } = useRole();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Verifying admin privileges...</p>
        </div>
      </div>
    );
  }

  // Show error state with retry option
  if (error) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Authentication Error
          </CardTitle>
          <CardDescription>
            Unable to verify your administrator privileges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Role Verification Failed</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm mb-3">
              <li>Click "Retry Verification" to refresh your access permissions</li>
              <li>Sign out and sign back in to refresh your session</li>
              <li>Contact SAPP Security support if the issue persists</li>
            </ol>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button 
              onClick={refreshUserData} 
              className="flex items-center gap-2"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Verification
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Simple admin check - no more emergency mode
  const hasAdminAccess = isAdmin();
  
  if (!hasAdminAccess) {
    return fallback || (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Shield className="h-5 w-5" />
            Administrator Access Required
          </CardTitle>
          <CardDescription>
            This area is restricted to SAPP Security administrators only
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have administrator privileges. Only SAPP Security administrators 
              can access news management, user management, and other administrative features.
            </AlertDescription>
          </Alert>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Your Current Access:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Email:</strong> {userProfile?.email}</p>
              <p><strong>Roles:</strong> {userRoles.length > 0 ? userRoles.join(', ') : 'No roles assigned'}</p>
              <p><strong>Required:</strong> admin role</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Need admin access?</h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm mb-3">
              <li>Contact SAPP Security support to request administrator privileges</li>
              <li>Provide your email address: <strong>{userProfile?.email}</strong></li>
              <li>Include justification for requiring admin access</li>
              <li>Wait for an existing administrator to approve your request</li>
            </ol>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button 
              onClick={refreshUserData} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Access
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};
