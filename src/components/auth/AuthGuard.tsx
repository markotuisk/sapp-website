
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, WifiOff } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback,
  requireAuth = true,
}) => {
  const { user, isLoading, isOnline } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <WifiOff className="h-4 w-4" />
        <AlertDescription>
          You're offline. Authentication services require an internet connection.
        </AlertDescription>
      </Alert>
    );
  }

  if (requireAuth && !user) {
    return fallback || (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>
          You must be signed in to access this area. Please sign in to continue.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};
