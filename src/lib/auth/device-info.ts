
/**
 * Extract browser and OS information from user agent string
 */
export const extractBrowserAndOS = (userAgent: string): { browser: string; os: string } => {
  let browser = 'Unknown';
  let os = 'Unknown';
  
  // Basic OS detection
  if (userAgent.includes('Windows')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac OS')) {
    os = 'macOS';
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  }
  
  // Basic browser detection
  if (userAgent.includes('Firefox/')) {
    browser = 'Firefox';
  } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
    browser = 'Safari';
  } else if (userAgent.includes('Edg/')) {
    browser = 'Edge';
  } else if (userAgent.includes('OPR/') || userAgent.includes('Opera/')) {
    browser = 'Opera';
  }
  
  return { browser, os };
};

/**
 * Get network connection information if available
 */
export const getConnectionInfo = (): { type: string, effectiveType?: string } => {
  // @ts-ignore - navigator.connection is not in standard TypeScript definitions
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    return {
      type: connection.type || 'unknown',
      effectiveType: connection.effectiveType || 'unknown'
    };
  }
  
  return { type: 'unknown' };
};

/**
 * Get battery level if available
 */
export const getBatteryLevel = async (): Promise<number | undefined> => {
  try {
    // @ts-ignore - getBattery is not in standard TypeScript definitions
    if (navigator.getBattery) {
      // @ts-ignore
      const battery = await navigator.getBattery();
      return Math.round(battery.level * 100);
    }
  } catch (e) {
    console.error('Error getting battery info:', e);
  }
  return undefined;
};

/**
 * Generate a unique session ID for this browsing session
 */
export const generateSessionId = (): string => {
  // Get or create a session ID from sessionStorage
  let sessionId = sessionStorage.getItem('auth_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('auth_session_id', sessionId);
  }
  return sessionId;
};
