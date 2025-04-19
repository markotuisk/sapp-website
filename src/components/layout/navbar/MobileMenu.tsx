
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import TranslatedText from "@/components/ui/TranslatedText";
import LanguageSelector from "../LanguageSelector";
import { mainNavLinks } from "./NavLinks";
import { useLocation } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && path.endsWith(location.hash);
    }
    return location.pathname === path;
  };

  return (
    <div
      className={cn(
        'fixed inset-0 bg-white z-40 pt-16 transform transition-transform duration-300 ease-in-out md:hidden',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <nav className="container px-4 py-6 flex flex-col space-y-4">
        <div className="flex justify-end mb-2">
          <LanguageSelector />
        </div>
        
        {mainNavLinks.map((link, index) => {
          const active = isActivePath(link.href);
          
          return link.href.startsWith('/#') ? (
            <a
              key={index}
              href={link.href}
              onClick={onClose}
              className={cn(
                "text-lg font-medium transition-colors py-2 border-b border-gray-100 relative group/nav",
                active ? "text-sapp-blue font-semibold" : "text-sapp-dark hover:text-sapp-blue"
              )}
            >
              <TranslatedText textKey={link.key} />
              <span className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-sapp-blue transition-all duration-300",
                active ? "w-full" : "w-0 group-hover/nav:w-full"
              )}></span>
            </a>
          ) : (
            <Link
              key={index}
              to={link.href}
              onClick={onClose}
              className={cn(
                "text-lg font-medium transition-colors py-2 border-b border-gray-100 relative group/nav",
                active ? "text-sapp-blue font-semibold" : "text-sapp-dark hover:text-sapp-blue" 
              )}
            >
              <TranslatedText textKey={link.key} />
              <span className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-sapp-blue transition-all duration-300",
                active ? "w-full" : "w-0 group-hover/nav:w-full"
              )}></span>
            </Link>
          );
        })}
        
        <Link
          to="/client-area"
          onClick={onClose}
          className="text-lg font-medium text-sapp-dark hover:text-sapp-blue transition-colors py-2 border-b border-gray-100 flex items-center"
        >
          <LogIn className="h-5 w-5 mr-2" />
          <TranslatedText textKey="clientArea" />
        </Link>
        
        <Button 
          variant="default" 
          className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white mt-4 group relative overflow-hidden"
          asChild
        >
          <a href="/#contact" onClick={onClose}>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
              <TranslatedText textKey="getInTouch" />
            </span>
            <span className="absolute left-0 w-0 h-full bg-sapp-dark z-0 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;
