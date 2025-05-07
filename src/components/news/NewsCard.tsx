
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import TranslatedText from "@/components/ui/TranslatedText";
import type { NewsArticle } from "@/hooks/useNewsArticles";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
  featured?: boolean;
}

const NewsCard = ({ article, className, featured = false }: NewsCardProps) => {
  const {
    title,
    slug,
    summary,
    cover_image,
    category,
    published_at,
    author,
  } = article;

  const formattedDate = published_at 
    ? format(new Date(published_at), "d MMMM yyyy") 
    : null;

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full",
        featured ? "col-span-1 md:col-span-3 lg:grid lg:grid-cols-2 lg:max-h-96" : "",
        className
      )}
    >
      <div className={cn(
        "overflow-hidden h-48",
        featured ? "lg:h-full" : ""
      )}>
        <Link to={`/news/${slug}`}>
          <img
            src={cover_image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      
      <div className="flex flex-col flex-grow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="bg-sapp-blue/10 text-sapp-blue">
              {category}
            </Badge>
            {formattedDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
          <Link 
            to={`/news/${slug}`}
            className="text-lg md:text-xl font-bold hover:text-sapp-blue transition-colors line-clamp-2"
          >
            {title}
          </Link>
        </CardHeader>
        
        <CardContent className="pb-2 flex-grow">
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {summary}
          </p>
        </CardContent>
        
        <CardFooter className="pt-2 flex justify-between">
          <span className="text-xs text-muted-foreground">
            <TranslatedText textKey="by" /> {author}
          </span>
          <Link 
            to={`/news/${slug}`}
            className="text-sapp-blue hover:underline text-sm font-medium"
          >
            <TranslatedText textKey="readMore" />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default NewsCard;
