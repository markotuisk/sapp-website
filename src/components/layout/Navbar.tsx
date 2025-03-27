import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

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

  const mainNavLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Event Security', href: '#event-security' },
    { name: 'Audits', href: '#security-audits' },
    { name: 'Technology', href: '#technology' },
    { name: 'Resources', href: '#resources' },
    { name: 'About', href: '#about' },
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
        <div className="flex items-center justify-between h-24 md:h-28">
          <a href="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <img 
              src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png" 
              alt="SAPP Security Logo" 
              className="h-16 w-16 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="flex flex-col transition-all duration-300 group-hover:translate-x-1">
              <span className="font-display font-bold text-xl text-sapp-dark">
                SAPP <span className="text-sapp-blue">Security</span>
              </span>
              <span className="text-xs text-sapp-gray leading-tight">Security and Privacy Partners</span>
            </div>
          </a>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {mainNavLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink 
                      href={link.href}
                      className={cn(
                        'px-3 py-2 text-sm font-medium rounded-md transition-colors relative group',
                        isScrolled ? 'text-sapp-dark hover:text-sapp-blue' : 'text-sapp-dark hover:text-sapp-blue'
                      )}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sapp-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="default" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white rounded-md group relative overflow-hidden"
              asChild
            >
              <Link to="/client-area" className="inline-flex items-center justify-center gap-2">
                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-0">Client Area</span>
                <span className="absolute inset-0 flex items-center justify-center z-0 -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Access Now
                </span>
              </Link>
            </Button>
          
            <Button 
              variant="default" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white rounded-md group relative overflow-hidden"
            >
              <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">Get in Touch</span>
              <span className="absolute inset-0 flex items-center justify-center z-0 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                Contact Us
              </span>
            </Button>
            
            <LanguageSelector />
          </div>

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

      <div
        className={cn(
          'fixed inset-0 bg-white z-40 pt-16 transform transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="container px-4 py-6 flex flex-col space-y-6">
          <div className="flex justify-end mb-2">
            <LanguageSelector />
          </div>
          
          {mainNavLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-sapp-dark hover:text-sapp-blue transition-colors py-2 border-b border-gray-100"
            >
              {link.name}
            </a>
          ))}
          
          <Link
            to="/client-area"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-sapp-dark hover:text-sapp-blue transition-colors py-2 border-b border-gray-100 flex items-center"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Client Area
          </Link>
          
          <Button 
            variant="default" 
            className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white mt-4 group relative overflow-hidden"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">Get in Touch</span>
            <span className="absolute left-0 w-0 h-full bg-sapp-dark z-0 transition-all duration-300 group-hover:w-full"></span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
