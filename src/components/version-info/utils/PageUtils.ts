
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
    // 404 Not Found
    { name: 'Not Found (404)', path: '/404' }
  ];
};
