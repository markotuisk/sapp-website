
import { useCursorEffect } from '@/hooks/useCursorEffect';

const CustomCursor = () => {
  const { position, hidden } = useCursorEffect();

  if (hidden) return null;

  return (
    <>
      {/* Main cursor - more standard style with slight curvature */}
      <div 
        className="fixed pointer-events-none z-[9999] w-4 h-4 rounded-lg border border-gray-300 mix-blend-difference transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}
      />
      {/* Small dot in the center */}
      <div 
        className="fixed pointer-events-none z-[9999] w-1 h-1 rounded-full bg-white mix-blend-difference transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
