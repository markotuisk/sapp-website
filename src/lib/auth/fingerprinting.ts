
/**
 * Generate a simple device fingerprint based on available browser data
 * In production, consider using a more sophisticated fingerprinting library
 */
export const generateDeviceFingerprint = (): string => {
  const screenData = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const platform = navigator.platform;
  const plugins = Array.from(navigator.plugins || []).map(p => p.name).join(';');
  const canvasFingerprint = getCanvasFingerprint();
  
  // Create a fingerprint combining multiple factors
  let fingerprint = `${screenData}|${timeZone}|${language}|${platform}|${plugins}|${canvasFingerprint}|${navigator.userAgent}`;
  
  // Generate a hash from the fingerprint string
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return hash.toString(16);
};

/**
 * Get a canvas-based fingerprint component
 * This adds to the uniqueness of device fingerprinting
 */
const getCanvasFingerprint = (): string => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'canvas-not-supported';
    
    // Draw some shapes and text
    canvas.width = 200;
    canvas.height = 50;
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 100, 25);
    ctx.fillStyle = '#069';
    ctx.fillText('Fingerprint', 2, 2);
    
    // Convert to data URL and extract a hash
    const dataUrl = canvas.toDataURL();
    let hash = 0;
    for (let i = 0; i < dataUrl.length; i++) {
      hash = ((hash << 5) - hash) + dataUrl.charCodeAt(i);
      hash = hash & hash;
    }
    
    return hash.toString(36);
  } catch (e) {
    console.error('Canvas fingerprinting failed:', e);
    return 'canvas-error';
  }
};
