import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import TranslatedText from "@/components/ui/TranslatedText";

export const mainNavLinks = [
  { key: 'securityAudits' as const, href: '/security-audits' },
  { key: 'eventSecurity' as const, href: '/event-security' },
  { key: 'installations' as const, href: '/installations' },
  { key: 'cyberSecurity' as const, href: '/cyber-security' },
  { key: 'news' as const, href: '/news' },
  { key: 'about' as const, href: '/about' },
];

const NavLinks = ({ isScrolled }: { isScrolled?: boolean }) => {
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && path.endsWith(location.hash);
    }
    return location.pathname === path;
  };

  return (
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
                    'px-3 py-2 text-sm font-medium transition-colors relative group/nav whitespace-nowrap',
                    active 
                      ? 'text-sapp-blue font-semibold' 
                      : isScrolled ? 'text-sapp-dark hover:text-sapp-blue' : 'text-sapp-dark hover:text-sapp-blue',
                    "border-transparent border border-b-2 hover:border-sapp-blue transition-all duration-300"
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
                    'px-3 py-2 text-sm font-medium transition-colors relative group/nav whitespace-nowrap flex items-center',
                    active 
                      ? 'text-sapp-blue font-semibold' 
                      : isScrolled ? 'text-sapp-dark hover:text-sapp-blue' : 'text-sapp-dark hover:text-sapp-blue',
                    "border-transparent border border-b-2 hover:border-sapp-blue transition-all duration-300"
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
  );
};

export default NavLinks;
