
// Simplified version for public website - returns empty data
import { useState } from 'react';

interface OrganizationType {
  id: string;
  name: string;
  description?: string;
}

export const useOrganizationTypes = () => {
  const [organizationTypes] = useState<OrganizationType[]>([]);
  const [isLoading] = useState(false);

  return { organizationTypes, isLoading };
};
