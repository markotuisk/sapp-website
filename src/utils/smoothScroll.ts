
export const smoothScrollTo = (
  element: HTMLElement | string,
  options: {
    duration?: number;
    offset?: number;
    easing?: 'easeInOut' | 'easeIn' | 'easeOut' | 'linear';
  } = {}
) => {
  const { duration = 800, offset = 0, easing = 'easeInOut' } = options;
  
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;
    
  if (!targetElement) return;
  
  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.offsetTop - offset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  };
  
  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easingFunctions[easing](progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };
  
  requestAnimationFrame(animation);
};

export const smoothScrollToTop = (duration: number = 600) => {
  smoothScrollTo(document.body, { duration, offset: 0 });
};

export const addSmoothScrollToAnchors = () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (anchor && anchor.hash) {
      e.preventDefault();
      smoothScrollTo(anchor.hash, { offset: 80 });
    }
  });
};
