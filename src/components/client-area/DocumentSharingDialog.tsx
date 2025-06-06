
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Share2, Construction } from 'lucide-react';

interface DocumentSharingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId?: string;
}

export const DocumentSharingDialog: React.FC<DocumentSharingDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Document
          </DialogTitle>
          <DialogDescription>
            Share documents with other users or organizations
          </DialogDescription>
        </DialogHeader>
        
        <Alert>
          <Construction className="h-4 w-4" />
          <AlertDescription>
            Document sharing functionality is currently under maintenance. Please contact support for assistance with document sharing.
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
};
