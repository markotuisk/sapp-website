
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, RefreshCw } from 'lucide-react';
import { useOrganizationAccess } from '@/hooks/security/useOrganizationAccess';

interface SecurityGuardProps {
  children: React.ReactNode;
  requiredOrgId?: string;
  fallback?: React.ReactNode;
  showError?: boolean;
}

export const SecurityGuard: React.FC<SecurityGuardProps> = ({
  children,
  requiredOrgId,
  fallback,
  showError = true
}) => {
  const { checkOrganizationAccess, validateDataAccess } = useOrganizationAccess();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!requiredOrgId) {
          // No specific org required, allow access
          setHasAccess(true);
          return;
        }

        // Check if user can access the required organization
        const accessGranted = await checkOrganizationAccess(requiredOrgId);
        setHasAccess(accessGranted);

        if (!accessGranted) {
          setError('You do not have permission to access this organization\'s data.');
        }
      } catch (err) {
        console.error('Security verification failed:', err);
        setError('Failed to verify access permissions. Please try again.');
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [requiredOrgId, checkOrganizationAccess]);

  const handleRetry = () => {
    setHasAccess(null);
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Verifying access permissions...</span>
        </div>
      </div>
    );
  }

  if (hasAccess === false) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showError) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error || 'Access denied'}</span>
            <Button onClick={handleRetry} variant="outline" size="sm" className="ml-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  }

  return <>{children}</>;
};
