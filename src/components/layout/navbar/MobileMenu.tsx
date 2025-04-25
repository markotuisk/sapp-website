
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { mainNavLinks } from './NavLinks';
import TranslatedText from '@/components/ui/TranslatedText';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();
  
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="h-full overflow-y-auto">
        <nav className="p-6 space-y-4" aria-label="Mobile navigation">
          {mainNavLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              onClick={handleLinkClick}
              className={cn(
                "block py-3 text-lg font-medium transition-colors hover:text-sapp-blue",
                location.pathname === link.href ? "text-sapp-blue" : "text-sapp-dark"
              )}
              aria-current={location.pathname === link.href ? "page" : undefined}
            >
              <TranslatedText textKey={link.key} />
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            <Button 
              variant="default" 
              className="w-full bg-sapp-blue text-white hover:bg-sapp-blue/90 mb-3"
              asChild
            >
              <Link to="/client-area" onClick={handleLinkClick}>
                <TranslatedText textKey="clientArea" />
              </Link>
            </Button>
            
            <Button 
              variant="default" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLinkClick}
              asChild
            >
              <a href="/#contact">
                <TranslatedText textKey="getInTouch" />
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
