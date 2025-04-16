import { formatVersionDate } from '@/lib/versionTracker';
import { VersionInfo } from '@/lib/versionTracker';

// Get current date and time formatted nicely
export const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    iso: now.toISOString()
  };
};

// Group components by type/category based on their IDs
export const groupComponents = (versions: VersionInfo[]) => {
  const groups: Record<string, VersionInfo[]> = {
    'Core': [],
    'Home': [],
    'Cyber Security': [],
    'Installations': [],
    'Security Audits': [],
    'Event Security': [],
    'Layout': [],
    'UI Components': [],
    'Version Info': [],
    'Other': []
  };

  if (!versions || versions.length === 0) return groups;

  versions.forEach(component => {
    const id = component.component_id.toLowerCase();
    
    if (id.includes('app-core') || id === 'core') {
      groups['Core'].push(component);
    } else if (id.includes('home-') || id.startsWith('home')) {
      groups['Home'].push(component);
    } else if (id.includes('cyber-') || id.startsWith('cyber')) {
      groups['Cyber Security'].push(component);
    } else if (id.includes('install-') || id.startsWith('install')) {
      groups['Installations'].push(component);
    } else if (id.includes('audit-') || id.startsWith('audit')) {
      groups['Security Audits'].push(component);
    } else if (id.includes('event-') || id.startsWith('event')) {
      groups['Event Security'].push(component);
    } else if (id.includes('layout-') || id.startsWith('layout')) {
      groups['Layout'].push(component);
    } else if (id.includes('ui-') || id.startsWith('ui')) {
      groups['UI Components'].push(component);
    } else if (id.includes('version-') || id.startsWith('version')) {
      groups['Version Info'].push(component);
    } else {
      groups['Other'].push(component);
    }
  });

  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) {
      delete groups[key];
    }
  });

  return groups;
};

// Get all actual navigable pages in the application
export const getActualPages = () => {
  // These are the actual pages with URLs in the application
  return [
    { name: 'Home Page', path: '/' },
    { name: 'Event Security', path: '/event-security' },
    { name: 'Security Audits', path: '/security-audits' },
    { name: 'Installations', path: '/installations' },
    { name: 'Cyber Security', path: '/cyber-security' },
    { name: 'About Us', path: '/about' },
    { name: 'Client Area', path: '/client-area' },
    { name: 'Version Information', path: '/version-info' },
    
    // Service Detail Pages
    { name: 'Venue Security Audits', path: '/services/venue-security-audits' },
    { name: 'Event Monitoring', path: '/services/event-monitoring' },
    { name: 'Secure Technology', path: '/services/secure-technology' },
    { name: 'Close Protection', path: '/services/close-protection' },
    
    // Installation Subpages
    { name: 'CCTV & Access Control', path: '/installations/cctv-access' },
    { name: 'Speech Privacy', path: '/installations/speech-privacy' },
    { name: 'Counter Surveillance', path: '/installations/counter-surveillance' },
    { name: 'Network Infrastructure', path: '/installations/network-infrastructure' },
    
    // 404 Not Found
    { name: 'Not Found (404)', path: '/404' }
  ];
};

// Calculate detailed codebase metrics based on component information
export const calculateCodebaseMetrics = (versions: VersionInfo[]) => {
  if (!versions || versions.length === 0) {
    return {
      totalComponents: 0,
      totalPages: 0,
      totalServices: 0,
      supportedLanguages: 0,
      technicalServices: []
    };
  }

  // Count different types of components
  const actualPages = getActualPages();
  let totalPages = actualPages.length;
  let totalServices = 0;
  const supportedLanguages = 4; // English, German, Dutch, French
  const componentBreakdown: Record<string, number> = {};

  versions.forEach(component => {
    const id = component.component_id.toLowerCase();
    
    // Count services
    if (id.includes('service') || 
        id.includes('feature') || 
        id.includes('capabilities') ||
        id.includes('solution')) {
      totalServices++;
    }
    
    // Count by category for breakdown
    if (id.includes('app-core') || id === 'core') {
      componentBreakdown['Core'] = (componentBreakdown['Core'] || 0) + 1;
    } else if (id.includes('home-') || id.startsWith('home')) {
      componentBreakdown['Home'] = (componentBreakdown['Home'] || 0) + 1;
    } else if (id.includes('cyber-') || id.startsWith('cyber')) {
      componentBreakdown['Cyber Security'] = (componentBreakdown['Cyber Security'] || 0) + 1;
    } else if (id.includes('install-') || id.startsWith('install')) {
      componentBreakdown['Installations'] = (componentBreakdown['Installations'] || 0) + 1;
    } else if (id.includes('audit-') || id.startsWith('audit')) {
      componentBreakdown['Security Audits'] = (componentBreakdown['Security Audits'] || 0) + 1;
    } else if (id.includes('event-') || id.startsWith('event')) {
      componentBreakdown['Event Security'] = (componentBreakdown['Event Security'] || 0) + 1;
    } else if (id.includes('layout-') || id.startsWith('layout')) {
      componentBreakdown['Layout'] = (componentBreakdown['Layout'] || 0) + 1;
    } else if (id.includes('ui-') || id.startsWith('ui')) {
      componentBreakdown['UI Components'] = (componentBreakdown['UI Components'] || 0) + 1;
    } else if (id.includes('version-') || id.startsWith('version')) {
      componentBreakdown['Version Info'] = (componentBreakdown['Version Info'] || 0) + 1;
    } else {
      componentBreakdown['Other'] = (componentBreakdown['Other'] || 0) + 1;
    }
  });

  // Calculate total components
  const totalComponents = versions.length;
  
  // Comprehensive list of all technical services used by the application
  const technicalServices = [
    { name: 'Supabase Authentication', description: 'User authentication and management' },
    { name: 'Supabase Storage', description: 'File and asset storage' },
    { name: 'Supabase Database', description: 'PostgreSQL database for data storage' },
    { name: 'Supabase Edge Functions', description: 'Serverless functions for backend logic' },
    { name: 'React Query', description: 'Data fetching and state management' },
    { name: 'Language Context', description: 'Internationalization and translation' },
    { name: 'Auth Context', description: 'User authentication state management' },
    { name: 'Toaster Notifications', description: 'System-wide toast notifications' },
    { name: 'Error Logging', description: 'Application error tracking and logging' },
    { name: 'Device Detection', description: 'Responsive design and mobile detection' },
    { name: 'Version Tracking', description: 'Component version tracking and history' },
    { name: 'React Router', description: 'Application routing and navigation' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Shadcn UI', description: 'Component library for user interface' },
    { name: 'React Hook Form', description: 'Form validation and management' },
    { name: 'Resend', description: 'Email sending and management service' },
    { name: 'React Helmet', description: 'SEO and metadata management' },
    { name: 'Radix UI', description: 'Accessible UI component primitives' },
    { name: 'Lucide React', description: 'High-quality icon library' }
  ];

  return {
    totalComponents,
    totalPages,
    totalServices: technicalServices.length,
    supportedLanguages,
    technicalServices,
    actualPages
  };
};
