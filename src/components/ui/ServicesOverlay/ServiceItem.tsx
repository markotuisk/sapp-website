
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
    <Link 
      to={link}
      onClick={onItemClick}
      className="flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors"
    >
      <div className="pr-2">
        <h4 className="font-medium text-sapp-dark">{name}</h4>
        <p className="text-sm text-sapp-gray line-clamp-2">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
    </Link>
  );
};

export default ServiceItem;
