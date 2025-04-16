
import { VersionInfo } from '@/lib/versionTracker';

// Define the ComponentUsage type
export type ComponentUsage = {
  name: string;
  id: string;
  count: number;
  locations: string[];
};

/**
 * Analyze component usage across the codebase
 */
export const analyzeComponentUsage = (versions: VersionInfo[]): ComponentUsage[] => {
  const componentRegistry = new Map<string, ComponentUsage>();
  
  // First pass: Register all components
  versions.forEach(component => {
    if (!componentRegistry.has(component.component_id)) {
      componentRegistry.set(component.component_id, {
        name: component.component_name || component.component_id,
        id: component.component_id,
        count: 0,
        locations: []
      });
    }
  });
  
  // Define page/section mappings for component usage analysis
  const componentLocations: Record<string, string[]> = {
    // Core components
    'app-core': ['Core Application'],
    
    // Home page components
    'home-hero': ['Home Page', 'Hero Section'],
    'home-about': ['Home Page', 'About Section'],
    'home-services': ['Home Page', 'Services Overview'],
    'home-partners': ['Home Page', 'Partners Section'],
    'home-story': ['Home Page', 'Story Section'],
    'home-team': ['Home Page', 'Team Section'],
    'home-contact': ['Home Page', 'Contact Section'],
    
    // Cyber Security components
    'cyber-hero': ['Cyber Security Page', 'Hero Section'],
    'cyber-features': ['Cyber Security Page', 'Features Section'],
    'cyber-cta': ['Cyber Security Page', 'Call to Action'],
    'cyber-quote': ['Cyber Security Page', 'Testimonial Section'],
    'cyber-services': ['Cyber Security Page', 'Services Grid'],
    
    // Installation components
    'install-hero': ['Installations Page', 'Hero Section'],
    'install-solutions': ['Installations Page', 'Solutions Section'],
    'install-capabilities': ['Installations Page', 'Capabilities Section'],
    'install-deployment': ['Installations Page', 'Deployment Process'],
    'install-cta': ['Installations Page', 'Call to Action'],
    'install-quote': ['Installations Page', 'Testimonial Section'],
    
    // Security Audits components
    'audit-hero': ['Security Audits Page', 'Hero Section'],
    'audit-services': ['Security Audits Page', 'Services Cards'],
    'audit-details': ['Security Audits Page', 'Process Details'],
    'audit-why': ['Security Audits Page', 'Benefits Section'],
    'audit-cta': ['Security Audits Page', 'Call to Action'],
    'audit-image': ['Security Audits Page', 'Visual Banner'],
    
    // Event Security components
    'event-quote': ['Event Security Page', 'Testimonial Section'],
    
    // Layout components
    'layout-navbar': ['All Pages', 'Navigation Bar'],
    'layout-footer': ['All Pages', 'Footer'],
    'layout-language': ['All Pages', 'Language Selector'],
    
    // UI components
    'ui-button': ['Multiple Pages', 'Interactive Elements'],
    'ui-card': ['Multiple Pages', 'Content Cards'],
    'ui-form': ['Contact Pages', 'Form Fields'],
    'ui-cookie': ['All Pages', 'Cookie Consent Banner'],
    'ui-feature-card': ['Feature Pages', 'Feature Highlights'],
    'ui-quote-card': ['Testimonial Sections', 'Quote Displays'],
    'ui-service-card': ['Service Pages', 'Service Offerings'],
    'ui-animated': ['Multiple Pages', 'Animated Elements'],
    
    // Version Info components
    'version-info': ['Version Information Page', 'Main Content'],
    'version-components': ['Version Information Page', 'Components Tab'],
    'version-history': ['Version Information Page', 'History Tab'],
    'version-metrics': ['Version Information Page', 'Metrics Visualization']
  };
  
  // Second pass: Count usages and log locations
  Object.keys(componentLocations).forEach(id => {
    if (componentRegistry.has(id)) {
      const entry = componentRegistry.get(id)!;
      entry.count++;
      entry.locations = componentLocations[id] || [];
    }
  });
  
  // Additional pass to catch components not explicitly mapped
  versions.forEach(component => {
    const entry = componentRegistry.get(component.component_id);
    if (entry && entry.locations.length === 0) {
      // Default location based on component id
      const id = component.component_id.toLowerCase();
      if (id.includes('home-')) {
        entry.locations = ['Home Page'];
      } else if (id.includes('cyber-')) {
        entry.locations = ['Cyber Security Page'];
      } else if (id.includes('install-')) {
        entry.locations = ['Installations Page'];
      } else if (id.includes('audit-')) {
        entry.locations = ['Security Audits Page'];
      } else if (id.includes('event-')) {
        entry.locations = ['Event Security Page'];
      } else if (id.includes('ui-')) {
        entry.locations = ['UI Component Library'];
      } else {
        entry.locations = ['General Component'];
      }
    }
    
    // Ensure count is at least 1
    if (entry && entry.count === 0) {
      entry.count = 1;
    }
  });

  // Convert map to array and sort by usage count (descending)
  return Array.from(componentRegistry.values())
    .sort((a, b) => b.count - a.count);
};
