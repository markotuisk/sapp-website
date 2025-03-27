
import { useCursorEffect } from '@/hooks/useCursorEffect';

const CustomCursor = () => {
  const { position, hidden } = useCursorEffect();

  if (hidden) return null;

  return (
    <>
      {/* Main cursor - small dot with a color that fits the page theme */}
      <div 
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-[#20798C] mix-blend-difference transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />

      {/* Follower cursor with soft shadow effect - made smaller */}
      <div 
        className="fixed pointer-events-none z-[9998] w-5 h-5 rounded-full bg-[#ea384c]/20 backdrop-blur-sm transition-all duration-500 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
