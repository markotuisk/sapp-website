
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';
import type { AppRole } from '@/types/roles';

type UserInvitation = Tables<'user_invitations'>;

export const useInvitations = () => {
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchInvitations = async () => {
    try {
      setIsLoading(true);
      const { data: invitationsData, error: invitationsError } = await supabase
        .from('user_invitations')
        .select(`
          *,
          organizations(name)
        `)
        .order('created_at', { ascending: false });

      if (invitationsError) {
        console.error('Error fetching invitations:', invitationsError);
        throw invitationsError;
      } else {
        console.log('useInvitations: Fetched invitations:', invitationsData?.length || 0);
        setInvitations(invitationsData || []);
      }
    } catch (err) {
      console.error('Invitations fetch failed:', err);
      setInvitations([]);
      toast({
        title: 'Error',
        description: 'Failed to load invitations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createInvitation = async (email: string, organizationId: string, roles: AppRole[]) => {
    try {
      console.log('useInvitations: Creating invitation for:', email, 'org:', organizationId, 'roles:', roles);
      const { data, error } = await supabase
        .from('user_invitations')
        .insert({
          email,
          organization_id: organizationId,
          roles
        })
        .select()
        .single();

      if (error) {
        console.error('useInvitations: Error creating invitation:', error);
        throw error;
      }

      console.log('useInvitations: Successfully created invitation:', data);
      setInvitations(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Invitation sent successfully',
      });
      return data;
    } catch (error) {
      console.error('useInvitations: Error creating invitation:', error);
      toast({
        title: 'Error',
        description: 'Failed to send invitation',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return {
    invitations,
    isLoading,
    createInvitation,
    refetchInvitations: fetchInvitations,
  };
};
