
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";
import CategoryFilter from "@/components/news/CategoryFilter";
import LoadMoreButton from "@/components/news/LoadMoreButton";
import SearchBar from "@/components/news/SearchBar";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import { useLanguage } from "@/hooks/useLanguage";

const ARTICLES_PER_PAGE = 9;

const News = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [displayedArticles, setDisplayedArticles] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  // Fetch articles with current filters
  const { data: articles = [], isLoading, refetch } = useNewsArticles({
    limit: ARTICLES_PER_PAGE * page,
    offset: 0,
    category: selectedCategory || undefined,
    searchTerm: searchTerm || undefined,
  });

  // Update displayed articles when data changes
  useEffect(() => {
    if (articles && articles.length > 0) {
      setDisplayedArticles(articles);
      
      // Check if we still have more articles to load
      setHasMore(articles.length >= ARTICLES_PER_PAGE * page);
      
      // Extract unique categories from all articles
      const categories = [...new Set(articles.map(article => article.category))];
      setAllCategories(categories);
    } else {
      setDisplayedArticles([]);
      setHasMore(false);
    }
  }, [articles, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Helmet>
        <title>{t("news")} | SAPP Security</title>
        <meta name="description" content={t("newsIntro")} />
        <meta property="og:title" content={`${t("news")} | SAPP Security`} />
        <meta property="og:description" content={t("newsIntro")} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      <main>
        <NewsHero />
        
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <CategoryFilter
              categories={allCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              className="w-full md:w-auto"
            />
            
            <SearchBar 
              onSearch={handleSearch}
              initialValue={searchTerm}
              className="w-full md:w-auto"
            />
          </div>
          
          <NewsGrid
            articles={displayedArticles}
            loading={isLoading}
            className="mb-8"
          />
          
          {hasMore && displayedArticles.length > 0 && (
            <LoadMoreButton
              onClick={handleLoadMore}
              loading={isLoading}
              disabled={!hasMore || isLoading}
              className="mt-8"
            />
          )}

          {displayedArticles.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default News;
