
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
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 group select-none">
      <div className="pr-2 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-sapp-dark">{name}</h4>
        </div>
        <p className="text-sm text-sapp-gray line-clamp-2">{description}</p>
      </div>
      <Link to={link} onClick={onItemClick}>
        <ChevronRight className="h-4 w-4 text-sapp-blue flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default ServiceItem;
