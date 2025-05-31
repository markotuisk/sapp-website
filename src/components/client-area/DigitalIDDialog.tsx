
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff } from 'lucide-react';
import { DigitalIDCard } from './DigitalIDCard';

interface DigitalIDDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DigitalIDDialog: React.FC<DigitalIDDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`${
          isFullscreen 
            ? 'max-w-none w-screen h-screen rounded-none p-0' 
            : 'max-w-2xl w-full'
        } bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 transition-all duration-300`}
      >
        <DialogHeader className={`${isFullscreen ? 'p-6' : ''}`}>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-white text-xl font-bold">
                Digital Security ID
              </DialogTitle>
              <DialogDescription className="text-slate-300">
                Present this ID for team member verification
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/10"
              >
                {isFullscreen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className={`flex items-center justify-center ${isFullscreen ? 'flex-1 p-8' : 'p-6'}`}>
          <DigitalIDCard className={isFullscreen ? 'scale-150' : ''} />
        </div>

        {!isFullscreen && (
          <div className="p-6 pt-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">How to use your Digital ID:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Show this card to team members for quick identification</li>
                <li>• Other team members can scan the QR code to verify your details</li>
                <li>• Use fullscreen mode for better visibility on mobile devices</li>
                <li>• Keep your profile information up to date for accuracy</li>
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
