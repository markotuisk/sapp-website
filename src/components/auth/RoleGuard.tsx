
import React from 'react';
import { useRole } from '@/hooks/useRole';
import type { AppRole } from '@/types/roles';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: AppRole[];
  fallback?: React.ReactNode;
  requireAll?: boolean;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallback = null,
  requireAll = false,
}) => {
  const { userRoles, isLoading } = useRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const hasAccess = requireAll
    ? allowedRoles.every(role => userRoles.includes(role))
    : allowedRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
