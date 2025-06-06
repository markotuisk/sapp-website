
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface Organization {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  phone?: string;
  status: string;
}

export const useOrganizationData = () => {
  const { user } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      if (!user) {
        setOrganization(null);
        setIsLoading(false);
        return;
      }

      try {
        // Get user's organization from their profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('organization_id')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile?.organization_id) {
          const { data: org, error: orgError } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', profile.organization_id)
            .single();

          if (orgError) throw orgError;
          setOrganization(org);
        } else {
          setOrganization(null);
        }
      } catch (error) {
        console.error('Error fetching organization:', error);
        setOrganization(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, [user]);

  return {
    organization,
    isLoading
  };
};
