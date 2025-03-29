
import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorEffect = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  useEffect(() => {
    // Set default cursor style
    document.body.style.cursor = 'auto';
    
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    // Check if mouse is over a button
    const handleButtonHover = () => {
      setIsHoveringButton(true);
      setHidden(false);
      document.body.style.cursor = 'pointer'; // Change to pointer cursor
    };

    const handleButtonLeave = () => {
      setIsHoveringButton(false);
      setHidden(true);
      document.body.style.cursor = 'auto'; // Reset to default cursor
    };

    // Add event listeners for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add event listeners for all buttons
    const buttons = document.querySelectorAll('button, .button, [role="button"], a');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleButtonHover);
      button.addEventListener('mouseleave', handleButtonLeave);
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleButtonHover);
        button.removeEventListener('mouseleave', handleButtonLeave);
      });
    };
  }, []);

  return { position, hidden, isHoveringButton };
};
