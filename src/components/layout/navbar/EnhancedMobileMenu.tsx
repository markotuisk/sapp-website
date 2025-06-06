
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Shield,
  Camera,
  Users,
  FileText,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  children?: MenuItem[];
}

const navigationItems: MenuItem[] = [
  {
    label: 'Services',
    icon: Shield,
    children: [
      { label: 'Physical Security', href: '/services/physical-security' },
      { label: 'Cyber Security', href: '/cyber-security' },
      { label: 'Event Security', href: '/event-security' },
      { label: 'Security Audits', href: '/security-audits' },
    ]
  },
  {
    label: 'Installations',
    icon: Camera,
    children: [
      { label: 'CCTV Systems', href: '/installations/cctv' },
      { label: 'Counter Surveillance', href: '/installations/counter-surveillance' },
      { label: 'Speech Privacy', href: '/installations/speech-privacy' },
    ]
  },
  {
    label: 'About',
    href: '/about',
    icon: Users,
  },
  {
    label: 'News',
    href: '/news',
    icon: FileText,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Phone,
  },
];

export const EnhancedMobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setExpandedItems(new Set());
  }, [location]);

  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  const renderMenuItem = (item: MenuItem, index: number, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);
    const IconComponent = item.icon;

    return (
      <motion.div
        key={item.label}
        variants={itemVariants}
        transition={{ delay: index * 0.1 }}
        className={cn('w-full', depth > 0 && 'ml-4')}
      >
        {hasChildren ? (
          <div>
            <button
              onClick={() => toggleExpanded(item.label)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {IconComponent && <IconComponent className="h-5 w-5" />}
                <span className="font-medium">{item.label}</span>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-gray-50"
                >
                  {item.children?.map((child, childIndex) =>
                    renderMenuItem(child, childIndex, depth + 1)
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to={item.href || '#'}
            className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {IconComponent && <IconComponent className="h-5 w-5" />}
            <span className="font-medium">{item.label}</span>
          </Link>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="md:hidden"
        aria-label="Open mobile menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  {navigationItems.map((item, index) =>
                    renderMenuItem(item, index)
                  )}
                </motion.div>
              </div>

              <div className="p-4 border-t">
                <Link
                  to="/client-area"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full">
                    Client Area
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
