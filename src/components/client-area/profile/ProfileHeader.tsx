
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ProfileHeaderProps {
  onBack: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        onClick={onBack}
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </div>
  );
};
