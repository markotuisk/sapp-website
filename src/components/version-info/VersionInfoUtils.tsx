
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

  if (!versions) return groups;

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

// Calculate codebase metrics based on component updates
export const calculateCodebaseMetrics = (versions: VersionInfo[]) => {
  if (!versions || versions.length === 0) {
    return {
      totalComponents: 0,
      totalUpdates: 0,
      changeRate: 0,
      lastWeekUpdates: 0,
      trend: 'stable' as 'increasing' | 'decreasing' | 'stable'
    };
  }

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
  
  // Determine trend (in a real app, you'd compare to previous weeks)
  const averageUpdatesPerWeek = totalUpdates / Math.max(1, totalComponents);
  const trend = lastWeekUpdates > averageUpdatesPerWeek ? 'increasing' : 
               lastWeekUpdates < averageUpdatesPerWeek ? 'decreasing' : 'stable';
  
  return {
    totalComponents,
    totalUpdates,
    changeRate: +(totalUpdates / Math.max(1, totalComponents)).toFixed(1),
    lastWeekUpdates,
    trend
  };
};
