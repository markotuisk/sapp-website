
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Link } from 'react-router-dom';
import { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from './alert-dialog';

interface ServiceCardProps {
  title: string;
  description: string;
  items: string[];
  delay?: number;
  href: string;
  imagePath?: string;
  onLearnMoreClick?: () => void;
}

const ServiceCard = ({ 
  title, 
  description, 
  items, 
  delay = 0,
  href,
  imagePath,
  onLearnMoreClick
}: ServiceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl overflow-hidden group transition-all duration-700 shadow-md hover:shadow-xl border border-gray-100 h-full flex flex-col",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {/* Remove large image header/icon block as requested */}
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-display font-semibold mb-2 text-sapp-dark">{title}</h3>
        <p className="text-sapp-gray text-sm mb-4">{description}</p>
        
        <div className="mt-auto space-y-2">
          <Link to={href} className="block">
            <Button 
              variant="outline" 
              className="text-sm py-1 px-2 border-sapp-blue text-sapp-dark rounded-md font-medium text-left justify-start transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md h-8 w-auto"
              aria-label={`Read more about ${title}`}
            >
              Read More
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white text-sm py-1 px-2 rounded-md font-medium text-left justify-start transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md h-8 w-auto"
                aria-label={`Get details about ${title}`}
              >
                Get Details
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Request Installation Consultation</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill out the form below to speak with a specialist about {title}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <input id="name" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">Company</label>
                      <input id="company" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input id="email" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-medium">I'm interested in</label>
                    <input id="interest" value={title} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                  </div>
                </form>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-sapp-blue hover:bg-sapp-blue/90 text-white">Send Request</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
