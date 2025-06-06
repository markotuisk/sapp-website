
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { useOrganizationData } from '@/hooks/useOrganizationData';
import { cleanupAuthState, debugAuthState } from '@/utils/authStateCleanup';

export const AuthDebugPanel: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { user, session, isAuthenticated } = useAuth();
  const roleData = useRole();
  const orgData = useOrganizationData();

  const handleCleanup = () => {
    if (confirm('This will clear all authentication data and refresh the page. Continue?')) {
      cleanupAuthState();
      window.location.reload();
    }
  };

  const handleDebugLog = () => {
    debugAuthState();
    console.log('=== HOOK DEBUG DATA ===');
    console.log('Auth Hook:', { user: !!user, session: !!session, isAuthenticated });
    console.log('Role Hook:', roleData);
    console.log('Organization Hook:', orgData);
    console.log('=== END HOOK DEBUG ===');
  };

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-yellow-800">
          <span>🐛 Auth Debug Panel</span>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              size="sm"
            >
              {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button onClick={handleDebugLog} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={handleCleanup} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Status */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={isAuthenticated ? "default" : "destructive"}>
            Auth: {isAuthenticated ? 'Yes' : 'No'}
          </Badge>
          <Badge variant={roleData.isLoading ? "secondary" : "default"}>
            Roles: {roleData.isLoading ? 'Loading' : 'Loaded'}
          </Badge>
          <Badge variant={orgData.isLoading ? "secondary" : "default"}>
            Org Data: {orgData.isLoading ? 'Loading' : 'Loaded'}
          </Badge>
          <Badge variant={roleData.isAdmin() ? "default" : "outline"}>
            Admin: {roleData.isAdmin() ? 'Yes' : 'No'}
          </Badge>
          <Badge variant={orgData.hasOrganization() ? "default" : "destructive"}>
            Has Org: {orgData.hasOrganization() ? 'Yes' : 'No'}
          </Badge>
        </div>

        {/* Detailed Information */}
        {showDetails && (
          <div className="space-y-3 text-sm">
            <div>
              <strong>User ID:</strong> {user?.id || 'None'}
            </div>
            <div>
              <strong>Email:</strong> {user?.email || 'None'}
            </div>
            <div>
              <strong>Roles:</strong> {roleData.userRoles.join(', ') || 'None'}
            </div>
            <div>
              <strong>Organization ID:</strong> {orgData.organizationId || 'None'}
            </div>
            <div>
              <strong>Current Org:</strong> {orgData.currentOrganization?.name || 'None'}
            </div>
            <div>
              <strong>Profile Org ID:</strong> {roleData.userProfile?.organization_id || 'None'}
            </div>
            <div>
              <strong>Client Data Org ID:</strong> {roleData.clientData?.organization_id || 'None'}
            </div>
            <div>
              <strong>Role Loading:</strong> {roleData.isLoading ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Org Data Loading:</strong> {orgData.isLoading ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Role Error:</strong> {roleData.error || 'None'}
            </div>
          </div>
        )}

        <div className="text-xs text-yellow-700">
          Use the refresh button to log current state to console, or the cleanup button to clear auth state.
        </div>
      </CardContent>
    </Card>
  );
};
