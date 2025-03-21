
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Event Security', href: '#event-security' },
    { name: 'Security Audits', href: '#security-audits' },
    { name: 'Technology', href: '#technology' },
    { name: 'Partners', href: '#partners' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 flex-shrink-0">
            <Shield className="h-8 w-8 text-sapp-blue" />
            <span className="font-display font-bold text-xl text-sapp-dark">
              SAPP <span className="text-sapp-blue">Security</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors relative group',
                  isScrolled ? 'text-sapp-dark hover:text-sapp-blue' : 'text-sapp-dark hover:text-sapp-blue'
                )}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sapp-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            ))}
            <Button 
              variant="default" 
              className="ml-2 bg-sapp-blue hover:bg-sapp-blue/90 text-white rounded-md"
            >
              Get in Touch
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center text-sapp-dark"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 pt-16 transform transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="container px-4 py-6 flex flex-col space-y-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-sapp-dark hover:text-sapp-blue transition-colors py-2 border-b border-gray-100"
            >
              {link.name}
            </a>
          ))}
          <Button 
            variant="default" 
            className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white mt-4"
          >
            Get in Touch
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
