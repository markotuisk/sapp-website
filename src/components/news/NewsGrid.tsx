
import React from "react";
import { cn } from "@/lib/utils";
import NewsCard from "./NewsCard";
import { NewsArticle } from "@/hooks/useNewsArticles";
import { useInView } from "react-intersection-observer";

interface NewsGridProps {
  articles: NewsArticle[];
  className?: string;
  loading?: boolean;
}

const NewsGrid = ({ articles, className, loading = false }: NewsGridProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get the featured article (if any) and the rest
  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured || article === featuredArticle);

  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
            className="bg-gray-100 animate-pulse h-64 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found.</p>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {featuredArticle && (
        <div 
          className={cn(
            "col-span-1 md:col-span-2 lg:col-span-3 transition-all duration-500 delay-100",
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          )}
        >
          <NewsCard article={featuredArticle} featured={true} />
        </div>
      )}

      {regularArticles.map((article, index) => (
        <div 
          key={article.id}
          className={cn(
            "transition-all duration-500",
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
            // Add staggered delay based on index
            `delay-[${100 + (index * 50)}ms]`
          )}
        >
          <NewsCard article={article} />
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
