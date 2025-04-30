
import { useLocation } from "react-router-dom";
import { useEffect, useState, useTransition } from "react";
import { DebugInfo, useComponentLogger, useDebugContext } from '@/utils/debugTools';

const NotFound = () => {
  const location = useLocation();
  const { logEvent } = useComponentLogger('NotFoundPage');
  const { isDebugMode } = useDebugContext();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    logEvent('404Error', {
      attemptedPath: location.pathname,
      timestamp: new Date().toISOString()
    });
    
    // Use startTransition to prevent suspension during initial render
    startTransition(() => {
      setMounted(true);
    });
  }, [location.pathname, logEvent]);

  const content = (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 id="not-found-heading" className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );

  // Always render the component structure the same way
  // but conditionally wrap with DebugInfo
  if (isDebugMode && process.env.NODE_ENV === 'development') {
    return (
      <DebugInfo 
        componentName="NotFoundPage"
        data={{
          attemptedPath: location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent
        }}
      >
        {content}
      </DebugInfo>
    );
  }

  return content;
};

export default NotFound;
