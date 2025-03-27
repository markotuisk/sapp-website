
import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorEffect = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Add cursor styles to the body
    document.body.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      // For smoother movement, you can use requestAnimationFrame
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
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

  return { position, hidden };
};
