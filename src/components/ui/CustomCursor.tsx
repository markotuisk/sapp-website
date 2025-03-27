
import { useCursorEffect } from '@/hooks/useCursorEffect';

const CustomCursor = () => {
  const { position, hidden } = useCursorEffect();

  if (hidden) return null;

  return (
    <>
      {/* Main cursor - macOS style */}
      <div 
        className="fixed pointer-events-none z-[9999] w-6 h-6 rounded-full border-2 border-white mix-blend-difference transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.5)'
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
