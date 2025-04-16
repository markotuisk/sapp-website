
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ComponentUsage } from './VersionInfoUtils';

interface MetricsDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  items: string[] | ComponentUsage[];
  icon: React.ReactElement;
  showFlags?: boolean;
  isComponentList?: boolean;
}

const MetricsDetailsDialog = ({
  open,
  onOpenChange,
  title,
  description,
  items,
  icon,
  showFlags = false,
  isComponentList = false
}: MetricsDetailsDialogProps) => {
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({});

  const toggleComponent = (id: string) => {
    setExpandedComponents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2 mt-4">
          {items.length > 0 ? (
            isComponentList ? (
              <ul className="space-y-3">
                {(items as ComponentUsage[]).map((component) => (
                  <li key={component.id} className="bg-gray-50 rounded-md overflow-hidden">
                    <div 
                      className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleComponent(component.id)}
                    >
                      <div className="flex items-center gap-2">
                        {expandedComponents[component.id] ? 
                          <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        }
                        <span className="font-medium">{component.name}</span>
                      </div>
                      <span className="bg-sapp-blue/10 text-sapp-blue px-2 py-1 rounded-full text-xs">
                        Used {component.count} {component.count === 1 ? 'time' : 'times'}
                      </span>
                    </div>
                    
                    {expandedComponents[component.id] && (
                      <div className="px-4 pb-3 pt-1 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-500 mb-2">Used in:</p>
                        <ul className="space-y-1">
                          {component.locations.map((location, idx) => (
                            <li key={idx} className="text-sm pl-6 relative">
                              <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-sapp-blue"></span>
                              {location}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {(items as string[]).map((item, index) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <p className="text-center text-gray-500">No items found</p>
          )}
          
          {showFlags && (
            <div className="flex justify-center gap-4 mt-6 pb-2">
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
