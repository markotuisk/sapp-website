
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
        "fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ display: isOpen ? 'block' : 'none' }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-sapp-dark hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-6 pb-6 overflow-y-auto" aria-label="Mobile navigation">
          <div className="space-y-6">
            {mainNavLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "block py-3 text-lg font-medium transition-colors hover:text-sapp-blue border-b border-gray-100",
                  location.pathname === link.href ? "text-sapp-blue font-semibold" : "text-sapp-dark"
                )}
                aria-current={location.pathname === link.href ? "page" : undefined}
              >
                <TranslatedText textKey={link.key} />
              </Link>
            ))}
          </div>
          
          <div className="mt-8 space-y-4">
            <Button 
              variant="default" 
              className="w-full bg-sapp-blue text-white hover:bg-sapp-blue/90"
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
