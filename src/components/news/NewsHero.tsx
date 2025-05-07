
import React from "react";
import TranslatedText from "@/components/ui/TranslatedText";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface NewsHeroProps {
  className?: string;
}

const NewsHero = ({ className }: NewsHeroProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className={cn(
      "py-16 md:py-24 bg-gradient-to-b from-white to-slate-50",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center" ref={ref}>
          <h1 
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-500 delay-100",
              inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            )}
          >
            <TranslatedText textKey="latestNews" />
          </h1>
          
          <p 
            className={cn(
              "text-lg text-muted-foreground transition-all duration-500 delay-200",
              inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            )}
          >
            <TranslatedText textKey="newsIntro" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
