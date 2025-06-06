
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import { useNewsArticleBySlug } from "@/hooks/useNewsArticles";
import { useLanguage } from "@/hooks/useLanguage";
import TranslatedText from "@/components/ui/TranslatedText";
import { cn } from "@/lib/utils";
import SocialShareButtons from "@/components/news/SocialShareButtons";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const { data: article, isLoading, error } = useNewsArticleBySlug(slug);

  // Generate the full URL for social sharing
  const fullUrl = `${window.location.origin}/news/${slug}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-4xl">
            <div className="h-8 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            <div className="h-64 bg-slate-100 rounded"></div>
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate("/news")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <TranslatedText textKey="backToNews" />
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const publishDate = article.published_at 
    ? format(new Date(article.published_at), "d MMMM yyyy") 
    : format(new Date(article.created_at), "d MMMM yyyy");

  return (
    <>
      <Helmet>
        <title>{article.title} | SAPP Security</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        {article.cover_image && <meta property="og:image" content={article.cover_image} />}
        <meta property="article:published_time" content={article.published_at || article.created_at} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/news"
              className="inline-flex items-center text-sm text-sapp-blue hover:underline mb-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              <TranslatedText textKey="backToNews" />
            </Link>
            
            <Badge variant="outline" className="bg-sapp-blue/10 text-sapp-blue mb-4">
              {article.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between text-muted-foreground text-sm mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <time dateTime={article.published_at || article.created_at}>
                  <TranslatedText textKey="publishedOn" /> {publishDate}
                </time>
                <span className="mx-1">•</span>
                <span>
                  <TranslatedText textKey="by" /> {article.author}
                  {article.author_title && (
                    <span className="text-muted-foreground"> – {article.author_title}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
          
          {article.cover_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={article.cover_image}
                alt={article.title}
                className="w-full object-cover max-h-[500px]"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-3">
              <div 
                className={cn(
                  "prose prose-slate max-w-none",
                  "prose-headings:font-semibold prose-headings:text-sapp-dark",
                  "prose-a:text-sapp-blue prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
                  "prose-img:rounded-md"
                )}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            <aside className="md:col-span-1">
              <div className="sticky top-24 space-y-8">
                <SocialShareButtons 
                  title={article.title} 
                  url={fullUrl} 
                  variant="vertical" 
                />
                
                {article.tags && article.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-muted-foreground">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NewsDetail;
