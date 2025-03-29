
import { useCursorEffect } from '@/hooks/useCursorEffect';

const CustomCursor = () => {
  const { position, hidden } = useCursorEffect();

  if (hidden) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9999] w-4 h-4 rounded-lg border border-gray-300 mix-blend-difference transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`
      }}
    />
  );
};

export default CustomCursor;
