
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LucideIcon } from 'lucide-react';

interface MetricsDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  items: string[];
  icon: React.ReactElement;
  showFlags?: boolean;
}

const MetricsDetailsDialog = ({
  open,
  onOpenChange,
  title,
  description,
  items,
  icon,
  showFlags = false
}: MetricsDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto mt-4">
          {items.length > 0 ? (
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="p-2 bg-gray-50 rounded-md">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No items found</p>
          )}
          
          {showFlags && (
            <div className="flex justify-center gap-4 mt-4">
              <span title="English" className="text-2xl">🇬🇧</span>
              <span title="German" className="text-2xl">🇩🇪</span>
              <span title="Dutch" className="text-2xl">🇳🇱</span>
              <span title="French" className="text-2xl">🇫🇷</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetricsDetailsDialog;
