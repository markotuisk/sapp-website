
import { useCursorEffect } from '@/hooks/useCursorEffect';

const CustomCursor = () => {
  const { position, hidden } = useCursorEffect();

  if (hidden) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border-2 border-sapp-blue transition-all duration-150 ease-out transform -translate-x-1/2 -translate-y-1/2"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
