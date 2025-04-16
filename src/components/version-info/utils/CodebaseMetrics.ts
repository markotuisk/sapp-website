
import { VersionInfo } from '@/lib/versionTracker';
import { getActualPages } from './PageUtils';

/**
 * Code structure information representing different parts of the codebase
 */
export interface CodeStructure {
  name: string;
  lines: number;
  percentage?: number;
}

/**
 * Calculate detailed codebase metrics based on component information
 */
export const calculateCodebaseMetrics = (versions: VersionInfo[]) => {
  if (!versions || versions.length === 0) {
    return {
      totalComponents: 0,
      totalPages: 0,
      totalServices: 0,
      supportedLanguages: 0,
      totalLinesOfCode: 0,
      codeStructure: [] as CodeStructure[],
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
  
  // Estimate total lines of code (This would be more accurate if integrated with actual code analysis)
  const totalLinesOfCode = 28500; // Estimation
  
  // Code structure breakdown
  const codeStructure: CodeStructure[] = [
    { name: 'Components & UI', lines: 14200 },
    { name: 'Hooks & Context', lines: 3800 },
    { name: 'Services & API', lines: 4200 },
    { name: 'Utilities', lines: 2100 },
    { name: 'Types & Interfaces', lines: 1600 },
    { name: 'Test Files', lines: 1800 },
    { name: 'Configuration', lines: 800 }
  ];
  
  // Calculate percentages
  codeStructure.forEach(item => {
    item.percentage = Math.round((item.lines / totalLinesOfCode) * 100);
  });
  
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
    totalLinesOfCode,
    codeStructure,
    technicalServices,
    actualPages
  };
};

