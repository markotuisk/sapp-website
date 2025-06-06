
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type Organization = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchOrganizations = async () => {
    try {
      setIsLoading(true);
      console.log('useOrganizations: Organizations feature disabled in simplified mode');
      
      // Return empty array since organizations table doesn't exist
      setOrganizations([]);
      
      toast({
        title: 'Organizations Unavailable',
        description: 'Organization management is not available in the simplified client area setup.',
        variant: 'destructive',
      });
    } catch (err) {
      console.error('Organizations fetch failed:', err);
      setOrganizations([]);
      toast({
        title: 'Error',
        description: 'Failed to load organizations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createOrganization = async (orgData: Omit<Organization, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('useOrganizations: Organization creation disabled in simplified mode');
      
      toast({
        title: 'Organization Creation Unavailable',
        description: 'Organization creation is not available in the simplified client area setup.',
        variant: 'destructive',
      });
      
      throw new Error('Organization creation not available in simplified mode');
    } catch (error) {
      console.error('useOrganizations: Error creating organization:', error);
      toast({
        title: 'Error',
        description: 'Failed to create organization',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    // Don't automatically fetch organizations since the feature is disabled
    setIsLoading(false);
  }, []);

  return {
    organizations,
    isLoading,
    createOrganization,
    refetchOrganizations: fetchOrganizations,
  };
};
