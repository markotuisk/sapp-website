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
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import TranslatedText from '@/components/ui/TranslatedText';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;

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
    { key: 'securityAudits' as const, href: '/security-audits' },
    { key: 'eventSecurity' as const, href: '/event-security' },
    { key: 'installations' as const, href: '/installations' },
    { key: 'cyberSecurity' as const, href: '/cyber-security' },
    { key: 'about' as const, href: '/about' },
  ];

  const isActivePath = (path: string) => {
    if (path.startsWith('/#')) {
      return currentPath === '/' && path.endsWith(location.hash);
    }
    return currentPath === path;
  };

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
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <img 
              src="/favicon/favicon-32x32.png" 
              alt="SAPP Security Logo" 
              width="32"
              height="32"
              className="transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="flex flex-col transition-all duration-300 group-hover:translate-x-1">
              <span className="font-display font-bold text-xl text-sapp-dark">
                SAPP <span className="text-sapp-blue">Security</span>
              </span>
              <span className="text-xs text-sapp-gray leading-tight">Security and Privacy Partners</span>
            </div>
          </Link>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {mainNavLinks.map((link, index) => {
                  const active = isActivePath(link.href);
                  
                  return (
                    <NavigationMenuItem key={index}>
                      {link.href.startsWith('/#') ? (
                        <NavigationMenuLink 
                          href={link.href}
                          className={cn(
                            'px-3 py-2 text-sm font-medium rounded-md transition-colors relative group/nav whitespace-nowrap',
                            active 
                              ? 'text-sapp-blue font-semibold' 
                              : isScrolled ? 'text-sapp-dark hover:text-sapp-blue' : 'text-sapp-dark hover:text-sapp-blue'
                          )}
                        >
                          <TranslatedText textKey={link.key} />
                          <span className={cn(
                            "absolute bottom-0 left-0 h-0.5 bg-sapp-blue transition-all duration-300",
                            active ? "w-full" : "w-0 group-hover/nav:w-full"
                          )}></span>
                        </NavigationMenuLink>
                      ) : (
                        <Link 
                          to={link.href}
                          className={cn(
                            'px-3 py-2 text-sm font-medium rounded-md transition-colors relative group/nav whitespace-nowrap flex items-center',
                            active 
                              ? 'text-sapp-blue font-semibold' 
                              : isScrolled ? 'text-sapp-dark hover:text-sapp-blue' : 'text-sapp-dark hover:text-sapp-blue'
                          )}
                        >
                          <TranslatedText textKey={link.key} />
                          <span className={cn(
                            "absolute bottom-0 left-0 h-0.5 bg-sapp-blue transition-all duration-300",
                            active ? "w-full" : "w-0 group-hover/nav:w-full"
                          )}></span>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  );
                })}
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
                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-0">
                  <TranslatedText textKey="clientArea" />
                </span>
                <span className="absolute inset-0 flex items-center justify-center z-0 -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <TranslatedText textKey="accessNow" />
                </span>
              </Link>
            </Button>
          
            <Button 
              variant="default" 
              className="bg-red-600 hover:bg-red-700 text-white rounded-md group relative overflow-hidden whitespace-nowrap shadow-lg shadow-red-600/20"
              asChild
            >
              <a href="/#contact" className="inline-flex items-center justify-center gap-2">
                <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">
                  <TranslatedText textKey="getInTouch" />
                </span>
                <span className="absolute inset-0 flex items-center justify-center z-0 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <TranslatedText textKey="contactUs" />
                </span>
              </a>
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
                onClick={() => setMobileMenuOpen(false)}
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
                onClick={() => setMobileMenuOpen(false)}
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
            onClick={() => setMobileMenuOpen(false)}
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
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)}>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                <TranslatedText textKey="getInTouch" />
              </span>
              <span className="absolute left-0 w-0 h-full bg-sapp-dark z-0 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
