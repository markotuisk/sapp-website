
import { logComponentUpdate } from './versionTracker';

// Registry of all major components in the application
export const componentRegistry = [
  // Core Components
  { id: 'app-core', name: 'Core Application', version: '1.0.0', description: 'Initial core application setup' },
  
  // Home Page Components
  { id: 'home-hero', name: 'Home Hero Section', version: '1.0.0', description: 'Main hero section of homepage' },
  { id: 'home-about', name: 'About Section', version: '1.0.0', description: 'About section component' },
  { id: 'home-services', name: 'Services Section', version: '1.0.0', description: 'Services overview section' },
  { id: 'home-partners', name: 'Partners Section', version: '1.0.0', description: 'Partners showcase section' },
  
  // Cyber Security Components
  { id: 'cyber-hero', name: 'Cyber Security Hero', version: '1.0.0', description: 'Cyber security landing section' },
  { id: 'cyber-features', name: 'Security Features', version: '1.0.0', description: 'Security features overview' },
  { id: 'cyber-cta', name: 'Security CTA', version: '1.0.0', description: 'Call to action section' },
  
  // Installation Components
  { id: 'install-hero', name: 'Installation Hero', version: '1.0.0', description: 'Installation services hero' },
  { id: 'install-solutions', name: 'Installation Solutions', version: '1.0.0', description: 'Solutions overview' },
  
  // Security Audits Components
  { id: 'audit-hero', name: 'Audit Hero', version: '1.0.0', description: 'Security audits landing' },
  { id: 'audit-services', name: 'Audit Services', version: '1.0.0', description: 'Audit services cards' },
  
  // Layout Components
  { id: 'layout-navbar', name: 'Navigation Bar', version: '1.0.0', description: 'Main navigation component' },
  { id: 'layout-footer', name: 'Footer', version: '1.0.0', description: 'Site footer component' },
  
  // UI Components
  { id: 'ui-button', name: 'Button Component', version: '1.0.0', description: 'Reusable button component' },
  { id: 'ui-card', name: 'Card Component', version: '1.0.0', description: 'Reusable card component' },
  { id: 'ui-form', name: 'Form Components', version: '1.0.0', description: 'Form-related components' },
];

// Function to register all components in the database
export const registerAllComponents = async () => {
  console.log('Starting component registration...');
  
  for (const component of componentRegistry) {
    try {
      await logComponentUpdate(
        component.id,
        component.name,
        component.version,
        component.description
      );
      console.log(`Registered component: ${component.name}`);
    } catch (error) {
      console.error(`Failed to register component: ${component.name}`, error);
    }
  }
  
  console.log('Component registration completed');
};
