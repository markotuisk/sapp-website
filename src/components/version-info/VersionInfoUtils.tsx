
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

// Calculate detailed codebase metrics based on component information
export const calculateCodebaseMetrics = (versions: VersionInfo[]) => {
  if (!versions || versions.length === 0) {
    return {
      totalComponents: 0,
      totalPages: 0,
      totalServices: 0,
      totalAPIs: 0,
      totalUpdates: 0,
      changeRate: 0,
      lastWeekUpdates: 0,
      trend: 'stable' as 'increasing' | 'decreasing' | 'stable',
      componentBreakdown: {}
    };
  }

  // Count different types of components
  let totalPages = 0;
  let totalServices = 0;
  let totalAPIs = 0;
  const componentBreakdown: Record<string, number> = {};

  versions.forEach(component => {
    const id = component.component_id.toLowerCase();
    
    // Categorise components by type
    if (id.includes('page') || 
        id.includes('index') || 
        id.endsWith('-hero') || 
        id.includes('audit-') ||
        id.includes('cyber-') || 
        id.includes('event-') || 
        id.includes('install-')) {
      totalPages++;
    }
    
    if (id.includes('service') || 
        id.includes('feature') || 
        id.includes('capabilities') ||
        id.includes('solution')) {
      totalServices++;
    }
    
    if (id.includes('api') || 
        id.includes('supabase') || 
        id.includes('client') ||
        id.includes('integration') || 
        id.includes('contact-form')) {
      totalAPIs++;
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

  // Calculate total components and updates
  const totalComponents = versions.length;
  const totalUpdates = versions.reduce((total, component) => total + component.update_count, 0);
  
  // Calculate updates in the last week
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  let lastWeekUpdates = 0;
  versions.forEach(component => {
    if (component.change_log) {
      component.change_log.forEach(entry => {
        const entryDate = new Date(entry.timestamp);
        if (entryDate >= oneWeekAgo) {
          lastWeekUpdates++;
        }
      });
    }
  });
  
  // Determine trend
  let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
  
  // Only calculate trend if we have components to analyze
  if (totalComponents > 0) {
    const averageUpdatesPerWeek = totalUpdates / totalComponents;
    trend = lastWeekUpdates > averageUpdatesPerWeek ? 'increasing' : 
           lastWeekUpdates < averageUpdatesPerWeek ? 'decreasing' : 'stable';
  }
  
  return {
    totalComponents,
    totalPages,
    totalServices,
    totalAPIs,
    totalUpdates,
    changeRate: totalComponents > 0 ? +(totalUpdates / totalComponents).toFixed(1) : 0,
    lastWeekUpdates,
    trend,
    componentBreakdown
  };
};
