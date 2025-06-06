
import { useState, useEffect } from 'react';

interface OrganizationType {
  id: string;
  name: string;
  description?: string;
}

export const useOrganizationTypes = () => {
  const [organizationTypes, setOrganizationTypes] = useState<OrganizationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizationTypes = async () => {
      try {
        setIsLoading(true);
        console.log('Organization types feature disabled in simplified mode');
        
        // Return empty array since organization_types table doesn't exist
        setOrganizationTypes([]);
      } catch (error) {
        console.error('Organization types feature disabled:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Don't fetch organization types since the feature is disabled
    setIsLoading(false);
  }, []);

  return { organizationTypes, isLoading };
};
