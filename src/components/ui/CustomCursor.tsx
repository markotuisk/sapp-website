
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Add cursor styles to the body
    document.body.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup on unmount
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Main cursor - small red laser dot */}
      <div 
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-[#ea384c] mix-blend-difference transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />

      {/* Follower cursor with soft shadow effect */}
      <div 
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-500 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
