
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { mainNavLinks } from './NavLinks';
import TranslatedText from '@/components/ui/TranslatedText';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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

  // If the menu is not open, don't render it at all
  if (!isOpen) {
    return null;
  }

  console.log("Rendering mobile menu, isOpen:", isOpen);

  return (
    <div
      className="fixed inset-0 bg-white z-[100] md:hidden overflow-auto flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      style={{ display: 'flex' }}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-md text-sapp-dark hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-6 pb-6 overflow-y-auto mt-4" aria-label="Mobile navigation">
        <div className="space-y-6">
          {mainNavLinks.map((link, index) => {
            const active = location.pathname === link.href;
            console.log(`Rendering menu item: ${link.key}, href: ${link.href}, active: ${active}`);
            return (
              <Link
                key={index}
                to={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "block py-3 text-lg font-medium transition-colors hover:text-sapp-blue border-b border-gray-100",
                  active ? "text-sapp-blue font-semibold" : "text-sapp-dark"
                )}
                aria-current={active ? "page" : undefined}
              >
                <TranslatedText textKey={link.key} />
              </Link>
            );
          })}
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
  );
};

export default MobileMenu;
