
import { VersionInfo } from '@/lib/versionTracker';

/**
 * Group components by type/category based on their IDs
 */
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
