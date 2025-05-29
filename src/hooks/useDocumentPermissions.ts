
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { DocumentPermission } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

export const useDocumentPermissions = (documentId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<DocumentPermission[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !documentId) {
      setPermissions([]);
      setIsLoading(false);
      return;
    }

    const fetchPermissions = async () => {
      try {
        const { data, error } = await supabase
          .from('document_permissions')
          .select(`
            *,
            user:profiles!document_permissions_user_id_fkey(
              id,
              first_name,
              last_name,
              email
            )
          `)
          .eq('document_id', documentId);

        if (error) {
          console.error('Error fetching permissions:', error);
        } else {
          setPermissions(data || []);
        }
      } catch (error) {
        console.error('Error in fetchPermissions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, [user, documentId]);

  useEffect(() => {
    if (!user) return;

    const fetchAvailableUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .neq('id', user.id);

        if (error) {
          console.error('Error fetching users:', error);
        } else {
          setAvailableUsers(data || []);
        }
      } catch (error) {
        console.error('Error in fetchAvailableUsers:', error);
      }
    };

    fetchAvailableUsers();
  }, [user]);

  const grantPermission = async (
    userId: string,
    permissionType: 'view' | 'download' = 'view'
  ) => {
    if (!user || !documentId) return false;

    try {
      const { data, error } = await supabase
        .from('document_permissions')
        .insert({
          document_id: documentId,
          user_id: userId,
          permission_type: permissionType,
          granted_by: user.id,
        })
        .select(`
          *,
          user:profiles!document_permissions_user_id_fkey(
            id,
            first_name,
            last_name,
            email
          )
        `)
        .single();

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      setPermissions(prev => [...prev, data]);
      
      // Log activity
      await supabase
        .from('document_activity')
        .insert({
          document_id: documentId,
          user_id: user.id,
          activity_type: 'share',
          metadata: { shared_with: userId, permission_type: permissionType },
        });

      toast({
        title: 'Success',
        description: 'Permission granted successfully',
      });
      return true;
    } catch (error) {
      console.error('Error granting permission:', error);
      toast({
        title: 'Error',
        description: 'Failed to grant permission',
        variant: 'destructive',
      });
      return false;
    }
  };

  const revokePermission = async (permissionId: string) => {
    if (!user || !documentId) return false;

    try {
      const { error } = await supabase
        .from('document_permissions')
        .delete()
        .eq('id', permissionId);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      setPermissions(prev => prev.filter(p => p.id !== permissionId));
      
      // Log activity
      await supabase
        .from('document_activity')
        .insert({
          document_id: documentId,
          user_id: user.id,
          activity_type: 'unshare',
          metadata: { permission_id: permissionId },
        });

      toast({
        title: 'Success',
        description: 'Permission revoked successfully',
      });
      return true;
    } catch (error) {
      console.error('Error revoking permission:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke permission',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    permissions,
    availableUsers,
    isLoading,
    grantPermission,
    revokePermission,
  };
};
