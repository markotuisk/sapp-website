
import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorEffect = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false); // Make cursor visible once it moves
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Reset cursor to default for all elements
    document.body.style.cursor = 'auto';

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { position, hidden };
};
