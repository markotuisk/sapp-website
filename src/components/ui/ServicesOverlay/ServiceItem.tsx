
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceItemProps {
  name: string;
  description: string;
  link: string;
  onItemClick: () => void;
}

const ServiceItem = ({ name, description, link, onItemClick }: ServiceItemProps) => {
  // All services should now have a testing note instead of "Coming Soon"
  // For implemented or not implemented - same visual
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 group select-none">
      <div className="pr-2 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-sapp-dark">{name}</h4>
          <span className="inline-block text-xs rounded bg-[#DB2626]/10 text-[#DB2626] px-2 py-0.5 font-semibold">
            Under Testing
          </span>
        </div>
        <p className="text-sm text-sapp-gray line-clamp-2">{description}</p>
      </div>
      {/* Disable navigation visually */}
      <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
    </div>
  );
};

export default ServiceItem;
