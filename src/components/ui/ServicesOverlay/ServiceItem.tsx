
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceItemProps {
  name: string;
  description: string;
  link: string;
  onItemClick: () => void;
  isActive?: boolean;
}

const ServiceItem = ({ 
  name, 
  description, 
  link, 
  onItemClick, 
  isActive = false 
}: ServiceItemProps) => {
  return (
    <Link 
      to={link} 
      onClick={onItemClick}
      className={cn(
        "flex items-center justify-between px-4 py-3 group select-none",
        isActive 
          ? "bg-slate-50 hover:bg-slate-100 transition-colors" 
          : "bg-slate-50/70 opacity-60 pointer-events-none"
      )}
    >
      <div className="pr-2 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={cn(
            "font-medium",
            isActive ? "text-sapp-blue" : "text-sapp-dark/70"
          )}>
            {name}
          </h4>
          {isActive && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              Available
            </span>
          )}
        </div>
        <p className="text-sm text-sapp-gray line-clamp-2">{description}</p>
      </div>
      <ChevronRight className={cn(
        "h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1",
        isActive ? "text-sapp-blue" : "text-sapp-gray/50"
      )} />
    </Link>
  );
};

export default ServiceItem;
