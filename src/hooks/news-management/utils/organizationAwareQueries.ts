import { useOrganizationData } from '@/hooks/useOrganizationData';

export const useOrganizationAwareQueries = () => {
  const { canAccessCrossOrganization, organizationId } = useOrganizationData();

  const getOrganizationSpecificQuery = (baseQuery: any, tableName: string) => {
    // If user can access cross-organization, return base query (all data)
    if (canAccessCrossOrganization()) {
      return baseQuery;
    }
    
    // Otherwise, filter by organization
    if (organizationId) {
      return baseQuery.eq('organization_id', organizationId);
    }
    
    // No organization assigned - return empty query
    return baseQuery.eq('organization_id', 'no-org-assigned');
  };

  const addOrganizationContext = (data: any) => {
    // If user can access cross-organization, they can create for any org
    if (canAccessCrossOrganization()) {
      return {
        ...data,
        organization_id: data.organization_id || organizationId
      };
    }
    
    // Regular users create for their organization only
    return {
      ...data,
      organization_id: organizationId
    };
  };

  return {
    getOrganizationSpecificQuery,
    addOrganizationContext,
    canAccessCrossOrganization,
    organizationId
  };
};
