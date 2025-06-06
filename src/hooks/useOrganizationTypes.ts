
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface OrganizationType {
  id: string;
  name: string;
  description?: string;
}

export const useOrganizationTypes = () => {
  const [organizationTypes, setOrganizationTypes] = useState<OrganizationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizationTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('organization_types')
          .select('id, name, description')
          .order('name');

        if (error) {
          console.error('Error fetching organization types:', error);
        } else {
          setOrganizationTypes(data || []);
        }
      } catch (error) {
        console.error('Error in fetchOrganizationTypes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizationTypes();
  }, []);

  return { organizationTypes, isLoading };
};
