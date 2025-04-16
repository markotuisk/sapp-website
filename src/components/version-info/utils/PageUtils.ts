
/**
 * Get all actual navigable pages in the application
 */
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
