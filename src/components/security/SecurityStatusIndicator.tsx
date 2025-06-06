
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useSecurityMonitoring } from '@/hooks/security/useSecurityMonitoring';
import { useAuth } from '@/contexts/AuthContext';

export const SecurityStatusIndicator: React.FC = () => {
  const { user } = useAuth();
  const { securityStatus, isLoading } = useSecurityMonitoring();

  if (!user || isLoading) {
    return null;
  }

  if (!securityStatus) {
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <Shield className="h-3 w-3" />
        Security: Unknown
      </Badge>
    );
  }

  if (securityStatus.isAccountLocked) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Account Temporarily Locked</strong>
          <br />
          {securityStatus.message}
          {securityStatus.lockoutUntil && (
            <div className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">
                Locked until: {new Date(securityStatus.lockoutUntil).toLocaleString()}
              </span>
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (securityStatus.failedAttempts > 0) {
    return (
      <Alert className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Notice</strong>
          <br />
          {securityStatus.failedAttempts} failed login attempt(s) detected.
          {securityStatus.remainingAttempts && (
            <span> {securityStatus.remainingAttempts} attempts remaining before lockout.</span>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Badge variant="outline" className="flex items-center gap-1 text-green-700 border-green-200">
      <CheckCircle className="h-3 w-3" />
      Security: Good
    </Badge>
  );
};
