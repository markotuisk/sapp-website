
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
    'Pages': [],
    'UI Components': [],
    'Services': [],
    'Other': []
  };

  if (!versions) return groups;

  versions.forEach(component => {
    const id = component.component_id.toLowerCase();
    
    if (id.includes('core') || id.includes('app')) {
      groups['Core'].push(component);
    } else if (id.includes('page') || id.includes('view')) {
      groups['Pages'].push(component);
    } else if (id.includes('component') || id.includes('ui')) {
      groups['UI Components'].push(component);
    } else if (id.includes('service') || id.includes('util')) {
      groups['Services'].push(component);
    } else {
      groups['Other'].push(component);
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
