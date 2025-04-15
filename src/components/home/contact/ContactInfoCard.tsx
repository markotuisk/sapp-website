
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  copyIcon?: boolean;
  copy?: () => void;
  copied?: boolean;
  index: number;
  inView: boolean;
}

const ContactInfoCard = forwardRef<HTMLDivElement, ContactInfoCardProps>(({
  icon,
  title,
  details,
  copyIcon,
  copy,
  copied,
  index,
  inView
}, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        "bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-center transition-all duration-700 hover:shadow-xl hover:scale-[1.02]",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-sapp-blue/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-display font-semibold text-sapp-dark">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sapp-gray">{details}</p>
          {copyIcon && copy && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={copy}
                    className="ml-2 p-1 text-sapp-blue/70 hover:text-sapp-blue rounded-md hover:bg-sapp-blue/10 transition-colors"
                    aria-label={`Copy ${title.toLowerCase()} to clipboard`}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
});

ContactInfoCard.displayName = "ContactInfoCard";

export default ContactInfoCard;
