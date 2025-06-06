
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
        // For now, since the permissions table may not exist, just return empty
        // This prevents the component from breaking
        console.log('Document permissions feature is not yet available');
        setPermissions([]);
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
      toast({
        title: 'Feature Coming Soon',
        description: 'Document sharing will be available once the database schema is updated.',
      });
      return false;
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
      toast({
        title: 'Feature Coming Soon',
        description: 'Document sharing will be available once the database schema is updated.',
      });
      return false;
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
