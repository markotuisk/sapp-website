
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

const knownRoutes = [
  '/services/venue-security-audits',
  '/services/event-monitoring',
  '/services/secure-technology',
  '/services/close-protection',
  '/services/physical-security-assessments',
  '/services/tscm-inspections',
  '/services/compliance-audits',
  '/services/technology-systems-testing',
  // Expand with future known service routes as implemented
];

// Quick check whether service page is implemented
function isComingSoon(link: string): boolean {
  // If not in knownRoutes and matches the /services slug, show as coming soon
  return link.startsWith('/services/') && !knownRoutes.includes(link);
}

const ServiceItem = ({ name, description, link, onItemClick }: ServiceItemProps) => {
  const comingSoon = isComingSoon(link);
  if (comingSoon) {
    // Render as unavailable, with label and no navigation away
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 opacity-70 group select-none cursor-not-allowed">
        <div className="pr-2 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sapp-dark">{name}</h4>
            <span className="inline-block text-xs rounded bg-gray-200 text-gray-500 px-2 py-0.5 ml-1 font-semibold">
              Coming Soon
            </span>
          </div>
          <p className="text-sm text-sapp-gray line-clamp-2">{description}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
      </div>
    );
  }
  // Regular, working service link
  return (
    <Link 
      to={link}
      onClick={onItemClick}
      className={cn(
        "flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors"
      )}
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
