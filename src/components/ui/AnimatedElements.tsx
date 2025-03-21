
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import React from 'react';

interface AnimatedProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export const Animated = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  once = true,
  threshold = 0.1,
}: AnimatedProps) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  return (
    <div
      ref={ref}
      className={cn(
        `transition-all duration-${duration}`,
        animation === 'fade-in' && 'opacity-0',
        animation === 'fade-up' && 'opacity-0 translate-y-10',
        animation === 'fade-down' && 'opacity-0 -translate-y-10',
        animation === 'fade-left' && 'opacity-0 translate-x-10',
        animation === 'fade-right' && 'opacity-0 -translate-x-10',
        inView && 'opacity-100 translate-y-0 translate-x-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface AnimatedTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}

export const AnimatedText = ({
  text,
  tag = 'p',
  className,
  delay = 0,
  staggerDelay = 50,
  once = true,
  threshold = 0.1,
}: AnimatedTextProps) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const words = text.split(' ');
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-all duration-700 opacity-0 translate-y-4",
            inView && "opacity-100 translate-y-0"
          )}
          style={{ transitionDelay: `${delay + i * staggerDelay}ms` }}
        >
          {word}
          {i !== words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
};

interface AnimatedCountProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCount = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
}: AnimatedCountProps) => {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default { Animated, AnimatedText, AnimatedCount };
