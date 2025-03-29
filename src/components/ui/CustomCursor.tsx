
import { useCursorEffect } from '@/hooks/useCursorEffect';

const CustomCursor = () => {
  const { position, hidden, isHoveringButton } = useCursorEffect();

  if (hidden) return null;

  return (
    <div 
      className={`fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border-2 border-sapp-blue transition-all duration-150 ease-out transform -translate-x-1/2 -translate-y-1/2 ${isHoveringButton ? 'cursor-pointer' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        backgroundImage: isHoveringButton ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2320798C\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M13 15l5-3-5-3\'/><path d=\'M8 21V3\'/></svg>")' : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    />
  );
};

export default CustomCursor;
