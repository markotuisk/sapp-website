
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Organization = Tables<'organizations'>;

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrganizations = async () => {
    try {
      setIsLoading(true);
      const { data: orgsData, error: orgsError } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (orgsError) {
        console.error('Error fetching organizations:', orgsError);
        throw orgsError;
      } else {
        console.log('useOrganizations: Fetched organizations:', orgsData?.length || 0);
        setOrganizations(orgsData || []);
      }
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
      console.log('useOrganizations: Creating organization:', orgData);
      const { data, error } = await supabase
        .from('organizations')
        .insert(orgData)
        .select()
        .single();

      if (error) {
        console.error('useOrganizations: Error creating organization:', error);
        throw error;
      }

      console.log('useOrganizations: Successfully created organization:', data);
      setOrganizations(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Organization created successfully',
      });
      return data;
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
    fetchOrganizations();
  }, []);

  return {
    organizations,
    isLoading,
    createOrganization,
    refetchOrganizations: fetchOrganizations,
  };
};
