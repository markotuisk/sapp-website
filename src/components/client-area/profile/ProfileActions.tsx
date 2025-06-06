
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

interface ProfileActionsProps {
  onSave: () => void;
  isLoading: boolean;
  isProfileLoading: boolean;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onSave,
  isLoading,
  isProfileLoading
}) => {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onSave}
        disabled={isLoading || isProfileLoading}
        className="px-8"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </>
        )}
      </Button>
    </div>
  );
};
