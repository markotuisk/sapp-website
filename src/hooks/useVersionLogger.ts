
import { logComponentUpdate } from '@/lib/versionTracker';
import { useCallback } from 'react';
import { toast } from 'sonner';

export const useVersionLogger = () => {
  const logUpdate = useCallback(async (
    componentId: string,
    componentName: string,
    version: string,
    description: string
  ) => {
    try {
      await logComponentUpdate(componentId, componentName, version, description);
      toast.success('Version update logged successfully');
      return true;
    } catch (error) {
      console.error('Failed to log version update:', error);
      toast.error('Failed to log version update');
      return false;
    }
  }, []);

  return { logUpdate };
};
