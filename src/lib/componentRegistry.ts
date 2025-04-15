
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
  { id: 'home-story', name: 'Story Section', version: '1.0.0', description: 'Company story component' },
  { id: 'home-team', name: 'Team Section', version: '1.0.0', description: 'Founding team component' },
  { id: 'home-contact', name: 'Contact Section', version: '1.0.0', description: 'Contact form component' },
  
  // Cyber Security Components
  { id: 'cyber-hero', name: 'Cyber Security Hero', version: '1.0.0', description: 'Cyber security landing section' },
  { id: 'cyber-features', name: 'Security Features', version: '1.0.0', description: 'Security features overview' },
  { id: 'cyber-cta', name: 'Security CTA', version: '1.0.0', description: 'Call to action section' },
  { id: 'cyber-quote', name: 'Security Quote', version: '1.0.0', description: 'Client testimonial section' },
  { id: 'cyber-services', name: 'Security Services', version: '1.0.0', description: 'Services overview grid' },
  
  // Installation Components
  { id: 'install-hero', name: 'Installation Hero', version: '1.0.0', description: 'Installation services hero' },
  { id: 'install-solutions', name: 'Installation Solutions', version: '1.0.0', description: 'Solutions overview' },
  { id: 'install-capabilities', name: 'Installation Capabilities', version: '1.0.0', description: 'Capabilities cards' },
  { id: 'install-deployment', name: 'Deployment Process', version: '1.0.0', description: 'Deployment steps visualization' },
  { id: 'install-cta', name: 'Installation CTA', version: '1.0.0', description: 'Installation services CTA' },
  { id: 'install-quote', name: 'Installation Quote', version: '1.0.0', description: 'Client testimonial for installations' },
  
  // Security Audits Components
  { id: 'audit-hero', name: 'Audit Hero', version: '1.0.0', description: 'Security audits landing' },
  { id: 'audit-services', name: 'Audit Services', version: '1.0.0', description: 'Audit services cards' },
  { id: 'audit-details', name: 'Audit Details', version: '1.0.0', description: 'Detailed audit process' },
  { id: 'audit-why', name: 'Why Independent Audits', version: '1.0.0', description: 'Benefits of independent audits' },
  { id: 'audit-cta', name: 'Audit CTA', version: '1.0.0', description: 'Audit services CTA' },
  { id: 'audit-image', name: 'Audit Image Banner', version: '1.0.0', description: 'Visual banner for audit services' },
  
  // Event Security Components
  { id: 'event-quote', name: 'Event Security Quote', version: '1.0.0', description: 'Client testimonial for event security' },
  
  // Layout Components
  { id: 'layout-navbar', name: 'Navigation Bar', version: '1.0.0', description: 'Main navigation component' },
  { id: 'layout-footer', name: 'Footer', version: '1.0.0', description: 'Site footer component' },
  { id: 'layout-language', name: 'Language Selector', version: '1.0.0', description: 'Language selection component' },
  
  // UI Components
  { id: 'ui-button', name: 'Button Component', version: '1.0.0', description: 'Reusable button component' },
  { id: 'ui-card', name: 'Card Component', version: '1.0.0', description: 'Reusable card component' },
  { id: 'ui-form', name: 'Form Components', version: '1.0.0', description: 'Form-related components' },
  { id: 'ui-cookie', name: 'Cookie Consent', version: '1.0.0', description: 'Cookie consent banner' },
  { id: 'ui-feature-card', name: 'Feature Card', version: '1.0.0', description: 'Feature highlighting card' },
  { id: 'ui-quote-card', name: 'Quote Card', version: '1.0.0', description: 'Client testimonial card' },
  { id: 'ui-service-card', name: 'Service Card', version: '1.0.0', description: 'Service offering card' },
  { id: 'ui-animated', name: 'Animated Elements', version: '1.0.0', description: 'Animation components' },
  
  // Version Info Components
  { id: 'version-info', name: 'Version Information Page', version: '1.0.0', description: 'Version tracking dashboard' },
  { id: 'version-components', name: 'Components Tab', version: '1.0.0', description: 'Components listing tab' },
  { id: 'version-history', name: 'History Tab', version: '1.0.0', description: 'Update history tab' },
  { id: 'version-metrics', name: 'Codebase Metrics', version: '1.0.0', description: 'Metrics visualization' },
];

// Function to register all components in the database
export const registerAllComponents = async () => {
  console.log('Starting component registration...');
  const registeredComponents = [];
  
  for (const component of componentRegistry) {
    try {
      const result = await logComponentUpdate(
        component.id,
        component.name,
        component.version,
        component.description
      );
      console.log(`Registered component: ${component.name}`);
      if (result) {
        registeredComponents.push({...component, status: 'success'});
      }
    } catch (error) {
      console.error(`Failed to register component: ${component.name}`, error);
      registeredComponents.push({...component, status: 'error', error});
    }
  }
  
  console.log('Component registration completed');
  return registeredComponents;
};
